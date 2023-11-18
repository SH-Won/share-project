import { useState } from 'react'

type SelectStateProps = {
  isSelected: boolean
  isDisable: boolean
}
const useSelectState = ({ isSelected, isDisable }: SelectStateProps) => {
  const [selected, setSelected] = useState(isSelected)
  const [disabled, setDisabled] = useState(isDisable)

  return {
    selected,
    setSelected,
    disabled,
    setDisabled,
  }
}

export { useSelectState }
