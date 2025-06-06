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
        src="/icons/logo.svg"
        priority
        width={40}
        height={40}
        alt='catfish logo'
      />
      <PrimaryButton
        text='test'
        onClick={testFunc}
        className='max-w-32'
      />
    </div>
  )
}

export default Header