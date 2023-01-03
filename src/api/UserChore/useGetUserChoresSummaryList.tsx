import { useContext, useEffect } from 'react'
import { PaginatorInfoType } from '../../types/QueryModifierType'
import { UserChoreType } from '../../types/UserChoreType'
import { apiUrl } from '../routes'
import { UserChoresSummaryContext } from '../../context/UserChoresSummaryProvider'
import { ErrorMessageType } from '../../types/ErrorType'

export type UserChoresListSuccessResponse = {
  chores: UserChoreType[]
  paginatorInfo: PaginatorInfoType
}

export type ErrorResponse = {
  error: ErrorMessageType
}

const useGetUserChoresSummaryList = <T,>(api_token: string, input: T) => {
  const { setUserChoresSummaryContext, setIsLoading, setPaginatorInfo } =
    useContext(UserChoresSummaryContext)

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
          setUserChoresSummaryContext(res?.data?.data)
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

    setUserChoresSummaryContext(response?.data?.data)
    setPaginatorInfo(response?.data?.paginatorInfo)
    setIsLoading(false)

    return {
      chores: response?.data?.data,
      paginatorInfo: response?.data?.paginatorInfo,
    }
  }

  return {
    getUserChores,
    // userChores, paginatorInfo, isLoading
  }
}

export default useGetUserChoresSummaryList
