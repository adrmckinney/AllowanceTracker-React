import { apiUrl } from '../routes'

const useGetUserChoresList = () => {
  const getUserChores = async <T,>(api_token: string, input: T) => {
    const response = await apiUrl.post(`/user/chores`, input, {
      headers: {
        Authorization: `Bearer ${api_token}`,
      },
    })

    return {
      chores: response?.data?.data,
      paginatorInfo: response?.data?.paginatorInfo,
    }
  }

  return { getUserChores }
}

export default useGetUserChoresList
