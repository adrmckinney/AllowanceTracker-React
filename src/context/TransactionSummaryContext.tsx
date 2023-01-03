import { createContext, useState } from 'react'
import { PaginatorInfoType } from '../types/QueryModifierType'
import { TransactionType } from '../types/TransactionType'

interface TransactionsSummaryContextInterface {
  transactionsSummaryContext: TransactionType[]
  setTransactionsSummaryContext: (arg0: TransactionType[]) => void
  paginatorInfo: PaginatorInfoType
  setPaginatorInfo: (arg0: PaginatorInfoType) => void
  isLoading: boolean
  setIsLoading: (arg0: boolean) => void
}

export const TransactionSummaryContext = createContext<TransactionsSummaryContextInterface | null>(
  null
)

const TransactionsSummaryProvider = ({ children }) => {
  const [transactionsSummaryContext, setTransactionsSummaryContext] = useState<
    TransactionType[] | null
  >(null)
  const [paginatorInfo, setPaginatorInfo] = useState<PaginatorInfoType | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  return (
    <TransactionSummaryContext.Provider
      value={{
        transactionsSummaryContext,
        setTransactionsSummaryContext,
        paginatorInfo,
        setPaginatorInfo,
        isLoading,
        setIsLoading,
      }}
    >
      {children}
    </TransactionSummaryContext.Provider>
  )
}

export default TransactionsSummaryProvider
