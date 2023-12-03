import { User } from 'next-auth'
import FetchAPI, { ISuccess } from './fetchAPI'
import {
  ISignUpSuccess,
  IUserImageBody,
  IUserInventoryResponse,
  IUserSignInBody,
  IUserSignUpBody,
  TUserClipingBody,
  TUserFavoriteBody,
} from './types/user'

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
  getUserInventory = async () => {
    const response = await this.fetch({
      url: this.baseUrl + '/user',
      method: 'GET',
    })
    return this.responseHandler<IUserInventoryResponse>(response)
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
