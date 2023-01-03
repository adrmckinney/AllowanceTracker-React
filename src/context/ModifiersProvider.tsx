import { ReducerAction, createContext, useReducer, useState } from 'react'
import useQueryModifiers from '../hooks/useQueryModifiers'
import { QueryModifierType } from '../types/QueryModifierType'

export const ModifiersContext = createContext(null)

type Props = {
  children: React.ReactNode
}

const modifiersReducer = (state, action) => {
  switch (action.type) {
    case 'resultsPerPage':
      return { ...state, [action.type]: action?.payload }
    case 'page':
      return { ...state, [action.type]: action?.payload }
    default:
      return state
  }
}

const ModifiersProvider = ({ children }: Props) => {
  const [modifiersContext, setModifiersContext] = useState()
  const { modifiers } = useQueryModifiers()
  const createInitialState = (modifiers: QueryModifierType) => {
    return modifiers
  }
  const [state, dispatch] = useReducer(modifiersReducer, modifiers, createInitialState)

  return (
    <ModifiersContext.Provider value={{ modifiersContext, setModifiersContext, state, dispatch }}>
      {children}
    </ModifiersContext.Provider>
  )
}

export default ModifiersProvider
