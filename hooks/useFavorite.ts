import { IProject } from '@/app/page'
import { updateProjectFavorite, updateUserFavorite } from '@/lib/api'
import { AppDispatch, RootState } from '@/store'
import { updateProject } from '@/store/project/projectSlice'
import { addFavorite, deleteFavorite } from '@/store/user/userSlice'
import SignupPage from '@/views/SignupPage'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useModal } from './useModal'

const useFavorite = (project: IProject) => {
  const dispatch = useDispatch<AppDispatch>()
  const router = useRouter()
  const { data: session } = useSession()
  const { showModal } = useModal()
  const { favorites } = useSelector((state: RootState) => state.user)
  const [selected, setSelected] = useState(favorites[project._id] ? true : false)
  const [disabled, setDisabled] = useState(false)
  const [error, setError] = useState(false)
  const isAdd = favorites[project._id] ? false : true
  const updateFavorite = async () => {
    showModal({
      type: 'basic',
      Component: SignupPage,
      props: {},
    })
    return
    if (!session?.id) return
    setSelected((prev) => !prev)
    setDisabled(true)
    const promises = [
      () =>
        updateUserFavorite({
          projectId: project._id,
          userId: session!.id,
          isAdd,
        }),
      () =>
        updateProjectFavorite({
          projectId: project._id,
          userId: session!.id,
          isAdd,
        }),
    ]
    // promise.all 은 에러처리가 힘듬 어디서 에러가 났는지 모름
    // middleware 는 promise all 전체에 대해 return 을 해주지 않음
    // 즉 어디서 에러가 났는지 알 수가 없음 func().then(() => func2()) 하거나 Promise.settled 를 사용 해야 할듯 함
    Promise.all(promises.map((el) => el()))
      .then(async (response) => {
        if (response.some((res) => res.status !== 200)) {
          throw Error('로그인 다시 해주세요')
        }
        const projectJson = (await response[1].json()) as { project: IProject }
        if (isAdd) {
          dispatch(addFavorite(project))
        } else {
          dispatch(deleteFavorite({ key: project._id }))
        }
        dispatch(updateProject(projectJson!.project))
      })
      .catch((e) => {
        console.log(e)
        const _confirm = confirm(e)
        setSelected((prev) => !prev)
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
