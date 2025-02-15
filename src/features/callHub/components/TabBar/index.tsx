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
}

function TabBar({ selectedRoomType, setSelectedRoomType, handleJoinNextRoom, userState }: TabBarProps) {
  return (
    <div className='flex items-center justify-between'>
      <RecordingDetails />
      <ButtonsSection
        selectedRoomType={selectedRoomType}
        setSelectedRoomType={setSelectedRoomType}
      />
      <SkipButton userState={userState} handleJoinNextRoom={handleJoinNextRoom} />
    </div>
  )
};

export default TabBar;