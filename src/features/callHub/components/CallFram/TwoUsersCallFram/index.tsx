import React from 'react';
import CallView from './CallView';
import { CallFramContentType } from '../../../types';
import CallFramIllustration from '../CallFramStates/CallFramIllustration';
import CallFramLoader from '../CallFramStates/CallFramLoader';
import CallFramPlaceHolder from '../CallFramStates/CallFramPlaceHolder';
import { CALLFRAM_HEIGHT } from '@/common/constants/sizes';

type CallFramProps = {
  videoStreamsList: CallFramContentType[],
}

function TwoUsersCallFram({ videoStreamsList }: CallFramProps) {
  return (
    <div 
    style={{ height: CALLFRAM_HEIGHT }}
    className='grid gap-3 h-full grid-cols-2 grid-rows-1'>
      {
        videoStreamsList.map(callFram => {
          switch (callFram.content) {
            case "illustration":
              return <CallFramIllustration key={callFram.id} />
            case "loader":
              return <CallFramLoader key={callFram.id} />
            case "placeHolder":
              return <CallFramPlaceHolder key={callFram.id} />
            default:
              return <CallView
                key={callFram.id}
                videoStream={callFram.content}
                userFullName="John doe"
              />
          }
        })
      }
    </div>
  )
}

export default TwoUsersCallFram;