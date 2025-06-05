import { IconDefinition } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import LoadingIcon from '../../../../public/icons/loading-icon'

interface PrimaryButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  text: string,
  icon?: IconDefinition,
  isLoading?: boolean,
  disabled?: boolean,
}

function PrimaryButton({isLoading, disabled, ...props}: PrimaryButtonProps) {
  return (
    <button disabled={disabled || isLoading} {...props} className={`flex items-center justify-center md:justify-between gap-2 md:gap-4 px-6 py-2 w-full rounded-full bg-[#4139B0] ${props.onClick ? "cursor-pointer" : ""} ${disabled ? "opacity-50" : ""}`}>
      <span>{props.text}</span>
      {
        props.icon && !isLoading &&
        <FontAwesomeIcon icon={props.icon} className="fas fa-check" />
      }
      {
        isLoading && <LoadingIcon />
      }
    </button>
  )
}

export default PrimaryButton