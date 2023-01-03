import SelectDropdown from '../../CustomComponents/Selects/SelectDropdown'
import useAuthUser from '../../hooks/useAuthUser'
import { useState } from 'react'
import Button from '../../CustomComponents/Buttons/Button'
import Modal from '../../CustomComponents/Modals/Modal'
import TransferSummaryCard from '../User/transfer-summary-card'
import { TransferType } from '../../types/TransferType'
import TransferStatuses, { TransferStatusEnumType } from '../../configs/Enums/TransferStatuses'
import ConditionalRender from '../../CustomComponents/conditional-render'

type Props = {
  transfer: TransferType
  modalOpen: boolean
  closeModal: () => void
  formId: string
  formRef: any
}

export type TransferFormRefType = {
  status: TransferStatusEnumType
  transferId: number
}

const UpdateTransferModal = ({ transfer, modalOpen, closeModal, formId, formRef }: Props) => {
  const [selected, setSelected] = useState({
    value: transfer?.transfer_status,
    name: TransferStatuses.findByValue(transfer?.transfer_status)?.name,
  })
  const { authUser, isChild } = useAuthUser()

  const handleSelected = (status: TransferStatusEnumType) => {
    setSelected(status)
    formRef.current = { status, transferId: transfer?.id }
  }

  return (
    <>
      <Modal
        dataComponent={
          <>
            <TransferSummaryCard transfer={transfer} />
            <ConditionalRender
              condition={TransferStatuses.checkIfEditable(transfer?.transfer_status, authUser)}
            >
              <SelectDropdown
                label='Update Status'
                items={
                  isChild(authUser)
                    ? TransferStatuses.getUpdateStatusChildSelections()
                    : TransferStatuses.getUpdateStatusParentSelections()
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
        title='Update Your Transfer'
        twoButtonComponent={
          <>
            <Button
              type='button'
              title='Cancel'
              status='cancel'
              customClassName='w-full'
              onClick={closeModal}
            />
            <Button
              type='submit'
              title='Save'
              formId={formId}
              status='primary'
              customClassName='w-full'
              disabled={!TransferStatuses?.checkIfEditable(transfer?.transfer_status, authUser)}
            />
          </>
        }
      />
    </>
  )
}

export default UpdateTransferModal
