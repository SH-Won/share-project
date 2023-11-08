import React from 'react'
import '@/styles/components/skeleton.scss'

const SkeletonDetail = () => {
  return (
    <div className="skeleton-loading-container">
      <div className="loading-template loading-animation description"></div>
      <div className="loading-user-container">
        <div className="loading-template loading-animation user-image"></div>
        <div className="loading-user-details">
          <div className="loading-template loading-animation detail"></div>
          <div className="loading-template loading-animation detail"></div>
        </div>
      </div>
      <div className="loading-template loading-animation image-container"></div>

      <div className="text-container">
        {Array(5)
          .fill(0)
          .map((_, i) => (
            <div key={i} className="loading-template loading-animation text"></div>
          ))}
      </div>
    </div>
  )
}

export default SkeletonDetail
