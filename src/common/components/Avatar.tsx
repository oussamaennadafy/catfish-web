import Image from 'next/image'
import React, { useMemo } from 'react'

type AppAvatarProps = {
  src?: string,
  rounded?: "small" | "meduim" | "large"
  size?: number,
}

function AppAvatar({ src, rounded = "meduim", size = 40 }: AppAvatarProps) {
  const imageRoundedClass = useMemo(() => {
    switch (rounded) {
      case "large":
        return "rounded-full";
      case "meduim":
        return "rounded-xl";
      case "small":
        return "rounded-lg";
    }
  }, [rounded])
  return (
    <div style={{ height: size }} className='aspect-square'>
      <Image
        src={{ src: src || "/images/user-placeholder.png", width: size, height: size }}
        alt='user avatar'
        className={`${imageRoundedClass}`}
      />
    </div>
  )
}

export default AppAvatar