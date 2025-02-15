import { IconDefinition } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import LoadingIcon from '../../../../public/icons/loading-icon'

interface PrimaryButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  text: string,
  icon?: IconDefinition,
  isLoading?: boolean,
}

function PrimaryButton({isLoading ,...props}: PrimaryButtonProps) {
  return (
    <button disabled={isLoading} {...props} className='flex items-center justify-between gap-4 px-6 py-2 rounded-full bg-[#4139B0]'>
      <p>{props.text}</p>
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