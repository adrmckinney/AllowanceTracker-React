import { useEffect, useState } from 'react'

const useRegisterValidation = ({ username, password, confirm_password }) => {
  const [touched, setTouched] = useState({ username: false, password: false })
  const [totalFormErrors, setTotalFormErrors] = useState(0)
  const [isValidationError, setIsValidationError] = useState(false)

  const handleTouched = ({ name }) => {
    setTouched(touched => ({
      ...touched,
      [name]: true,
    }))

    checkForFieldErrors(name)
  }

  const [errors, setErrors] = useState([
    {
      name: 'usernameExists',
      field: 'username',
      value: false,
      message: 'Username is required',
    },
    {
      name: 'passwordExists',
      field: 'password',
      value: false,
      message: 'Password is required',
    },
    {
      name: 'doesNotHaveValidLength',
      field: 'password',
      value: false,
      message: 'Your password must be at least 8 characters',
    },
    {
      name: 'doesNotHaveNumber',
      field: 'password',
      value: false,
      message: 'Your password must include at least one number',
    },
    {
      name: 'doesNotHaveUpperCase',
      field: 'password',
      value: false,
      message: 'Your password must include at least one capital letter',
    },
    {
      name: 'doesNotHaveLowerCase',
      field: 'password',
      value: false,
      message: 'Your password must include at least one lower case letter',
    },
    {
      name: 'specialCharacter',
      field: 'password',
      value: false,
      message:
        'Your password must include at least one special character (! @ # $ % ^ & * ( ) _ +)',
    },
    {
      name: 'doesNotMatch',
      field: 'confirm_password',
      value: false,
      message: 'Your passwords must match',
    },
  ])

  const checkForFieldErrors = name => {
    const newErrorState = errors?.map(error => {
      return { ...error, value: registrationValidation(filterErrorsByField(name)) }
    })
    setErrors(newErrorState)
  }

  const filterErrorsByField = field => {
    return errors?.filter(error => error?.field === field)
  }

  useEffect(() => {
    if (touched?.username) {
      const newErrorState = errors?.map(error => {
        if (error?.field === 'username') {
          return { ...error, value: registrationValidation(error) }
        } else {
          return error
        }
      })

      setErrors(newErrorState)
    }

    if (touched?.password) {
      const newErrorState = errors?.map(error => {
        if (error?.field === 'password') {
          console.log('error is password', error)
          return { ...error, value: registrationValidation(error) }
        } else {
          return error
        }
      })

      setErrors(newErrorState)
    }

    if (touched?.confirm_password) {
      const newErrorState = errors?.map(error => {
        if (error?.field === 'confirm_password') {
          console.log('error is confirm_password', error)
          return { ...error, value: registrationValidation(error) }
        } else {
          console.log('error not confirm', error)
          return error
        }
      })

      setErrors(newErrorState)
    }

    // const value = ['doesNotHaveValidLength', 'hasNumber', 'upperCase', 'lowerCase', 'specialChar']
    const count = errors?.filter(error => error?.value === true)?.length
    console.log('count', count)
    // const falseCount = 5 - count
    // console.log('VALUE', value)
    // console.log('count', falseCount)
  }, [username, password, confirm_password, touched])

  const registrationValidation = error => {
    switch (error?.field) {
      case 'username':
        return usernameConfigs(error?.name)
      case 'password':
        console.log('PASSWORD ran')
        return passwordErrorConfigs(error?.name)
      case 'confirm_password':
        console.log('confirm PASSWORD ran')
        return confirmPasswordConfigs(error?.name)
      default:
        return false
    }
  }

  const usernameConfigs = name => {
    switch (name) {
      case 'usernameExists':
        return username?.length === 0
      default:
        return false
    }
  }

  const passwordErrorConfigs = name => {
    switch (name) {
      case 'passwordExists':
        return username?.length === 0
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

  const confirmPasswordConfigs = name => {
    switch (name) {
      case 'doesNotMatch':
        return password && !(password === confirm_password)
      default:
        return false
    }
  }

  return { checkForFieldErrors, errors, filterErrorsByField, touched, setTouched, handleTouched }
}

export default useRegisterValidation
