import { useEffect, useReducer, useState } from 'react'
import { ChoreCreationInputType } from '../../types/ChoreInputType'
import {
  ChoreValidationType,
  ReturnChoreValidationTypes,
} from './ValidationTypes/ChoreValidationTypes'
import {
  ApiErrorValidation,
  ValidationReducerActions,
} from './ValidationTypes/GenericValidationTypes'
import { Validation } from './ValidationTypes/RegistrationTypes'

interface Touched {
  name?: boolean
  description?: boolean
  cost?: boolean
}

type ApiError = {
  name?: ApiErrorValidation
  default?: ApiErrorValidation
}

type ReturnType = {
  validations: ReturnChoreValidationTypes
  isDisabled: boolean
  apiErrors: ApiError
  handleApiErrors: (arg0: string) => void
  setInitialValidationValues: () => void
}

const useChoreValidation = (
  { name, description, cost }: Partial<ChoreCreationInputType>,
  touched: Touched
): ReturnType => {
  const apiErrorInitialValues: ApiError = {
    name: [
      {
        valid: false,
        message: '',
      },
    ],
    default: [
      {
        valid: false,
        message: '',
      },
    ],
  }
  const [apiErrors, setApiErrors] = useState(apiErrorInitialValues)

  const reducer = (validations: ChoreValidationType, action: ValidationReducerActions) => {
    const setValue = (field: string) => {
      return {
        ...validations,
        [field]: {
          ...validations?.[field],
          [action?.type]: {
            ...validations?.[field]?.[action?.type],
            valid: action?.payload,
          },
        },
      }
    }

    switch (action?.type) {
      case 'nameExists':
        return setValue('name')
      case 'descriptionExists':
        return setValue('description')
      case 'costExists':
        return setValue('cost')
      case 'reset':
        return initialState
      default:
        return validations
    }
  }

  const initialState: ChoreValidationType = {
    name: {
      nameExists: {
        valid: true,
        message: 'Please provide a chore name',
      },
    },
    description: {
      descriptionExists: {
        valid: true,
        message: 'Please provide a description',
      },
    },
    cost: {
      costExists: {
        valid: true,
        message: 'Please provide how much this chore is worth',
      },
    },
  }

  const [validations, dispatch] = useReducer(reducer, initialState)

  const mapValidationObject = <T,>(validationObject: T) => {
    Object.keys(validationObject)?.map((validationKey: string) => {
      dispatch({ type: validationKey, payload: validateFields(validationKey) })
    })
  }

  useEffect(() => {
    if (touched?.name) mapValidationObject(validations?.name)

    if (touched?.description) mapValidationObject(validations?.description)

    if (touched?.cost) mapValidationObject(validations?.cost)

    if (touched?.name) {
      setApiErrors(apiErrorInitialValues)
    }
  }, [touched, name, description, cost])

  const validateFields = (validationKey: string) => {
    switch (validationKey) {
      case 'nameExists':
        return name?.length > 0
      case 'descriptionExists':
        return description?.length > 0
      case 'costExists':
        return cost?.length > 0
      default:
        return true
    }
  }

  const countErrors = <T,>(validationObject: T) => {
    return Object.values(validationObject)?.filter((validation: Validation) => !validation.valid)
      ?.length
  }

  const nameErrorsCount = countErrors(validations?.name)
  const descriptionErrorsCount = countErrors(validations?.description)
  const costErrorsCount = countErrors(validations?.cost)

  const apiErrorsCount =
    typeof apiErrors !== 'undefined'
      ? apiErrors?.name?.filter((validation: Validation) => validation.valid)?.length
      : 0

  const isDisabled = nameErrorsCount + descriptionErrorsCount + costErrorsCount > 0

  const nameValidations = Object.values(validations?.name)
  const descriptionValidations = Object.values(validations?.description)
  const costValidations = Object.values(validations?.cost)

  const handleApiErrors = (errorMessage: string) => {
    switch (errorMessage) {
      case 'A chore with this name already exists.':
        setApiErrors({ name: [{ message: errorMessage, valid: true }] })
        break
      default:
        setApiErrors({ default: [{ message: errorMessage, valid: true }] })
        break
    }
  }

  const setInitialValidationValues = () => {
    dispatch({ type: 'reset', payload: false })
  }

  return {
    validations: {
      name: nameValidations,
      description: descriptionValidations,
      cost: costValidations,
    },
    isDisabled,
    apiErrors,
    handleApiErrors,
    setInitialValidationValues,
  }
}

export default useChoreValidation
