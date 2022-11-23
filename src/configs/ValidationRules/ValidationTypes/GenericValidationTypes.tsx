export type Validation = {
  valid: boolean
  message: string
}

export type ApiErrorValidation = {
  valid: boolean
  message: string
}[]

export type ValidationReducerActions = {
  type: string
  payload: boolean
}
