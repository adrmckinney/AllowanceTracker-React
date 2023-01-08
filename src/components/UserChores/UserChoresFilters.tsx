import { useEffect, useState } from 'react'
import { Disclosure } from '@headlessui/react'
import ChoreStatuses, { ChoreStatusEnumType } from '../../configs/Enums/ChoreStatuses'
import usePersistentModifiers from '../../hooks/usePersistentModifiers'
import useGetChoresList from '../../api/Chore/useGetChoresList'
import useAuthUser from '../../hooks/useAuthUser'
import { ChoreType } from '../../types/Chores/ChoreType'
import useGetUsersList from '../../api/User/useGetUsersList'
import { UserType } from '../../types/UserType'
import { handleCheckboxSelectedValues } from '../../helpers/checkboxHelpers'
import ConditionalRender from '../../CustomComponents/conditional-render'
import Icon from '../../CustomComponents/Icon'
import Checkbox from '../../CustomComponents/Inputs/Checkbox'
import SkeletonList from '../../CustomComponents/skeletons/SkeletonList'
import Button from '../../CustomComponents/Buttons/Button'
import PaddedLayout from '../../CustomComponents/padded-layout'

type Props = {
  handleFilterSubmit: (arg0: React.FormEvent<HTMLFormElement>) => void
  resetStorageFilters: () => void
}

type UserChoresFilterType = {
  id: string
  name: string
  options: UserChoreFilterOptionsType[]
  isLoading: boolean
  condition: boolean
  hasFilters: boolean
}

type UserChoreFilterOptionsType = {
  value: number
  name: string
  categoryGroup: string
}

const UserChoresFilters = ({ handleFilterSubmit, resetStorageFilters }: Props) => {
  const { authUser, isParentOrHigher } = useAuthUser()
  const { setPersistentFilters, getStorageModifiers, getStorageFilterValues } =
    usePersistentModifiers(null)
  const initialValues = {
    choreStatuses: [],
    chores: [],
    users: [],
    approvers: [],
  }
  const [selectedStatusId, setSelectedStatusId] = useState(initialValues)
  const { chores, isLoading: choresLoading } = useGetChoresList(authUser?.api_token)
  const { users, isLoading: usersLoading } = useGetUsersList(authUser?.api_token)

  useEffect(() => {
    const { choreStatuses, users, chores } = getStorageModifiers()?.modifiers?.filters

    setSelectedStatusId((state) => ({ ...state, choreStatuses, users, chores }))
  }, [])

  const filters: UserChoresFilterType[] = [
    {
      id: 'status',
      name: 'Chore Statuses',
      options: ChoreStatuses?.filter((item: ChoreStatusEnumType) => typeof item === 'object'),
      isLoading: false,
      condition: true,
      hasFilters: !!getStorageFilterValues('choreStatuses')?.length,
    },
    {
      id: 'chores',
      name: 'Chores',
      isLoading: choresLoading,
      condition: true,
      options: chores?.map((chore: ChoreType) => {
        return { value: chore?.id, name: chore?.name, categoryGroup: 'chores' }
      }),
      hasFilters: !!getStorageFilterValues('chores')?.length,
    },
    {
      id: 'users',
      name: 'Users',
      options: users?.map((user: UserType) => {
        return { value: user?.id, name: user?.name, categoryGroup: 'users' }
      }),
      isLoading: usersLoading,
      condition: isParentOrHigher(authUser),
      hasFilters: !!getStorageFilterValues('users')?.length,
    },
    {
      id: 'approvers',
      name: 'Approvers',
      options: users
        ?.filter((user: UserType) => isParentOrHigher(user))
        ?.map((user: UserType) => {
          return { value: user?.id, name: user?.name, categoryGroup: 'approvers' }
        }),
      isLoading: usersLoading,
      condition: true,
      hasFilters: !!getStorageFilterValues('approvers')?.length,
    },
  ]

  const handleSelected = ({ name, value }) => {
    const { action } = setPersistentFilters(name, value)
    const newSelectedValues = handleCheckboxSelectedValues(
      action === 'splice',
      selectedStatusId[name],
      value
    )
    setSelectedStatusId((state) => ({ ...state, [name]: newSelectedValues }))
  }

  return (
    <>
      <form onSubmit={handleFilterSubmit}>
        <PaddedLayout classNames='flex space-x-4'>
          <Button
            type='button'
            title='Reset'
            size='sm'
            status='cancel'
            customClassName='w-full text-xs sm:text-sm'
            onClick={() => {
              setSelectedStatusId(initialValues)
              resetStorageFilters()
            }}
          />
          <Button
            type='submit'
            title='Filter'
            size='sm'
            status='primary'
            customClassName='w-full text-xs sm:text-sm'
          />
        </PaddedLayout>
        {filters?.map((section) => (
          <ConditionalRender key={section?.id} condition={section?.condition}>
            <Disclosure
              as='div'
              defaultOpen={window.innerWidth >= 1024 ? true : section?.hasFilters}
              className='border-t border-gray-200 px-4 py-6'
            >
              {({ open }) => (
                <>
                  <h3 className='-mx-2 -my-3 flow-root'>
                    <Disclosure.Button className='flex w-full items-center justify-between bg-white lg:bg-transparent px-2 py-3 text-gray-400 hover:text-gray-500'>
                      <span className='font-medium text-gray-900'>{section?.name}</span>
                      <span className='ml-6 flex items-center'>
                        {open ? (
                          <Icon icon='minus' size='lg' customIconStyle='mr-0' />
                        ) : (
                          <Icon icon='plusSm' size='lg' customIconStyle='mr-0' />
                        )}
                      </span>
                    </Disclosure.Button>
                  </h3>

                  <Disclosure.Panel className='pt-6'>
                    <div className='space-y-6'>
                      <ConditionalRender
                        condition={!section?.isLoading}
                        falseRender={<SkeletonList />}
                      >
                        {section?.options?.map((option: UserChoreFilterOptionsType) => (
                          <div
                            key={`${option?.categoryGroup}-${option?.value}`}
                            className='flex items-center'
                          >
                            <Checkbox
                              id={option?.categoryGroup}
                              name={option?.categoryGroup}
                              label={option?.name}
                              value={option?.value}
                              legend={section?.name}
                              checked={selectedStatusId?.[option?.categoryGroup]?.includes(
                                '' + option?.value
                              )}
                              handleChange={(e) => handleSelected(e?.target)}
                            />
                          </div>
                        ))}
                      </ConditionalRender>
                    </div>
                  </Disclosure.Panel>
                </>
              )}
            </Disclosure>
          </ConditionalRender>
        ))}
      </form>
    </>
  )
}

export default UserChoresFilters
