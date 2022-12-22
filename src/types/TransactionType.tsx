import { Receiver, Sender } from './TransferType'

export interface TransactionType {
  id: number
  transfer: Transfer
  user_chore: UserChore
  amount: number
  direction: number
  user: User
  created_at: EpochTimeStamp
}

interface User {
  id: number
  name: string
}

interface Transfer {
  id: number | null
  sender: Sender
  receiver: Receiver
}

interface UserChore {
  id: number | null
  chore: {
    id: number | null
    name: string | null
  }
}
