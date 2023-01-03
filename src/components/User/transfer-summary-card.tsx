import DateFormatter from '../../library/DateFormatter'
import MoneyFormatter from '../../library/MoneyFormatter'
import TwoColLayout from '../../CustomComponents/two-col-layout'
import TransactionDirections from '../../configs/Enums/TransactionDirections'
import { TransferType } from '../../types/TransferType'
import TransferStatuses from '../../configs/Enums/TransferStatuses'
import StatusBadge from '../../CustomComponents/Badges/StatusBadge'
import { useContext } from 'react'
import UserContext from '../../context/UserContext'
import { getSenderOrReceiver, isTransferSender } from '../../helpers/DirectionHelpers'

type Props = {
  transfer: TransferType
}

const TransferSummaryCard = ({ transfer }: Props) => {
  const { userContext: user } = useContext(UserContext)
  const isSender = isTransferSender(user?.id, transfer)

  return (
    <>
      <div key={transfer?.id} className='grid grid-cols-1 gap-4'>
        <div className='relative flex items-center space-x-3 rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 hover:border-gray-400'>
          <TwoColLayout
            leftColContent={
              <>
                <p className='text-sm font-medium text-gray-900'>
                  {getSenderOrReceiver(isSender, transfer)}
                </p>
                <p
                  className={[
                    isSender
                      ? TransactionDirections.debit.color
                      : TransactionDirections.credit.color,
                    'text-sm font-medium',
                  ].join(' ')}
                >
                  {isSender ? '-' : ''}${MoneyFormatter.toDollars(transfer?.amount)}
                </p>
              </>
            }
            leftClassNames='items-start'
            rightColContent={
              <>
                <p className='text-sm font-medium text-gray-900 text-right'>
                  <StatusBadge
                    title={TransferStatuses.findByValue(transfer?.transfer_status)?.abbreviatedName}
                    colorStatus={
                      TransferStatuses.findByValue(transfer?.transfer_status)?.colorStatus
                    }
                  />
                </p>
                <p className='truncate text-sm text-gray-500'>
                  {DateFormatter.parseIso('' + transfer?.updated_at)}
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

export default TransferSummaryCard
