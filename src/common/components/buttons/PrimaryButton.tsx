import { IconDefinition } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'

interface PrimaryButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  text: string,
  icon?: IconDefinition,
}

function PrimaryButton(props: PrimaryButtonProps) {
  return (
    <button {...props} className='flex items-center justify-between gap-4 px-6 py-2 rounded-full bg-[#4139B0]'>
      <p>{props.text}</p>
      {
        props.icon &&
        <FontAwesomeIcon icon={props.icon} className="fas fa-check" />
      }
    </button>
  )
}

export default PrimaryButton