interface IFetchConfig {
  method: 'GET' | 'POST' | 'PUT' | 'DELETE'
  url: string
  body?: string
  headers?: any
  noCache?: boolean
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
  getQueryString = (query: object) => {
    return Object.entries(query)
      .map(([key, value]) => `${key}=${value}`)
      .join('&')
  }
  fetch = async (config: IFetchConfig) => {
    return fetch(
      config.url,
      !config.noCache
        ? {
            method: config.method,
            body: config.body,
            headers: config.headers,
          }
        : {
            method: config.method,
            body: config.body,
            headers: config.headers,
            // next: { revalidate: 0 },
            cache: 'no-store',
          }
    )
  }
}
export default FetchAPI
