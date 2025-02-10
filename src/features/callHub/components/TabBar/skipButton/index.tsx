import IconButton from '@/common/components/buttons/IconButton'
import PrimaryButton from '@/common/components/buttons/PrimaryButton'
import { faArrowRight, faQuestion } from '@fortawesome/free-solid-svg-icons'
import React from 'react'

type SkipButtonProps = {
  joinRoom: () => void,
}

function SkipButton({ joinRoom }: SkipButtonProps) {
  return (
    <div className='flex items-center justify-center gap-3'>
      <PrimaryButton
        text='Switch User'
        icon={faArrowRight}
        onClick={joinRoom}
      />
      <IconButton
        icon={faQuestion}
        onClick={() => {}}
      />
    </div>
  )
}

export default SkipButton