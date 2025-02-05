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
      <p>
        Header
      </p>
    </div>
  )
}

export default Header