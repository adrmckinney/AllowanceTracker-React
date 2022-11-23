export type RegistrationValidationType = {
  name: { nameExists: Validation }
  username: { usernameExists: Validation }
  email: { emailExists: Validation; validEmail: Validation }
  number: { numberExists: Validation; validNumberLength: Validation }
  password: PasswordInitialState
  confirm_password: ConfirmPasswordInitialState
}

type PasswordInitialState = {
  passwordExists: Validation
  validPasswordLength: Validation
  hasNumber: Validation
  hasUpperCase: Validation
  hasLowerCase: Validation
  hasSpecialCharacter: Validation
}

type ConfirmPasswordInitialState = {
  passwordMatches: Validation
}

export type Validation = {
  valid: boolean
  message: string
}

export type ReturnValidationTypes = {
  name: ReturnValidationType[]
  username: ReturnValidationType[]
  email: ReturnValidationType[]
  number: ReturnValidationType[]
  password: ReturnValidationType[]
  confirm_password: ReturnValidationType[]
}

export type ReturnValidationType = {
  valid: boolean
  message: string
}
