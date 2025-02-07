"use client"
import IconButton from '@/common/components/buttons/IconButton';
import IconDropDown from '@/common/components/dropDowns/IconDropDown';
import { faArrowRightFromBracket, faEllipsisVertical, faMicrophone, faShuffle, faVideo } from '@fortawesome/free-solid-svg-icons';
import React, { Dispatch, SetStateAction } from 'react';
import ThreePersonsIcon from '../../../../../../public/icons/three-persons';
import PlusThreePersonsIcon from '../../../../../../public/icons/plus-three-persons';
import TwoPersonsIcon from '../../../../../../public/icons/two-person';
import { RoomTypeEnum } from '@/features/callHub/types';

type ButtonsSectionProps = {
  selectedRoomType: RoomTypeEnum,
  setSelectedRoomType: Dispatch<SetStateAction<RoomTypeEnum>>,
}

function ButtonsSection({ selectedRoomType, setSelectedRoomType }: ButtonsSectionProps) {
  return (
    <div className='flex items-center gap-3'>
      <div className='flex'>
        <IconButton
          icon={faMicrophone}
          containerClassName='rounded-r-none border-r-0'
          onClick={() => { }}
        />
        <IconButton
          icon={faEllipsisVertical}
          containerClassName='rounded-l-none'
          onClick={() => { }}
        />
      </div>
      <div className='flex'>
        <IconButton
          icon={faVideo}
          containerClassName='rounded-r-none border-r-0'
          onClick={() => { }}
        />
        <IconButton
          icon={faEllipsisVertical}
          containerClassName='rounded-l-none'
          onClick={() => { }}
        />
      </div>
      <IconDropDown
        selectedItemId={selectedRoomType.toString()}
        items={[
          {
            id: RoomTypeEnum.moreThanThreeUsers,
            children: <PlusThreePersonsIcon />,
            onClick: () => { 
              setSelectedRoomType(RoomTypeEnum.moreThanThreeUsers)
            },
          },
          {
            id: RoomTypeEnum.threeUsers,
            children: <ThreePersonsIcon />,
            onClick: () => { 
              setSelectedRoomType(RoomTypeEnum.threeUsers)
            },
          },
          {
            id: RoomTypeEnum.shuffle,
            icon: faShuffle,
            onClick: () => { 
              setSelectedRoomType(RoomTypeEnum.shuffle)
            },
          },
          {
            id: RoomTypeEnum.twoUsers,
            children: <TwoPersonsIcon />,
            onClick: () => { 
              setSelectedRoomType(RoomTypeEnum.twoUsers)
            },
          },
        ]}
      />
      <div className='flex'>
        <IconButton
          icon={faArrowRightFromBracket}
          containerClassName='rounded-l-none border-l-0 rotate-180 bg-red-500'
          onClick={() => { }}
        />
        <IconButton
          icon={faEllipsisVertical}
          containerClassName='rounded-l-none bg-red-500'
          onClick={() => { }}
        />
      </div>
    </div>
  )
};

export default ButtonsSection;