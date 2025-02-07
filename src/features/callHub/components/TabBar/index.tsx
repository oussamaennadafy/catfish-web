import React, { Dispatch, SetStateAction } from 'react';
import RecordingDetails from './recordingDetails';
import ButtonsSection from './buttonsSection';
import SkipButton from './skipButton';
import { RoomTypeEnum } from '../../types';

type TabBarProps = {
  selectedRoomType: RoomTypeEnum,
  setSelectedRoomType: Dispatch<SetStateAction<RoomTypeEnum>>,
}

function TabBar({ selectedRoomType, setSelectedRoomType }: TabBarProps) {
  return (
    <div className='flex items-center justify-between'>
      <RecordingDetails />
      <ButtonsSection
        selectedRoomType={selectedRoomType}
        setSelectedRoomType={setSelectedRoomType}
      />
      <SkipButton />
    </div>
  )
};

export default TabBar;