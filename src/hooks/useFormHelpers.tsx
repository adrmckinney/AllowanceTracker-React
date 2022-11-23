import { useState } from 'react'
import { formatStringPhoneNumber } from '../helpers/formHelpers/PhoneNumberHelpers'

interface ChangeProps {
  name: string
  value: string | number
}

interface TouchedProps {
  name: string
}

interface TouchedState {
  [index: string]: boolean | null
}

const useFormHelpers = <T,>(initialValues: T) => {
  const [input, setInput] = useState<T>(initialValues)
  const [touched, setTouched] = useState<TouchedState>(null)

  const handleChange = ({ name, value }: ChangeProps): void => {
    let newValue = value
    if (name === 'number' && typeof value === 'string') {
      newValue = formatStringPhoneNumber(value)
    } else {
      newValue = value
    }
    setInput(input => ({
      ...input,
      [name]: newValue,
    }))
  }

  const handleOnBlur = ({ name }: TouchedProps): void =>
    setTouched(touched => ({
      ...touched,
      [name]: true,
    }))

  const resetTouchedFields = <T,>(fields: T[]): void => {
    fields?.forEach((field: T) => {
      setTouched(touched => ({
        ...touched,
        [field['name']]: false,
      }))
    })
  }

  return {
    handleChange,
    handleOnBlur,
    setInput,
    resetTouchedFields,
    input,
    touched,
  }
}

export default useFormHelpers
