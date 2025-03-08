import React from 'react';
import CallView from '../TwoUsersCallFram/CallView';
import { CallFramContentType } from '../../../types';

type CallFramProps = {
  videoStreamsList: CallFramContentType[],
}

function MoreThanThreeUsersCallFram({ videoStreamsList }: CallFramProps) {
  return (
    <div className='grid gap-3 h-full grid-cols-2 grid-rows-1'>
      {
        videoStreamsList.map(video => {
          switch (video.content) {
            case "illustration":
              return <p key={video.id}>illustration</p>
            case "loader":
              return <p key={video.id}>loader</p>
            case "placeHolder":
              return <p key={video.id}>placeHolder</p>
            default:
              return <CallView
                key={video.content.userId}
                videoStream={video.content}
                imageSrc='https://i.ibb.co/JR2RS1Hy/girl.png'
                userFullName="Mona Joseph"
              />
          }
        })
      }
    </div>
  )
}

export default MoreThanThreeUsersCallFram;