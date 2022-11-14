import { apiUrl } from '../routes'

const useGetUserChoresList = () => {
  const getUserChores = async <T,>(token: string, input: T) => {
    const response = await apiUrl.post(`/user/chores`, input, {
      headers: {
        Authorization: `Bearer ${token}`,
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
