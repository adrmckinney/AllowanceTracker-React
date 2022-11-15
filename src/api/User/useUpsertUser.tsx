import { apiUrl } from '../routes'
import useGetUser from './useGetUser'

const useUpsertUser = () => {
  const { getUser } = useGetUser()
  const upsertUser = async <T,>(token: string, input: T) => {
    const response = await apiUrl.post('/user/upsert', input, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    invalidateUser(token, response?.data.id)

    return {
      userData: response.data,
    }
  }

  const invalidateUser = (token: string, id: number | string) => {
    getUser(token, id).then(res => res)
  }

  return { upsertUser, invalidateUser }
}

export default useUpsertUser
