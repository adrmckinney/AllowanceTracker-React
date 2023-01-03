import { AuthUserType } from '../../types/AuthUserType'
import ConfigTools from '../ConfigTools'

type ChoreStatusesType = {
  in_progress: ChoreStatusEnumType
  pending_approval: ChoreStatusEnumType
  approved: ChoreStatusEnumType
  rejected: ChoreStatusEnumType
}

export type ChoreStatusEnumType = {
  value: number
  name: string
  statusColorTheme: string
  checked: false
}

export default ConfigTools({
  in_progress: {
    value: 1,
    name: 'In Progress',
    statusColorTheme: 'pending',
    checked: false,
  },
  pending_approval: {
    value: 2,
    name: 'Pending Approval',
    statusColorTheme: 'pending',
    checked: false,
  },
  approved: {
    value: 3,
    name: 'Approved',
    selectionName: 'Approve',
    statusColorTheme: 'success',
    checked: false,
  },
  rejected: {
    value: 4,
    name: 'Rejected',
    selectionName: 'Reject',
    statusColorTheme: 'danger',
    checked: false,
  },
  checkIfEditable: function (value: number, authUser: AuthUserType) {
    switch (value) {
      case this.approved.value:
        return false
      default:
        return true
    }
  },
  getUpdateStatusParentSelections: function () {
    return [
      this.in_progress,
      this.pending_approval,
      { value: this.approved.value, name: this.approved.selectionName },
      { value: this.rejected.vlue, name: this.rejected.selectionName },
    ]
  },
  getUpdateStatusChildSelections: function () {
    return [this.in_progress, this.pending_approval]
  },
})
