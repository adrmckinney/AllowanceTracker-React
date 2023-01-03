export interface TransferType {
  id: number
  sender: Sender
  receiver: Receiver
  amount: number
  transfer_status: number
  approval_request_date: EpochTimeStamp
  approver: Approver
  approval_date: EpochTimeStamp
  rejector: Rejector
  rejection_reason: string
  rejection_date: EpochTimeStamp
  created_at: EpochTimeStamp
  updated_at: EpochTimeStamp
  transactions_created: boolean
}

export interface Sender {
  id: number
  name: string
  wallet: number
}

export interface Receiver {
  id: number
  name: string
  wallet: number
}

interface Approver {
  id: number
  name: string
}

interface Rejector {
  id: number
  name: string
}
