"use client"
import IconButton from '@/common/components/IconButton'
import PrimaryButton from '@/common/components/PrimaryButton'
import { faArrowRight, faQuestion } from '@fortawesome/free-solid-svg-icons'
import React from 'react'

function SkipButton() {
  return (
    <div className='flex items-center justify-center gap-3'>
      <PrimaryButton
        text='Switch User'
        icon={faArrowRight}
      />
      <IconButton
        icon={faQuestion}
        onClick={() => {}}
      />
    </div>
  )
}

export default SkipButton