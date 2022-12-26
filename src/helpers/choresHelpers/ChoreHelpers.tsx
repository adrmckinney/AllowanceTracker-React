import ChoreStatuses from '../../configs/Enums/ChoreStatuses'
import { UserChoreType } from '../../types/UserChoreType'

export const selectMostRecentDate = (chore: UserChoreType) => {
  const approved = chore?.chore_status === ChoreStatuses.approved.value
  const rejected = chore?.chore_status === ChoreStatuses.rejected.value
  const approvalRequested = chore?.chore_status === ChoreStatuses.pending_approval.value
  const inProgress = chore?.chore_status === ChoreStatuses.in_progress.value

  if (approved) {
    return '' + chore?.approval_date
  } else if (rejected) {
    return '' + chore?.rejection_date
  } else if (approvalRequested) {
    return '' + chore?.approval_request_date
  } else if (inProgress) {
    return '' + chore?.created_at
  }
}
