import { useEffect, useReducer, useState } from 'react'
import { Validation } from './ValidationTypes/GenericValidationTypes'
import {
  FamilyValidationType,
  ReturnFamilyValidationTypes,
} from './ValidationTypes/FamilyValidationTypes'
import { FamilyInputType } from '../../types/FamilyInputType'

interface Touched {
  name?: boolean
}

type ReducerActions = {
  type: string
  payload: boolean
}

type ApiError = {
  name?: ApiErrorValidation
  default?: ApiErrorValidation
}

type ApiErrorValidation = {
  valid: boolean
  message: string
}[]

type ReturnType = {
  validations: ReturnFamilyValidationTypes
  isDisabled: boolean
  apiErrors: ApiError
  handleApiErrors: (arg0: string) => void
  setInitialValidationValues: () => void
}

const useFamilyValidation = ({ name = '' }: FamilyInputType, touched: Touched): ReturnType => {
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

  const reducer = (validations: FamilyValidationType, action: ReducerActions) => {
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
      case 'reset':
        return initialState
      default:
        return validations
    }
  }

  const initialState: FamilyValidationType = {
    name: {
      nameExists: {
        valid: true,
        message: 'A Family Name is Required',
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

    if (touched?.name) {
      setApiErrors(apiErrorInitialValues)
    }
  }, [touched, name])

  const validateFields = (validationKey: string) => {
    switch (validationKey) {
      case 'nameExists':
        return name?.length > 0
      default:
        return false
    }
  }

  const countErrors = <T,>(validationObject: T) => {
    return Object.values(validationObject)?.filter((validation: Validation) => !validation.valid)
      ?.length
  }

  const nameErrorsCount = countErrors(validations?.name)

  const apiErrorsCount =
    typeof apiErrors !== 'undefined'
      ? apiErrors?.name?.filter((validation: Validation) => validation.valid)?.length
      : 0

  const isDisabled = nameErrorsCount + apiErrorsCount > 0

  const nameValidations = Object.values(validations?.name)

  const handleApiErrors = (errorMessage: string) => {
    switch (errorMessage) {
      case 'Username already exists':
        setApiErrors({ name: [{ message: 'Username already exists', valid: true }] })
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
    },
    isDisabled,
    apiErrors,
    handleApiErrors,
    setInitialValidationValues,
  }
}

export default useFamilyValidation
