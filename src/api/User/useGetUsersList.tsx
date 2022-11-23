import { UserType } from '../../types/UserType'
import { apiUrl } from '../routes'

export type SuccessResponse = {
  usersListData: UserType[]
}

export type ErrorResponse = {
  error: { message: string; status: number }
}

const useGetUsersList = () => {
  const getUsersList = async (api_token: string): Promise<SuccessResponse | ErrorResponse> => {
    try {
      const response = await apiUrl.get('/users', {
        headers: {
          Authorization: `Bearer ${api_token}`,
        },
      })

      return { usersListData: response?.data }
    } catch (error) {
      return { error: { message: error?.response?.data?.message, status: error?.response?.status } }
    }
  }

  return { getUsersList }
}

export default useGetUsersList
