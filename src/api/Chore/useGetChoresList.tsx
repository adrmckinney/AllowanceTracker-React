import { useEffect, useState } from 'react'
import { ChoreType } from '../../types/Chores/ChoreType'
import { apiUrl } from '../routes'

type GetChoresReturnType = {
  getChoresList: (arg0: string) => Promise<SuccessResponse | ErrorResponse>
  chores: ChoreType[]
  isLoading: boolean
  invalidateChores: (arg0: string) => void
}

export type SuccessResponse = ChoreType[]

export type ErrorResponse = {
  error: { message: string; status: number }
}

const useGetChoresList = (api_token: string): GetChoresReturnType => {
  const [chores, setChores] = useState<ChoreType[] | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(true)

  useEffect(() => {
    let ignore = false

    apiUrl
      .get('/chores', {
        headers: {
          Authorization: `Bearer ${api_token}`,
        },
      })
      .then(res => {
        if (!ignore) {
          setChores(res.data)
          setIsLoading(false)
        }
      })

    return () => {
      ignore = true
    }
  }, [api_token])

  const getChoresList = async (api_token: string): Promise<SuccessResponse | ErrorResponse> => {
    try {
      const response = await apiUrl.get('/chores', {
        headers: {
          Authorization: `Bearer ${api_token}`,
        },
      })

      return response?.data
    } catch (error) {
      return { error: { message: error?.response?.data?.message, status: error?.response?.status } }
    }
  }

  const invalidateChores = () => {
    getChoresList(api_token).then((data: ChoreType[]) => setChores(data))
  }

  return { getChoresList, chores, isLoading, invalidateChores }
}

export default useGetChoresList
