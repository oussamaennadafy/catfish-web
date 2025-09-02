"use client"
import PrimaryButton from '@/common/components/buttons/PrimaryButton'
import Image from 'next/image'
import React, { } from 'react'

type HeaderProps = {
  testFunc: () => void,
}

function Header({ testFunc }: HeaderProps) {
  return (
    <div className='relative flex items-center justify-between max-h-10'>
      <Image
        src="/icons/logo-new.svg"
        priority
        width={40}
        height={40}
        alt='catfish logo'
      />
      {/* test */}
      <PrimaryButton
        text='test button on prod'
        onClick={testFunc}
        className='max-w-fit'
      />
    </div>
  )
}

export default Header