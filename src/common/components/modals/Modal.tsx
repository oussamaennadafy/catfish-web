import React, { PropsWithChildren } from 'react'

function Modal({ children }: PropsWithChildren) {
  return (
    <div className='absolute top-0 left-0 right-0 bottom-0 bg-[rgba(0,0,0,0.5)]'>
      {
        children
      }
    </div>
  )
}

export default Modal