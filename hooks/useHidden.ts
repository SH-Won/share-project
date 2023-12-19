import BackEnd from '@/lib/network'
import { AppDispatch } from '@/store'
import { updateProject } from '@/store/project/projectSlice'
import { useSession } from 'next-auth/react'
import { useDispatch } from 'react-redux'
import { useModal } from './useModal'
import { useSelectState } from './useSelectState'
import { useToast } from './useToast'

const useHidden = (projectId: string, isHidden: boolean) => {
  const dispatch = useDispatch<AppDispatch>()
  const { data: session } = useSession()
  const { showModal } = useModal()
  const { showToast } = useToast()
  const { selected, disabled, setSelected, setDisabled } = useSelectState({
    isSelected: isHidden,
    isDisable: false,
  })
  const isHiddenProject = !selected
  const hiddenProject = async (e: React.MouseEvent) => {
    e.preventDefault()
    if (disabled) return
    if (!session?.id) {
      showModal({
        type: 'USER_SIGNUP',
        props: null,
      })
      return
    }
    setSelected((prev) => !prev)
    setDisabled(true)
    return await BackEnd.getInstance()
      .user.hiddenProject({
        projectId,
        isHidden: isHiddenProject,
      })
      .then(async (response) => {
        // dispatch(
        //   updateProject({
        //     projectId,
        //     isAdd: isFavoriteAdd,
        //   })
        // )
        showToast({
          type: 'success',
          text: isHiddenProject ? '비활성 했습니다' : '활성 했습니다',
        })
        const isHidden = response.project.isHidden as boolean
        return isHidden
      })
      .catch((e) => {
        showToast({
          type: 'error',
          text: isHiddenProject
            ? '비활성 하는데 실패했습니다 다시 시도해 주세요'
            : '활성화 하는데 실패했습니다. 다시 시도해 주세요',
        })
        setSelected((prev) => !prev)
        return false
      })
      .finally(() => setDisabled(false))
  }
  return {
    selected,
    disabled,
    hiddenProject,
  }
}

export { useHidden }
