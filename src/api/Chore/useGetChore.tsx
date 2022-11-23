import { ChoreType } from '../../types/Chores/ChoreType'
import { apiUrl } from '../routes'

const useGetChore = () => {
  const getChore = async (api_token: string, id: number | string): Promise<ChoreType> => {
    const response = await apiUrl.get(`/chore/${+id}`, {
      headers: {
        Authorization: `Bearer ${api_token}`,
      },
    })

    return response?.data
  }

  return { getChore }
}
export default useGetChore
