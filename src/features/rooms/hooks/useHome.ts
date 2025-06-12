import { useCallback, useState } from "react";
import { RoomTypeEnum, CallFramContentType, userStateType } from "../types";
import { useInit } from "./useInit";
import { getInitialVideoStreamList } from "../helpers/getInitialVideoStreamList";
import socketUtils from "@/networking/socketUtils";
import { RoomEvents } from "../constants/events";

export const useHome = () => {
  const [selectedRoomType, setSelectedRoomType] = useState<RoomTypeEnum>(RoomTypeEnum.TWO_USERS);
  const [videoStreamsList, setVideoStreamsList] = useState<CallFramContentType[]>(getInitialVideoStreamList(selectedRoomType));
  const [userState, setUserState] = useState<userStateType>("noAction");
  const [isCameraOpen, setIsCameraOpen] = useState<boolean>(true);
  const [isMicOpen, setIsMicOpen] = useState<boolean>(true);

  const { userId, isReady, updateCallFram, peers, userStreamRef } = useInit({ videoStreamsList, setVideoStreamsList, userState, setUserState, isCameraOpen, isMicOpen });

  const handleJoinNextRoom = useCallback(async () => {
    if (!isReady.isPeerOpen && !isReady.isUserReady) return;
    // handle first click
    if (userState == "noAction") {
      updateCallFram(1, "loader");
      setUserState("waiting");
      socketUtils.getSocket().emit(RoomEvents.client.JOIN_ROOM, userId);
      // handle skip (skipi a abd sami3)
    } else if (userState == "inCall") {
      setUserState("waiting");
      // close all calls
      for (const peer in peers) {
        peers[peer].close();
        delete peers[peer];
      }
      socketUtils.getSocket().emit(RoomEvents.client.LEAVE_ROOM);
      // join room after complete leaving process
      socketUtils.getSocket().once(RoomEvents.server.READY_TO_JOIN, () => {
        socketUtils.getSocket().emit(RoomEvents.client.JOIN_ROOM, userId);
      })
    }
  }, [isReady, userState, updateCallFram, userId, peers]);

  const handleEndLive = useCallback(() => {
    // // close all calls
    for (const peer in peers) {
      peers[peer].close();
    }
    updateCallFram(1, "illustration");
    setUserState("noAction");
    socketUtils.getSocket().emit(RoomEvents.client.LEAVE_ROOM);
  }, [peers, updateCallFram]);

  const handleToggleCamera = useCallback(() => {
    if (!userStreamRef.current) return;
    // emit camera toggle event
    socketUtils.getSocket().emit(RoomEvents.client.TOGGLE_CAMERA, userId);
    // update isCameraOpen on current user
    setIsCameraOpen(prev => !prev);
    // disable video track from the users stream
    userStreamRef.current.getVideoTracks()[0].enabled = !userStreamRef.current.getVideoTracks()[0].enabled;
  }, [userId, userStreamRef]);

  const handleToggleMic = useCallback(() => {
    if (!userStreamRef.current) return;
    // emit mic toggle event
    socketUtils.getSocket().emit(RoomEvents.client.TOGGLE_MIC, userId);
    // update isMicOpen on current user
    setIsMicOpen(prev => !prev);
    // disable audio track from users stream
    userStreamRef.current.getAudioTracks()[0].enabled = !userStreamRef.current.getAudioTracks()[0].enabled;
  }, [userId, userStreamRef]);

  const testFunc = useCallback(() => {
  }, []);

  return {
    refs: {
      userId,
    },
    state: {
      videoStreamsList,
      selectedRoomType,
      setSelectedRoomType,
      userState,
      isReady,
      isCameraOpen,
      isMicOpen,
    },
    functions: {
      handleJoinNextRoom,
      handleEndLive,
      handleToggleMic,
      handleToggleCamera,
      testFunc,
    },
  }
}