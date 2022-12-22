import ConfigTools from '../ConfigTools'

export default ConfigTools({
  in_progress: {
    value: 1,
    name: 'In Progress',
    statusColorTheme: 'pending',
  },
  pending_approval: {
    value: 2,
    name: 'Pending Approval',
    statusColorTheme: 'pending',
  },
  approved: {
    value: 3,
    name: 'Approved',
    statusColorTheme: 'success',
  },
  rejected: {
    value: 4,
    name: 'Rejected',
    statusColorTheme: 'danger',
  },
})
