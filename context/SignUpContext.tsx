'use client'
import React, { createContext, useState } from 'react'
interface SignUpContextProps {
  children: React.ReactNode
}

interface InitialState {
  page: 'selectSignup' | 'emailSignup'
  push: (() => void) | null
  back: (() => void) | null
}
const initalState: InitialState = {
  page: 'selectSignup',
  push: null,
  back: null,
}
export const SignUpStateContext = createContext<InitialState>(initalState)

const SignUpContext = ({ children }: SignUpContextProps) => {
  const [page, setPage] = useState<InitialState['page']>('selectSignup')
  const push = () => setPage('emailSignup')
  const back = () => setPage('selectSignup')
  return (
    <SignUpStateContext.Provider value={{ page, push, back }}>
      <section className="signup-container">{children}</section>
    </SignUpStateContext.Provider>
  )
}

export default SignUpContext
