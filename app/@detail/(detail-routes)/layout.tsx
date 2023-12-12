'use client'
import Close from '@/components/modal/Close'
import { usePathname } from 'next/navigation'

const DetailLayout = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname()
  const isMatch = pathname!.split('/')[1] === 'detail'
  console.log(isMatch)

  return (
    <div className={`detail-layout ${isMatch ? 'modal detail' : ''}`}>
      <div className={`${isMatch ? 'modal__container--bottom open' : ''}`}>
        {isMatch && <Close />}
        {isMatch && children}
      </div>
    </div>
  )
}
export default DetailLayout
