import React from 'react';
import { CallFramContentType, userStateType } from '../../../types';
import DesktopCallView from './DesktopCallView';
import MobileCallView from './MobileCallView';
import useDeviceSize from '@/utils/useDeviceSize';

type CallFramProps = {
  videoStreamsList: CallFramContentType[],
  userState: userStateType,
  isCameraOpen: boolean,
  isMicOpen: boolean,
}

function TwoUsersCallFram({ videoStreamsList, userState, isCameraOpen, isMicOpen }: CallFramProps) {
  const { isMobile } = useDeviceSize();

  return <div className='h-full'>
    {
      isMobile() ?
        <MobileCallView
          videoStreamsList={videoStreamsList}
          className='grid md:hidden'
          userState={userState}
          isCameraOpen={isCameraOpen}
          isMicOpen={isMicOpen}
        />
        :
        <DesktopCallView
          videoStreamsList={videoStreamsList}
          className='hidden md:grid'
          isCameraOpen={isCameraOpen}
          isMicOpen={isMicOpen}
        />
    }
  </div>
}

export default TwoUsersCallFram;