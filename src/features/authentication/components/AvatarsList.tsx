import Image from 'next/image';
import React, { useMemo } from 'react';

function AvatarsList() {
  const avatarsList = useMemo(() => [
    "/images/persons/avatars/avatar-1.png",
    "/images/persons/avatars/avatar-2.png",
    "/images/persons/avatars/avatar-3.png",
    "/images/persons/avatars/avatar-4.png",
    "/images/persons/avatars/avatar-5.png",
    "/images/persons/avatars/avatar-6.png",
  ], []);
  return (
    <div className='flex flex-col items-center justify-center gap-4'>
      <div className="flex gap-2">
        <span className="font-bold text-gray-100">12K+</span>
        <p className="text-gray-500">people from all over the world</p>
      </div>
      <div className='flex'>
        {
          avatarsList.map((avatarSource, index) => (
            <div
              key={avatarSource}
              className={`w-12 aspect-square rounded-full overflow-hidden border-2 border-[#161931]`}
              style={{
                marginLeft: index !== 0 ? -16 : 0
              }}
            >
              <Image
                src={avatarSource}
                width={100}
                height={100}
                alt='zser avatar'
              />
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default AvatarsList