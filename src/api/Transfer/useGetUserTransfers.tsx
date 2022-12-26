import { useEffect, useState } from 'react'
import { PaginatorInfoType } from '../../types/QueryModifierType'
import { TransferType } from '../../types/TransferType'
import { apiUrl } from '../routes'

const useGetUserTransfers = <T,>(api_token: string, input: T) => {
  const [userTransfers, setUserTransfers] = useState<TransferType[] | null>(null)
  const [paginatorInfo, setPaginatorInfo] = useState<PaginatorInfoType | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(true)

  useEffect(() => {
    let ignore = false

    apiUrl
      .post(`/transfers/user`, input, {
        headers: {
          Authorization: `Bearer ${api_token}`,
        },
      })
      .then((res) => {
        if (!ignore) {
          setUserTransfers(res?.data?.data)
          setPaginatorInfo(res?.data?.paginatorInfo)
          setIsLoading(false)
        }
      })

    return () => {
      ignore = true
    }
  }, [api_token, input?.['modifiers']?.['page']])

  const getUserTransfers = async <T,>(api_token: string, input: T) => {
    const response = await apiUrl.post('/transfers/user', input, {
      headers: {
        Authorization: `Bearer ${api_token}`,
      },
    })
    return {
      transfers: response?.data?.data,
      paginatorInfo: response?.data?.paginatorInfo,
    }
  }

  return { getUserTransfers, userTransfers, paginatorInfo, isLoading }
}

export default useGetUserTransfers
