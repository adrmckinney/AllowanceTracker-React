import StatusBadge from '../../CustomComponents/Badges/StatusBadge'
import TwoColLayout from '../../CustomComponents/two-col-layout'
import ChoreStatuses from '../../configs/Enums/ChoreStatuses'
import DateFormatter from '../../library/DateFormatter'
import MoneyFormatter from '../../library/MoneyFormatter'
import { UserChoreType } from '../../types/UserChoreType'
import { selectMostRecentDate } from '../../helpers/choresHelpers/ChoreHelpers'
import SelectDropdown from '../../CustomComponents/Selects/SelectDropdown'
import useAuthUser from '../../hooks/useAuthUser'
import useUpsertUserChore from '../../api/UserChore/useUpsertUserChore'
import { useState } from 'react'
import Button from '../../CustomComponents/Buttons/Button'
import Modal from '../../CustomComponents/Modals/Modal'
import UpserChoreStatus from './UpserChoreStatus'
import ChoreDetailCard from '../User/chore-summary-card'

type Props = {
  userChore: UserChoreType
  modalOpen: boolean
  closeModal: () => void
}

const UpdateChoreStatusModal = ({ userChore, modalOpen, closeModal }: Props) => {
  const [selected, setSelected] = useState({
    value: userChore?.chore_status,
    name: ChoreStatuses.findByValue(userChore?.chore_status)?.name,
  })
  const { authUser } = useAuthUser()
  const { upsertUserChore } = useUpsertUserChore()

  // const handleUpdateUserChore = () => {
  //   upsertUserChore(authUser?.api_token)
  // }

  return (
    <>
      <Modal
        dataComponent={
          <>
            <UpserChoreStatus userChore={userChore} />
            <SelectDropdown
              label='Update Status'
              items={ChoreStatuses}
              selected={selected}
              setSelected={setSelected}
            />
          </>
        }
        open={modalOpen}
        closeModal={closeModal}
        title='Update Your Chore'
        twoButtonComponent={
          <>
            <Button title='Cancel' status='cancel' customClassName='w-full' onClick={() => {}} />
            <Button title='Save' status='primary' customClassName='w-full' onClick={() => {}} />
          </>
        }
      />
    </>
  )
}

export default UpdateChoreStatusModal
