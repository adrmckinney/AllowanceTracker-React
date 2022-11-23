import { AuthUserType } from './AuthUserType'

export interface UserType extends Omit<AuthUserType, 'api_token'> {
  wallet: number
  number: string
  date_of_birth: EpochTimeStamp | Date
  chores: UserChoresSummaryType
  transactions: UserTransactionsSummaryType
}

export interface UserChoresSummaryType {
  choresCount: number
  totalChoresIncome: number
  pendingChoresCount: number
  rejectedChoresCount: number
  completedChoresCount: number
}

export interface UserTransactionsSummaryType {
  totalDebit: number
  totalCredit: number
}
