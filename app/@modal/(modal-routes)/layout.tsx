'use client'
import { useModal } from '@/hooks'

const ModalLayout = ({ children }: { children: React.ReactNode }) => {
  const { isModalOpen } = useModal()
  console.log('isModalOpen', isModalOpen)
  return <>{children}</>
}
export default ModalLayout
