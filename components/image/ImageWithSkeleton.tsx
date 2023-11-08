'use client'
import '@/styles/components/image.scss';
import Image from 'next/image'
import { useState } from 'react'
import Skeleton from '../common/Skeleton'

interface Props {
  imageUrl : string
  alt : string
  ratio : number

  
}


const ImageWithSkeleton = ({imageUrl, alt, ratio} : Props) => {
  const [load,setLoad] = useState(false)
  return (
    <div className="image-container">
      <Image src={imageUrl} width={300} height={300} alt={alt} onLoadingComplete={() => setLoad(true)}/>
      {!load && <Skeleton />}
    </div>
  )
}

export default ImageWithSkeleton