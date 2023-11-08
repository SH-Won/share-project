import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React from 'react'

const Close = () => {
  const router = useRouter()
  return (
    <Link href="#" className="close-button">
      <Image onClick={() => router.back()} src="/close.svg" alt="close" width={24} height={24} />
    </Link>
  )
}

export default Close
