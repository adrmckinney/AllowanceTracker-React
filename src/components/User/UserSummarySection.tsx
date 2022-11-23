import React, { useEffect, useMemo, useState } from 'react'
import useUpsertUser from '../../api/User/useUpsertUser'
import PermissionTypes from '../../configs/Enums/PermissionTypes'
import { colorThemes } from '../../configs/global-styles'
import useUserSummaryValidation from '../../configs/ValidationRules/useUserSummaryValidation'
import CancelSubmitIconButtons from '../../CustomComponents/Buttons/CancelSubmitIconButtons'
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
  name: boolean
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
  name: string
  username: string
  email: string
  number: string
}

const UserSummarySection = ({ user }: Props): JSX.Element => {
  const [isEditing, setIsEditing] = useState<EditingState>({
    name: false,
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
    touched,
    handleOnBlur,
  } = useFormHelpers<InitialValues>({
    name: user?.name,
    username: user?.username,
    email: user?.email,
    number: user?.number,
  })

  const { validations, isDisabled } = useUserSummaryValidation(input, touched)

  useEffect(() => {
    setInitialValues({
      name: user?.name,
      username: user?.username,
      email: user?.email,
      number: user?.number,
    })
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
    let newEditing = { ...isEditing }
    Object.keys(newEditing)?.forEach((field: string) => {
      newEditing[field] = false
    })

    switch (inputName) {
      case 'name':
        newEditing['name'] = true
        setIsEditing(newEditing)
        break
      case 'username':
        newEditing['username'] = true
        setIsEditing(newEditing)
        break
      case 'email':
        newEditing['email'] = true
        setIsEditing(newEditing)
        break
      case 'number':
        newEditing['number'] = true
        setIsEditing(newEditing)
        break
    }
  }

  const handleCancel = () => {
    let newEditing = { ...isEditing }

    Object.keys(newEditing)?.forEach((field: string) => {
      newEditing[field] = false
    })

    setIsEditing(newEditing)
  }
  console.log('isEditing', isEditing)

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
        datum: user?.number,
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
            // src={user?.image}
            // src='https://www.gravatar.com/avatar/963f22f3f1be921e420e6fa8675e4199?d=https%3A%2F%2Fwww.somewhere.com%2Fhomestar.jpg&s=40'
            src='https://images.unsplash.com/photo-1517365830460-955ce3ccd263?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=1024&h=1024&q=80'
            alt={user?.name}
          />
        </div>
        <form onSubmit={handleSubmit} className='sm:col-span-2'>
          <div className='space-y-4'>
            <div className='space-y-1 text-lg font-medium leading-6'>
              <div className='flex'>
                <ConditionalRender
                  condition={!isEditing?.name}
                  falseRender={
                    <>
                      <div className='flex items-center'>
                        <div className='w-1/2'>
                          <Input
                            type='text'
                            name={'name'}
                            theme='normal'
                            hiddenLabel
                            value={input?.name}
                            onChange={(e: FormChangeType) => handleChange(e?.target)}
                            handleOnBlur={(e: FormChangeType) => handleOnBlur(e?.target)}
                            touched={touched}
                            errors={validations?.name}
                          />
                        </div>
                        <div
                          className={[
                            'flex justify-center pl-2',
                            isDisabled ? 'self-start pt-2' : 'items-center ',
                          ].join(' ')}
                        >
                          <CancelSubmitIconButtons
                            handleCancel={handleCancel}
                            isDisabled={isDisabled}
                          />
                        </div>
                      </div>
                    </>
                  }
                >
                  <h2>{user?.name}</h2>
                  <IconButton
                    icon={'edit'}
                    size={'xs'}
                    onClick={() => handleIsEditing('name')}
                    classNames='pl-2'
                  />
                </ConditionalRender>
              </div>
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
                                  handleOnBlur={(e: FormChangeType) => handleOnBlur(e?.target)}
                                  touched={touched}
                                  errors={validations?.[datum?.inputName]}
                                />
                              </div>
                              <div
                                className={[
                                  'flex justify-center pl-2',
                                  isDisabled ? 'self-start pt-2' : 'items-center ',
                                ].join(' ')}
                              >
                                <CancelSubmitIconButtons
                                  handleCancel={handleCancel}
                                  isDisabled={isDisabled}
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
            </div>
          </div>
        </form>
      </div>
    </>
  )
}

export default UserSummarySection
