interface IFetchConfig {
  method: 'GET' | 'POST' | 'PUT' | 'DELETE'
  url: string
  body?: string
  header?: any
}
interface InterfaceAPI {
  baseUrl?: string
  fetch: (config: IFetchConfig) => Promise<Response>
}
export interface ISuccess {
  success: boolean
}
export type BadRequest = { error: string; status: number }
export type BadResponse = BadRequest & { message: string }
export type CustomResponse<T> =
  | (Omit<Response, 'json'> & {
      status: 200
      json: () => T | PromiseLike<T>
    })
  | (Omit<Response, 'json'> & {
      status: 400 | 401 | 404 | 500
      json: () => BadRequest | PromiseLike<BadRequest>
    })

// class BaseError {
//   constructor(status, )
// }
export type CustomError = PromiseLike<BadRequest>
class FetchAPI implements InterfaceAPI {
  constructor(public baseUrl?: string) {}

  responseHandler = async <T>(response: Response) => {
    const res = response as CustomResponse<T>
    if (res.status !== 200) {
      const error = await res.json()
      throw error as BadRequest
    }
    return await res.json()
  }
  fetch = async (config: IFetchConfig) => {
    return fetch(config.url, {
      method: config.method,
      body: config.body,
    })
  }
}
export default FetchAPI
