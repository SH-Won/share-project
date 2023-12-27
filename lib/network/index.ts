import FetchAPI from './fetchAPI'
import ProjectAPI from './project'
import UserAPI from './user'

export const isMobile = () => {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
}
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL + '/api'
class BackEnd extends FetchAPI {
  project
  user
  constructor() {
    super(baseUrl)
    this.project = new ProjectAPI(baseUrl)
    this.user = new UserAPI(baseUrl)
  }
  private static instance: BackEnd

  public static getInstance(): BackEnd {
    if (!BackEnd.instance) {
      BackEnd.instance = new BackEnd()
    }
    return BackEnd.instance
  }
}

export default BackEnd
