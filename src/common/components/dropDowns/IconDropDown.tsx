import React, { PropsWithChildren, useState } from 'react'
import IconButton, { IconButtonProps } from '../buttons/IconButton'
import { createPortal } from 'react-dom';
import { RoomTypeEnum } from '@/features/callHub/types';

type IconDropDownProps = {
  items: (IconButtonProps & { id: RoomTypeEnum })[],
  selectedItemId: string,
}

function IconDropDown({ items, selectedItemId }: PropsWithChildren<IconDropDownProps>) {
  const selectedItem = items.filter(item => item.id.toString() == selectedItemId).at(0);
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className='relative'>
      <IconButton
        {...selectedItem}
        onClick={() => { setIsOpen(true); }}
      />
      {
        <div className={`absolute z-20 bottom-0 flex flex-col gap-1 transition-all ${isOpen ? "opacity-100 pointer-events-auto visible" : "opacity-0 pointer-events-none invisible translate-y-3"}`}>
          {
            items.map(item => (
              <IconButton
                {...item}
                key={item.id}
                isActive={item.id.toString() == selectedItemId}
                onClick={() => {
                  item.onClick?.();
                  setIsOpen(false);
                }}
              />
            ))
          }
        </div>
      }
      {isOpen && createPortal(
        <div onClick={() => { setIsOpen(false); }} className='absolute top-0 right-0 left-0 bottom-0 w-screen h-screen bg-[rgba(0,0,0,0.5)] z-10'></div>,
        document.body
      )}
    </div>
  )
}

export default IconDropDown