import { Validation } from './GenericValidationTypes'

export type ChoreValidationType = {
  name: { nameExists: Validation }
  description: { descriptionExists: Validation }
  cost: { costExists: Validation }
}

export type ReturnChoreValidationTypes = {
  name: ReturnChoreValidationType[]
  description: ReturnChoreValidationType[]
  cost: ReturnChoreValidationType[]
}

export type ReturnChoreValidationType = {
  valid: boolean
  message: string
}
