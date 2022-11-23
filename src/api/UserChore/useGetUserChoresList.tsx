import { useEffect, useState } from 'react'
import { PaginatorInfoType } from '../../types/QueryModifierType'
import { UserChoreType } from '../../types/UserChoreType'
import { apiUrl } from '../routes'

const useGetUserChoresList = <T,>(api_token: string, input: T) => {
  const [userChores, setUserChores] = useState<UserChoreType[] | null>(null)
  const [paginatorInfo, setPaginatorInfo] = useState<PaginatorInfoType | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(true)

  useEffect(() => {
    let ignore = false

    apiUrl
      .post(`/user/chores`, input, {
        headers: {
          Authorization: `Bearer ${api_token}`,
        },
      })
      .then(res => {
        if (!ignore) {
          setUserChores(res?.data?.data)
          setPaginatorInfo(res?.data?.paginatorInfo)
          setIsLoading(false)
        }
      })

    return () => {
      ignore = true
    }
  }, [api_token, input?.['modifiers']?.['page']])

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

  return { getUserChores, userChores, paginatorInfo, isLoading }
}

export default useGetUserChoresList
