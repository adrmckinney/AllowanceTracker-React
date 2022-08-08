import { createContext, useContext, useState } from 'react'

const InputStateContext = createContext()
const SetInputStateContext = createContext()
const InputChangeContext = createContext()
const InitialValuesContext = createContext()
const SetInitialValuesContext = createContext()

export const useFormContext = validate => {
  const inputState = useContext(InputStateContext)
  const setInputState = useContext(SetInputStateContext)
  const handleChange = useContext(InputChangeContext)
  const initialValues = useContext(InitialValuesContext)
  const setInitialValues = useContext(SetInitialValuesContext)

  return {
    inputState,
    setInputState,
    handleChange,
    initialValues,
    setInitialValues,
  }
}

export const withFormContext =
  Component =>
  ({ ...rest }) => {
    const [initialValues, setInitialValues] = useState({})
    const [inputState, setInputState] = useState(initialValues)

    const handleChange = ({ name, value }) => {
      return setInputState(input => ({
        ...input,
        [name]: value,
      }))
    }

    return (
      <InputStateContext.Provider value={inputState}>
        <SetInputStateContext.Provider value={setInputState}>
          <InitialValuesContext.Provider value={initialValues}>
            <SetInitialValuesContext.Provider value={setInitialValues}>
              <InputChangeContext.Provider value={handleChange}>
                <Component {...rest} />
              </InputChangeContext.Provider>
            </SetInitialValuesContext.Provider>
          </InitialValuesContext.Provider>
        </SetInputStateContext.Provider>
      </InputStateContext.Provider>
    )
  }
