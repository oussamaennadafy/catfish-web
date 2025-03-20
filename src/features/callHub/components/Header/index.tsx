"use client"
import AppAvatar from '@/common/components/avatars/Avatar'
import PrimaryButton from '@/common/components/buttons/PrimaryButton'
import Image from 'next/image'
import { faRightFromBracket, faUser, IconDefinition } from '@fortawesome/free-solid-svg-icons'
import React, { useCallback, useMemo, useState } from 'react'
import { createPortal } from 'react-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useDispatch } from 'react-redux'
import { clearToken } from '@/store/slices/authenticationSlice'
import { useRouter } from 'next/navigation'

type buttonType = {
  icon: IconDefinition,
  text: string,
  onClick: () => void,
}

type HeaderProps = {
  handleAppFriend: () => void;
}

function Header({ handleAppFriend }: HeaderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();
  const router = useRouter();
  const handleAvatarClick = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  const handleLogoutClick = useCallback(() => {
    dispatch(clearToken());
    router.push("/authentication/login");
  }, [dispatch, router]);

  const buttonsList: buttonType[] = useMemo(() => [
    {
      icon: faRightFromBracket,
      text: "logout",
      onClick: handleLogoutClick
    }
  ], [handleLogoutClick]);
  
  return (
    <div className='relative flex items-center justify-between max-h-10'>
      <Image
        src="/icons/logo.svg"
        priority
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
        <button onClick={handleAvatarClick} className='cursor-pointer'>
          <AppAvatar
            rounded='meduim'
            size={40}
          />
        </button>
      </div>
      {isOpen && createPortal(
        <div onClick={() => { setIsOpen(false); }} className='absolute top-0 right-0 left-0 bottom-0 w-screen h-[100svh] z-10'></div>,
        document.body
      )}
      {isOpen && (
        <div className='absolute z-20 top-[64px] right-[8px] bg-gray-800 rounded-2xl p-4'>
          {/* pop up header */}
          <div className='flex gap-3 items-center'>
            <AppAvatar
              rounded='meduim'
              size={40}
            />
            <div className='flex flex-col justify-center'>
              <p className='font-bold text-xl'>oussama</p>
              <p className='text-gray-400 text-sm'>oussama@gmail.com</p>
            </div>
          </div>

          {/* devider */}
          <div className='w-full h-[1px] bg-gray-600 my-3' />

          {/* buttons */}

          <div className='w-full'>
            {
              buttonsList.map((button) => (
                <button key={button.text} onClick={button.onClick} className='p-4 rounded-2xl hover:bg-gray-700 w-full flex items-center gap-4 cursor-pointer'>
                  {/* icon */}
                  <FontAwesomeIcon icon={button.icon} />

                  {/* text */}
                  <p>
                    {button.text}
                  </p>
                </button>
              ))
            }
          </div>
        </div>
      )}
    </div>
  )
}

export default Header