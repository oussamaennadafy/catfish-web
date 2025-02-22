import React, { Dispatch, SetStateAction } from 'react';
import RecordingDetails from './recordingDetails';
import ButtonsSection from './buttonsSection';
import SkipButton from './skipButton';
import { RoomTypeEnum, userStateType } from '../../types';

type TabBarProps = {
  selectedRoomType: RoomTypeEnum,
  setSelectedRoomType: Dispatch<SetStateAction<RoomTypeEnum>>,
  handleJoinNextRoom: () => void,
  userState: userStateType,
  handleEndLive: () => void,
}

function TabBar({ selectedRoomType, setSelectedRoomType, handleJoinNextRoom, userState, handleEndLive }: TabBarProps) {
  return (
    <div className='flex items-center justify-between gap-2 max-h-10'>
      <RecordingDetails
        isLive={userState === "inCall"}
        handleEndLive={handleEndLive}
      />
      <ButtonsSection
        selectedRoomType={selectedRoomType}
        setSelectedRoomType={setSelectedRoomType}
        handleEndLive={handleEndLive}
        userState={userState}
      />
      <SkipButton userState={userState} handleJoinNextRoom={handleJoinNextRoom} />
    </div>
  )
};

export default TabBar;