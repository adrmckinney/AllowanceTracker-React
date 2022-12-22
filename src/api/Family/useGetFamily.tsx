import { useEffect, useState } from 'react'
import { FamilyType } from '../../types/FamilyType'
import { apiUrl } from '../routes'
import User from '../_entities/user'

const useGetFamily = (api_token: string = '', id: number | string) => {
  const [family, setFamily] = useState<FamilyType | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(true)

  useEffect(() => {
    if (id !== null) {
      if (api_token?.length > 0) {
        let ignore = false

        apiUrl
          .get(`/family/${+id}`, {
            headers: {
              Authorization: `Bearer ${api_token}`,
            },
          })
          .then((res) => {
            if (!ignore) {
              setFamily(User(res?.data))
              setIsLoading(false)
            }
          })

        return () => {
          ignore = true
        }
      }
    }
  }, [api_token, id])

  const getFamily = async (api_token: string, id: number | string): Promise<FamilyType> => {
    const response = await apiUrl.get(`/family/${+id}`, {
      headers: {
        Authorization: `Bearer ${api_token}`,
      },
    })

    setFamily(User(response.data))
    return response?.data
  }

  return { getFamily, family, isLoading }
}
export default useGetFamily
