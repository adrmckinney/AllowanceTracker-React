import { createContext } from 'react'
import { UserType } from '../types/UserType'

interface UserContextInterface {
  userContext: UserType
  setUserContext: (arg0: UserType) => void
}

const UserContext = createContext<UserContextInterface>(null)

export default UserContext
