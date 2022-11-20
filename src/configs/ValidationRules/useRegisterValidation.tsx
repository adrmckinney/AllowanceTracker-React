import { useEffect, useReducer, useState } from 'react'
import {
  validateConfirmPassword,
  validateEmail,
  validatePassword,
  validatePhoneNumber,
} from '../../helpers/validationHelpers/ValidationHelpers'
import { RegistrationInputType } from '../../types/RegistrationInputType'
import { RegistrationValidationType, ReturnValidationTypes, Validation } from './RegistrationTypes'

interface Touched {
  name?: boolean
  password?: boolean
  email?: boolean
  number?: boolean
  confirm_password?: boolean
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
  validations: ReturnValidationTypes
  isDisabled: boolean
  apiErrors: ApiError
  handleApiErrors: (arg0: string) => void
  setInitialValidationValues: () => void
}

const useRegisterValidation = (
  { name, password, confirm_password, username, email, number }: Partial<RegistrationInputType>,
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

  const reducer = (validations: RegistrationValidationType, action: ReducerActions) => {
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
      case 'passwordExists':
      case 'validPasswordLength':
      case 'hasNumber':
      case 'hasUpperCase':
      case 'hasLowerCase':
      case 'hasSpecialCharacter':
        return setValue('password')
      case 'passwordMatches':
        return setValue('confirm_password')
      case 'reset':
        return initialState
      default:
        return validations
    }
  }

  const initialState: RegistrationValidationType = {
    name: {
      nameExists: {
        valid: false,
        message: 'Name is required',
      },
    },
    username: {
      usernameExists: {
        valid: false,
        message: 'Username is required',
      },
    },
    email: {
      emailExists: {
        valid: false,
        message: 'Email is required',
      },
      validEmail: {
        valid: false,
        message: 'Email must be valid',
      },
    },
    number: {
      numberExists: {
        valid: false,
        message: 'Phone number is required',
      },
      validNumberLength: {
        valid: false,
        message: 'Not a valid phone number',
      },
    },
    password: {
      passwordExists: {
        valid: false,
        message: 'Password is required',
      },
      validPasswordLength: {
        valid: false,
        message: 'Your password must be at least 8 characters',
      } as Validation,
      hasNumber: {
        valid: false,
        message: 'Your password must include at least one number',
      },
      hasUpperCase: {
        valid: false,
        message: 'Your password must include at least one capital letter',
      },
      hasLowerCase: {
        valid: false,
        message: 'Your password must include at least one lower case letter',
      },
      hasSpecialCharacter: {
        valid: false,
        message:
          'Your password must include at least one special character (! @ # $ % ^ & * ( ) _ +)',
      },
    },
    confirm_password: {
      passwordMatches: {
        valid: false,
        message: 'Your passwords must match',
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

    if (touched?.password) mapValidationObject(validations?.password)

    if (touched?.confirm_password) mapValidationObject(validations?.confirm_password)

    if (touched?.username) {
      setApiErrors(apiErrorInitialValues)
    }
  }, [password, confirm_password, touched, name, username, email, number])

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
      case 'passwordExists':
        return validatePassword(password)?.passwordExists
      case 'validPasswordLength':
        return validatePassword(password)?.validPasswordLength
      case 'hasNumber':
        return validatePassword(password)?.hasNumber
      case 'hasUpperCase':
        return validatePassword(password)?.hasUpperCase
      case 'hasLowerCase':
        return validatePassword(password)?.hasLowerCase
      case 'hasSpecialCharacter':
        return true // validatePassword(password)?.hasSpecialCharacter
      case 'passwordMatches':
        return validateConfirmPassword(password, confirm_password)?.passwordMatches
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
  const passwordErrorsCount = countErrors(validations?.password)
  const confirmPasswordErrorsCount = countErrors(validations?.confirm_password)

  const apiErrorsCount =
    typeof apiErrors !== 'undefined'
      ? apiErrors?.username?.filter((validation: Validation) => validation.valid)?.length
      : 0

  const isDisabled =
    nameErrorsCount +
      usernameErrorsCount +
      emailErrorsCount +
      numberErrorsCount +
      passwordErrorsCount +
      confirmPasswordErrorsCount +
      apiErrorsCount >
    0

  const nameValidations = Object.values(validations?.name)
  const usernameValidations = Object.values(validations?.username)
  const emailValidations = Object.values(validations?.email)
  const numberValidations = Object.values(validations?.number)
  const passwordValidations = Object.values(validations?.password)
  const confirmPasswordValidations = Object.values(validations?.confirm_password)

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
      password: passwordValidations,
      confirm_password: confirmPasswordValidations,
    },
    isDisabled,
    apiErrors,
    handleApiErrors,
    setInitialValidationValues,
  }
}

export default useRegisterValidation
