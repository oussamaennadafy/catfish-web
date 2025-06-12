import AppAvatar from '@/common/components/avatars/Avatar';
import Video from '@/common/components/videos/Video';
import { VideoStream } from '@/features/rooms/types';
import React, { useMemo } from 'react';
import CallFramAvatar from '../../CallFramStates/CallFramAvatar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faVolumeXmark } from '@fortawesome/free-solid-svg-icons';

type CallViewProps = {
  borderWidth?: "none" | "Small" | "Meduim" | "Large",
  videoStream: VideoStream,
  imageSrc?: string,
  userFullName: string,
  userId?: string,
  isMobile?: boolean,
}

function CallView({ borderWidth = "none", videoStream, imageSrc, userFullName, userId, isMobile }: CallViewProps) {
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
  }, [borderWidth]);

  const isMuted = useMemo(() => {
    if (videoStream.userId === userId) {
      return !videoStream.isMuted
    }
    return videoStream.isMuted;
  }, [videoStream, userId]);

  return (
    <div className={`relative rounded-2xl overflow-hidden bg-cover bg-center ${borderWidthClassName} border-[#6B67C8]`}>
      <Video
        srcObject={videoStream.stream}
        muted={videoStream.isMuted}
        autoPlay
        className="h-full w-full object-cover -scale-x-100"
      />
      <div className={`absolute ${isMobile ? "top-2" : "bottom-2"} left-2 flex items-center justify-between gap-2 bg-[rgba(0,0,0,0.5)] py-1 px-2 pr-3 rounded-lg backdrop-blur-lg`}>
        <AppAvatar
          rounded='large'
          src={imageSrc}
          size={30}
        />
        <p className='text-sm'>{`${userFullName}`}</p>
      </div>
      {
        // audio fram overlay 
        <div className={`absolute top-0 left-0 right-0 bottom-0 w-full h-full transition-all pointer-events-none ${videoStream.isCameraOpen ? "invisible opacity-0" : "visible opacity-100"}`}>
          <CallFramAvatar
            isCameraOpen={videoStream.isCameraOpen}
          />
        </div>
      }
      {
        // square muted overlay
        <div className={`flex items-center justify-center absolute top-0 left-0 right-0 bottom-0 w-full h-full transition-all pointer-events-none ${isMuted && videoStream.isCameraOpen ? "visible opacity-100" : "invisible opacity-0"}`}>
          <div className='flex justify-between items-center bg-slate-700/70 w-fit rounded-full px-4 py-2 gap-2 aspect-square'>
            <FontAwesomeIcon
              icon={faVolumeXmark}
              className='w-10 text-slate-200'
            />
          </div>
        </div>
      }
      {
        // bottom text muted overlay
        <div className={`flex items-end justify-center py-5 absolute top-0 left-0 right-0 bottom-0 w-full h-full transition-all pointer-events-none ${isMuted && !videoStream.isCameraOpen && !isMobile ? "visible opacity-100" : "invisible opacity-0"}`}>
          <div className='flex justify-between items-center bg-slate-700/70 w-fit rounded-full px-4 py-2 gap-2'>
            <FontAwesomeIcon
              icon={faVolumeXmark}
              className='w-4 text-slate-200'
            />
            <p className='font-sans'>Muted</p>
          </div>
        </div>
      }
      {
        // bottom text muted overlay
        <div className={`flex items-end justify-center absolute top-0 left-0 right-0 bottom-0 w-full h-full transition-all pointer-events-none ${isMuted && !videoStream.isCameraOpen && isMobile ? "visible opacity-100" : "invisible opacity-0"}`}>
          <div className='flex justify-between items-center bg-slate-700/70 w-fit rounded-full px-4 py-2 aspect-square transition-all absolute left-2 top-2'>
            <FontAwesomeIcon
              icon={faVolumeXmark}
              className='w-4 text-slate-200'
            />
          </div>
        </div>
      }
    </div>
  )
}

export default CallView