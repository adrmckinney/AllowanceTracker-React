import { ChoreType } from '../../types/Chores/ChoreType'
import { apiUrl } from '../routes'
import useGetChore from './useGetChore'

export type SuccessResponse = {
  choreData: ChoreType
}

export type ErrorResponse = {
  error: { message: string; status: number }
}

const useUpsertChore = () => {
  const { getChore } = useGetChore()
  const upsertChore = async <T,>(
    api_token: string,
    input: T,
    id: number = null
  ): Promise<SuccessResponse | ErrorResponse> => {
    try {
      const response = await apiUrl.post(`/chore/upsert/${id}`, input, {
        headers: {
          Authorization: `Bearer ${api_token}`,
        },
      })

      return {
        choreData: response.data,
      }
    } catch (error) {
      return { error: { message: error?.response?.data?.message, status: error?.response?.status } }
    }
  }

  const invalidateChore = (api_token: string, id: number | string) => {
    getChore(api_token, id).then(res => res)
  }

  return { upsertChore, invalidateChore }
}

export default useUpsertChore
