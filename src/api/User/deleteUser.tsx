import { apiUrl } from '../routes'

export type SuccessResponse = boolean

export type ErrorResponse = {
  error: { message: string; status: number }
}

const useDeleteUser = () => {
  const deleteUser = async (
    api_token: string,
    id: number
  ): Promise<SuccessResponse | ErrorResponse> => {
    try {
      const response = await apiUrl.delete(`/user/${id}`, {
        headers: {
          Authorization: `Bearer ${api_token}`,
        },
      })

      return response?.data
    } catch (error) {
      return { error: { message: error?.response?.data?.message, status: error?.response?.status } }
    }
  }

  return { deleteUser }
}

export default useDeleteUser
