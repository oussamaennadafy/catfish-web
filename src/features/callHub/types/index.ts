export enum RoomTypeEnum {
  twoUsers,
  shuffle,
  threeUsers,
  moreThanThreeUsers,
}

export type VideoStream = {
  userId: string,
  stream: MediaStream,
  isMuted: boolean,
}

export type CallFramContentType = {
  id: number,
  content: "illustration" | "placeHolder" | "loader" | VideoStream,
};

export type userStateType = "noAction" | "waiting" | "inCall"; 