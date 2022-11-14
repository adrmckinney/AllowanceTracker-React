import { apiUrl } from '../routes'

const useGetUserTransactions = () => {
  const getUserTransactions = async <T,>(token: string, input: T) => {
    const response = await apiUrl.post(`/transactions/user`, input, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    return {
      transactions: response?.data?.data,
      paginatorInfo: response?.data?.paginatorInfo,
    }
  }

  return { getUserTransactions }
}

export default useGetUserTransactions
