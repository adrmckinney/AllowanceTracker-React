import React, { useEffect, useMemo, useState } from 'react'
import useUpsertUser from '../../api/User/useUpsertUser'
import PermissionTypes from '../../configs/Enums/PermissionTypes'
import { colorThemes } from '../../configs/global-styles'
import IconButton from '../../CustomComponents/Buttons/IconButton'
import ConditionalRender from '../../CustomComponents/conditional-render'
import Input from '../../CustomComponents/Input'
import useAuthUser from '../../hooks/useAuthUser'
import useFormHelpers from '../../hooks/useFormHelpers'
import DateFormatter from '../../library/DateFormatter'
import MoneyFormatter from '../../library/MoneyFormatter'
import { FormChangeType } from '../../types/FormChangeType'
import { UserType } from '../../types/UserType'

type Props = {
  user: UserType
}

type EditingState = {
  username: boolean
  email: boolean
  number: boolean
}

type Data = {
  title: string
  inputName?: string
  datum: string | number
  condition: boolean
  canEdit: boolean
}

type InitialValues = {
  username: string
  email: string
  number: number
}

const UserSummarySection = ({ user }: Props): JSX.Element => {
  const [isEditing, setIsEditing] = useState<EditingState>({
    username: false,
    email: false,
    number: false,
  })
  const { isChild, isParentOrHigher, authUser } = useAuthUser()
  const { upsertUser } = useUpsertUser()

  const {
    handleChange,
    input,
    setInput: setInitialValues,
  } = useFormHelpers<InitialValues>({
    username: user?.username,
    email: user?.email,
    number: user?.number,
  })

  useEffect(() => {
    setInitialValues({ username: user?.username, email: user?.email, number: user?.number })
  }, [user])

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const updatedFieldKey = Object.entries(isEditing)?.filter(
      ([key, value]: [key: string, value: boolean]) => value
    )[0][0]

    const upsertInput = {
      id: user?.id,
      [updatedFieldKey]: input?.[updatedFieldKey],
    }

    upsertUser(authUser?.api_token, upsertInput).then(data => {
      handleCancel()
    })
  }

  const handleIsEditing = (inputName: string) => {
    const newEditing = { ...isEditing }

    switch (inputName) {
      case 'username':
        newEditing['username'] = true
        newEditing['email'] = false
        newEditing['number'] = false
        setIsEditing(newEditing)
        break
      case 'email':
        newEditing['username'] = false
        newEditing['email'] = true
        newEditing['number'] = false
        setIsEditing(newEditing)
        break
      case 'number':
        newEditing['username'] = false
        newEditing['email'] = false
        newEditing['number'] = true
        setIsEditing(newEditing)
        break
    }
  }

  const handleCancel = () => {
    const newEditing = { ...isEditing }

    newEditing['username'] = false
    newEditing['email'] = false
    newEditing['number'] = false
    setIsEditing(newEditing)
  }

  const formatPhoneNumber = (phoneNumber: string | number) => {
    const cleaned = ('' + phoneNumber).replace(/\D/g, '')

    const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/)

    if (match) {
      return '(' + match[1] + ') ' + match[2] + '-' + match[3]
    }

    return null
  }

  const data = useMemo(
    (): Data[] => [
      {
        title: 'Username',
        inputName: 'username',
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
        inputName: 'email',
        datum: user?.email,
        condition: true,
        canEdit: true,
      },
      {
        title: 'Phone Number',
        inputName: 'number',
        datum: formatPhoneNumber(user?.number),
        condition: true,
        canEdit: true,
      },
      {
        title: 'Age',
        datum: DateFormatter.getAge(user?.date_of_birth),
        condition: !!user?.date_of_birth,
        canEdit: false,
      },
      {
        title: 'Chores Pending',
        datum: user?.chores?.pendingChoresCount,
        condition: isChild(user),
        canEdit: false,
      },
      {
        title: 'Chores Rejected',
        datum: user?.chores?.rejectedChoresCount,
        condition: isChild(user),
        canEdit: false,
      },
      {
        title: 'Chores Completed',
        datum: user?.chores?.completedChoresCount,
        condition: isChild(user),
        canEdit: false,
      },
      {
        title: 'Income from Chores',
        datum: `$${MoneyFormatter.toDollars(user?.chores?.totalChoresIncome)}`,
        condition: isChild(user),
        canEdit: false,
      },
      {
        title: 'Total Spend',
        datum: `$${MoneyFormatter.toDollars(user?.transactions?.totalDebit)}`,
        condition: isChild(user),
        canEdit: false,
      },
      {
        title: 'Total Deposit',
        datum: `$${MoneyFormatter.toDollars(user?.transactions?.totalCredit)}`,
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
            <form onSubmit={handleSubmit} className='border-t border-gray-200 px-4 py-5 sm:px-6'>
              <dl className='grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2'>
                {data?.map(datum => (
                  <ConditionalRender key={datum?.title} condition={datum?.condition}>
                    <div className='sm:col-span-1'>
                      <dt className='text-sm font-medium text-gray-500'>{datum?.title}</dt>
                      <ConditionalRender
                        condition={!isEditing?.[datum?.inputName]}
                        falseRender={
                          <>
                            <div className='flex items-center'>
                              <div className='w-1/2'>
                                <Input
                                  type='text'
                                  name={datum?.inputName}
                                  theme='normal'
                                  hiddenLabel
                                  value={input?.[datum?.inputName]}
                                  onChange={(e: FormChangeType) => handleChange(e?.target)}
                                />
                              </div>
                              <div className='flex items-center justify-center pl-2'>
                                <IconButton
                                  icon='xicon'
                                  size='lg'
                                  onClick={handleCancel}
                                  customIconStyle={[colorThemes.actionIconTextColor.danger].join(
                                    ' '
                                  )}
                                />
                                <IconButton
                                  icon='check'
                                  type='submit'
                                  size='lg'
                                  customIconStyle={[
                                    'text-bold',
                                    colorThemes.actionIconTextColor.success,
                                  ].join(' ')}
                                />
                              </div>
                            </div>
                          </>
                        }
                      >
                        <dd className='mt-1 text-sm text-gray-900'>
                          {datum?.datum}
                          <ConditionalRender condition={datum?.canEdit}>
                            <IconButton
                              icon={'edit'}
                              size={'xs'}
                              onClick={() => handleIsEditing(datum?.inputName)}
                              classNames='pl-2'
                            />
                          </ConditionalRender>
                        </dd>
                      </ConditionalRender>
                    </div>
                  </ConditionalRender>
                ))}
              </dl>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}

export default UserSummarySection
