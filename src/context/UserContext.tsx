import { createContext } from 'react'
import { UserType } from '../types/UserType'

interface UserContextInterface {
  userContext: UserType
  setUserContext: (arg0: UserType) => void
  isLoadingUserContext: boolean
  setIsLoadingUserContext: (arg0: boolean) => void
}

const UserContext = createContext<UserContextInterface | null>(null)

export default UserContext
