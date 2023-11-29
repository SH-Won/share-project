import SignupPage from '@/views/SignupPage'
import ConfirmAction from '../upload/modal/ConfirmAction'

export const MODAL_CONFIG = {
  USER_CONFIRM: ConfirmAction,
  USER_SIGNUP: SignupPage,
}
export const MODAL_KEY = {
  USER_CONFIRM: 'USER_CONFIRM',
  USER_SIGNUP: 'USER_SIGNUP',
}
export type TModalKey = keyof typeof MODAL_CONFIG
export type TModalComponent<T extends TModalKey> = (typeof MODAL_CONFIG)[T]
export type TModalProps<T extends TModalKey> = Parameters<TModalComponent<T>>[0]
export type IModalState<T extends TModalKey> = {
  type: T
  props: TModalProps<T> | null
}
