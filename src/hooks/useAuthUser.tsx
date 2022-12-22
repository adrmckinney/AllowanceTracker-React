import PermissionTypes from '../configs/Enums/PermissionTypes'
import { AuthUserType } from '../types/AuthUserType'
import { UserType } from '../types/UserType'

type useAuthUserReturn = {
  authUser: AuthUserType
  isChild: (user: UserType | AuthUserType) => boolean
  isParent: (user: UserType | AuthUserType) => boolean
  isAdmin: (user: UserType | AuthUserType) => boolean
  isParentOrHigher: (user: UserType | AuthUserType) => boolean
  isCurrentUser: (currentUser: AuthUserType, otherUser: UserType | AuthUserType) => boolean
  setAuthLocalStorage: (user: AuthUserType) => void
  updateAuthLocalStorage: (target: updateLocalTargetType, value: string | number) => void
}

type updateLocalTargetType =
  | 'familyId'
  | 'username'
  | 'name'
  | 'email'
  | 'thumbnail'
  | 'permission'
  | ''

const useAuthUser = (): useAuthUserReturn => {
  const authUser = JSON.parse(localStorage.getItem('authUser'))

  const isChild = (user: UserType | AuthUserType) =>
    user?.permission === PermissionTypes.child.value
  const isParent = (user: UserType | AuthUserType) =>
    user?.permission === PermissionTypes.parent.value
  const isAdmin = (user: UserType | AuthUserType) =>
    user?.permission === PermissionTypes.admin.value
  const isParentOrHigher = (user: UserType | AuthUserType) =>
    user?.permission === PermissionTypes.parent.value ||
    user?.permission === PermissionTypes.admin.value
  const isCurrentUser = (currentUser: AuthUserType, otherUser: UserType | AuthUserType) =>
    currentUser?.id === otherUser?.id

  const setAuthLocalStorage = (user: AuthUserType): void => {
    localStorage.setItem('authUser', JSON.stringify(user))
  }

  const updateAuthLocalStorage = (
    target: updateLocalTargetType = '',
    value: string | number
  ): void => {
    const currentStorageAuth = JSON.parse(localStorage.getItem('authUser'))
    const newAuth = { ...currentStorageAuth }

    switch (target) {
      case 'familyId':
        newAuth['family_id'] = value
        localStorage.setItem('authUser', JSON.stringify(newAuth))
    }
  }

  return {
    authUser,
    isChild,
    isParent,
    isAdmin,
    isParentOrHigher,
    isCurrentUser,
    setAuthLocalStorage,
    updateAuthLocalStorage,
  }
}

export default useAuthUser
