import { CustomResponse } from './network/fetchAPI'

export class ErrorBase extends Error {
  status
  constructor(res: CustomResponse<any>) {
    super()
    this.status = res.status
    this.message = res.statusText
  }
}
