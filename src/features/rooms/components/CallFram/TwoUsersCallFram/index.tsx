import React from 'react';
import { CallFramContentType, userStateType } from '../../../types';
import DesktopCallView from './DesktopCallView';
import MobileCallView from './MobileCallView';
import useDeviceSize from '@/utils/useDeviceSize';

type CallFramProps = {
  videoStreamsList: CallFramContentType[],
  userState: userStateType,
  isMicOpen: boolean,
}

function TwoUsersCallFram({ videoStreamsList, userState, isMicOpen }: CallFramProps) {
  const { isMobile } = useDeviceSize();

  return <div className='h-full w-full'>
    {
      isMobile() ?
        <MobileCallView
          videoStreamsList={videoStreamsList}
          className='grid md:hidden'
          userState={userState}
          isMicOpen={isMicOpen}
        />
        :
        <DesktopCallView
          videoStreamsList={videoStreamsList}
          className='hidden md:grid'
          isMicOpen={isMicOpen}
        />
    }
  </div>
}

export default TwoUsersCallFram;