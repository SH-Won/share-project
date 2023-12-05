import { ISuccess } from '../fetchAPI'
import { IProject } from './project'

export interface IUserSignInBody {
  email: string
  password: string
  // redirect?: boolean
}
export interface IUserSignUpBody extends IUserSignInBody {
  name: string
  userName: string
}
export interface ISignUpSuccess extends ISuccess {
  message: string
}
export interface IUserInventory {
  _id: string
  name: string
  favorites: IProject[]
  clippings: IProject[]
  imageUrl: string
  projects: Omit<IProject, 'blocks'>[]
}
export interface IUserInventoryResponse {
  userInventory: IUserInventory
}
export type TUserFavoriteBody = {
  projectId: string
  userId: string
  isAdd: boolean
}
export type TUserClipingBody = TUserFavoriteBody
export interface IUserImageBody {
  image: string
  userId: string
}
export interface IUserItemResponse {
  projects: IProject[]
  projectLength: number
}
