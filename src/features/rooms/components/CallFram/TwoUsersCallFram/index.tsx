import React from 'react';
import { CallFramContentType, userStateType } from '../../../types';
import DesktopCallView from './DesktopCallView';
import MobileCallView from './MobileCallView';
import useDeviceSize from '@/utils/useDeviceSize';

type CallFramProps = {
  videoStreamsList: CallFramContentType[],
  userState: userStateType,
  userId: string
}

function TwoUsersCallFram({ videoStreamsList, userState, userId }: CallFramProps) {
  const { isMobile } = useDeviceSize();

  return <div className='h-full w-full'>
    {
      isMobile() ?
        <MobileCallView
          videoStreamsList={videoStreamsList}
          className='grid md:hidden'
          userState={userState}
        />
        :
        <DesktopCallView
          videoStreamsList={videoStreamsList}
          className='hidden md:grid'
          userId={userId}
        />
    }
  </div>
}

export default TwoUsersCallFram;