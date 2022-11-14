import { useMemo, useState } from 'react'
import PermissionTypes from '../../configs/Enums/PermissionTypes'
import { colorThemes } from '../../configs/global-styles'
import IconButton from '../../CustomComponents/Buttons/IconButton'
import ConditionalRender from '../../CustomComponents/conditional-render'
import useAuthUser from '../../hooks/useAuthUser'
import MoneyFormatter from '../../library/MoneyFormatter'
import { UserType } from '../../types/UserType'

type Props = {
  user: UserType
}

type EditingState = {
  username: boolean
  email: boolean
  number: boolean
}

const UserSummarySection = ({ user }: Props) => {
  const [isEditing, setIsEditing] = useState<EditingState>({
    username: false,
    email: false,
    number: false,
  })
  const { isChild, isParentOrHigher } = useAuthUser()

  const handleIsEditing = (title: string) => {
    const newEditing = { ...isEditing }

    switch (title?.toLowerCase()) {
      case 'username':
        newEditing['username'] = true
        newEditing['email'] = false
        newEditing['number'] = false
        setIsEditing(newEditing)
        break
      case 'email address':
        newEditing['username'] = false
        newEditing['email'] = true
        newEditing['number'] = false
        setIsEditing(newEditing)
        break
      case 'phone number':
        newEditing['username'] = false
        newEditing['email'] = false
        newEditing['number'] = true
        setIsEditing(newEditing)
        break
    }
  }
  console.log('isEditing', isEditing)

  const data = useMemo(
    () => [
      {
        title: 'Username',
        datum: user?.username,
        condition: true,
        canEdit: true,
      },
      {
        title: 'Wallet',
        datum: `$${MoneyFormatter.toDollars(user?.wallet)}`,
        condition: isChild(user),
        canEdit: false,
      },
      {
        title: 'Email address',
        datum: user?.email,
        condition: true,
        canEdit: true,
      },
      {
        title: 'Phone Number',
        datum: '(214) 562-7133',
        condition: true,
        canEdit: true,
      },
      {
        title: 'Chores Pending',
        datum: user?.chores.pendingChoresCount,
        condition: isChild(user),
        canEdit: false,
      },
      {
        title: 'Chores Rejected',
        datum: user?.chores.rejectedChoresCount,
        condition: isChild(user),
        canEdit: false,
      },
      {
        title: 'Chores Completed',
        datum: user?.chores.completedChoresCount,
        condition: isChild(user),
        canEdit: false,
      },
      {
        title: 'Income from Chores',
        datum: `$${MoneyFormatter.toDollars(user?.chores.totalChoresIncome)}`,
        condition: isChild(user),
        canEdit: false,
      },
      {
        title: 'Total Spend',
        datum: `$${MoneyFormatter.toDollars(user?.transactions.totalDebit)}`,
        condition: isChild(user),
        canEdit: false,
      },
      {
        title: 'Total Deposit',
        datum: `$${MoneyFormatter.toDollars(user?.transactions.totalCredit)}`,
        condition: isChild(user),
        canEdit: false,
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
              <ConditionalRender condition={isParentOrHigher(user)}>
                <p className={colorThemes.primary.iconText}>
                  {PermissionTypes.findByValue(user?.permission)?.displayName}
                </p>
              </ConditionalRender>
            </div>
            <div className='border-t border-gray-200 px-4 py-5 sm:px-6'>
              <dl className='grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2'>
                {data?.map(datum => (
                  <ConditionalRender key={datum?.title} condition={datum?.condition}>
                    <div className='sm:col-span-1'>
                      <dt className='text-sm font-medium text-gray-500'>{datum?.title}</dt>
                      <dd className='mt-1 text-sm text-gray-900'>
                        {datum?.datum}
                        <ConditionalRender condition={datum.canEdit}>
                          <IconButton
                            icon={'edit'}
                            size={'xs'}
                            onClick={() => handleIsEditing(datum.title)}
                            classNames='pl-2'
                          />
                        </ConditionalRender>
                      </dd>
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
