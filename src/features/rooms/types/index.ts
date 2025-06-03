export enum RoomTypeEnum {
  TWO_USERS,
  THREE_USERS,
  NINE_USERS,
  SHUFFLE,
}

export type VideoStream = {
  userId: string,
  stream: MediaStream,
  isMuted: boolean,
  isCameraOpen?: boolean,
}

export type CallFramContentType = {
  id: number,
  content: "illustration" | "placeHolder" | "loader" | VideoStream,
};

export type userStateType = "noAction" | "waiting" | "inCall"; 