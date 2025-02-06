// import Image from 'next/image'
import React from 'react'
import CallView from './CallView'

function CallFram() {
  return (
    <div className='grid gap-3 h-full grid-cols-4 grid-rows-2'>
      <CallView
        imageSrc='https://i.ibb.co/JR2RS1Hy/girl.png'
        userFullName="Mona Joseph"
        />
      <CallView
        imageSrc='https://i.ibb.co/c6m2Rk1/Shape-Square-Person-Duncan-Bentley.jpg'
        borderWidth="Meduim"
        userFullName="James"
      />
    </div>
  )
}

export default CallFram