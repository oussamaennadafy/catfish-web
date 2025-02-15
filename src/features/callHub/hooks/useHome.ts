import { useCallback, useState } from "react";
import { RoomTypeEnum, CallFramContentType, userStateType } from "../types";
import { socket } from "@/services/socket";
import { useInit } from "./useInit";
import { getInitialVideoStreamList } from "../helpers/getInitialVideoStreamList";

export const useHome = () => {
  const [selectedRoomType, setSelectedRoomType] = useState<RoomTypeEnum>(RoomTypeEnum.twoUsers);
  const [videoStreamsList, setVideoStreamsList] = useState<CallFramContentType[]>(getInitialVideoStreamList(selectedRoomType));
  const [userState, setUserState] = useState<userStateType>("noAction");
  const { userId, isReady, updateCallFram } = useInit({ setVideoStreamsList, setUserState });

  const handleJoinNextRoom = useCallback(() => {
    if (isReady.isPeerOpen && isReady.isUserReady) {
      // handle first click
      if (userState == "noAction") {
        updateCallFram(1, "loader");
        setUserState("waiting");
        console.log("emit join room");
        socket.emit('join-room', userId, RoomTypeEnum[selectedRoomType]);
      } else if(userState == "inCall") {
        // disconnect from curent call
        console.log("user should leave this room and join another one...");
        // try to connect to new room
      }
    }
  }, [isReady.isPeerOpen, isReady.isUserReady, userId, selectedRoomType, updateCallFram, userState]);

  return {
    videoStreamsList,
    selectedRoomType,
    setSelectedRoomType,
    handleJoinNextRoom,
    userState,
  }
}