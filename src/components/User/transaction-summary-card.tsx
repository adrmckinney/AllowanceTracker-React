import DateFormatter from '../../library/DateFormatter'
import MoneyFormatter from '../../library/MoneyFormatter'
import TwoColLayout from '../../CustomComponents/two-col-layout'
import { TransactionType } from '../../types/TransactionType'
import TransactionDirections from '../../configs/Enums/TransactionDirections'
import ConditionalRender from '../../CustomComponents/conditional-render'
import { getSenderOrReceiver, isTransferSender } from '../../helpers/DirectionHelpers'

type Props = {
  transaction: TransactionType
}

const TransactionSummaryCard = ({ transaction }: Props) => {
  const isWithdraw = transaction?.direction === TransactionDirections.debit.value
  const isTransfer = transaction?.transfer?.id !== null

  return (
    <>
      <div className='grid grid-cols-1 gap-4'>
        <div className='relative flex items-center space-x-3 rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 hover:border-gray-400'>
          <TwoColLayout
            leftColContent={
              <>
                <ConditionalRender
                  condition={isTransfer}
                  falseRender={
                    <>
                      <p className='text-sm font-medium text-gray-900'>
                        {TransactionDirections.credit.displayName}
                      </p>
                      <p
                        className={[TransactionDirections.credit.color, 'text-sm font-medium'].join(
                          ' '
                        )}
                      >
                        ${MoneyFormatter.toDollars(transaction?.amount)}
                      </p>
                    </>
                  }
                >
                  <p className='text-sm font-medium text-gray-900'>
                    {TransactionDirections.findByValue(transaction?.direction).displayName}
                  </p>
                  <p
                    className={[
                      isWithdraw
                        ? TransactionDirections.debit.color
                        : TransactionDirections.credit.color,
                      'text-sm font-medium',
                    ].join(' ')}
                  >
                    {isWithdraw ? '-' : ''}${MoneyFormatter.toDollars(transaction?.amount)}
                  </p>
                </ConditionalRender>
              </>
            }
            rightColContent={
              <>
                <ConditionalRender
                  condition={isTransfer}
                  falseRender={
                    <p className='text-sm font-medium text-gray-900 text-right'>
                      Chore: {transaction?.user_chore?.chore?.name}
                    </p>
                  }
                >
                  <p className='text-sm font-medium text-gray-900'>
                    {getSenderOrReceiver(
                      isTransferSender(transaction?.user?.id, transaction?.transfer),
                      transaction?.transfer
                    )}
                  </p>
                </ConditionalRender>
                <p className='truncate text-sm text-gray-500'>
                  {DateFormatter.parseIso('' + transaction?.created_at)}
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

export default TransactionSummaryCard
