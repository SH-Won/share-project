import { User } from 'next-auth'
import FetchAPI, { ISuccess } from './fetchAPI'
import { IProjectQuery } from './project'
import { IProject } from './types/project'
import {
  ISignUpSuccess,
  IUserImageBody,
  IUserInventoryResponse,
  IUserItemResponse,
  IUserSignInBody,
  IUserSignUpBody,
  TUserClipingBody,
  TUserFavoriteBody,
} from './types/user'

// export interface IUserProjectQuery extends IProjectQuery {
//   userId?: string
// }
export interface IUserProjectQuery {
  lastCreatedAt?: string
  userId?: string
}
export default class UserAPI extends FetchAPI {
  constructor(public baseUrl: string) {
    super(baseUrl)
  }
  signin = async (body: IUserSignInBody) => {
    const response = await this.fetch({
      url: this.baseUrl + '/signin',
      method: 'POST',
      body: JSON.stringify(body),
    })
    return this.responseHandler<User>(response)
  }
  signup = async (body: IUserSignUpBody) => {
    const response = await this.fetch({
      url: this.baseUrl + '/signup',
      method: 'POST',
      body: JSON.stringify(body),
    })
    return this.responseHandler<ISignUpSuccess>(response)
  }
  getUserInfo = async (query: { _id: string }) => {
    const queryString = this.getQueryString(query)
    const response = await this.fetch({
      url: this.baseUrl + '/user/info?' + queryString,
      method: 'GET',
    })
    return this.responseHandler<IUserItemResponse>(response)
  }
  getUserInventory = async () => {
    const response = await this.fetch({
      url: this.baseUrl + '/user',
      method: 'GET',
    })
    return this.responseHandler<IUserInventoryResponse>(response)
  }
  getUserProjects = async (query: IUserProjectQuery) => {
    const queryString = this.getQueryString(query)
    const response = await this.fetch({
      url: this.baseUrl + '/user/project?' + queryString,
      method: 'GET',
    })
    return this.responseHandler<IUserItemResponse>(response)
  }
  getUserFavorites = async (query: IUserProjectQuery) => {
    const queryString = this.getQueryString(query)
    const response = await this.fetch({
      url: this.baseUrl + '/user/favorite?' + queryString,
      method: 'GET',
    })
    return this.responseHandler<IUserItemResponse>(response)
  }
  getUserClipping = async (query: IUserProjectQuery) => {
    const queryString = this.getQueryString(query)
    const response = await this.fetch({
      url: this.baseUrl + '/user/clipping?' + queryString,
      method: 'GET',
    })
    return this.responseHandler<IUserItemResponse>(response)
  }
  updateUserFavorite = async (body: TUserFavoriteBody) => {
    const response = await this.fetch({
      url: this.baseUrl + '/user/favorite',
      method: 'PUT',
      body: JSON.stringify(body),
    })
    return this.responseHandler<ISuccess>(response)
  }
  updateUserClipping = async (body: TUserClipingBody) => {
    const response = await this.fetch({
      url: this.baseUrl + '/user/clipping',
      method: 'PUT',
      body: JSON.stringify(body),
    })
    return this.responseHandler<ISuccess>(response)
  }
  updateUserImage = async (body: IUserImageBody) => {
    const response = await this.fetch({
      url: this.baseUrl + '/user/profile',
      method: 'PUT',
      body: JSON.stringify(body),
    })
    return this.responseHandler<{ imageUrl: string }>(response)
  }
}
