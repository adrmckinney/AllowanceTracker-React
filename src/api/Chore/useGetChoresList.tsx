import { ChoreType } from '../../types/Chores/ChoreType'
import { apiUrl } from '../routes'

export type SuccessResponse = {
  choresListData: ChoreType[]
}

export type ErrorResponse = {
  error: { message: string; status: number }
}

const useGetChoresList = () => {
  const getChoresList = async (api_token: string): Promise<SuccessResponse | ErrorResponse> => {
    try {
      const response = await apiUrl.get('/chores', {
        headers: {
          Authorization: `Bearer ${api_token}`,
        },
      })

      return { choresListData: response?.data }
    } catch (error) {
      return { error: { message: error?.response?.data?.message, status: error?.response?.status } }
    }
  }

  return { getChoresList }
}

export default useGetChoresList
