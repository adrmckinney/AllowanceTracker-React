import { apiUrl } from '../routes'
import useGetUser from './useGetUser'

const useUpsertUser = () => {
  const { getUser } = useGetUser()
  const upsertUser = async <T,>(api_token: string, input: T) => {
    const response = await apiUrl.post('/user/upsert', input, {
      headers: {
        Authorization: `Bearer ${api_token}`,
      },
    })

    invalidateUser(api_token, response?.data.id)

    return {
      userData: response.data,
    }
  }

  const invalidateUser = (api_token: string, id: number | string) => {
    getUser(api_token, id).then(res => res)
  }

  return { upsertUser, invalidateUser }
}

export default useUpsertUser
