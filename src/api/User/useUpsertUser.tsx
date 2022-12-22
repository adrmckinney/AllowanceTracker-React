import { useState } from 'react'
import { apiUrl } from '../routes'
import useGetUser from './useGetUser'
import { UserType } from '../../types/UserType'

const useUpsertUser = () => {
  const { getUser } = useGetUser()

  const upsertUser = async <T,>(api_token: string, input: T): Promise<UserType> => {
    const updatedUser = await apiUrl
      .post('/user/upsert', input, {
        headers: {
          Authorization: `Bearer ${api_token}`,
        },
      })
      .then((res) => {
        const id = res?.data?.id
        invalidateUser(api_token, id)
        return res?.data
      })

    return updatedUser
  }

  const invalidateUser = (api_token: string, id: number | string) => {
    getUser(api_token, id)
  }

  return { upsertUser, invalidateUser }
}

export default useUpsertUser
