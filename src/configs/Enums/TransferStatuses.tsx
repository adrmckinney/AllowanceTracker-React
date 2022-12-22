import ConfigTools from '../ConfigTools'

export default ConfigTools({
  pending_overdraft_and_request_approval: {
    value: 1,
    name: 'Pending Overdraft and Request Approval',
    abbreviatedName: 'Pending Approval',
    colorStatus: 'pending',
  },
  pending_overdraft_approval: {
    value: 2,
    name: 'Pending Overdraft Approval',
    abbreviatedName: 'Pending Approval',
    colorStatus: 'pending',
  },
  pending_request_approval: {
    value: 3,
    name: 'Pending Request Approval',
    abbreviatedName: 'Pending Approval',
    colorStatus: 'pending',
  },
  approved: {
    value: 4,
    name: 'Approved',
    abbreviatedName: 'Approved',
    colorStatus: 'success',
  },
  rejected: {
    value: 5,
    name: 'Rejected',
    abbreviatedName: 'Rejected',
    colorStatus: 'danger',
  },
})
