import SignIn from '@/components/sign/SignIn'
import { BadRequest, CustomResponse } from '@/lib/api'
import { useModal } from './useModal'

const useError = () => {
  const { showModal } = useModal()

  const handleError = (response: CustomResponse<BadRequest>) => {
    switch (response.status) {
      case 401:
        return showModal({
          type: 'user_signin',
          props: undefined,
        })
      default:
        return null
    }
  }
  return {
    handleError,
  }
}

export { useError }
