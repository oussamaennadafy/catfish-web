import { CallFramContentType, userStateType } from '@/features/rooms/types'
import React from 'react'
import CallFramIllustration from '../../CallFramStates/CallFramIllustration'
import CallFramLoader from '../../CallFramStates/CallFramLoader'
import CallFramPlaceHolder from '../../CallFramStates/CallFramPlaceHolder'
import CallView from '../CallView'
import PopupCallFram from './PopupCallFram'

type MobileCallViewProps = {
  videoStreamsList: CallFramContentType[],
  className?: string,
  userState: userStateType,
  userId: string,
}

function MobileCallView({ videoStreamsList, className, userState, userId }: MobileCallViewProps) {
  return (
    <div
      className={`relative h-full grid-cols-1 grid-rows-1 ${className}`}
      style={{ maxHeight: "calc(100svh - 112px)" }}
    >
      {
        videoStreamsList.map((callFram, index) => {
          if (index === 0 && userState !== "noAction") {
            return <PopupCallFram
              callFramContent={callFram.content}
              key={index}
            />
          }
          if (index === 1 && userState === "noAction") return;
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
                userFullName="Guest"
                userId={userId}
                isMobile={true}
              />
          }
        })
      }
    </div>
  )
}

export default MobileCallView