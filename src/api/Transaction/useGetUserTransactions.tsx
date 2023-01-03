import { useContext, useEffect } from 'react'
import { PaginatorInfoType } from '../../types/QueryModifierType'
import { TransactionType } from '../../types/TransactionType'
import { apiUrl } from '../routes'
import { TransactionSummaryContext } from '../../context/TransactionSummaryContext'
import { ErrorMessageType } from '../../types/ErrorType'

export type TransactionsSuccessResponse = {
  transactions: TransactionType[]
  paginatorInfo: PaginatorInfoType
}

export type ErrorResponse = {
  error: ErrorMessageType
}

const useGetUserTransactions = <T,>(api_token: string, input: T) => {
  const { setTransactionsSummaryContext, setIsLoading, setPaginatorInfo } =
    useContext(TransactionSummaryContext)

  useEffect(() => {
    let ignore = false

    apiUrl
      .post(`/transactions/user`, input, {
        headers: {
          Authorization: `Bearer ${api_token}`,
        },
      })
      .then((res) => {
        if (!ignore) {
          setTransactionsSummaryContext(res?.data?.data)
          setPaginatorInfo(res?.data?.paginatorInfo)
          setIsLoading(false)
        }
      })

    return () => {
      ignore = true
    }
  }, [api_token, input?.['modifiers']?.['page']])

  const getUserTransactions = async <T,>(
    api_token: string,
    input: T
  ): Promise<TransactionsSuccessResponse> => {
    const response = await apiUrl.post(`/transactions/user`, input, {
      headers: {
        Authorization: `Bearer ${api_token}`,
      },
    })

    setTransactionsSummaryContext(response?.data?.data)
    setPaginatorInfo(response?.data?.paginatorInfo)
    setIsLoading(false)

    return {
      transactions: response?.data?.data,
      paginatorInfo: response?.data?.paginatorInfo,
    }
  }

  return { getUserTransactions }
}

export default useGetUserTransactions
