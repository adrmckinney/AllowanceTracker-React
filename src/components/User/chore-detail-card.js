// @flow

import DateFormatter from '../../library/DateFormatter'
import MoneyFormatter from '../../library/MoneyFormatter'
import TwoColLayout from '../../CustomComponents/two-col-layout'

type Props = {
  item: Object,
}

const ChoreDetailCard = ({ item }: Props) => {
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
                <p className='text-sm font-medium text-gray-900'>{item?.name}</p>
                <p className='text-sm font-medium text-gray-900'>
                  Date: {DateFormatter.parseIso(item?.created_at)}
                </p>
              </>
            }
            rightColContent={
              <>
                <p className='text-sm font-medium text-gray-900'>
                  ${MoneyFormatter.toDollars(item?.cost)}
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

export default ChoreDetailCard
