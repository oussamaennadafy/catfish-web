import IconButton from '@/common/components/buttons/IconButton'
import PrimaryButton from '@/common/components/buttons/PrimaryButton'
import { userStateType } from '@/features/callHub/types'
import { faArrowRight, faQuestion } from '@fortawesome/free-solid-svg-icons'
import React from 'react'

type SkipButtonProps = {
  handleJoinNextRoom: () => void,
  userState: userStateType,
}

function SkipButton({ handleJoinNextRoom, userState }: SkipButtonProps) {
  return (
    <div className='flex items-center justify-center gap-3 w-full md:w-auto'>
      <PrimaryButton
        text={userState == "noAction" ? "start" : userState == "waiting" ? "waiting" : userState == "inCall" ? "leave" : ""}
        icon={faArrowRight}
        onClick={handleJoinNextRoom}
        isLoading={userState === "waiting"}
      />
      <IconButton
        icon={faQuestion}
        onClick={() => {}}
        containerClassName='hidden md:flex'
      />
    </div>
  )
}

export default SkipButton