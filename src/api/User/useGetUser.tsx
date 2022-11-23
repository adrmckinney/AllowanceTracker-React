import { useContext, useEffect } from 'react'
import UserContext from '../../context/UserContext'
import { UserType } from '../../types/UserType'
import { apiUrl } from '../routes'
import User from '../_entities/user'

const useGetUser = (api_token: string = '', id: number | string = null) => {
  const { setUserContext, setIsLoadingUserContext } = useContext(UserContext)

  useEffect(() => {
    if (api_token?.length > 0) {
      let ignore = false

      apiUrl
        .get(`/user/${+id}`, {
          headers: {
            Authorization: `Bearer ${api_token}`,
          },
        })
        .then(res => {
          if (!ignore) {
            setUserContext(User(res?.data))
            setIsLoadingUserContext(false)
          }
        })

      return () => {
        ignore = true
      }
    }
  }, [api_token, id])

  const getUser = async (api_token: string, id: number | string): Promise<UserType> => {
    const response = await apiUrl.get(`/user/${+id}`, {
      headers: {
        Authorization: `Bearer ${api_token}`,
      },
    })

    setUserContext(User(response.data))
    return response?.data
  }

  return { getUser }
}
export default useGetUser
