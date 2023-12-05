import SignIn from '@/components/sign/SignIn'
import { useModal } from './useModal'

const useError = () => {
  const { showModal } = useModal()

  // const handleError = (response: CustomResponse<BadRequest>) => {
  //   switch (response.status) {
  //     case 401:
  //       return showModal({
  //         type: 'USER_SIGNUP',
  //         props: undefined,
  //       })
  //     default:
  //       return null
  //   }
  // }
  // return {
  //   handleError,
  // }
}

export { useError }
