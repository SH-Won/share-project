'use client'
import { IProject } from '@/app/page'
import { useUserActions } from '@/hooks'
import { Colors } from 'my-react-component'
import React from 'react'

export const ClippingSVG = ({ selected }: { selected: boolean }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill={selected ? Colors.green : Colors.white}
      role="img"
      className="icon "
    >
      <path
        d="M3.33337 5.2C3.33337 4.0799 3.33337 3.51984 3.55136 3.09202C3.74311 2.71569 4.04907 2.40973 4.42539 2.21799C4.85322 2 5.41327 2 6.53337 2H9.46671C10.5868 2 11.1469 2 11.5747 2.21799C11.951 2.40973 12.257 2.71569 12.4487 3.09202C12.6667 3.51984 12.6667 4.0799 12.6667 5.2V14L8.00004 11.3333L3.33337 14V5.2Z"
        stroke={selected ? Colors.green : 'currentColor'}
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></path>
    </svg>
  )
}
const Clipping = ({ project }: { project: IProject }) => {
  const { clippingSelected, clippingDisable, updateClipping } = useUserActions(project)
  return (
    <button className="user-action-button" disabled={clippingDisable} onClick={updateClipping}>
      <ClippingSVG selected={clippingSelected} />
    </button>
  )
}

export default Clipping
