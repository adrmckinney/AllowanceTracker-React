import { Validation } from './GenericValidationTypes'

export type FamilyValidationType = {
  name: { nameExists: Validation }
}

export type ReturnFamilyValidationTypes = {
  name: ReturnValidationType[]
}

export type ReturnValidationType = {
  valid: boolean
  message: string
}
