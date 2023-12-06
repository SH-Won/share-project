import BackEnd from '@/lib/network'
import { AppDispatch } from '@/store'
import { updateProject } from '@/store/project/projectSlice'
import { useSession } from 'next-auth/react'
import { useDispatch } from 'react-redux'
import { useModal } from './useModal'
import { useSelectState } from './useSelectState'
import { useToast } from './useToast'

const useFavorite = (projectId: string, isUserFavorite: boolean) => {
  const dispatch = useDispatch<AppDispatch>()
  const { data: session } = useSession()
  const { showModal } = useModal()
  const { showToast } = useToast()
  const { selected, disabled, setSelected, setDisabled } = useSelectState({
    isSelected: isUserFavorite,
    isDisable: false,
  })
  const isFavoriteAdd = !selected
  const updateFavorite = async (e: React.MouseEvent) => {
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
    return await BackEnd.getInstance()
      .user.updateUserFavorite({
        projectId,
        userId: session!.id,
        isAdd: isFavoriteAdd,
      })
      .then(async (response) => {
        dispatch(
          updateProject({
            projectId,
            isAdd: isFavoriteAdd,
          })
        )
        showToast({
          type: 'success',
          text: isFavoriteAdd ? '좋아요 목록에 추가 되었습니다' : '좋아요 목록에서 삭제 되었습니다',
        })
        return true
      })
      .catch((e) => {
        console.log(e)
        showToast({
          type: 'error',
          text: isFavoriteAdd
            ? '좋아요 목록에 추가에 실패했습니다. 다시 시도해 주세요'
            : '좋아요 목록에서 삭제에 실패했습니다. 다시 시도해 주세요',
        })
        setSelected((prev) => !prev)
        return false
      })
      .finally(() => setDisabled(false))
  }
  return {
    selected,
    disabled,
    updateFavorite,
  }
}

export { useFavorite }

// promise.all 은 에러처리가 힘듬 어디서 에러가 났는지 모름
// middleware 는 promise all 전체에 대해 return 을 해주지 않음
// 즉 어디서 에러가 났는지 알 수가 없음 func().then(() => func2()) 하거나 Promise.settled 를 사용 해야 할듯 함
// middleware auth 에서 forbidden 이면 로그인으로 안내 ? 팝업?
// const promises = [
//   () =>
//     updateUserFavorite({
//       projectId: project._id,
//       userId: session!.id,
//       isAdd,
//     }),
//   () =>
//     updateProjectFavorite({
//       projectId: project._id,
//       userId: session!.id,
//       isAdd,
//     }),
// ]
// Promise.all(promises.map((el) => el()))
//   .then(async (response) => {
//     if (response.some((res) => res.status !== 200)) {
//       throw Error('로그인 다시 해주세요')
//     }
//     const projectJson = (await response[1].json()) as { project: IProject }
//     if (isAdd) {
//       dispatch(addFavorite(project))
//     } else {
//       dispatch(deleteFavorite({ key: project._id }))
//     }
//     dispatch(updateProject(projectJson!.project))
//   })
//   .catch((e) => {
//     console.log(e)
//     const _confirm = confirm(e)
//     setSelected((prev) => !prev)
//   })
//   .finally(() => setDisabled(false))
