import { apiUrl } from '../routes'

export type SuccessResponse = boolean

export type ErrorResponse = {
  error: { message: string; status: number }
}

const useDeleteChore = () => {
  const deleteChore = async (
    api_token: string,
    id: number
  ): Promise<SuccessResponse | ErrorResponse> => {
    try {
      const response = await apiUrl.delete(`/chore/${id}`, {
        headers: {
          Authorization: `Bearer ${api_token}`,
        },
      })

      return response?.data
    } catch (error) {
      return { error: { message: error?.response?.data?.message, status: error?.response?.status } }
    }
  }

  return { deleteChore }
}

export default useDeleteChore
