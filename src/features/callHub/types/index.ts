export enum RoomTypeEnum {
  twoUsers,
  shuffle,
  threeUsers,
  moreThanThreeUsers,
} 

export type VideoStream = {
  userId: string,
  stream: MediaStream;
  isMuted?: boolean;
}