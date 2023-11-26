import { BadRequest, CustomResponse } from './api'

export const handleError = async (response: BadRequest) => {
  // const json = await response.json()
}
export const handleJson = async <T extends CustomResponse<any>>(response: T) => {
  if (!response.ok) throw response
  return (await response.json()) as Promise<T>
}
export default handleError
