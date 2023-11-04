import React from 'react'
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

const InputBox = () => {
  return (
    <BoxContainer>
      <Label htmlFor="email">Email</Label>
      <Input name="email" placeholder=" " />
    </BoxContainer>
  )
}

export default InputBox
