import React, { ChangeEvent } from 'react'
import styled from 'styled-components'

const BoxContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
`
const Input = styled.input`
  border-radius: 8px;
  border: 1px solid ${({ theme }) => theme.color.line_01};
  padding: 8px;
  &:focus {
    outline: 1px solid ${({ theme }) => theme.color.line_02};
  }
`
const Label = styled.label`
  /* position: absolute;
  top: 50%;
  left: 8px;
  transform: translateY(-50%);
  &:focus {
    color: red;
  } */
`
interface InputBoxProps {
  name: string
  value: string
  pattern: string
  placeholder: string
  onHandleChange: (e: ChangeEvent) => void
}

const InputBox = ({
  name,
  value,
  pattern,
  placeholder,
  onHandleChange,
}: InputBoxProps) => {
  return (
    <div className="flex flex-col p-5 gap-1">
      <label htmlFor="email">Email</label>
      <input
        name="email"
        className="px-3 py-1 border rounded-[6px] border-gray-300 focus:border-blue-500 : focus:border max-w-[400px] w-[80%] invalid:[&:not(:placeholder-shown):not(:focus)]:border-red-500"
        placeholder=""
        pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
      />
    </div>
  )
}

export default InputBox
