import useAuthUser from '../../hooks/useAuthUser'
import { FamilyType } from '../../types/FamilyType'
import { apiUrl } from '../routes'
import useGetFamily from './useGetFamily'

export interface SuccessResponse extends FamilyType {
  updated_at: EpochTimeStamp
  deleted_at: EpochTimeStamp | null
}

export type ErrorResponse = {
  error: { message: string; status: number }
}

const useUpsertFamily = () => {
  const { authUser } = useAuthUser()
  const { getFamily } = useGetFamily(authUser?.api_token, authUser?.family_id)

  const upsertFamily = async <T,>(
    api_token: string,
    input: T,
    id: number = null
  ): Promise<SuccessResponse | ErrorResponse | any> => {
    try {
      const response = await apiUrl.post(`/family/upsert/${id}`, input, {
        headers: {
          Authorization: `Bearer ${api_token}`,
        },
      })

      return response.data
    } catch (error) {
      return { error: { message: error?.response?.data?.message, status: error?.response?.status } }
    }
  }

  const invalidateFamily = (api_token: string, id: number | string) => {
    getFamily(api_token, id).then((res) => res)
  }

  return { upsertFamily, invalidateFamily }
}

export default useUpsertFamily
