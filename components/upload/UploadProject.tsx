'use client'
import { InputBox } from 'my-react-component'
import './UploadProject.scss'
import React from 'react'
import LoginPage from '../Login'

const UploadProject = () => {
  return (
    <form>
      <LoginPage />
      <div className="project">
        <div>1</div>
        <div>2</div>
      </div>
    </form>
  )
}

export default UploadProject
