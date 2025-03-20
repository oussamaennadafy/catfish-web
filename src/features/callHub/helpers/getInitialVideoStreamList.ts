import { CallFramContentType, RoomTypeEnum } from "../types";
import { getInitialVideoStreamsForMoreThanThree } from "./videoStreamsGetters/getInitialVideoStreamsForMoreThanThree";
import { getInitialVideoStreamsForShuffle } from "./videoStreamsGetters/getInitialVideoStreamsForShuffle";
import { getInitialVideoStreamsForThreeUsers } from "./videoStreamsGetters/getInitialVideoStreamsForThreeUsers";
import { getInitialVideoStreamsForTwoUsers } from "./videoStreamsGetters/getInitialVideoStreamsForTwoUsers";

export const getInitialVideoStreamList = (roomType: RoomTypeEnum): CallFramContentType[] => {
  switch (roomType) {
    case RoomTypeEnum.TWO_USERS:
      return getInitialVideoStreamsForTwoUsers();
    case RoomTypeEnum.THREE_USERS:
      return getInitialVideoStreamsForThreeUsers();
    case RoomTypeEnum.NINE_USERS:
      return getInitialVideoStreamsForMoreThanThree();
    case RoomTypeEnum.SHUFFLE:
      return getInitialVideoStreamsForShuffle();
  }
}