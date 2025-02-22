import { CALLFRAM_HEIGHT } from '@/common/constants/sizes'
import Lottie from 'lottie-react'
import React from 'react'
import searchAnimation from "./../../../../../../../public/lottie/search-animation.json";


function CallFramLoader() {
  return (
    <div className='flex items-center justify-center bg-[rgba(0,0,0,0.2)] rounded-2xl' >
      <div className='flex items-center justify-center bg-[rgba(0,0,0,0.2)] rounded-2xl'>
        <Lottie
          animationData={searchAnimation}
          loop={true}
          style={{
            height: CALLFRAM_HEIGHT,
          }}
        />
      </div>
    </div>
  )
}

export default CallFramLoader