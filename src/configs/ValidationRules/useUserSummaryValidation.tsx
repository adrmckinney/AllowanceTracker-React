import { useEffect, useReducer, useState } from 'react'
import { UserSummaryInputType } from '../../types/UserSummaryInputType'
import {
  validateEmail,
  validatePhoneNumber,
} from '../../helpers/validationHelpers/ValidationHelpers'
import {
  ReturnUserSummaryValidationTypes,
  UserSummaryValidationType,
} from './ValidationTypes/UserSummaryValidationTypes'
import { Validation } from './ValidationTypes/GenericValidationTypes'

interface Touched {
  name?: boolean
  email?: boolean
  number?: boolean
  username?: boolean
}

type ReducerActions = {
  type: string
  payload: boolean
}

type ApiError = {
  username?: ApiErrorValidation
  default?: ApiErrorValidation
}

type ApiErrorValidation = {
  valid: boolean
  message: string
}[]

type ReturnType = {
  validations: ReturnUserSummaryValidationTypes
  isDisabled: boolean
  apiErrors: ApiError
  handleApiErrors: (arg0: string) => void
  setInitialValidationValues: () => void
}

const useUserSummaryValidation = (
  { name = '', username, email, number }: Partial<UserSummaryInputType>,
  touched: Touched
): ReturnType => {
  const apiErrorInitialValues: ApiError = {
    username: [
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

  const reducer = (validations: UserSummaryValidationType, action: ReducerActions) => {
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
      case 'usernameExists':
        return setValue('username')
      case 'emailExists':
      case 'validEmail':
        return setValue('email')
      case 'numberExists':
      case 'validNumberLength':
        return setValue('number')
      case 'reset':
        return initialState
      default:
        return validations
    }
  }

  const initialState: UserSummaryValidationType = {
    name: {
      nameExists: {
        valid: true,
        message: 'Name is required',
      },
    },
    username: {
      usernameExists: {
        valid: true,
        message: 'Username is required',
      },
    },
    email: {
      emailExists: {
        valid: true,
        message: 'Email is required',
      },
      validEmail: {
        valid: true,
        message: 'Email must be valid',
      },
    },
    number: {
      numberExists: {
        valid: true,
        message: 'Phone number is required',
      },
      validNumberLength: {
        valid: true,
        message: 'Not a valid phone number',
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

    if (touched?.username) mapValidationObject(validations?.username)

    if (touched?.email) mapValidationObject(validations?.email)

    if (touched?.number) mapValidationObject(validations?.number)

    if (touched?.username) {
      setApiErrors(apiErrorInitialValues)
    }
  }, [touched, name, username, email, number])

  const validateFields = (validationKey: string) => {
    switch (validationKey) {
      case 'nameExists':
        return name?.length > 0
      case 'usernameExists':
        return username?.length > 0
      case 'emailExists':
        return validateEmail(email)?.emailExists
      case 'validEmail':
        return validateEmail(email)?.validEmail
      case 'numberExists':
        return validatePhoneNumber(number)?.numberExists
      case 'validNumberLength':
        return validatePhoneNumber(number)?.validNumberLength
      default:
        return false
    }
  }

  const countErrors = <T,>(validationObject: T) => {
    return Object.values(validationObject)?.filter((validation: Validation) => !validation.valid)
      ?.length
  }

  const nameErrorsCount = countErrors(validations?.name)
  const usernameErrorsCount = countErrors(validations?.username)
  const emailErrorsCount = countErrors(validations?.email)
  const numberErrorsCount = countErrors(validations?.number)

  const apiErrorsCount =
    typeof apiErrors !== 'undefined'
      ? apiErrors?.username?.filter((validation: Validation) => validation.valid)?.length
      : 0

  const isDisabled =
    nameErrorsCount + usernameErrorsCount + emailErrorsCount + numberErrorsCount + apiErrorsCount >
    0

  const nameValidations = Object.values(validations?.name)
  const usernameValidations = Object.values(validations?.username)
  const emailValidations = Object.values(validations?.email)
  const numberValidations = Object.values(validations?.number)

  const handleApiErrors = (errorMessage: string) => {
    switch (errorMessage) {
      case 'Username already exists':
        setApiErrors({ username: [{ message: 'Username already exists', valid: true }] })
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
      username: usernameValidations,
      email: emailValidations,
      number: numberValidations,
    },
    isDisabled,
    apiErrors,
    handleApiErrors,
    setInitialValidationValues,
  }
}

export default useUserSummaryValidation
