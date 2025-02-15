import React from 'react'
import { CallFramContentType, RoomTypeEnum } from '../../types'
import TwoUsersCallFram from './TwoUsersCallFram';
import ThreeUsersCallFram from './ThreeUsersCallFram';
import MoreThanThreeUsersCallFram from './MorrThanThreeUsersCallFram';
import ShuffleCallFram from './ShuffleCallFram';


type CallFramProps = {
  videoStreamsList: CallFramContentType[],
  selectedRoomType: RoomTypeEnum,
}

function CallFram({ videoStreamsList, selectedRoomType }: CallFramProps) {
  switch (selectedRoomType) {
    case RoomTypeEnum.twoUsers:
      return <TwoUsersCallFram videoStreamsList={videoStreamsList} />
    case RoomTypeEnum.threeUsers:
      return <ThreeUsersCallFram videoStreamsList={videoStreamsList} />
    case RoomTypeEnum.moreThanThreeUsers:
      return <MoreThanThreeUsersCallFram videoStreamsList={videoStreamsList} />
    case RoomTypeEnum.shuffle:
      return <ShuffleCallFram videoStreamsList={videoStreamsList} />
  }
}

export default CallFram