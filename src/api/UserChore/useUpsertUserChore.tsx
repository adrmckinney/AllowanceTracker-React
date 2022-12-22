import { UserChoreType } from '../../types/UserChoreType'
import { apiUrl } from '../routes'

export type SuccessResponse = UserChoreType

export type ErrorResponse = {
  error: { message: string; status: number }
}

const useUpsertUserChore = () => {
  const upsertUserChore = async <T,>(
    api_token: string,
    input: T,
    id: number = null
  ): Promise<SuccessResponse | ErrorResponse> => {
    try {
      const response = await apiUrl.post(`/user/chore/upsert/${id}`, input, {
        headers: {
          Authorization: `Bearer ${api_token}`,
        },
      })

      return response.data
    } catch (error) {
      return { error: { message: error?.response?.data?.message, status: error?.response?.status } }
    }
  }

  return { upsertUserChore }
}

export default useUpsertUserChore
