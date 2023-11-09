'use client'
import { usePathname } from 'next/navigation'

const DetailLayout = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname()
  const isMatch = pathname!.split('/')[1] === 'detail'

  return (
    <div className={`detail-layout ${isMatch ? 'modal__content--bottom open' : ''}`}>
      {children}
    </div>
  )
}
export default DetailLayout
