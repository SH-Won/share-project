import React from 'react'

const BasicModal = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="modal">
      <div className="modal__container--basic">{children}</div>
    </div>
  )
}

export default BasicModal
