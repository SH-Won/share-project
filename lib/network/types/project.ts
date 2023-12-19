import { TEditBlock } from '@/context/UploadContext'
import { ISuccess } from '../fetchAPI'
export interface IProject {
  _id: string
  title: string
  thumbnail: {
    imageUrl: string
  }
  author: {
    _id: string
    imageUrl: string
    name: string
  }
  favoriteCount: number
  isUserFavorite?: boolean
  isUserClipping?: boolean
  isHidden?: boolean
}
export interface IProjectDetail extends IProject {
  isUserFavorite: boolean
  isUserClipping: boolean
  blocks: Omit<TEditBlock, 'name'>[]
}
export interface IProjectResponse {
  projects: IProject[]
  totalLength: number
}
export interface IProjectDetailResponse {
  project: IProjectDetail
  writerProjects: Omit<IProject, 'writer'>[]
  // isUserFavorite: boolean
  // isUserClipping: boolean
}
export interface IUploadProjectBody {
  userId: string | undefined
  title: string
  thumbnail: {
    value: string
  }
  blocks: Omit<TEditBlock, 'name'>[]
}
export interface IUploadProjectResponse extends ISuccess {
  uploadProject: IProject
  projectLength: number
}
export interface IHiddenProjectBody {
  projectId: string
  isHidden: boolean
}
