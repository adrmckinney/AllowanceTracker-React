import { createContext, useState } from 'react'
import { UserChoreType } from '../types/UserChoreType'
import { PaginatorInfoType } from '../types/QueryModifierType'

interface UserChoreSummaryContextInterface {
  userChoresSummaryContext: UserChoreType[]
  setUserChoresSummaryContext: (arg0: UserChoreType[]) => void
  paginatorInfo: PaginatorInfoType
  setPaginatorInfo: (arg0: PaginatorInfoType) => void
  isLoading: boolean
  setIsLoading: (arg0: boolean) => void
}

export const UserChoresSummaryContext = createContext<UserChoreSummaryContextInterface | null>(null)

const UserChoresSummaryProvider = ({ children }) => {
  const [userChoresSummaryContext, setUserChoresSummaryContext] = useState<UserChoreType[] | null>(
    null
  )
  const [paginatorInfo, setPaginatorInfo] = useState<PaginatorInfoType | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  return (
    <UserChoresSummaryContext.Provider
      value={{
        userChoresSummaryContext,
        setUserChoresSummaryContext,
        paginatorInfo,
        setPaginatorInfo,
        isLoading,
        setIsLoading,
      }}
    >
      {children}
    </UserChoresSummaryContext.Provider>
  )
}

export default UserChoresSummaryProvider
