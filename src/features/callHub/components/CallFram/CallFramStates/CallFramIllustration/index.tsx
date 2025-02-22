import React from 'react'
import Slider from './Slider'
import { CALLFRAM_HEIGHT } from '@/common/constants/sizes'
import { DeviceUtility } from '@/utils/device_utility'

function CallFramIllustration() {
  return (
    <div className='flex justify-center bg-[rgba(0,0,0,0.2)] rounded-2xl relative gap-5 overflow-hidden' style={{ height: CALLFRAM_HEIGHT }}>
      <Slider
        direction="up"
        images={[
          "/images/persons/male/male-1.jpg",
          "/images/persons/female/female-1.jpg",
          "/images/persons/male/male-2.jpg",
          "/images/persons/female/female-2.jpg",
          "/images/persons/male/male-3.jpg",
          "/images/persons/female/female-3.jpg",
        ]}
      />
      <Slider
        direction="down"
        images={[
          "/images/persons/male/male-4.jpg",
          "/images/persons/female/female-4.jpg",
          "/images/persons/male/male-5.jpg",
          "/images/persons/female/female-5.jpg",
          "/images/persons/male/male-6.jpg",
          "/images/persons/female/female-6.jpg",
        ]}
      />
      {
        !DeviceUtility.isMobile() &&
        < Slider
          direction="up"
          images={[
            "/images/persons/male/male-7.jpg",
            "/images/persons/female/female-7.jpg",
            "/images/persons/male/male-8.jpg",
            "/images/persons/female/female-8.jpg",
            "/images/persons/male/male-9.jpg",
            "/images/persons/female/female-9.jpg",
          ]}
        />
      }
    </div>
  )
}

export default CallFramIllustration