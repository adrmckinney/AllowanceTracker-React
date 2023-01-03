import { useContext, useEffect } from 'react'
import { apiUrl } from '../routes'
import { TransferSummaryContext } from '../../context/TransferSummaryProvider'

const useGetUserTransfers = <T,>(api_token: string, input: T) => {
  const { setTransferSummaryContext, setPaginatorInfo, setIsLoading } =
    useContext(TransferSummaryContext)

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
          setTransferSummaryContext(res?.data?.data)
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

    setTransferSummaryContext(response?.data?.data)
    setPaginatorInfo(response?.data?.paginatorInfo)
    setIsLoading(false)

    return {
      transfers: response?.data?.data,
      paginatorInfo: response?.data?.paginatorInfo,
    }
  }

  return { getUserTransfers }
}

export default useGetUserTransfers
