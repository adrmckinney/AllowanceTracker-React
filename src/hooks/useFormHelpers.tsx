import { useState } from 'react'

interface ChangeProps {
  name: string
  value: string | number
}

interface TouchedProps {
  name: string
}

const useFormHelpers = <T,>(initialValues: T) => {
  const [input, setInput] = useState<T>()
  const [touched, setTouched] = useState({})

  const handleChange = ({ name, value }: ChangeProps) =>
    void setInput(input => ({
      ...input,
      [name]: value,
    }))

  const handleTouched = ({ name }: TouchedProps) =>
    void setTouched(touched => ({
      ...touched,
      [name]: true,
    }))

  return {
    handleChange,
    handleTouched,
    setInput,
    input,
    touched,
  }
}

export default useFormHelpers
