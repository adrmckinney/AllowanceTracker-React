export type Error = {
  valid: boolean
  message: string
}

export type ErrorResponse = {
  error: ErrorMessageType
}

export type ErrorMessageType = {
  message: string
  status?: number
}
