import React from 'react';
import { CallFramContentType } from '../../../types';
import DesktopCallView from './DesktopCallView';
import MobileCallView from './MobileCallView';
import useDeviceSize from '@/utils/useDeviceSize';

type CallFramProps = {
  videoStreamsList: CallFramContentType[],
}

function TwoUsersCallFram({ videoStreamsList }: CallFramProps) {
  const { isMobile } = useDeviceSize();

  return isMobile() ?
    <MobileCallView
      videoStreamsList={videoStreamsList}
      className='grid md:hidden'
    />
    :
    <DesktopCallView
      videoStreamsList={videoStreamsList}
      className='hidden md:grid'
    />
}

export default TwoUsersCallFram;