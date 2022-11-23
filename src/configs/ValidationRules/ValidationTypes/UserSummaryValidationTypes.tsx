import { Validation } from './GenericValidationTypes'

export type UserSummaryValidationType = {
  name: { nameExists: Validation }
  username: { usernameExists: Validation }
  email: { emailExists: Validation; validEmail: Validation }
  number: { numberExists: Validation; validNumberLength: Validation }
}

export type ReturnUserSummaryValidationTypes = {
  name: ReturnValidationType[]
  username: ReturnValidationType[]
  email: ReturnValidationType[]
  number: ReturnValidationType[]
}

export type ReturnValidationType = {
  valid: boolean
  message: string
}
