import BackEnd from '@/lib/network'
import { AppDispatch } from '@/store'
import { useSession } from 'next-auth/react'
import { useDispatch } from 'react-redux'
import { useModal } from './useModal'
import { useSelectState } from './useSelectState'
import { useToast } from './useToast'

const useClipping = (projectId: string, isUserClipping: boolean) => {
  const dispatch = useDispatch<AppDispatch>()
  const { data: session } = useSession()
  const { showModal } = useModal()
  const { showToast } = useToast()
  const { selected, disabled, setSelected, setDisabled } = useSelectState({
    isSelected: isUserClipping,
    isDisable: false,
  })
  const isClippingAdd = !selected
  const updateClipping = async (e: React.MouseEvent) => {
    e.preventDefault()
    if (!session?.id) {
      showModal({
        type: 'USER_SIGNUP',
        props: null,
      })
      return
    }
    setSelected((prev) => !prev)
    setDisabled(true)
    BackEnd.getInstance()
      .user.updateUserClipping({
        projectId,
        userId: session!.id,
        isAdd: isClippingAdd,
      })
      .then(async (response) => {
        showToast({
          type: 'success',
          text: isClippingAdd ? '스크랩 목록에 추가 되었습니다' : '스크랩 목록에서 삭제 되었습니다',
        })
      })
      .catch((e) => {
        showToast({
          type: 'error',
          text: isClippingAdd
            ? '스크랩 목록에 추가에 실패했습니다. 다시 시도해 주세요'
            : '스크랩 목록에서 삭제에 실패했습니다. 다시 시도해 주세요',
        })
        setSelected((prev) => !prev)
      })
      .finally(() => setDisabled(false))
  }
  return {
    selected,
    disabled,
    updateClipping,
  }
}

export { useClipping }
