import React from 'react'

const BasicModal = ({ children }: { children: React.ReactNode }) => {
  return <div className="modal__container--basic">{children}</div>
}

export default BasicModal
