import React, { Dispatch, SetStateAction } from 'react';
import RecordingDetails from './recordingDetails';
import ButtonsSection from './buttonsSection';
import SkipButton from './skipButton';
import { RoomTypeEnum } from '../../types';

type TabBarProps = {
  selectedRoomType: RoomTypeEnum,
  setSelectedRoomType: Dispatch<SetStateAction<RoomTypeEnum>>,
  joinRoom: () => void,
}

function TabBar({ selectedRoomType, setSelectedRoomType, joinRoom }: TabBarProps) {
  return (
    <div className='flex items-center justify-between'>
      <RecordingDetails />
      <ButtonsSection
        selectedRoomType={selectedRoomType}
        setSelectedRoomType={setSelectedRoomType}
      />
      <SkipButton joinRoom={joinRoom} />
    </div>
  )
};

export default TabBar;