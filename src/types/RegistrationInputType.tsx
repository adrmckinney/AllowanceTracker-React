export interface RegistrationInputType {
  name: string
  username: string
  email: string
  number: string | null
  password: string
  confirm_password: string
}

export interface ChildRegistrationInputType extends RegistrationInputType {
  wallet: string
  permission: number
}

export type RegistrationInputFieldTypes = {
  name: string
  label: string
  type: string
  icon?: string
  iconSize?: string
  iconColor?: string
  placeHolder?: string
}
