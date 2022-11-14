import { useEffect, useState } from 'react'
import { LoginInputType } from '../../types/LoginInputType'

interface Touched {
  username?: boolean
  password?: boolean
}

const useLoginValidation = ({ username, password }: LoginInputType, touched: Touched) => {
  const [apiErrors, setApiErrors] = useState('')
  const [usernameError, setUsernameError] = useState({
    value: false,
    message: '',
  })
  const [passwordError, setPasswordError] = useState({
    value: false,
    message: '',
  })

  useEffect(() => {
    if (touched?.username) {
      setUsernameError(state => ({
        ...state,
        value: username?.length === 0,
        message: 'Username is required',
      }))
    }
    if (touched?.password) {
      setPasswordError(state => ({
        ...state,
        value: password?.length === 0,
        message: 'Password is required',
      }))
    }
  }, [username, password, touched])

  const handleApiErrors = (errorMessage: string) => {
    switch (errorMessage) {
      case 'The username field is required. (and 1 more error)':
        setApiErrors('The username and password fields are required.')
        break
      case 'The username field is required.':
        setApiErrors(errorMessage)
        break
      case 'The password field is required.':
        setApiErrors(errorMessage)
        break
      default:
        setApiErrors(errorMessage)
        break
    }
  }

  return { usernameError, passwordError, handleApiErrors, apiErrors }
}

export default useLoginValidation
