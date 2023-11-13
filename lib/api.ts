import { IProject } from '@/app/page'
import { IUserInfo } from '@/store/user/userSlice'

export const getData = async (): Promise<IProject[]> => {
  // await new Promise((res) => setTimeout(res, 1000000))
  const response = await fetch(process.env.NEXT_PUBLIC_BASE_URL + '/api', {
    // cache: 'no-store',
  })
  if (!response.ok) {
    return []
  }
  const products = (await response.json()).products
  return (products as IProject[]) || []
}

type UserFavoriteParams = {
  projectId: string
  favoriteId: string
  isAdd: boolean
}
type ProjectFavoriteParams = {
  projectId: string
  isAdd: boolean
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
export const updateUserFavorite = async (params: UserFavoriteParams) => {
  const response = await fetch(process.env.NEXT_PUBLIC_BASE_URL + '/api/user/favorite', {
    method: 'PUT',
    body: JSON.stringify(params),
  })
  return responseHandler<IUserInfo>(response)
}
export const updateProjectFavorite = async (params: ProjectFavoriteParams) => {
  const response = await fetch(process.env.NEXT_PUBLIC_BASE_URL + '/api/project/favorite', {
    method: 'PUT',
    body: JSON.stringify(params),
  })
  return responseHandler<{ project: IProject }>(response)
}
