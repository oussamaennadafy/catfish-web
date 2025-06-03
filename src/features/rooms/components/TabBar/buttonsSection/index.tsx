import IconButton from '@/common/components/buttons/IconButton';
import IconDropDown from '@/common/components/dropDowns/IconDropDown';
import { faArrowRightFromBracket, faEllipsisVertical, faMicrophone, faMicrophoneSlash, faShuffle, faVideo, faVideoSlash } from '@fortawesome/free-solid-svg-icons';
import React, { Dispatch, SetStateAction } from 'react';
import ThreePersonsIcon from '../../../../../../public/icons/three-persons';
import PlusThreePersonsIcon from '../../../../../../public/icons/plus-three-persons';
import TwoPersonsIcon from '../../../../../../public/icons/two-person';
import { RoomTypeEnum, userStateType } from '@/features/rooms/types';

type ButtonsSectionProps = {
  selectedRoomType: RoomTypeEnum,
  setSelectedRoomType: Dispatch<SetStateAction<RoomTypeEnum>>,
  handleEndLive: () => void,
  userState: userStateType,
  handleToggleCamera: () => void,
  handleToggleMic: () => void,
  isCameraOpen: boolean,
  isMicOpen: boolean,
}

function ButtonsSection({ selectedRoomType, setSelectedRoomType, handleEndLive, userState, handleToggleCamera, handleToggleMic, isCameraOpen, isMicOpen }: ButtonsSectionProps) {
  return (
    <div className='flex items-center gap-1 md:gap-3'>
      {/* mic button */}
      <div className='flex'>
        <IconButton
          icon={isMicOpen ? faMicrophone : faMicrophoneSlash}
          containerClassName='md:rounded-r-none md:border-r-0'
          onClick={handleToggleMic}
          isActive={!isMicOpen}
        />
        <IconButton
          icon={faEllipsisVertical}
          containerClassName='rounded-l-none hidden md:flex'
          onClick={() => { }}
        />
      </div>
      {/* video button */}
      <div className='flex'>
        <IconButton
          icon={isCameraOpen ? faVideo : faVideoSlash}
          containerClassName='md:rounded-r-none md:border-r-0'
          onClick={handleToggleCamera}
          isActive={!isCameraOpen}
        />
        <IconButton
          icon={faEllipsisVertical}
          containerClassName='rounded-l-none hidden md:flex'
          onClick={() => { }}
        />
      </div>
      {/* room type dropdown */}
      <IconDropDown
        selectedItemId={selectedRoomType.toString()}
        items={[
          {
            id: RoomTypeEnum.NINE_USERS,
            children: <PlusThreePersonsIcon />,
            onClick: () => {
              setSelectedRoomType(RoomTypeEnum.NINE_USERS)
            },
          },
          {
            id: RoomTypeEnum.THREE_USERS,
            children: <ThreePersonsIcon />,
            onClick: () => {
              setSelectedRoomType(RoomTypeEnum.THREE_USERS)
            },
          },
          {
            id: RoomTypeEnum.SHUFFLE,
            icon: faShuffle,
            onClick: () => {
              setSelectedRoomType(RoomTypeEnum.SHUFFLE)
            },
          },
          {
            id: RoomTypeEnum.TWO_USERS,
            children: <TwoPersonsIcon />,
            onClick: () => {
              setSelectedRoomType(RoomTypeEnum.TWO_USERS)
            },
          },
        ]}
      />
      {/* leave room button */}
      {
        userState !== "noAction" &&
        <div className='flex'>
          <IconButton
            icon={faArrowRightFromBracket}
            containerClassName='md:rounded-l-none md:border-l-0 rotate-180 bg-red-500'
            onClick={handleEndLive}
          />
          <IconButton
            icon={faEllipsisVertical}
            containerClassName='rounded-l-none bg-red-500 hidden md:flex'
            onClick={() => { }}
          />
        </div>
      }
    </div>
  )
};

export default ButtonsSection;