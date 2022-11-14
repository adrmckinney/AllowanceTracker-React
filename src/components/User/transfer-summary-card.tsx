import DateFormatter from '../../library/DateFormatter'
import MoneyFormatter from '../../library/MoneyFormatter'
import TwoColLayout from '../../CustomComponents/two-col-layout'
import TransactionDirections from '../../configs/Enums/TransactionDirections'
import { TransferType } from '../../types/TransferType'
import useAuthUser from '../../hooks/useAuthUser'
import TransferStatuses from '../../configs/Enums/TransferStatuses'
import StatusBadge from '../../CustomComponents/Badges/StatusBadge'

type Props = {
  transfers: TransferType[]
}

const TransferSummaryCard = ({ transfers }: Props) => {
  const { authUser } = useAuthUser()

  const selectMostRecentDate = (transfer: TransferType) => {
    const approved = transfer?.transfer_status === TransferStatuses.approved.value
    const rejected = transfer?.transfer_status === TransferStatuses.rejected.value
    const approvalRequested =
      transfer?.transfer_status === TransferStatuses.pending_overdraft_approval.value ||
      transfer?.transfer_status === TransferStatuses.pending_request_approval.value ||
      transfer?.transfer_status === TransferStatuses.pending_overdraft_and_request_approval.value

    if (approved) {
      return '' + transfer?.approval_date
    } else if (rejected) {
      return '' + transfer?.rejection_date
    } else if (approvalRequested) {
      return '' + transfer?.approval_request_date
    }
  }

  return (
    <>
      {transfers?.map((transfer: TransferType) => {
        // const isWithdraw = transfer?.direction === TransactionDirections.credit.value
        const isSender = authUser?.id === transfer?.sender?.id

        return (
          <div key={transfer?.id} className='grid grid-cols-1 gap-4'>
            <div className='relative flex items-center space-x-3 rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 hover:border-gray-400'>
              <TwoColLayout
                leftColContent={
                  <>
                    <p className='text-sm font-medium text-gray-900'>
                      {isSender ? 'To' : 'From'} {transfer?.receiver?.name?.split(' ')[0]}
                    </p>
                    <p
                      className={[
                        isSender
                          ? TransactionDirections.credit.color
                          : TransactionDirections.debit.color,
                        'text-sm font-medium',
                      ].join(' ')}
                    >
                      {isSender ? '-' : ''}${MoneyFormatter.toDollars(transfer?.amount)}
                    </p>
                  </>
                }
                rightColContent={
                  <>
                    <p className='text-sm font-medium text-gray-900'>
                      <StatusBadge
                        title={TransferStatuses.findByValue(transfer?.transfer_status)?.name}
                        colorStatus={
                          TransferStatuses.findByValue(transfer?.transfer_status)?.colorStatus
                        }
                      />
                    </p>
                    <p className='truncate text-sm text-gray-500'>
                      {DateFormatter.parseIso(selectMostRecentDate(transfer))}
                    </p>
                  </>
                }
                wrapperClassNames={'w-full'}
                rightClassNames={'items-end'}
              />
            </div>
          </div>
        )
      })}
    </>
  )
}

export default TransferSummaryCard
