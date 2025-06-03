import IconButton from '@/common/components/buttons/IconButton'
import { faCircleDot } from '@fortawesome/free-regular-svg-icons'
import React from 'react'
import SquarCircleSvg from '../../../../../../public/icons/squar-circle'
import Counter from './Counter'

type RecordingDetailsProps = {
  isLive: boolean,
  handleEndLive: () => void
}

function RecordingDetails({ isLive, handleEndLive }: RecordingDetailsProps) {
  return (
    <div className='gap-2 hidden md:flex'>
      <IconButton
        icon={faCircleDot}
        iconColor={isLive ? "red" : "gray"}
      />
      <div className='flex'>
        <IconButton containerClassName='px-3 rounded-r-none'>
          <div className='flex items-center justify-center gap-3 transition-all'>
            <div className={`w-2 h-2 rounded-full ${isLive ? "bg-red-500" : "bg-slate-500"}`} />
            <p className='text-sm tracking-wide'>LIVE</p>
            {
              isLive &&
              <Counter isCounting={isLive} />
            }
          </div>
        </IconButton>
        <IconButton
          containerClassName='px-3 rounded-l-none border-l-0'
          onClick={handleEndLive}
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