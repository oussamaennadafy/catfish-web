import { useState } from "react";
import { RoomTypeEnum } from "../types";

export const useHome = () => {
  const [selectedRoomType, setSelectedRoomType] = useState(RoomTypeEnum.twoUsers);

  return {
    selectedRoomType,
    setSelectedRoomType,
  }
}