import PermissionTypes from '../configs/Enums/PermissionTypes'
import { AuthUserType } from '../types/AuthUserType'

type useAuthUserReturn = {
  authUser: AuthUserType
  isChild: (user: AuthUserType) => boolean
  isParent: (user: AuthUserType) => boolean
  isAdmin: (user: AuthUserType) => boolean
  isParentOrHigher: (user: AuthUserType) => boolean
}

const useAuthUser = (): useAuthUserReturn => {
  const authUser = JSON.parse(localStorage.getItem('authUser'))

  const isChild = (user: AuthUserType) => user?.permission === PermissionTypes.child.value
  const isParent = (user: AuthUserType) => user?.permission === PermissionTypes.parent.value
  const isAdmin = (user: AuthUserType) => user?.permission === PermissionTypes.admin.value
  const isParentOrHigher = (user: AuthUserType) =>
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
