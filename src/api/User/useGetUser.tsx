import { useContext } from 'react'
import UserContext from '../../context/UserContext'
import { UserType } from '../../types/UserType'
import { apiUrl } from '../routes'

const useGetUser = () => {
  const { setUserContext } = useContext(UserContext)
  const getUser = async (api_token: string, id: number | string): Promise<UserType> => {
    const response = await apiUrl.get(`/user/${+id}`, {
      headers: {
        Authorization: `Bearer ${api_token}`,
      },
    })

    setUserContext(response.data)
    return response?.data
  }

  return { getUser }
}
export default useGetUser
