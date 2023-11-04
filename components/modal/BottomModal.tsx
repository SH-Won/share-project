'use client'
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'

const Container = styled.div<{ open: boolean | null }>`
  position: absolute;
  z-index: 50;
  width: 100%;
  top: 0;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.25);
  & > div {
    width: 100%;
    position: absolute;
    top: 100%;
    z-index: 100;
    overflow: hidden;
    max-height: 80vh;
    transition: transform 0.2s ease-in-out;
    transform: ${(props) =>
      props.open ? ' translate(0,-100%)' : 'translate(0,0)'};
    animation: openModal 0.2s ease-in-out;
  }
`

interface BottomModalProps {
  children: React.ReactNode
  close: () => void
}
const BottomModal = ({ children, close }: BottomModalProps) => {
  const [open, setOpen] = useState<boolean | null>(null)
  const closeModal = () => {
    setOpen(false)
    setTimeout(() => {
      close()
    }, 200)
  }
  useEffect(() => {
    setOpen(true)
  }, [])
  return (
    <Container open={open}>
      <div>
        <div className="h-[50px]" onClick={closeModal}>
          X
        </div>
        {children}
      </div>
    </Container>
  )
}

export default BottomModal

// className={`w-full fixed z-[100] top-full overflow-hidden max-h-[80vh] transition translate ease-in-out duration-300 ${
//   open ? 'translate-y-[-100%]' : 'translate-y-[0%]'
// }`}
