import React from 'react'
import { CallFramContentType, RoomTypeEnum, userStateType } from '../../types'
import TwoUsersCallFram from './TwoUsersCallFram';
import ThreeUsersCallFram from './ThreeUsersCallFram';
import MoreThanThreeUsersCallFram from './MorrThanThreeUsersCallFram';
import ShuffleCallFram from './ShuffleCallFram';
import ChatSideBar from '../../../chat/components/ChatSideBar';

type CallFramProps = {
  videoStreamsList: CallFramContentType[],
  selectedRoomType: RoomTypeEnum,
  userState: userStateType,
  isMicOpen: boolean,
  userId: string,
}

function CallFram({ videoStreamsList, selectedRoomType, userState, isMicOpen, userId }: CallFramProps) {
  switch (selectedRoomType) {
    case RoomTypeEnum.TWO_USERS:
      return (
        <div className='w-full h-full max-h-full flex gap-3 transition-all'>
          <TwoUsersCallFram
            videoStreamsList={videoStreamsList}
            userState={userState}
            isMicOpen={isMicOpen}
          />
          {/* chat sidebar */}
          <ChatSideBar
            userId={userId}
            userState={userState}
            videoStreamsList={videoStreamsList}
          />
        </div>
      )
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