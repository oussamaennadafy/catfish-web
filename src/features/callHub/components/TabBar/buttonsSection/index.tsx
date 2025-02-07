"use client"
import IconButton from '@/common/components/IconButton';
import { faArrowRightFromBracket, faEllipsisVertical, faMicrophone, faShuffle, faVideo } from '@fortawesome/free-solid-svg-icons';
import React from 'react';

function ButtonsSection() {
  return (
    <div className='flex items-center gap-3'>
      <div className='flex'>
        <IconButton
          icon={faMicrophone}
          containerClassName='rounded-r-none border-r-0'
          onClick={() => {}}
          />
        <IconButton
          icon={faEllipsisVertical}
          containerClassName='rounded-l-none'
          onClick={() => {}}
          />
      </div>
      <div className='flex'>
        <IconButton
          icon={faVideo}
          containerClassName='rounded-r-none border-r-0'
          onClick={() => {}}
          />
        <IconButton
          icon={faEllipsisVertical}
          containerClassName='rounded-l-none'
          onClick={() => {}}
          />
      </div>
      <IconButton
        icon={faShuffle}
        onClick={() => {}}
        />
      <div className='flex'>
        <IconButton
          icon={faArrowRightFromBracket}
          containerClassName='rounded-l-none border-l-0 rotate-180 bg-red-500'
          onClick={() => {}}
          />
        <IconButton
          icon={faEllipsisVertical}
          containerClassName='rounded-l-none bg-red-500'
          onClick={() => {}}
        />
      </div>
    </div>
  )
};

export default ButtonsSection;