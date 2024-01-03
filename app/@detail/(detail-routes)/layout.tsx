'use client'
import Close from '@/components/modal/Close'
import { usePathname } from 'next/navigation'

const DetailLayout = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname()
  const isMatch = pathname!.split('/')[1] === 'detail'

  return (
    <div className={`detail-layout ${isMatch ? 'modal detail' : ''}`}>
      {/* {isMatch ? <Close /> : null}
      <div className={`${isMatch ? 'modal__container--bottom open' : ''}`}>
        {isMatch ? children : null}
      </div> */}
      {isMatch ? (
        <>
          <Close />
          <div className="modal__container--bottom open">{children}</div>
        </>
      ) : null}
    </div>
  )
}
export default DetailLayout
