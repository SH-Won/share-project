import { IProject } from '@/app/page'
import { updateProjectFavorite, updateUserClipping, updateUserFavorite } from '@/lib/api'
import { AppDispatch, RootState } from '@/store'
import { updateProject } from '@/store/project/projectSlice'
import { addClipping, addFavorite, deleteClipping, deleteFavorite } from '@/store/user/userSlice'
import SignupPage from '@/views/SignupPage'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useModal } from './useModal'
import { useSelectState } from './useSelectState'

const useUserActions = (project: IProject) => {
  const dispatch = useDispatch<AppDispatch>()
  const router = useRouter()
  const { data: session } = useSession()
  const { showModal } = useModal()
  const { favorites, clippings } = useSelector((state: RootState) => state.user)
  const {
    selected: favoriteSelected,
    disabled: favoriteDisable,
    setSelected: setFavoriteSelected,
    setDisabled: setFavoriteDisabled,
  } = useSelectState({ isSelected: favorites[project._id] ? true : false, isDisable: false })
  const {
    selected: clippingSelected,
    disabled: clippingDisable,
    setSelected: setClippingSelected,
    setDisabled: setClippingDisabled,
  } = useSelectState({ isSelected: clippings[project._id] ? true : false, isDisable: false })
  const [error, setError] = useState(false)

  const isFavoriteAdd = !favoriteSelected
  const isClippingAdd = !clippingSelected

  const updateFavorite = async (e: React.MouseEvent) => {
    e.preventDefault()
    if (!session?.id) {
      showModal({
        type: 'basic',
        Component: SignupPage,
        props: {},
      })
      return
    }
    setFavoriteSelected((prev) => !prev)
    setFavoriteDisabled(true)
    updateUserFavorite({
      projectId: project._id,
      userId: session!.id,
      isAdd: isFavoriteAdd,
    })
      .then(async (response) => {
        if (response.status !== 200) {
          //403
          throw Error('로그인 다시 해주세요')
          // 400
          // throw Error('request failed')
        }
        const json = await response.json()
        if (isFavoriteAdd) {
          dispatch(addFavorite(project))
        } else {
          dispatch(deleteFavorite({ key: project._id }))
        }
        dispatch(
          updateProject({
            project,
            userId: session.id,
          })
        )
      })
      .catch((e) => {
        console.log(e)
        // error 처리
      })
      .finally(() => setFavoriteDisabled(false))
  }
  const updateClipping = async (e: React.MouseEvent) => {
    e.preventDefault()
    if (!session?.id) {
      showModal({
        type: 'basic',
        Component: SignupPage,
        props: {},
      })
      return
    }
    setClippingSelected((prev) => !prev)
    setClippingDisabled(true)
    updateUserClipping({
      projectId: project._id,
      userId: session.id,
      isAdd: isClippingAdd,
    })
      .then(async (response) => {
        if (response.status !== 200) throw Error('failed')
        const json = await response.json()
        if (isClippingAdd) {
          dispatch(addClipping(project))
        } else {
          dispatch(deleteClipping({ key: project._id }))
        }
      })
      .catch((e) => {
        console.log(e)
        // 에러 처리
      })
      .finally(() => setClippingDisabled(false))
  }
  return {
    favoriteSelected,
    favoriteDisable,
    clippingSelected,
    clippingDisable,
    updateFavorite,
    updateClipping,
  }
}
export { useUserActions }

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
