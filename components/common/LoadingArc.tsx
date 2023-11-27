import React from 'react'

const LoadingArc = ({ text }: { text?: string }) => {
  return (
    <div className="spinner">
      <div className="loading">
        <div className="arc"></div>
        <div className="arc"></div>
        <div className="arc"></div>
      </div>
      <span className="spinner__text">{text || '로딩중 입니다'}</span>
    </div>
  )
}

export default LoadingArc
