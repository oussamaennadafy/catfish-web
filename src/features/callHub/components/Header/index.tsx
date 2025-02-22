import AppAvatar from '@/common/components/Avatar'
import PrimaryButton from '@/common/components/buttons/PrimaryButton'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import Image from 'next/image'
import React from 'react'

type HeaderProps = {
  handleAppFriend: () => void;
}

function Header({ handleAppFriend }: HeaderProps) {
  return (
    <div className='flex items-center justify-between max-h-10'>
      <Image
        src="/icons/logo.svg"
        width={40}
        height={40}
        alt='catfish logo'
      />
      <div className='flex items-center gap-4'>
        <PrimaryButton
          text='add friend'
          icon={faUser}
          onClick={handleAppFriend}
        />
        <AppAvatar
          rounded='meduim'
        />
      </div>
    </div>
  )
}

export default Header