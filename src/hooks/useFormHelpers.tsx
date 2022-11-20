import { useState } from 'react'

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

  const handleChange = ({ name, value }: ChangeProps) =>
    void setInput(input => ({
      ...input,
      [name]: value,
    }))

  const handleOnBlur = ({ name }: TouchedProps) =>
    void setTouched(touched => ({
      ...touched,
      [name]: true,
    }))

  const resetTouchedFields = <T,>(fields: T[]) => {
    fields?.forEach((field: T) => {
      void setTouched(touched => ({
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
