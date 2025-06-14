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
  const { lg } = useDeviceSize();

  return <div className='h-full w-full'>
    {
      lg() ?
        <DesktopCallView
          videoStreamsList={videoStreamsList}
          className='hidden lg:grid'
          userId={userId}
        />
        :
        <MobileCallView
          videoStreamsList={videoStreamsList}
          className='grid lg:hidden'
          userState={userState}
          userId={userId}
        />
    }
  </div>
}

export default TwoUsersCallFram;