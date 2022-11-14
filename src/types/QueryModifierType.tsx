export interface QueryModifierType {
  resultsPerPage: number | undefined
  page: number
  searchTarget: string
  filters: FilterOptionsType
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
