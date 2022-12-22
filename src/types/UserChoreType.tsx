export interface UserChoreType {
  id: number
  user: ChoreUser
  chore: Chore
  approver: Approver
  amount: number
  chore_status: number
  approval_request_date: EpochTimeStamp
  approval_date: EpochTimeStamp
  rejector: Rejector
  rejection_reason: string
  rejection_date: EpochTimeStamp
  created_at: EpochTimeStamp
}

interface ChoreUser {
  id: number
  name: string
  wallet: number
}

interface Chore {
  id: number
  name: string
}

interface Approver {
  id: number
  name: string
}

interface Rejector {
  id: number
  name: string
}

export type UpsertUserChoreInputType = {
  id?: number
  user_id: number
  chore_id: number
  chore_name: string
  amount: number
  chore_status: number
}
