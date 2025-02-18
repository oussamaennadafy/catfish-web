import { useCallback, useState } from "react";
import { RoomTypeEnum, CallFramContentType, userStateType } from "../types";
import { socket } from "@/services/socket";
import { useInit } from "./useInit";
import { getInitialVideoStreamList } from "../helpers/getInitialVideoStreamList";

export const useHome = () => {
  const [selectedRoomType, setSelectedRoomType] = useState<RoomTypeEnum>(RoomTypeEnum.twoUsers);
  const [videoStreamsList, setVideoStreamsList] = useState<CallFramContentType[]>(getInitialVideoStreamList(selectedRoomType));
  const [userState, setUserState] = useState<userStateType>("noAction");
  const { userId, isReady, updateCallFram, peers } = useInit({ setVideoStreamsList, setUserState });

  const handleJoinNextRoom = useCallback(() => {
    if (isReady.isPeerOpen && isReady.isUserReady) {
      // handle first click
      if (userState == "noAction") {
        updateCallFram(1, "loader");
        setUserState("waiting");
        socket.emit('join-room', userId, RoomTypeEnum[selectedRoomType]);
      } else if (userState == "inCall") {
        // close all calls
        for (const peer in peers) {
          peers[peer].close();
        }
        socket.emit('user-disconnected', userId);
        socket.emit('join-room', userId, RoomTypeEnum[selectedRoomType]);
      }
    }
  }, [isReady.isPeerOpen, isReady.isUserReady, userId, selectedRoomType, updateCallFram, userState, peers]);


  const handleAppFriend = useCallback(() => {
    console.log({ peers, userState });
  }, [peers, userState])

  return {
    videoStreamsList,
    selectedRoomType,
    setSelectedRoomType,
    handleJoinNextRoom,
    userState,
    handleAppFriend,
  }
}