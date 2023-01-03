import { createContext, useState } from 'react'
import { PaginatorInfoType } from '../types/QueryModifierType'
import { TransferType } from '../types/TransferType'

interface TransferSummaryContextInterface {
  transferSummaryContext: TransferType[]
  setTransferSummaryContext: (arg0: TransferType[]) => void
  paginatorInfo: PaginatorInfoType
  setPaginatorInfo: (arg0: PaginatorInfoType) => void
  isLoading: boolean
  setIsLoading: (arg0: boolean) => void
}

export const TransferSummaryContext = createContext<TransferSummaryContextInterface | null>(null)

const TransferSummaryProvider = ({ children }) => {
  const [transferSummaryContext, setTransferSummaryContext] = useState<TransferType[] | null>(null)
  const [paginatorInfo, setPaginatorInfo] = useState<PaginatorInfoType | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  return (
    <TransferSummaryContext.Provider
      value={{
        transferSummaryContext,
        setTransferSummaryContext,
        paginatorInfo,
        setPaginatorInfo,
        isLoading,
        setIsLoading,
      }}
    >
      {children}
    </TransferSummaryContext.Provider>
  )
}

export default TransferSummaryProvider
