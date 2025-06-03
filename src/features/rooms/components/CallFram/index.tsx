import React from 'react'
import { CallFramContentType, RoomTypeEnum, userStateType } from '../../types'
import TwoUsersCallFram from './TwoUsersCallFram';
import ThreeUsersCallFram from './ThreeUsersCallFram';
import MoreThanThreeUsersCallFram from './MorrThanThreeUsersCallFram';
import ShuffleCallFram from './ShuffleCallFram';


type CallFramProps = {
  videoStreamsList: CallFramContentType[],
  selectedRoomType: RoomTypeEnum,
  userState: userStateType,
  isMicOpen: boolean,
}

function CallFram({ videoStreamsList, selectedRoomType, userState, isMicOpen }: CallFramProps) {
  switch (selectedRoomType) {
    case RoomTypeEnum.TWO_USERS:
      return <TwoUsersCallFram
        videoStreamsList={videoStreamsList}
        userState={userState}
        isMicOpen={isMicOpen}
      />
    case RoomTypeEnum.THREE_USERS:
      return <ThreeUsersCallFram
        videoStreamsList={videoStreamsList}
      />
    case RoomTypeEnum.NINE_USERS:
      return <MoreThanThreeUsersCallFram
        videoStreamsList={videoStreamsList}
      />
    case RoomTypeEnum.SHUFFLE:
      return <ShuffleCallFram
        videoStreamsList={videoStreamsList}
      />
  }
}

export default CallFram