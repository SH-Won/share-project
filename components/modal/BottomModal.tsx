'use client'
import React, { useEffect, useState } from 'react'
// import styled from 'styled-components'

// const Container = styled.div<{ open: boolean | null }>`
//   position: absolute;
//   z-index: 50;
//   width: 100%;
//   top: 0;
//   height: 100%;
//   background-color: rgba(0, 0, 0, 0.25);
//   & > div {
//     width: 100%;
//     position: absolute;
//     bottom: 0;
//     z-index: 100;
//     overflow: hidden;
//     max-height: 80vh;
//     transition: transform 0.2s ease-in-out;
//     transform: ${(props) =>
//       props.open ? ' translate(0,-100%)' : 'translate(0,0)'};
//     animation: openModal 0.2s ease-in-out;
//   }
// `

interface BottomModalProps {
  children: React.ReactNode
  close: () => void
}
const BottomModal = ({ children, close }: BottomModalProps) => {
  const [open, setOpen] = useState<boolean>(true)
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
    <div className="fixed z-50 bg-black/25 top-0 h-[100vh] w-full">
      <section
        className={`absolute w-full bottom-0 overflow-y-scroll max-h-[80vh] z-100 ${
          open ? 'animate-bottom-sheet-up' : 'animate-bottom-sheet-down'
        }`}
      >
        <div className="rounded-t-lg overflow-hidden">
          <div
            className="absolute h-[50px] flex justify-center items-center rounded-2xl"
            onClick={closeModal}
          >
            <div className="rounded-full bg-white w-[30px] h-[30px] flex justify-center items-center cursor-pointer">
              X
            </div>
          </div>
          {children}
        </div>
      </section>
    </div>
  )
}

export default BottomModal
