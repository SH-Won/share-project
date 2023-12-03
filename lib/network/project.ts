import FetchAPI from './fetchAPI'
import {
  IProjectDetailResponse,
  IProjectResponse,
  IUploadProjectBody,
  IUploadProjectResponse,
} from './types/project'

interface TProjectQuery {
  skip: number
  limit: number
}

export default class ProjectAPI extends FetchAPI {
  constructor(public baseUrl: string) {
    super(baseUrl)
  }

  getProjects = async (query: TProjectQuery) => {
    const queryString = Object.entries(query)
      .map(([key, value]) => `${key}=${value}`)
      .join('&')
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
