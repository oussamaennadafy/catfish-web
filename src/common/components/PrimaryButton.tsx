"use client"
import { IconDefinition } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'

type PrimaryButtonProps = {
  text: string,
  icon?: IconDefinition,
  onClick?: () => void,
}

function PrimaryButton({ text, onClick, icon }: PrimaryButtonProps) {
  return (
    <button onClick={onClick} className='flex items-center justify-between gap-4 px-6 py-2 rounded-full bg-[#4139B0]'>
      <p>{text}</p>
      {
        icon &&
        <FontAwesomeIcon icon={icon} className="fas fa-check" />
      }
    </button>
  )
}

export default PrimaryButton