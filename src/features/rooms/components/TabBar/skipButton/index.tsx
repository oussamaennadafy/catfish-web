import IconButton from '@/common/components/buttons/IconButton'
import PrimaryButton from '@/common/components/buttons/PrimaryButton'
import { userStateType } from '@/features/rooms/types'
import { faArrowRight, faQuestion } from '@fortawesome/free-solid-svg-icons'
import React from 'react'

type SkipButtonProps = {
  handleJoinNextRoom: () => void,
  userState: userStateType,
  isReady: { isPeerOpen: boolean; isUserReady: boolean; },
}

function SkipButton({ handleJoinNextRoom, userState, isReady }: SkipButtonProps) {
  return (
    <div className='flex items-center justify-center gap-3 w-full md:w-auto'>
      <PrimaryButton
        text={userState == "noAction" ? "start" : userState == "waiting" ? "waiting" : userState == "inCall" ? "leave" : ""}
        icon={faArrowRight}
        onClick={handleJoinNextRoom}
        isLoading={userState === "waiting"}
        disabled={!isReady.isPeerOpen || !isReady.isUserReady}
      />
      <IconButton
        icon={faQuestion}
        onClick={() => {}}
        className='hidden md:flex'
      />
    </div>
  )
}

export default SkipButton