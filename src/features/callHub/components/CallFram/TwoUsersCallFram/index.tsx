import React from 'react';
import { CallFramContentType, userStateType } from '../../../types';
import DesktopCallView from './DesktopCallView';
import MobileCallView from './MobileCallView';
import useDeviceSize from '@/utils/useDeviceSize';

type CallFramProps = {
  videoStreamsList: CallFramContentType[],
  userState: userStateType,
}

function TwoUsersCallFram({ videoStreamsList, userState }: CallFramProps) {
  const { isMobile } = useDeviceSize();

  return <div className='h-full'>
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
        />
    }
  </div>
}

export default TwoUsersCallFram;