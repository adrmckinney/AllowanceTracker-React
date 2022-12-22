import { TransferType } from '../types/TransferType'

export const isTransferSender = (userId: number, transfer: Partial<TransferType>): boolean => {
  return userId === transfer?.sender?.id
}

export const getSenderOrReceiver = (isSender: boolean, transfer: Partial<TransferType>): string => {
  if (isSender) {
    return `To ${transfer?.receiver?.name?.split(' ')[0]}`
  } else {
    return `From ${transfer?.sender?.name?.split(' ')[0]}`
  }
}
