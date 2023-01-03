import { ErrorMessageType } from '../../types/ErrorType'
import { TransferType } from '../../types/TransferType'
import { apiUrl } from '../routes'

export type UpsertTransferSuccessResponse = {
  transferData: TransferType
}

export type ErrorResponse = {
  error: ErrorMessageType
}

const useUpsertTransfer = () => {
  const upsertTransfer = async <T,>(
    api_token: string,
    input: T,
    id: number = null
  ): Promise<UpsertTransferSuccessResponse | ErrorResponse> => {
    try {
      const response = await apiUrl.post(`/transfer/upsert/${id}`, input, {
        headers: {
          Authorization: `Bearer ${api_token}`,
        },
      })

      return {
        transferData: response.data,
      }
    } catch (error) {
      return { error: { message: error?.response?.data?.message, status: error?.response?.status } }
    }
  }

  return { upsertTransfer }
}

export default useUpsertTransfer
