import { createContext, useState } from 'react'
import { UserChoreType } from '../types/UserChoreType'
import { PaginatorInfoType } from '../types/QueryModifierType'

interface UserChoresContextInterface {
  userChoresContext: UserChoreType[]
  setUserChoresContext: (arg0: UserChoreType[]) => void
  paginatorInfo: PaginatorInfoType
  setPaginatorInfo: (arg0: PaginatorInfoType) => void
  isLoading: boolean
  setIsLoading: (arg0: boolean) => void
}

export const UserChoresContext = createContext<UserChoresContextInterface | null>(null)

const UserChoresProvider = ({ children }) => {
  const [userChoresContext, setUserChoresContext] = useState<UserChoreType[] | null>(null)
  const [paginatorInfo, setPaginatorInfo] = useState<PaginatorInfoType | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  return (
    <UserChoresContext.Provider
      value={{
        userChoresContext,
        setUserChoresContext,
        paginatorInfo,
        setPaginatorInfo,
        isLoading,
        setIsLoading,
      }}
    >
      {children}
    </UserChoresContext.Provider>
  )
}

export default UserChoresProvider
