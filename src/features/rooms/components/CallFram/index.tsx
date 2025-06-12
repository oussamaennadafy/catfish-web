import React from 'react'
import { CallFramContentType, RoomTypeEnum, userStateType } from '../../types'
import TwoUsersCallFram from './TwoUsersCallFram';
import ThreeUsersCallFram from './ThreeUsersCallFram';
import MoreThanThreeUsersCallFram from './MorrThanThreeUsersCallFram';
import ShuffleCallFram from './ShuffleCallFram';
import ChatSideBar from '../../../chat/components/ChatSideBar';
import useDeviceSize from '@/utils/useDeviceSize';
import ChatMobileOverlay from '@/features/chat/components/ChatMobileOverlay';

type CallFramProps = {
  videoStreamsList: CallFramContentType[],
  selectedRoomType: RoomTypeEnum,
  userState: userStateType,
  userId: string,
}

function CallFram({ videoStreamsList, selectedRoomType, userState, userId }: CallFramProps) {
  const { lg } = useDeviceSize();

  switch (selectedRoomType) {
    case RoomTypeEnum.TWO_USERS:
      return (
        <div className='relative w-full h-full max-h-full flex gap-3 transition-all'>
          <TwoUsersCallFram
            videoStreamsList={videoStreamsList}
            userState={userState}
            userId={userId}
          />
          {/* chat sidebar */}
          {
            lg() ?
              <ChatSideBar
                userId={userId}
                userState={userState}
                videoStreamsList={videoStreamsList}
              />
              :
              <ChatMobileOverlay
                userState={userState}
                userId={userId}
                videoStreamsList={videoStreamsList}
              />
          }
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