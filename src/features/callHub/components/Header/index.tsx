"use client"
import AppAvatar from '@/common/components/Avatar'
import PrimaryButton from '@/common/components/PrimaryButton'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import Image from 'next/image'
import React from 'react'

function Header() {
  return (
    <div className='flex items-center justify-between'>
      <Image
        src="/icons/logo.svg"
        width={50}
        height={50}
        alt='catfish logo'
      />
      <div className='flex items-center gap-4'>
        <PrimaryButton
          text='add friend'
          icon={faUser}
          onClick={() => {}}
        />
        <AppAvatar
          rounded='meduim'
        />
      </div>
    </div>
  )
}

export default Header