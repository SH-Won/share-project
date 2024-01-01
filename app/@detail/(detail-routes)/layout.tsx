'use client'
import Close from '@/components/modal/Close'
import { usePathname } from 'next/navigation'

const DetailLayout = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname()
  const isMatch = pathname!.split('/')[1] === 'detail'

  return (
    <div className={`detail-layout ${isMatch ? 'modal detail' : ''}`}>
      <Close />
      <div className={`${isMatch ? 'modal__container--bottom open' : ''}`}>{children}</div>
    </div>
  )
}
export default DetailLayout
