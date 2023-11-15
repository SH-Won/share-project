import React from 'react'

const BasicModal = ({ children }: { children: React.ReactNode }) => {
  return <div className="modal__content--basic">{children}</div>
}

export default BasicModal
