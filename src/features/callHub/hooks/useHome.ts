import { useCallback, useRef, useState } from "react";
import { RoomTypeEnum, CallFramContentType, userStateType } from "../types";
import { socket } from "@/services/socket";
import { useInit } from "./useInit";
import { getInitialVideoStreamList } from "../helpers/getInitialVideoStreamList";

export const useHome = () => {
  const [selectedRoomType, setSelectedRoomType] = useState<RoomTypeEnum>(RoomTypeEnum.twoUsers);
  const [videoStreamsList, setVideoStreamsList] = useState<CallFramContentType[]>(getInitialVideoStreamList(selectedRoomType));
  const [userState, setUserState] = useState<userStateType>("noAction");
  const { userId, isReady, updateCallFram, peers, userStreamRef } = useInit({ setVideoStreamsList, setUserState, videoStreamsList });
  const prevIntervalId = useRef<NodeJS.Timeout | undefined>(undefined);

  const [isCameraOpen, setIsCameraOpen] = useState<boolean>(true);
  const [isMicOpen, setIsMicOpen] = useState<boolean>(true);
  
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
      socket.emit('user-disconnected', userId);
      socket.emit('join-room', userId, RoomTypeEnum[selectedRoomType]);
      // clear previous interval
      clearInterval(prevIntervalId.current);

      // set interval
      const intervalId = setInterval(() => {
        if (Object.keys(peers).length == 0) {
          socket.emit('user-disconnected', userId);
          socket.emit('join-room', userId, RoomTypeEnum[selectedRoomType]);
        }
      }, 5000);

      // set the interval id to clear later
      prevIntervalId.current = intervalId;
    }
  }, [isReady.isPeerOpen, isReady.isUserReady, userId, selectedRoomType, updateCallFram, userState, peers]);


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
    socket.emit('user-disconnected', userId);
    clearInterval(prevIntervalId.current);
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
    // disable video track from users stream
    const videoTrack = (userStreamRef.current as MediaStream).getVideoTracks()[0];
    videoTrack.enabled = !videoTrack.enabled;
    // emit camera toggle event
    socket.emit('toggle-camera', userId, isCameraOpen);
    // set state to update ui
    setIsCameraOpen((prev) => !prev);
  }, [userId, userStreamRef, isCameraOpen]);

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