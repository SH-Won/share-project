import React from 'react'

const UserProfileSkeleton = () => {
  return (
    <div className="profile-container skeleton">
      <div className="profile__heading">
        <div className="profile__image loading-template loading-animation"></div>
        <div className="profile-info">
          <div className="user-name loading-template loading-animation"></div>
          <div className="user-job loading-template loading-animation"></div>
        </div>
      </div>

      <div className="profile__overview">
        <div className="user-asset">
          <div className="title loading-template loading-animation"></div>
          <div className="description loading-template loading-animation"></div>
        </div>
        <div className="user-asset">
          <div className="title loading-template loading-animation"></div>
          <div className="description loading-template loading-animation"></div>
        </div>
        <div className="user-asset">
          <div className="title loading-template loading-animation"></div>
          <div className="description loading-template loading-animation"></div>
        </div>
      </div>
    </div>
  )
}

export default UserProfileSkeleton
