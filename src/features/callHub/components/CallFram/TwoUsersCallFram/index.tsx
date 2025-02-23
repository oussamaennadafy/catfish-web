import React from 'react';
import { CallFramContentType } from '../../../types';
import DesktopCallView from './DesktopCallView';
import MobileCallView from './MobileCallView';

type CallFramProps = {
  videoStreamsList: CallFramContentType[],
}

function TwoUsersCallFram({ videoStreamsList }: CallFramProps) {
  return (
    <>
      <DesktopCallView
        videoStreamsList={videoStreamsList}
        className='hidden md:grid'
        />
      <MobileCallView 
        videoStreamsList={videoStreamsList}
        className='grid md:hidden'
      />
    </>
  )
}

export default TwoUsersCallFram;