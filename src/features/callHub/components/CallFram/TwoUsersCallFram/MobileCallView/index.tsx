import { CallFramContentType, userStateType } from '@/features/callHub/types'
import React from 'react'
import CallFramIllustration from '../../CallFramStates/CallFramIllustration'
import CallFramLoader from '../../CallFramStates/CallFramLoader'
import CallFramPlaceHolder from '../../CallFramStates/CallFramPlaceHolder'
import CallView from '../DesktopCallView/CallView'
import PopupCallFram from './PopupCallFram'

type MobileCallViewProps = {
  videoStreamsList: CallFramContentType[],
  className?: string,
  userState: userStateType,
  isCameraOpen: boolean,
  isMicOpen: boolean,
}

function MobileCallView({ videoStreamsList, className, userState, isCameraOpen }: MobileCallViewProps) {
  return (
    <div
      className={`relative h-full grid-cols-1 grid-rows-1 ${className}`}
      style={{ maxHeight: "calc(100svh - 112px)" }}
    >
      {
        videoStreamsList.map((callFram, index) => {
          if (index === 0) {
            if (userState === "noAction") return;
            return <PopupCallFram
              callFramContent={callFram.content}
              isCameraOpen={isCameraOpen}
              key={index}
            />
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

export default MobileCallView