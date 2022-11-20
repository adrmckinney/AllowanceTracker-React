import { apiUrl } from '../routes'

const useGetUserTransfers = () => {
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

  return { getUserTransfers }
}

export default useGetUserTransfers
