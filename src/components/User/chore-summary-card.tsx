import DateFormatter from '../../library/DateFormatter'
import MoneyFormatter from '../../library/MoneyFormatter'
import TwoColLayout from '../../CustomComponents/two-col-layout'
import { UserChoreType } from '../../types/UserChoreType'
import StatusBadge from '../../CustomComponents/Badges/StatusBadge'
import ChoreStatuses from '../../configs/Enums/ChoreStatuses'

type Props = {
  userChores: UserChoreType[]
}

const ChoreDetailCard = ({ userChores }: Props) => {
  const selectMostRecentDate = (chore: UserChoreType) => {
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
  console.log('userChores', userChores)

  return (
    <>
      {userChores?.map((chore: UserChoreType) => (
        <div key={chore?.id} className='grid grid-cols-1 gap-4'>
          <div className='relative flex items-center space-x-3 rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 hover:border-gray-400'>
            <TwoColLayout
              leftColContent={
                <>
                  <p className='text-sm font-medium text-gray-900'>{chore?.chore?.name}</p>
                  <p className='text-sm font-medium text-gray-900'>
                    ${MoneyFormatter.toDollars(chore?.amount)}
                  </p>
                </>
              }
              rightColContent={
                <>
                  <p
                  // className='text-sm font-medium text-gray-900'
                  >
                    <StatusBadge
                      title={ChoreStatuses.findByValue(chore?.chore_status)?.name}
                      colorStatus={ChoreStatuses.findByValue(chore?.chore_status)?.statusColorTheme}
                    />
                  </p>
                  <p className='truncate text-sm text-gray-500'>
                    {DateFormatter.parseIso(selectMostRecentDate(chore))}
                  </p>
                </>
              }
              wrapperClassNames={'w-full'}
              rightClassNames={'items-end'}
            />
          </div>
        </div>
      ))}
    </>
  )
}

export default ChoreDetailCard
