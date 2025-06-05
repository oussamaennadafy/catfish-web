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
  handleToggleCamera: () => void,
  handleToggleMic: () => void,
  isCameraOpen: boolean,
  isMicOpen: boolean,
  isReady: { isPeerOpen: boolean; isUserReady: boolean; },
}

function TabBar({ selectedRoomType, setSelectedRoomType, handleJoinNextRoom, userState, handleEndLive, handleToggleCamera, handleToggleMic, isCameraOpen, isMicOpen, isReady }: TabBarProps) {
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
        handleToggleCamera={handleToggleCamera}
        handleToggleMic={handleToggleMic}
        isCameraOpen={isCameraOpen}
        isMicOpen={isMicOpen}
      />
      <SkipButton isReady={isReady} userState={userState} handleJoinNextRoom={handleJoinNextRoom} />
    </div>
  )
};

export default TabBar;