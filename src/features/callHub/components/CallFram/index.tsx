import React from 'react';
import CallView from './CallView';
import { useCallHub } from '../../hooks/useCallHub';
import { RoomTypeEnum } from '../../types';

type CallFramProps = {
  selectedRoomType: RoomTypeEnum,
}

function CallFram({ selectedRoomType }: CallFramProps) {
  const { videoStreamsList } = useCallHub({ selectedRoomType });
  return (
    <div className='grid gap-3 h-full grid-cols-2'>
      {
        videoStreamsList.map(video => {
          return <CallView
            key={video.userId}
            videoStream={video}
            imageSrc='https://i.ibb.co/JR2RS1Hy/girl.png'
            userFullName="Mona Joseph"
          />
        })
      }
    </div>
  )
}

export default CallFram