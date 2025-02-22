import Video from '@/common/components/Video'
import { VideoStream } from '@/features/callHub/types'
import React from 'react'

type PopUpCallViewProps = {
  videoStream: VideoStream
}

function PopUpCallView({ videoStream }: PopUpCallViewProps) {
  return (
    <div className='absolute right-2 top-2 rounded-md overflow-hidden w-1/4 h-1/4 bg-[#161931] z-10'>
      <Video
        srcObject={videoStream.stream}
        muted={videoStream.isMuted}
        autoPlay
        className="h-full w-full object-cover -scale-x-100"
      />
    </div>
  )
}

export default PopUpCallView