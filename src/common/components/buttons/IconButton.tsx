import { IconDefinition, SizeProp } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { PropsWithChildren, useMemo } from 'react'

export type IconButtonProps = PropsWithChildren<{
  icon?: IconDefinition,
  isActive?: boolean,
  iconColor?: "red" | "white" | "gray",
  backgroundColor?: string,
  iconSize?: SizeProp,
  containerClassName?: string,
  onClick?: () => void,
}>;

function IconButton({ icon, iconColor = "white", iconSize = "1x", onClick, children, containerClassName, isActive = false, backgroundColor = "bg-[#161931]" }: IconButtonProps) {
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
    <button disabled={onClick ? false : true} className={`flex items-center justify-center ${icon ? "w-10" : ""} aspect-square h-10 p-2 border border-slate-800 rounded-lg ${isActive ? "bg-[#46446B]" : backgroundColor} ${containerClassName} ${onClick ? "cursor-pointer" : ""}`} onClick={onClick}>
      {
        icon ?
          <FontAwesomeIcon className={`text-lg ${iconBackgroundClassName}`} size={iconSize} icon={icon} />
          : children
      }
    </button>
  )
}

export default IconButton