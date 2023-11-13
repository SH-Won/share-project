import { IProject } from '@/app/page'
import { updateProjectFavorite, updateUserFavorite } from '@/lib/api'
import { AppDispatch, RootState } from '@/store'
import { updateProject } from '@/store/project/projectSlice'
import { addFavorite, deleteFavorite } from '@/store/user/userSlice'
import { useSession } from 'next-auth/react'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

const useFavorite = (project: IProject) => {
  const dispatch = useDispatch<AppDispatch>()
  const { data: session } = useSession()
  const { favorites } = useSelector((state: RootState) => state.user)
  const [selected, setSelected] = useState(favorites[project._id] ? true : false)
  const [disabled, setDisabled] = useState(false)
  const [error, setError] = useState(false)
  const isAdd = favorites[project._id] ? false : true
  const updateFavorite = async () => {
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
    Promise.all(promises.map((el) => el()))
      .then(async (response) => {
        if (response.some((res) => res.status !== 200)) {
          throw Error('error')
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
