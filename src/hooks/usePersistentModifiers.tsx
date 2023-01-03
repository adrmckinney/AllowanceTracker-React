import { useContext, useEffect } from 'react'
import { ModifiersContext } from '../context/ModifiersProvider'
import { QueryModifierType, SortDirection, SortType } from '../types/QueryModifierType'

export type ModifiersInputType = {
  modifiers: QueryModifierType
}

const usePersistentModifiers = (initialValues: ModifiersInputType = null) => {
  useEffect(() => {
    let ignore = false
    if (!ignore && initialValues !== null) {
      //   setModifiersContext(initialValues)
      localStorage.setItem('modifiers', JSON.stringify(initialValues))
    }

    return () => {
      ignore = true
    }
  }, [!!initialValues])

  const setStorageModifiers = (modifiers: QueryModifierType) => {
    localStorage.setItem('modifiers', JSON.stringify(modifiers))
  }

  const getStorageModifiers = () => {
    return JSON.parse(localStorage.getItem('modifiers'))
  }

  const handlePersistantPagination = (newPage: number) => {
    const currentModifiers = getStorageModifiers()
    let newModifierInput = { ...currentModifiers }
    let modifiersCopy: QueryModifierType = { ...newModifierInput.modifiers }

    const newPageCopy = { ...modifiersCopy, page: newPage }
    newModifierInput.modifiers = newPageCopy

    setStorageModifiers(newModifierInput)
    return newModifierInput
  }

  const handlePersistentSort = (column: string, direction: SortDirection) => {
    const currentModifiers = getStorageModifiers()
    let newModifierInput = { ...currentModifiers }
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

  const setPersistentFilters = (filterKey: string, value: any) => {
    const currentModifiers = getStorageModifiers()
    const newModifiers = {
      ...currentModifiers,
      filters: {
        ...currentModifiers.filters,
        [filterKey]: value,
      },
    }
    setStorageModifiers(newModifiers)
    return newModifiers
  }

  return {
    handlePersistantPagination,
    handlePersistentSort,
    setStorageModifiers,
    getStorageModifiers,
    setPersistentFilters,
  }
}

export default usePersistentModifiers
