import AppAvatar from '@/common/components/avatars/Avatar';
import Video from '@/common/components/videos/Video';
import { VideoStream } from '@/features/callHub/types';
import React, { useMemo } from 'react';
import CallFramAvatar from '../../CallFramStates/CallFramAvatar';

type CallViewProps = {
  borderWidth?: "none" | "Small" | "Meduim" | "Large",
  videoStream: VideoStream,
  imageSrc?: string,
  userFullName: string,
}

function CallView({ borderWidth = "none", videoStream, imageSrc, userFullName }: CallViewProps) {
  const borderWidthClassName = useMemo(() => {
    switch (borderWidth) {
      case "none":
        return "border-0"
      case "Small":
        return "border-2"
      case "Meduim":
        return "border-4"
      case "Large":
        return "border-8"
    }
  }, [borderWidth])
  return (
    <div className={`relative rounded-2xl overflow-hidden bg-cover bg-center ${borderWidthClassName} border-[#6B67C8]`}>
      <Video
        srcObject={videoStream.stream}
        muted={videoStream.isMuted}
        autoPlay
        className="h-full w-full object-cover -scale-x-100"
      />
      <div className='absolute bottom-2 left-2 mr-2 flex items-center justify-between gap-2 bg-[rgba(0,0,0,0.5)] py-1 px-2 rounded-lg backdrop-blur-lg'>
        <AppAvatar
          rounded='large'
          src={imageSrc}
          size={35}
        />
        <p className='text-sm'>{`${userFullName} - ${videoStream.userId}`}</p>
      </div>
      {
        !videoStream.isCameraOpen &&
        //  audio fram overlay 
        <div className='absolute top-0 left-0 right-0 bottom-0 w-full h-full'>
          <CallFramAvatar />
        </div>
      }
    </div>
  )
}

export default CallView