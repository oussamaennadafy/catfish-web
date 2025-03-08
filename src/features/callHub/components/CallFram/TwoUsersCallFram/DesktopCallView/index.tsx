import React from 'react';
import { CallFramContentType } from '@/features/callHub/types';
import CallFramIllustration from '../../CallFramStates/CallFramIllustration';
import CallFramLoader from '../../CallFramStates/CallFramLoader';
import CallFramPlaceHolder from '../../CallFramStates/CallFramPlaceHolder';
import CallView from '../CallView';
import CallFramAvatar from '../../CallFramStates/CallFramAvatar';

type DesktopCallViewProps = {
  videoStreamsList: CallFramContentType[],
  className?: string,
  isCameraOpen: boolean,
  isMicOpen: boolean,
}

function DesktopCallView({ videoStreamsList, className, isCameraOpen }: DesktopCallViewProps) {
  return (
    <div
      className={`relative gap-3 h-full grid-cols-1 md:grid-cols-2 grid-rows-1 ${className}`}
      style={{ maxHeight: "calc(100svh - 144px)" }}
    >
      {
        videoStreamsList.map((callFram, index) => {
          if (index === 0) {
            if (!isCameraOpen) return <CallFramAvatar key={callFram.id} />;
          }
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

export default DesktopCallView