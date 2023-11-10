'use client'
import { usePathname } from 'next/navigation'

const ModalLayout = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname()
  const isMatch = pathname!.split('/')[1] === 'modal'

  return <section className={`modal-layout ${isMatch ? 'modal' : ''}`}>{children}</section>
}
export default ModalLayout
