import React from 'react'

const LoadingSpinner = ({ text }: { text?: string }) => {
  return (
    <div className="spinner">
      <div className="spinner__square">
        {Array(9)
          .fill(0)
          .map((el, index) => (
            <div key={index}></div>
          ))}
      </div>
      <span className="spinner__text">{text || '로딩중 입니다'}</span>
    </div>
  )
}

export default LoadingSpinner
