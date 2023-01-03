import ChoreStatuses, { ChoreStatusEnumType } from '../../configs/Enums/ChoreStatuses'
import { UserChoreType } from '../../types/UserChoreType'
import SelectDropdown from '../../CustomComponents/Selects/SelectDropdown'
import useAuthUser from '../../hooks/useAuthUser'
import React, { MutableRefObject, useState } from 'react'
import Button from '../../CustomComponents/Buttons/Button'
import Modal from '../../CustomComponents/Modals/Modal'
import UserChoreSummaryCard from '../User/user-chore-summary-card'
import ConditionalRender from '../../CustomComponents/conditional-render'

type Props = {
  userChore: UserChoreType
  modalOpen: boolean
  closeModal: () => void
  formId?: string
  formRef?: any
}

export type UserChoreFormRefType = {
  status: ChoreStatusEnumType
  userChoreId: number
}

const UpdateChoreStatusModal = ({ userChore, modalOpen, closeModal, formId, formRef }: Props) => {
  const { authUser, isChild } = useAuthUser()
  const [selected, setSelected] = useState({
    value: userChore?.chore_status,
    name: ChoreStatuses.findByValue(userChore?.chore_status)?.name,
  })

  const handleSelected = (status: ChoreStatusEnumType) => {
    setSelected(status)
    formRef.current = { status, userChoreId: userChore?.id }
  }

  return (
    <>
      <Modal
        dataComponent={
          <>
            <UserChoreSummaryCard userChore={userChore} />
            <ConditionalRender
              condition={ChoreStatuses.checkIfEditable(userChore?.chore_status, authUser)}
            >
              <SelectDropdown
                label='Update Status'
                items={
                  isChild(authUser)
                    ? ChoreStatuses.getUpdateStatusChildSelections()
                    : ChoreStatuses.getUpdateStatusParentSelections()
                }
                selected={selected}
                setSelected={handleSelected}
                optionsHeight='max-h-20'
              />
            </ConditionalRender>
          </>
        }
        open={modalOpen}
        closeModal={closeModal}
        title='Update Your Chore'
        twoButtonComponent={
          <>
            <Button
              type='button'
              title='Cancel'
              size='sm'
              status='cancel'
              customClassName='w-full text-xs sm:text-sm'
              onClick={closeModal}
            />
            <Button
              type='submit'
              formId={formId}
              title='Save'
              size='sm'
              status='primary'
              customClassName='w-full text-xs sm:text-sm'
            />
          </>
        }
      />
    </>
  )
}

export default UpdateChoreStatusModal
