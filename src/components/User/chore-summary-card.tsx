import DateFormatter from '../../library/DateFormatter'
import MoneyFormatter from '../../library/MoneyFormatter'
import TwoColLayout from '../../CustomComponents/two-col-layout'
import { UserChoreType } from '../../types/UserChoreType'
import StatusBadge from '../../CustomComponents/Badges/StatusBadge'
import ChoreStatuses from '../../configs/Enums/ChoreStatuses'
import { selectMostRecentDate } from '../../helpers/choresHelpers/ChoreHelpers'
import ConditionalRender from '../../CustomComponents/conditional-render'
import Modal from '../../CustomComponents/Modals/Modal'
import { Fragment, useState } from 'react'
import Button from '../../CustomComponents/Buttons/Button'
import UpdateChoreStatusModal from '../Chores/UpdateChoreStatusModal'

type Props = {
  userChores: UserChoreType[]
}

const ChoreDetailCard = ({ userChores }: Props) => {
  const [modalOpen, setModalOpen] = useState(false)
  const [selectedChore, setSelectedChore] = useState<UserChoreType | null>(null)

  const handleChoreUpdateModal = (userChore: UserChoreType = null) => {
    setSelectedChore(userChore)
    setModalOpen(true)
  }

  return (
    <>
      {userChores?.map((chore: UserChoreType) => (
        <div
          key={chore?.id}
          className='grid grid-cols-1 gap-4'
          onClick={() => handleChoreUpdateModal(chore)}
        >
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
                  <p className='text-sm font-medium text-gray-900 text-right'>
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
      <ConditionalRender condition={modalOpen}>
        <UpdateChoreStatusModal
          userChore={selectedChore}
          modalOpen={modalOpen}
          closeModal={() => setModalOpen(false)}
        />
      </ConditionalRender>
    </>
  )
}

export default ChoreDetailCard
