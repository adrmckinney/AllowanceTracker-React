import { useEffect } from 'react'
import {
  FilterOptionsType,
  QueryModifierType,
  SortDirection,
  SortType,
} from '../types/QueryModifierType'
import { ModifierFilterTypes } from './useQueryModifiers'

export type ModifiersInputType = {
  modifiers: QueryModifierType
}

const usePersistentModifiers = (initialValues: ModifiersInputType = null) => {
  useEffect(() => {
    let ignore = false
    if (!ignore && initialValues !== null) {
      localStorage.setItem('modifiers', JSON.stringify(initialValues))
    }

    return () => {
      ignore = true
    }
  }, [!!initialValues])

  const setStorageModifiers = (modifiers: ModifiersInputType) => {
    localStorage.setItem('modifiers', JSON.stringify(modifiers))
  }

  const getStorageModifiers = () => {
    return JSON.parse(localStorage.getItem('modifiers'))
  }

  const handlePersistantPagination = (newPage: number) => {
    let newModifierInput = { ...getStorageModifiers() }
    let modifiersCopy: QueryModifierType = { ...newModifierInput.modifiers }

    const newPageCopy = { ...modifiersCopy, page: newPage }
    newModifierInput.modifiers = newPageCopy

    setStorageModifiers(newModifierInput)
    return newModifierInput
  }

  const handlePersistentSort = (column: string, direction: SortDirection) => {
    let newModifierInput = { ...getStorageModifiers() }
    let modifiersCopy: QueryModifierType = { ...newModifierInput.modifiers }
    let sortsCopy: QueryModifierType = {
      ...modifiersCopy,
      sorts: {
        ...modifiersCopy.sorts,
      },
    }

    const newSort: SortType = { column, direction }
    modifiersCopy = { ...sortsCopy, sorts: newSort }
    newModifierInput.modifiers = modifiersCopy

    setStorageModifiers(newModifierInput)
    return newModifierInput
  }

  const setPersistentFilters = (filterKey: ModifierFilterTypes, value: number) => {
    const currentFilterValues = getStorageFilterValues(filterKey)
    let newModifiersInput: ModifiersInputType = { ...getStorageModifiers() }
    let modifiersCopy: QueryModifierType = { ...newModifiersInput.modifiers }
    let filtersCopy: FilterOptionsType = { ...modifiersCopy.filters }
    let targetFilterValues: number[] = [...filtersCopy?.[filterKey]]

    if (currentFilterValues?.includes(value)) {
      const valueIdx = currentFilterValues?.indexOf(value)
      targetFilterValues?.splice(valueIdx, 1)

      filtersCopy[filterKey] = targetFilterValues
      modifiersCopy.filters = filtersCopy
      newModifiersInput.modifiers = modifiersCopy

      setStorageModifiers(newModifiersInput)
      return { modifiers: newModifiersInput, action: 'splice' }
    } else {
      const newFilterValues: number[] = [...targetFilterValues, value]
      filtersCopy[filterKey] = newFilterValues
      modifiersCopy.filters = filtersCopy
      newModifiersInput.modifiers = modifiersCopy

      setStorageModifiers(newModifiersInput)
      return { modifiers: newModifiersInput, action: 'push' }
    }
  }

  const getStorageFilterValues = (target: ModifierFilterTypes) => {
    return getStorageModifiers().modifiers?.filters?.[target]
  }

  const resetStorageFilters = () => {
    setStorageModifiers(initialValues)
  }

  return {
    handlePersistantPagination,
    handlePersistentSort,
    setStorageModifiers,
    getStorageModifiers,
    setPersistentFilters,
    getStorageFilterValues,
    resetStorageFilters,
  }
}

export default usePersistentModifiers
