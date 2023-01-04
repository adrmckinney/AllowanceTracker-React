export interface QueryModifierType {
  resultsPerPage: number | undefined
  page: number
  searchTarget: string
  filters: FilterOptionsType
  sorts: SortType
}

// if adding option here, don't forget to add also to
// useQueryModifiers.tsx filterOptions constant
export interface FilterOptionsType {
  moneyRanges: MoneyRangeType[]
  dateRanges: DateRangeType[]
  userChoreUserId: number | null
  userChoreChoreId: number | null
  transferUserId: number | null
  transactionUserId: number | null
  flags?: string[] | undefined
  choreStatuses: number[] | []
  transferStatuses: number[] | []
}

export interface MoneyRangeType {
  min: number | null
  max: number | null
}
export interface DateRangeType {
  start: string
  end: string
}

export interface PaginatorInfoType {
  currentPage: number
  lastPage: number
  perPage: number
  total: number
}

export interface SortType {
  column: string
  direction: SortDirection
}

export type SortDirection = 'asc' | 'desc' | '' | string
