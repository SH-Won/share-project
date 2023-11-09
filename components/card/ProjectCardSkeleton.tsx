import React from 'react'

const ProjectCardSkeleton = () => {
  return (
    <div className="project-card">
      <div className="loading-template loading-animation image-container main skeleton"></div>
      <div className="project-card__explain skeleton">
        <div className="writer">
          <div className="user-image loading-template loading-animation"></div>
          <span className="loading-template loading-animation text"></span>
        </div>
      </div>
    </div>
  )
}

export default ProjectCardSkeleton
