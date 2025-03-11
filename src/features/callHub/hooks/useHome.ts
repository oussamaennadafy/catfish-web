import { useCallback, useRef, useState } from "react";
import { RoomTypeEnum, CallFramContentType, userStateType } from "../types";
import { socket } from "@/services/socket";
import { useInit } from "./useInit";
import { getInitialVideoStreamList } from "../helpers/getInitialVideoStreamList";

export const useHome = () => {
  const [selectedRoomType, setSelectedRoomType] = useState<RoomTypeEnum>(RoomTypeEnum.twoUsers);
  const [videoStreamsList, setVideoStreamsList] = useState<CallFramContentType[]>(getInitialVideoStreamList(selectedRoomType));
  const [userState, setUserState] = useState<userStateType>("noAction");

  const [isCameraOpen, setIsCameraOpen] = useState<boolean>(true);
  const isCameraOpenRef = useRef<boolean>(true);
  const [isMicOpen, setIsMicOpen] = useState<boolean>(true);

  const { userId, isReady, updateCallFram, peers, userStreamRef, toggleCallFramCamera } = useInit({ setVideoStreamsList, setUserState, videoStreamsList, isCameraOpen, isCameraOpenRef });

  const handleJoinNextRoom = useCallback(() => {
    if (!isReady.isPeerOpen && !isReady.isUserReady) return;
    // handle first click
    if (userState == "noAction") {
      updateCallFram(1, "loader");
      setUserState("waiting");
      socket.emit('join-room', userId, RoomTypeEnum[selectedRoomType]);
    } else if (userState == "inCall") {
      setUserState("waiting");
      // close all calls
      for (const peer in peers) {
        peers[peer].close();
      }
      socket.emit('leave-room', userId);
      socket.emit('join-room', userId, RoomTypeEnum[selectedRoomType]);
    }
  }, [isReady.isPeerOpen, isReady.isUserReady, userState, updateCallFram, userId, selectedRoomType, peers]);


  const handleAppFriend = useCallback(() => {
    console.log(videoStreamsList);
  }, [videoStreamsList]);

  const handleEndLive = useCallback(() => {
    // // close all calls
    for (const peer in peers) {
      peers[peer].close();
    }
    updateCallFram(1, "illustration");
    setUserState("noAction");
    socket.emit('leave-room', userId);
  }, [peers, updateCallFram, userId]);

  const handleToggleMic = useCallback(() => {
    // check if current user has stream
    if (!userStreamRef) return;
    // disable audio track from users stream
    const audioTrack = (userStreamRef.current as MediaStream).getAudioTracks()[0];
    audioTrack.enabled = !audioTrack.enabled;
    // set state to update ui
    setIsMicOpen((prev) => !prev);
  }, [userStreamRef]);

  const handleToggleCamera = useCallback(() => {
    // check if current user has stream
    if (!userStreamRef) return;
    // emit camera toggle event
    socket.emit("toggle-camera", !isCameraOpen);
    // disable video track from users stream
    const videoTrack = (userStreamRef.current as MediaStream).getVideoTracks()[0];
    videoTrack.enabled = !videoTrack.enabled;
    // set state to update ui
    setIsCameraOpen((prev) => !prev);
    isCameraOpenRef.current = !isCameraOpenRef.current;
    toggleCallFramCamera(0);
  }, [isCameraOpen, userStreamRef, toggleCallFramCamera]);

  return {
    state: {
      videoStreamsList,
      selectedRoomType,
      setSelectedRoomType,
      userState,
      isCameraOpen,
      isMicOpen,
    },
    functions: {
      handleJoinNextRoom,
      handleAppFriend,
      handleEndLive,
      handleToggleMic,
      handleToggleCamera,
    },
  }
}