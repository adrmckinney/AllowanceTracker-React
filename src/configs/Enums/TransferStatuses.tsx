import { AuthUserType } from '../../types/AuthUserType'
import ConfigTools from '../ConfigTools'
import PermissionTypes from './PermissionTypes'

export type TransferStatusEnumType = {
  value: number
  name: string
  abbreviatedName: string
  colorStatus: string
}

export default ConfigTools({
  pending_overdraft_and_request_approval: {
    value: 1,
    name: 'Pending Overdraft and Request Approval',
    abbreviatedName: 'Overdraft & Request',
    colorStatus: 'pending',
  },
  pending_overdraft_approval: {
    value: 2,
    name: 'Pending Overdraft Approval',
    abbreviatedName: 'Overdraft Approval',
    colorStatus: 'pending',
  },
  pending_request_approval: {
    value: 3,
    name: 'Pending Request Approval',
    abbreviatedName: 'Request Approval',
    colorStatus: 'pending',
  },
  approved: {
    value: 4,
    name: 'Approved',
    abbreviatedName: 'Approved',
    parentSelectionName: 'Approve Overdraft',
    childSelectionName: 'Approve Request',
    colorStatus: 'success',
  },
  rejected: {
    value: 5,
    name: 'Rejected',
    abbreviatedName: 'Rejected',
    parentSelectionName: 'Reject Overdraft',
    childSelectionName: 'Reject Request',
    colorStatus: 'danger',
  },
  checkIfEditable: function (value: number, authUser: AuthUserType) {
    switch (value) {
      case this.pending_overdraft_approval.value:
        return (
          authUser?.permission === PermissionTypes.parent.value ||
          authUser?.permission === PermissionTypes.admin.value
        )
      case this.pending_request_approval.value:
        return authUser?.permission === PermissionTypes.child.value
      case this.pending_overdraft_and_request_approval.value:
        return true
      default:
        return false
    }
  },
  getUpdateStatusParentSelections: function () {
    return [
      { value: this.approved.value, name: this.approved.parentSelectionName },
      { value: this.rejected.value, name: this.rejected.parentSelectionName },
    ]
  },
  getUpdateStatusChildSelections: function () {
    return [
      { value: this.approved.value, name: this.approved.childSelectionName },
      { value: this.rejected.value, name: this.rejected.childSelectionName },
    ]
  },
})
