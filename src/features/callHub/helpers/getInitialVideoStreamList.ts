import { CallFramContentType, RoomTypeEnum } from "../types";
import { getInitialVideoStreamsForMoreThanThree } from "./videoStreamsGetters/getInitialVideoStreamsForMoreThanThree";
import { getInitialVideoStreamsForShuffle } from "./videoStreamsGetters/getInitialVideoStreamsForShuffle";
import { getInitialVideoStreamsForThreeUsers } from "./videoStreamsGetters/getInitialVideoStreamsForThreeUsers";
import { getInitialVideoStreamsForTwoUsers } from "./videoStreamsGetters/getInitialVideoStreamsForTwoUsers";

export const getInitialVideoStreamList = (roomType: RoomTypeEnum): CallFramContentType[] => {
  switch (roomType) {
    case RoomTypeEnum.twoUsers:
      return getInitialVideoStreamsForTwoUsers();
    case RoomTypeEnum.threeUsers:
      return getInitialVideoStreamsForThreeUsers();
    case RoomTypeEnum.moreThanThreeUsers:
      return getInitialVideoStreamsForMoreThanThree();
    case RoomTypeEnum.shuffle:
      return getInitialVideoStreamsForShuffle();
  }
}