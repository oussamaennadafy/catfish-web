import { IconDefinition, SizeProp } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { PropsWithChildren, useMemo } from 'react'

export type IconButtonProps = PropsWithChildren<{
  icon?: IconDefinition,
  isActive?: boolean,
  iconColor?: "red" | "white" | "gray",
  backgroundColor?: string,
  iconSize?: SizeProp,
  className?: string,
  isRounded?: boolean,
  onClick?: () => void,
  type?: "submit" | "reset" | "button" | undefined,
  badgeNumber?: number,
}>;

function IconButton({ icon, iconColor = "white", iconSize = "1x", onClick, children, isActive = false, backgroundColor = "bg-[#161931]", className, isRounded, type, badgeNumber }: IconButtonProps) {
  const iconBackgroundClassName = useMemo(() => {
    switch (iconColor) {
      case "red":
        return 'text-red-500';
      case "white":
        return 'text-slate-50';
      case "gray":
        return 'text-slate-500';
    }
  }, [iconColor]);
  return (
    <button type={type} disabled={onClick ? false : true} className={`flex items-center justify-center ${icon ? "w-10" : ""} aspect-square h-10 p-2 border border-slate-800 ${isRounded ? "rounded-full" : "rounded-lg"} ${isActive ? "bg-[#46446B]" : backgroundColor} ${onClick ? "cursor-pointer" : ""} ${className}`} onClick={onClick}>
      {
        icon ?
          <FontAwesomeIcon className={`text-lg transition-all duration-300 ${iconBackgroundClassName}`} size={iconSize} icon={icon} />
          : children
      }
      {/* badge number */}
      {
        badgeNumber && <div className='absolute w-3 h-3 top-3 right-3 rounded-full bg-red-500'>
          <p className='text-[8px] font-bold'>
            {
              badgeNumber > 9 ? "+9" : badgeNumber
            }
          </p>
        </div>
      }
    </button>
  )
}

export default IconButton