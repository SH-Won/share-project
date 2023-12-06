'use client'
import { useToast } from '@/hooks'
import { IToastItem } from '@/store/toast/toastSlice'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { CloseSVG } from '../modal/Close'

interface ToastComponentProps {
  removeToast: () => void
  toastItem: IToastItem
  startAnimiation: boolean
}
const ErrorSVG = () => {
  return (
    <svg
      width="100%"
      height="100%"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
      <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
      <g id="SVGRepo_iconCarrier">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10zm-1.5-5.009c0-.867.659-1.491 1.491-1.491.85 0 1.509.624 1.509 1.491 0 .867-.659 1.509-1.509 1.509-.832 0-1.491-.642-1.491-1.509zM11.172 6a.5.5 0 0 0-.499.522l.306 7a.5.5 0 0 0 .5.478h1.043a.5.5 0 0 0 .5-.478l.305-7a.5.5 0 0 0-.5-.522h-1.655z"
          fill="#ff0000"
        ></path>
      </g>
    </svg>
  )
}
const NotificationSVG = () => {
  return (
    <svg
      width="100%"
      height="100%"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
      <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
      <g id="SVGRepo_iconCarrier">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10zm-1.5-5.009c0-.867.659-1.491 1.491-1.491.85 0 1.509.624 1.509 1.491 0 .867-.659 1.509-1.509 1.509-.832 0-1.491-.642-1.491-1.509zM11.172 6a.5.5 0 0 0-.499.522l.306 7a.5.5 0 0 0 .5.478h1.043a.5.5 0 0 0 .5-.478l.305-7a.5.5 0 0 0-.5-.522h-1.655z"
          fill="#999999"
        ></path>
      </g>
    </svg>
  )
}
const SuccessSVG = () => {
  return (
    <svg
      version="1.1"
      id="Capa_1"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      viewBox="0 0 50 50"
      xmlSpace="preserve"
      width="100%"
      height="100%"
      fill="#000000"
    >
      <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
      <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
      <g id="SVGRepo_iconCarrier">
        <circle fill="#25AE88" cx="25" cy="25" r="25"></circle>
        <polyline
          fill="none"
          stroke="#FFFFFF"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeMiterlimit="10"
          points=" 38,15 22,33 12,25 "
        ></polyline>
      </g>
    </svg>
  )
}
const ICON_CONFIG = {
  success: SuccessSVG,
  error: ErrorSVG,
  notification: NotificationSVG,
}
const ToastComponent = ({ removeToast, toastItem, startAnimiation }: ToastComponentProps) => {
  const duration = 3000
  const [timer, setTimer] = useState<ReturnType<typeof setTimeout>>()
  useEffect(() => {
    if (startAnimiation) {
      setTimer(
        setTimeout(() => {
          removeToast()
        }, duration - 100)
      )
    }
    return () => {
      clearTimeout(timer)
    }
  }, [startAnimiation])
  const onClick = () => {
    clearTimeout(timer)
    removeToast()
  }

  const className = `toast-item ${toastItem.type} ${startAnimiation ? 'animate' : ''}`
  const Icon = ICON_CONFIG[toastItem.type]
  return (
    <div className={className} onClick={onClick}>
      <div className="toast-icon">
        <Icon />
      </div>
      <span className="text">{toastItem.text}</span>
      <CloseSVG size={16} />
    </div>
  )
}
const Toast = () => {
  const { toastItems, removeToast } = useToast()
  return (
    <div className="toast-container">
      {toastItems.map((toastItem, index) => (
        <ToastComponent
          key={toastItem.id}
          toastItem={toastItem}
          removeToast={removeToast}
          startAnimiation={index === 0}
        />
      ))}
    </div>
  )
}

export default Toast
