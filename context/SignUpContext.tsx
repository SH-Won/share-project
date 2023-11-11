'use client'
import React, { createContext, Dispatch, SetStateAction, useState } from 'react'
interface SignUpContextProps {
  children: React.ReactNode
}

interface SignUpStateContextProps {
  page: 'selectSignup' | 'emailSignup' | 'signupSuccess'
  goPage: (pageName: SignUpStateContextProps['page']) => void
  setState: Dispatch<SetStateAction<Omit<SignUpStateContextProps, 'goPage' | 'setState'>>>
  result: {
    type: 'error' | 'success' | ''
    message: string
  }
}

const initialState: Omit<SignUpStateContextProps, 'goPage' | 'setState'> = {
  page: 'selectSignup',
  result: {
    type: '',
    message: '',
  },
}
export const SignUpStateContext = createContext<SignUpStateContextProps>(
  {} as SignUpStateContextProps
)

const SignUpContext = ({ children }: SignUpContextProps) => {
  const [state, setState] = useState(initialState)
  // const [result, setResult] = useState<InitialState['result']>(initialState['result'])
  const goPage = (pageName: SignUpStateContextProps['page']) =>
    setState((prev) => ({ ...prev, page: pageName }))
  return (
    <SignUpStateContext.Provider value={{ ...state, setState, goPage }}>
      <section className="sign-container">{children}</section>
    </SignUpStateContext.Provider>
  )
}

export default SignUpContext
