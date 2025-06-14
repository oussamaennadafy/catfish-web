import Image from 'next/image'
import React, { useMemo } from 'react'

type AppAvatarProps = {
  src?: string,
  rounded?: "small" | "meduim" | "large"
  size?: number,
  className?: string,
  isOnline?: boolean,
  hasNotification?: boolean,
}

function AppAvatar({ src, rounded = "meduim", size = 40, className, isOnline, hasNotification }: AppAvatarProps) {
  const imageRoundedClass = useMemo(() => {
    switch (rounded) {
      case "large":
        return "rounded-full";
      case "meduim":
        return "rounded-xl";
      case "small":
        return "rounded-lg";
    }
  }, [rounded]);

  return (
    <div style={{ height: size }} className={`relative aspect-square ${className}`}>
      {
        hasNotification && (
          <div className='absolute top-[1px] right-[1px] w-[10px] h-[10px] bg-red-500 border border-red-400 rounded-full' />
        )
      }
      {
        isOnline && !hasNotification && (
          <div className='absolute bottom-0 right-0 w-[10px] h-[10px] bg-green-500 border border-green-400 rounded-full' />
        )
      }
      <Image
        src={{ src: src || "/images/user-placeholder.png", width: size, height: size }}
        alt='user avatar'
        className={`${imageRoundedClass}`}
      />
    </div>
  )
}

export default AppAvatar