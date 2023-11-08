'use client'
import '@/styles/components/image.scss'
import Image from 'next/image'
import { useState } from 'react'
import Skeleton from '../common/Skeleton'

interface Props {
  imageUrl: string
  alt: string
  type: 'main' | 'detail'
}

const ImageWithSkeleton = ({ imageUrl, alt, type }: Props) => {
  const [load, setLoad] = useState(false)
  return (
    <div className={`image-container ${type} ${!load ? 'loading-template loading-animation' : ''}`}>
      <Image
        src={imageUrl}
        width={300}
        height={300}
        alt={alt}
        onLoadingComplete={() => setLoad(true)}
      />
    </div>
  )
}

export default ImageWithSkeleton
