import { useEffect, useState } from 'react'
import { UserType } from '../../types/UserType'
import { apiUrl } from '../routes'

export type SuccessResponse = UserType[]

export type ErrorResponse = {
  error: { message: string; status: number }
}

const useGetUsersList = (api_token: string) => {
  const [users, setUsers] = useState<UserType[] | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(true)

  useEffect(() => {
    apiUrl
      .get('/users', {
        headers: {
          Authorization: `Bearer ${api_token}`,
        },
      })
      .then(res => {
        setUsers(res?.data)
        setIsLoading(false)
      })
  }, [api_token])

  const getUsersList = async (api_token: string): Promise<SuccessResponse | ErrorResponse> => {
    try {
      const response = await apiUrl.get('/users', {
        headers: {
          Authorization: `Bearer ${api_token}`,
        },
      })

      return response?.data
    } catch (error) {
      return { error: { message: error?.response?.data?.message, status: error?.response?.status } }
    }
  }

  const invalidateUsers = (api_token: string) => {
    getUsersList(api_token).then((data: UserType[]) => setUsers(data))
  }

  return { getUsersList, users, isLoading, invalidateUsers }
}

export default useGetUsersList
