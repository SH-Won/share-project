import SignupPage from '@/views/SignupPage'
import { ComponentProps } from 'react'
import ConfirmAction from '../upload/modal/ConfirmAction'

export const Modal_Type = {
  USER_CONFIRM: 'USER_CONFIRM',
  USER_SIGNUP: 'USER_SIGNUP',
}
export const MODAL_CONFIG = {
  USER_CONFIRM: ConfirmAction,
  USER_SIGNUP: SignupPage,
}
export const MODAL_KEY = {
  USER_CONFIRM: 'USER_CONFIRM',
  USER_SIGNUP: 'USER_SIGNUP',
}
export type TUserConfirmModal = {
  type: 'USER_CONFIRM'
  props: ComponentProps<typeof ConfirmAction>
}
export type TUserSignup = {
  type: 'USER_SIGNUP'
  props?: ComponentProps<typeof SignupPage>
}
export type TModalKey = keyof typeof MODAL_CONFIG
export type TModalComponent<T extends TModalKey> = (typeof MODAL_CONFIG)[T]
export type TModalProps<T extends TModalKey> = Parameters<TModalComponent<T>>[0]
// export type IModalState<T extends TModalKey> = {
//   type: T
//   props: TModalProps<T> | null
// }
export type IModalState = TUserConfirmModal | TUserSignup
