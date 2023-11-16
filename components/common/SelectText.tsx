import React from 'react'

type Props = {
  text: string
  selected?: boolean
  size: 'small' | 'medium' | 'large'
}
const SelectText = ({ text, selected, size }: Props) => {
  return <li className={`"select-text" ${size} ${selected ? 'selected' : ''}`}>SelectText</li>
}

export default SelectText
