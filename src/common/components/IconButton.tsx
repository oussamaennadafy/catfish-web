import { IconDefinition, SizeProp } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { PropsWithChildren, useMemo } from 'react'

type IconButtonProps = {
  icon?: IconDefinition,
  iconColor?: "red" | "white",
  iconSize?: SizeProp,
  containerClassName?: string,
  onClick?: () => void,
}

function IconButton({ icon, iconColor = "white", iconSize = "1x", onClick, children, containerClassName }: PropsWithChildren<IconButtonProps>) {
  const iconBackgroundClassName = useMemo(() => {
    switch (iconColor) {
      case "red":
        return 'text-red-500';
      case "white":
        return 'text-slate-50';
    }
  }, [iconColor]);
  return (
    <button disabled={onClick ? false : true} className={`flex items-center justify-center ${icon ? "w-10" : ""} h-10 p-2 border border-slate-800 rounded-lg ${containerClassName}`} onClick={onClick}>
      {
        icon ? 
        <FontAwesomeIcon className={`text-lg ${iconBackgroundClassName}`} size={iconSize} icon={icon} />
        : children
      }
    </button>
  )
}

export default IconButton