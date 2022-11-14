import { useEffect, useReducer, useState } from 'react'
import { RegistrationInputType } from '../../types/RegistrationInputType'

interface Touched {
  password?: boolean
  confirm_password?: boolean
  username?: boolean
}

type ReducerActions = {
  type: string
  payload: boolean
}

type InitialState = {
  password: PasswordInitialState
  confirm_password: ConfirmPasswordInitialState
}

type PasswordInitialState = {
  passwordExists: Validation
  doesNotHaveValidLength: Validation
  doesNotHaveNumber: Validation
  doesNotHaveUpperCase: Validation
  doesNotHaveLowerCase: Validation
  specialCharacter: Validation
}

type ConfirmPasswordInitialState = {
  doesNotMatch: Validation
}

type Validation = {
  valid: boolean
  message: string
}

type ApiError = {
  username?: ApiErrorValidation
  default?: ApiErrorValidation
}

type ApiErrorValidation = {
  valid: boolean
  message: string
}[]

const useRegisterValidation = (
  { password, confirm_password }: Partial<RegistrationInputType>,
  touched: Touched
) => {
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

  const reducer = (validations: InitialState, action: ReducerActions) => {
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
      case 'passwordExists':
        return setValue('password')
      case 'doesNotHaveValidLength':
        return setValue('password')
      case 'doesNotHaveNumber':
        return setValue('password')
      case 'doesNotHaveUpperCase':
        return setValue('password')
      case 'doesNotHaveLowerCase':
        return setValue('password')
      case 'specialCharacter':
        return setValue('password')
      case 'doesNotMatch':
        return setValue('confirm_password')
      default:
        return validations
    }
  }

  const initialState: InitialState = {
    password: {
      passwordExists: {
        valid: false,
        message: 'Password is required',
      },
      doesNotHaveValidLength: {
        valid: false,
        message: 'Your password must be at least 8 characters',
      } as Validation,
      doesNotHaveNumber: {
        valid: false,
        message: 'Your password must include at least one number',
      },
      doesNotHaveUpperCase: {
        valid: false,
        message: 'Your password must include at least one capital letter',
      },
      doesNotHaveLowerCase: {
        valid: false,
        message: 'Your password must include at least one lower case letter',
      },
      specialCharacter: {
        valid: false,
        message:
          'Your password must include at least one special character (! @ # $ % ^ & * ( ) _ +)',
      },
    },
    confirm_password: {
      doesNotMatch: {
        valid: false,
        message: 'Your passwords must match',
      },
    },
  }

  const [validations, dispatch] = useReducer(reducer, initialState)

  useEffect(() => {
    console.log('touched', touched)

    if (touched?.password) {
      Object.keys(validations?.password)?.map(validationKey => {
        dispatch({ type: validationKey, payload: validationConfigs(validationKey) })
      })
    }

    if (touched?.confirm_password) {
      Object.keys(validations?.confirm_password)?.map(validationKey => {
        dispatch({ type: validationKey, payload: validationConfigs(validationKey) })
      })
    }

    if (touched?.username) {
      setApiErrors(apiErrorInitialValues)
    }
  }, [password, confirm_password, touched])

  const validationConfigs = (name: string) => {
    switch (name) {
      case 'passwordExists':
        return password?.length === 0
      case 'doesNotHaveValidLength':
        return !(password?.length >= 8)
      case 'doesNotHaveNumber':
        return !/\d/.test(password)
      case 'doesNotHaveUpperCase':
        return !(password?.toLowerCase() !== password)
      case 'doesNotHaveLowerCase':
        return !(password?.toUpperCase() !== password)
      case 'specialCharacter':
        return !/[ `!@#$%^&*()_+\-=\]{};':"\\|,.<>?~]/.test(password)
      case 'doesNotMatch':
        return password && !(password === confirm_password)
      default:
        return false
    }
  }

  const passwordErrorsCount = Object.values(validations?.password)?.filter(
    (validation: Validation) => validation.valid
  )?.length
  const confirmPasswordErrorsCount = Object.values(validations?.confirm_password)?.filter(
    (validation: Validation) => validation.valid
  )?.length
  const apiErrorsCount =
    typeof apiErrors !== 'undefined'
      ? apiErrors?.username?.filter((validation: Validation) => validation.valid)?.length
      : 0

  const isDisabled = passwordErrorsCount + confirmPasswordErrorsCount + apiErrorsCount > 0

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

  return {
    passwordValidations,
    confirmPasswordValidations,
    isDisabled,
    apiErrors,
    handleApiErrors,
  }
}

export default useRegisterValidation
