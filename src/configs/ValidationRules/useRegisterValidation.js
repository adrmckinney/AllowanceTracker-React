import { useEffect, useState } from 'react'

const useRegisterValidation = ({ password, confirm_password }) => {
  const [errors, setErrors] = useState({
    username: {
      usernameExists: false,
    },
    password: {
      passwordExists: false,
      validLength: false,
      hasNumber: false,
      upperCase: false,
      lowerCase: false,
      specialCharacter: false,
      match: false,
    },
  })
  // const [validLength, setValidLength] = useState(false)
  // const [hasNumber, setHasNumber] = useState(false)
  // const [upperCase, setUpperCase] = useState(false)
  // const [lowerCase, setLowerCase] = useState(false)
  // const [specialChar, setSpecialChar] = useState(false)
  // const [match, setMatch] = useState(false)
  // const value = [validLength, hasNumber, upperCase, lowerCase, specialChar]
  // const count = value.filter(value => value).length
  // const falseCount = 5 - count
  // console.log('VALUE', value)
  // console.log('count', falseCount)

  useEffect(() => {
    if (!!password) {
      setErrors(errors => ({
        ...errors,
        password: {
          ...errors?.password,
          passwordExists: password?.length > 0,
          validLength: password.length >= 8,
          hasNumber: /\d/.test(password),
          upperCase: password.toLowerCase() !== password,
          lowerCase: password.toUpperCase() !== password,
          specialCharacter: /[ `!@#$%^&*()_+\-=\]{};':"\\|,.<>?~]/.test(password),
          match: password && password === confirm_password,
        },
      }))
    }
    // setValidLength(password.length >= 8)
    // setUpperCase(password.toLowerCase() !== password)
    // setLowerCase(password.toUpperCase() !== password)
    // setHasNumber(/\d/.test(password))
    // setSpecialChar(/[ `!@#$%^&*()_+\-=\]{};':"\\|,.<>?~]/.test(password))
    // setMatch(password && password === confirmPassword)
  }, [password, confirm_password])

  return errors
}

export default useRegisterValidation
