import FetchAPI from './fetchAPI'
import {
  IHiddenProjectBody,
  IProjectDetailResponse,
  IProjectResponse,
  IUploadProjectBody,
  IUploadProjectResponse,
} from './types/project'

export interface IProjectQuery {
  skip: number
  limit: number
}

export default class ProjectAPI extends FetchAPI {
  constructor(public baseUrl: string) {
    super(baseUrl)
  }

  getProjects = async (query: IProjectQuery) => {
    const queryString = this.getQueryString(query)
    const response = await this.fetch({
      url: this.baseUrl + '?' + queryString,
      method: 'GET',
    })
    return this.responseHandler<IProjectResponse>(response)
  }
  getProjectDetail = async (id: string) => {
    const response = await this.fetch({
      url: this.baseUrl + '/detail/' + id,
      method: 'GET',
    })
    return this.responseHandler<IProjectDetailResponse>(response)
  }
  uploadProject = async (body: IUploadProjectBody) => {
    const response = await this.fetch({
      url: this.baseUrl + '/upload',
      method: 'POST',
      body: JSON.stringify(body),
    })
    return this.responseHandler<IUploadProjectResponse>(response)
  }
}
