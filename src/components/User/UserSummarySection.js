// @flow

import { useMemo } from 'react'
import enums from '../../configs/enums'
import { colorThemes } from '../../configs/global-styles'
import ConditionalRender from '../../CustomComponents/conditional-render'
import type { UserType } from '../../FlowTypes/Entities/UserType'
import MoneyFormatter from '../../library/MoneyFormatter'

type Props = {
  user: UserType,
}

const UserSummarySection = ({ user }: Props) => {
  const isChild = user?.user_permission === enums.permissionTypes.child.value
  console.log('isChild', isChild)
  const data = useMemo(
    () => [
      {
        title: 'Wallet',
        datum: `$${MoneyFormatter.toDollars(user?.wallet)}`,
        condition: isChild,
      },
      {
        title: 'Total Spend',
        datum: `$${MoneyFormatter.toDollars(user?.totalSpend)}`,
        condition: isChild,
      },
      {
        title: 'Chores Completed',
        datum: user?.completedChores,
        condition: isChild,
      },
      {
        title: 'Income from Chores',
        datum: `$${MoneyFormatter.toDollars(user?.choresIncome)}`,
        condition: isChild,
      },
      {
        title: 'Username',
        datum: user?.username,
        condition: true,
      },
      {
        title: 'Email address',
        datum: user?.email,
        condition: true,
      },
      {
        title: 'Phone Number',
        datum: '(214) 562-7133',
        condition: true,
      },
    ],
    [user]
  )

  return (
    <>
      <div className='space-y-4 sm:grid sm:grid-cols-3 sm:gap-6 sm:space-y-0 lg:gap-8'>
        <div className='aspect-w-3 aspect-h-2 h-0 sm:aspect-w-3 sm:aspect-h-4'>
          <img
            className='rounded-lg object-cover shadow-lg'
            src='https://images.unsplash.com/photo-1517365830460-955ce3ccd263?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=1024&h=1024&q=80'
            alt={user?.name}
          />
        </div>
        <div className='sm:col-span-2'>
          <div className='space-y-4'>
            <div className='space-y-1 text-lg font-medium leading-6'>
              <h2>{user?.name}</h2>
              <ConditionalRender
                condition={user?.user_permission !== enums.permissionTypes.child.value}
              >
                <p className={colorThemes.primary.iconText}>
                  {enums.permissionTypes.findByValue(user?.user_permission)?.displayName}
                </p>
              </ConditionalRender>
            </div>
            <div className='border-t border-gray-200 px-4 py-5 sm:px-6'>
              <dl className='grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2'>
                {data?.map(datum => (
                  <ConditionalRender key={datum?.title} condition={datum?.condition}>
                    <div className='sm:col-span-1'>
                      <dt className='text-sm font-medium text-gray-500'>{datum?.title}</dt>
                      <dd className='mt-1 text-sm text-gray-900'>{datum?.datum}</dd>
                    </div>
                  </ConditionalRender>
                ))}
              </dl>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default UserSummarySection
