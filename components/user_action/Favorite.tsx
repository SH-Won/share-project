'use client'
import { Colors } from 'my-react-component'
import { useState } from 'react'

interface FavoriteSVG {
  selected?: boolean
}
export const FavoriteSVG = ({ selected }: FavoriteSVG) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="13"
      height="13"
      viewBox="0 0 16 16"
      fill={selected ? Colors.red : Colors.grey_111}
      role="img"
      className="icon"
    >
      <path
        d="M10.7408 2C13.0889 2 14.6667 4.235 14.6667 6.32C14.6667 10.5425 8.11856 14 8.00004 14C7.88152 14 1.33337 10.5425 1.33337 6.32C1.33337 4.235 2.91115 2 5.2593 2C6.60745 2 7.48893 2.6825 8.00004 3.2825C8.51115 2.6825 9.39263 2 10.7408 2Z"
        stroke={selected ? Colors.red : 'currentColor'}
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></path>
    </svg>
  )
}
const FavoriteButton = () => {
  const [selected, setSelected] = useState(false)
  return (
    <button className="favorite-button" onClick={() => setSelected((prev) => !prev)}>
      <FavoriteSVG selected={selected} />
    </button>
  )
}

export default FavoriteButton
