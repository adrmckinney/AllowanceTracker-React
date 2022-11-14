import { AuthUserType } from './AuthUserType'

export interface UserType extends AuthUserType {
  wallet: number
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
