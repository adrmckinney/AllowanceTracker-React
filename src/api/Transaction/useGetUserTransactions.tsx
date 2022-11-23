import { useEffect, useState } from 'react'
import { PaginatorInfoType } from '../../types/QueryModifierType'
import { TransactionType } from '../../types/TransactionType'
import { apiUrl } from '../routes'

const useGetUserTransactions = <T,>(api_token: string, input: T) => {
  const [userTransactions, setUserTransactions] = useState<TransactionType[] | null>(null)
  const [paginatorInfo, setPaginatorInfo] = useState<PaginatorInfoType | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(true)

  useEffect(() => {
    let ignore = false

    apiUrl
      .post(`/transactions/user`, input, {
        headers: {
          Authorization: `Bearer ${api_token}`,
        },
      })
      .then(res => {
        if (!ignore) {
          setUserTransactions(res?.data?.data)
          setPaginatorInfo(res?.data?.paginatorInfo)
          setIsLoading(false)
        }
      })

    return () => {
      ignore = true
    }
  }, [api_token, input?.['modifiers']?.['page']])

  const getUserTransactions = async <T,>(api_token: string, input: T) => {
    const response = await apiUrl.post(`/transactions/user`, input, {
      headers: {
        Authorization: `Bearer ${api_token}`,
      },
    })

    return {
      transactions: response?.data?.data,
      paginatorInfo: response?.data?.paginatorInfo,
    }
  }

  return { getUserTransactions, userTransactions, paginatorInfo, isLoading }
}

export default useGetUserTransactions
