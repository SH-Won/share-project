'use client'
import '@/styles/components/image.scss'
import Image from 'next/image'
import { useState } from 'react'

interface Props {
  imageUrl: string
  alt: string
  type: 'main' | 'detail'
  width?: number
  height?: number
  isHidden?: boolean
}

const ImageWithSkeleton = ({ imageUrl, alt, type, width, height, isHidden }: Props) => {
  const [load, setLoad] = useState(false)
  return (
    <div
      className={`image-container ${type} ${!load ? 'loading-template loading-animation' : ''} ${
        isHidden ? 'hidden' : ''
      }`}
    >
      <Image
        src={imageUrl}
        width={width || 300}
        height={height || 300}
        alt={alt}
        onLoad={() => setLoad(true)}
      />
    </div>
  )
}

export default ImageWithSkeleton
