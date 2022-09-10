// @flow

import DateFormatter from '../../library/DateFormatter'
import MoneyFormatter from '../../library/MoneyFormatter'
import TwoColLayout from '../../CustomComponents/two-col-layout'
import enums from '../../configs/enums'

type Props = {
  item: Object,
}

const TransactionDetailCard = ({ item }: Props) => {
  const isWithdraw = item?.transaction_type === enums.transactionTypes.withdraw.value
  return (
    <>
      <div className='grid grid-cols-1 gap-4'>
        <div
          key={item?.id}
          className='relative flex items-center space-x-3 rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 hover:border-gray-400'
        >
          <TwoColLayout
            leftColContent={
              <>
                <p className='text-sm font-medium text-gray-900'>
                  {enums.transactionTypes.findByValue(item?.transaction_type)?.name}
                </p>
                <p className='text-sm font-medium text-gray-900'>
                  ${MoneyFormatter.toDollars(item?.transaction_amount)}
                </p>
              </>
            }
            rightColContent={
              <>
                <p className='text-sm font-medium text-gray-900'>
                  {isWithdraw ? 'To' : 'From'}{' '}
                  {isWithdraw ? item?.receiver_name : item?.originator_name}
                </p>
                <p className='truncate text-sm text-gray-500'>Status</p>
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

export default TransactionDetailCard
