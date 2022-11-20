import PermissionTypes from '../configs/Enums/PermissionTypes'
import { AuthUserType } from '../types/AuthUserType'
import { UserType } from '../types/UserType'

type useAuthUserReturn = {
  authUser: AuthUserType
  isChild: (user: UserType | AuthUserType) => boolean
  isParent: (user: UserType | AuthUserType) => boolean
  isAdmin: (user: UserType | AuthUserType) => boolean
  isParentOrHigher: (user: UserType | AuthUserType) => boolean
}

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

  return {
    authUser,
    isChild,
    isParent,
    isAdmin,
    isParentOrHigher,
  }
}

export default useAuthUser
