"use client"
import AppAvatar from '@/common/components/AppAvatar';
import React, { useMemo } from 'react';

type CallViewProps = {
  borderWidth?: "none" | "Small" | "Meduim" | "Large";
  imageSrc: string;
  userFullName: string;
}

function CallView({ borderWidth = "none", imageSrc, userFullName }: CallViewProps) {
  const borderWidthClassName = useMemo(() => {
    switch (borderWidth) {
      case "none":
        return "border-0"
      case "Small":
        return "border-2"
      case "Meduim":
        return "border-4"
      case "Large":
        return "border-8"
    }
  }, [borderWidth])
  return (
    <div style={{ '--image-url': `url(${imageSrc})` } as React.CSSProperties} className={`relative row-span-2 col-span-2 rounded-2xl bg-slate-400 overflow-hidden bg-[image:var(--image-url)] bg-cover bg-center ${borderWidthClassName} border-[#6B67C8]`}>
      <div className='absolute bottom-2 left-2 flex items-center justify-between gap-2 bg-[#0000009d] py-1 px-2 rounded-lg'>
        <AppAvatar
          rounded='large'
          src={imageSrc}
          size={35}
        />
        <p className='text-sm'>{userFullName}</p>
      </div>
    </div>
  )
}

export default CallView