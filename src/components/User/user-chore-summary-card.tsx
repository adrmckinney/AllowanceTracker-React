import DateFormatter from '../../library/DateFormatter'
import MoneyFormatter from '../../library/MoneyFormatter'
import TwoColLayout from '../../CustomComponents/two-col-layout'
import { UserChoreType } from '../../types/UserChoreType'
import StatusBadge from '../../CustomComponents/Badges/StatusBadge'
import ChoreStatuses from '../../configs/Enums/ChoreStatuses'

type Props = {
  userChore: UserChoreType
}

const UserChoreSummaryCard = ({ userChore }: Props) => {
  return (
    <>
      <div className='grid grid-cols-1 gap-4'>
        <div className='relative flex items-center space-x-3 rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 hover:border-gray-400'>
          <TwoColLayout
            leftColContent={
              <>
                <p className='text-sm font-medium text-gray-900'>{userChore?.chore?.name}</p>
                <p className='text-sm font-medium text-gray-900'>
                  ${MoneyFormatter.toDollars(userChore?.amount)}
                </p>
              </>
            }
            leftClassNames='items-start'
            rightColContent={
              <>
                <p className='text-sm font-medium text-gray-900 text-right'>
                  <StatusBadge
                    title={ChoreStatuses.findByValue(userChore?.chore_status)?.name}
                    colorStatus={
                      ChoreStatuses.findByValue(userChore?.chore_status)?.statusColorTheme
                    }
                  />
                </p>
                <p className='truncate text-sm text-gray-500'>
                  {DateFormatter.parseIso('' + userChore?.updated_at)}
                </p>
              </>
            }
            wrapperClassNames={'w-full'}
            rightClassNames={'items-end'}
          />
        </div>
      </div>
    </>
  )
}

export default UserChoreSummaryCard
