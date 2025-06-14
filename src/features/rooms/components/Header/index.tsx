"use client"
import Image from 'next/image'
import React, { } from 'react'

function Header() {
  return (
    <div className='relative flex items-center justify-between max-h-10'>
      <Image
        src="/icons/logo.svg"
        priority
        width={40}
        height={40}
        alt='catfish logo'
      />
    </div>
  )
}

export default Header