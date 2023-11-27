import { IProject } from '@/app/page'
import { TEditBlock } from '@/context/UploadContext'
import { IUserInventory } from '@/store/user/userSlice'
import { IDetailProject } from '@/views/DetailPage'
import { ErrorBase } from './error'
type UserFavoriteParams = {
  projectId: string
  userId: string
  isAdd: boolean
}
type UserClipingParams = UserFavoriteParams
type ProjectFavoriteParams = {
  projectId: string
  userId: string
  isAdd: boolean
}
type TQuery = {
  skip: number
  limit: number
}
interface IUploadBody {
  userId: string | undefined
  title: string
  thumbnail: {
    value: string
  }
  blocks: Omit<TEditBlock, 'name'>[]
}
interface ISuccess {
  success: boolean
}
interface UploadResponse extends ISuccess {
  uploadProject: IProject
}
export type TDetailData = {
  project: IDetailProject
  writerProjects: Omit<IProject, 'writer'>[]
}
export type BadRequest = { error: string; status: number }
export type CustomResponse<T> =
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
  if (res.status !== 200) throw res
  // return res.json()
  return res.json()
}
type TData = {
  projects: IProject[]
  totalLength: number
}

export const getData = async (query: TQuery) => {
  const queryString = Object.entries(query)
    .map(([key, value]) => `${key}=${value}`)
    .join('&')
  // await new Promise((res) => setTimeout(res, 1000000))
  const response = await fetch(process.env.NEXT_PUBLIC_BASE_URL + '/api?' + queryString, {
    next: { revalidate: 0 },
  })

  return responseHandler<TData>(response)
}
export const getDetailData = async (id: string) => {
  // try {
  //   const response = await fetch(process.env.NEXT_PUBLIC_BASE_URL + `/api/detail/${id}`, {
  //     method: 'GET',
  //   })
  //   return responseHandler<TDetailData>(response)
  // } catch (e) {
  //   throw e
  // }
  const response = await fetch(process.env.NEXT_PUBLIC_BASE_URL + `/api/detail/${id}`, {
    method: 'GET',
  })
  return responseHandler<TDetailData>(response)
}
export const uploadProject = async (body: IUploadBody) => {
  const response = await fetch(process.env.NEXT_PUBLIC_BASE_URL + '/api/upload', {
    method: 'POST',
    body: JSON.stringify(body),
  })
  return responseHandler<UploadResponse>(response)
}

export const updateUserFavorite = async (params: UserFavoriteParams) => {
  const response = await fetch(process.env.NEXT_PUBLIC_BASE_URL + '/api/user/favorite', {
    method: 'PUT',
    body: JSON.stringify(params),
  })
  return responseHandler<IUserInventory>(response)
}
export const updateUserClipping = async (params: UserClipingParams) => {
  const response = await fetch(process.env.NEXT_PUBLIC_BASE_URL + '/api/user/clipping', {
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
