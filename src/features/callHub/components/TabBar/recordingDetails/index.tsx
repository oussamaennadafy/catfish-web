"use client"
import IconButton from '@/common/components/buttons/IconButton'
import { faCircleDot } from '@fortawesome/free-regular-svg-icons'
import React from 'react'
import SquarCircleSvg from '../../../../../../public/icons/squar-circle'

function RecordingDetails() {
  return (
    <div className='flex gap-2'>
      <IconButton
        icon={faCircleDot}
        iconColor='red'
      />
      <div className='flex'>
        <IconButton containerClassName='px-3 rounded-r-none'>
          <div className='flex items-center justify-center gap-3'>
            <div className='w-2 h-2 rounded-full bg-red-500' />
            <p className='text-sm tracking-wide'>LIVE</p>
            <p className='text-sm text-slate-400 tracking-wider'>1:23</p>
          </div>
        </IconButton>
        <IconButton
          containerClassName='px-3 rounded-l-none border-l-0'
          onClick={() => {}}
        >
          <div className='flex items-center justify-center gap-2'>
            <SquarCircleSvg />
            <p className='text-sm tracking-wider font-semibold'>End</p>
          </div>
        </IconButton>
      </div>
    </div>
  )
}

export default RecordingDetails