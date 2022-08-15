import { useEffect, useState } from 'react'

const useRegisterValidation = ({ username, password, confirm_password }, touched) => {
  const fieldNames = ['name', 'username', 'email', 'password', 'confirm_password']

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

  // Need to see if checkForFieldErrors is only checking that field
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
      // need to confirm that these only validate the specific field
      const filterValidations = filterErrorsByField('username')
      console.log('filterValidations', filterValidations)
      const newErrorState = errors?.map(error => {
        return { ...error, value: registrationValidation(filterValidations) }
      })

      setErrors(newErrorState)

      // const newPwdState = passwordErrors?.map(error => {
      //   return { ...error, value: usernameConfigs(error?.name) }
      // })
      // setPasswordErrors(newPwdState)
    }

    if (touched?.password) {
      const filterValidations = filterErrorsByField('password')
      console.log('filterValidations password', filterValidations)
      const newErrorState = errors?.map(error => {
        return { ...error, value: registrationValidation(filterValidations) }
      })

      setErrors(newErrorState)
    }

    if (touched?.confirm_password) {
      const filterValidations = filterErrorsByField('confirm_password')
      console.log('filterValidations password', filterValidations)
      const newErrorState = errors?.map(error => {
        return { ...error, value: registrationValidation(error) }
      })

      setErrors(newErrorState)
    }

    //   const value = [validLength, hasNumber, upperCase, lowerCase, specialChar]
    // const count = value.filter((value) => value).length
    // const falseCount = 5 - count
    // console.log('VALUE', value)
    // console.log('count', falseCount)
  }, [username, password, confirm_password])

  const registrationValidation = error => {
    switch (error?.field) {
      case 'username':
        return usernameConfigs(error?.name)
      case 'password':
        return passwordErrorConfigs(error?.name)
      case 'confirm_password':
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

  return { checkForFieldErrors, errors, filterErrorsByField }
}

export default useRegisterValidation
