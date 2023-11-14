import { IProject } from '@/app/page'
import { IUserInventory } from '@/store/user/userSlice'
type UserFavoriteParams = {
  projectId: string
  userId: string
  isAdd: boolean
}
type ProjectFavoriteParams = {
  projectId: string
  userId: string
  isAdd: boolean
}
// type UploadProjectParams = {}
export type TDetailData = {
  project: IProject
  writerProjects: Omit<IProject, 'writer'>[]
}
type BadRequest = { error: string }
type CustomResponse<T> =
  | (Omit<Response, 'json'> & {
      status: 200
      json: () => T | PromiseLike<T>
    })
  | (Omit<Response, 'json'> & {
      status: 400 | 401 | 404 | 500
      json: () => BadRequest | PromiseLike<BadRequest>
    })

const responseHandler = <T>(response: Response) => {
  const res = response as CustomResponse<T>
  return res
}
export const getData = async (): Promise<IProject[]> => {
  // await new Promise((res) => setTimeout(res, 1000000))
  const response = await fetch(process.env.NEXT_PUBLIC_BASE_URL + '/api', {
    next: { revalidate: 0 },
  })
  if (!response.ok) {
    return []
  }
  const projects = (await response.json()).projects
  return (projects as IProject[]) || []
}
export const getDetailData = async (id: string) => {
  const response = await fetch(process.env.NEXT_PUBLIC_BASE_URL + `/api/detail/${id}`, {
    method: 'GET',
  })
  return responseHandler<TDetailData>(response)
}
export const uploadProject = async () => {}

export const updateUserFavorite = async (params: UserFavoriteParams) => {
  const response = await fetch(process.env.NEXT_PUBLIC_BASE_URL + '/api/user/favorite', {
    method: 'PUT',
    body: JSON.stringify(params),
  })
  return responseHandler<IUserInventory>(response)
}
export const updateProjectFavorite = async (params: ProjectFavoriteParams) => {
  const response = await fetch(process.env.NEXT_PUBLIC_BASE_URL + '/api/project/favorite', {
    method: 'PUT',
    body: JSON.stringify(params),
  })
  return responseHandler<{ project: IProject }>(response)
}
