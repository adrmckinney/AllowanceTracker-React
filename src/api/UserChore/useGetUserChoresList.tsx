import { useContext, useEffect } from 'react'
import { PaginatorInfoType } from '../../types/QueryModifierType'
import { UserChoreType } from '../../types/UserChoreType'
import { apiUrl } from '../routes'
import { ErrorMessageType } from '../../types/ErrorType'
import { UserChoresContext } from '../../context/UserChoresListProvider'

export type UserChoresListSuccessResponse = {
  chores: UserChoreType[]
  paginatorInfo: PaginatorInfoType
}

export type ErrorResponse = {
  error: ErrorMessageType
}

const useGetUserChoresList = <T,>(api_token: string, input: T) => {
  const { setUserChoresContext, setIsLoading, setPaginatorInfo } = useContext(UserChoresContext)

  useEffect(() => {
    let ignore = false

    apiUrl
      .post(`/user/chores`, input, {
        headers: {
          Authorization: `Bearer ${api_token}`,
        },
      })
      .then((res) => {
        if (!ignore) {
          setUserChoresContext(res?.data?.data)
          setPaginatorInfo(res?.data?.paginatorInfo)
          setIsLoading(false)
        }
      })

    return () => {
      ignore = true
    }
  }, [api_token, input?.['modifiers']?.['page']])

  const getUserChores = async <T,>(
    api_token: string,
    input: T
  ): Promise<UserChoresListSuccessResponse> => {
    const response = await apiUrl.post(`/user/chores`, input, {
      headers: {
        Authorization: `Bearer ${api_token}`,
      },
    })

    setUserChoresContext(response?.data?.data)
    setPaginatorInfo(response?.data?.paginatorInfo)
    setIsLoading(false)

    return {
      chores: response?.data?.data,
      paginatorInfo: response?.data?.paginatorInfo,
    }
  }

  return { getUserChores }
}

export default useGetUserChoresList
