import { useState } from 'react'
import { FilterOptionsType, PaginatorInfoType, QueryModifierType } from '../types/QueryModifierType'

type MultipleModifierOptions = {
  resultsPerPage: number
  filterKey: string
  filterValue: any
}

const filterOptions: FilterOptionsType = {
  moneyRanges: [{ min: null, max: null }],
  dateRanges: [{ start: '', end: '' }],
  userChoreUserId: null,
  userChoreChoreId: null,
  transferUserId: null,
  transactionUserId: null,
  choreStatus: null,
  transferStatus: null,
}

export const defaultQueryModifiers: QueryModifierType = {
  resultsPerPage: 10,
  page: 1,
  searchTarget: '',
  filters: filterOptions,
  sorts: { column: '', direction: '' },
}

const useQueryModifiers = (initialPage: number = 1, resultsPerPage: number = 10) => {
  const defaultPaginatorInfo: PaginatorInfoType = {
    currentPage: 1,
    lastPage: 1,
    perPage: 10,
    total: 10,
  }
  const [modifiers, setQueryModifiers] = useState<QueryModifierType>(defaultQueryModifiers)

  const setPage = (page: number) => {
    setQueryModifiers({
      ...modifiers,
      page,
    })
  }

  const setResultsPerPage = (resultsPerPage: number) => {
    const newModifiers = {
      ...modifiers,
      resultsPerPage: resultsPerPage,
    }
    setQueryModifiers(newModifiers)
    return newModifiers
  }

  const setSearchTarget = (searchTarget: string) => {
    setQueryModifiers({
      ...modifiers,
      page: initialPage,
      searchTarget,
    })
  }

  const setFilters = (filterKey: string, value: any) => {
    const newModifiers = {
      ...modifiers,
      page: initialPage,
      filters: {
        ...modifiers.filters,
        [filterKey]: value,
      },
    }
    setQueryModifiers(newModifiers)
    return newModifiers
  }

  const setMultipleModifierOptions = ({
    resultsPerPage,
    filterKey,
    filterValue,
  }: Partial<MultipleModifierOptions>) => {
    const newModifiers = {
      ...modifiers,
      page: initialPage,
      resultsPerPage: resultsPerPage,
      filters: {
        ...modifiers.filters,
        [filterKey]: filterValue,
      },
    }
    setQueryModifiers(newModifiers)
    return newModifiers
  }

  const renderPagination = (paginatorInfo: PaginatorInfoType) => {
    return (
      // <DetailedPaginator
      //     paginatorInfo={paginatorInfo}
      //     setPage={(newPage) => setPage(newPage)}
      //     currentPage={modifiers.page}
      // />
      'build a paginator for this'
    )
  }

  return {
    setters: {
      setFilters,
      setPage,
      nextPage: () => setPage(modifiers?.page + 1),
      setSearchTarget,
      setResultsPerPage,
      setQueryModifiers,
      setMultipleModifierOptions,
    },
    renders: {
      renderPagination,
    },
    modifiers,
    defaultQueryModifiers,
    defaultPaginatorInfo,
  }
}

export default useQueryModifiers
