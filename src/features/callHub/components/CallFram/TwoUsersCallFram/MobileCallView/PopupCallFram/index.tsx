import { CallFramContentType, VideoStream } from '@/features/callHub/types'
import React from 'react'
import CallFramPlaceHolder from '../../../CallFramStates/CallFramPlaceHolder';
import CallFramLoader from '../../../CallFramStates/CallFramLoader';
import CallFramIllustration from '../../../CallFramStates/CallFramIllustration';
import Video from '@/common/components/Video';

type PopupCallFramProps = {
  callFramContent: CallFramContentType["content"],
}

function PopupCallFram({ callFramContent }: PopupCallFramProps) {
  let content: React.ReactNode;
  switch (callFramContent) {
    case "illustration":
      content = <CallFramIllustration />
    case "loader":
      content = <CallFramLoader />
    case "placeHolder":
      content = <CallFramPlaceHolder />
    default:
      content = <Video
        srcObject={(callFramContent as VideoStream).stream}
        muted={(callFramContent as VideoStream).isMuted}
        autoPlay
        className="h-full w-full object-cover -scale-x-100"
      />
  }
  return (
    <div className='absolute top-2 right-2 w-1/4 h-1/4 z-10 rounded-xl overflow-hidden'>
      {content}
    </div>
  )
}

export default PopupCallFram