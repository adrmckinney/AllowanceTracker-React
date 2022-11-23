import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import useGetChoresList from '../api/Chore/useGetChoresList'
import useGetUsersList from '../api/User/useGetUsersList'
import PermissionTypes from '../configs/Enums/PermissionTypes'
import { fontThemes } from '../configs/global-styles'
import Button from '../CustomComponents/Buttons/Button'
import Card from '../CustomComponents/Card/Card'
import CardBody from '../CustomComponents/Card/card-body'
import CardHeader from '../CustomComponents/Card/card-header'
import PaddedLayout from '../CustomComponents/padded-layout'
import useAuthUser from '../hooks/useAuthUser'
import MoneyFormatter from '../library/MoneyFormatter'
import { ChoreType } from '../types/Chores/ChoreType'
import { UserType } from '../types/UserType'

const FamilySetupPage = () => {
  const [users, setUsers] = useState<UserType[] | null>(null)
  const [chores, setChores] = useState<ChoreType[] | null>(null)
  const { authUser } = useAuthUser()
  const { getUsersList } = useGetUsersList()
  const { getChoresList } = useGetChoresList()
  const navigate = useNavigate()

  useEffect(() => {
    getUsersList(authUser?.api_token).then(data => {
      if ('error' in data) {
        console.log('error data', data)
      } else {
        setUsers(data?.usersListData)
      }
    })
    getChoresList(authUser?.api_token).then(data => {
      if ('error' in data) {
        console.log('error data', data)
      } else {
        setChores(data?.choresListData)
      }
    })
  }, [])

  return (
    <>
      <div className='min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8'>
        <div className='max-w-md sm:max-w-lg w-full space-y-8'>
          <div>
            <h1 className={`mt-6 mb-10 text-center ${fontThemes.appTitle}`}>
              Allowance Tracker Setup
            </h1>
            <h2 className={`mt-6 text-center ${fontThemes.title}`}>
              Add Your Family and Create Chores
            </h2>
          </div>

          <Card
            header={
              <CardHeader
                title={'Family Members'}
                rightSideContent={
                  <Button
                    title='Add Children'
                    size='sm'
                    onClick={() => navigate(`../registration/child`)}
                  />
                }
              />
            }
            body={
              <CardBody
                children={
                  <>
                    <ul className='divide-y divide-gray-200 h-52 overflow-scroll'>
                      {users?.map((user: UserType) => (
                        <li key={user?.id} className='flex py-4 justify-between'>
                          <img className='h-10 w-10 rounded-full' src={''} alt='blank for now' />
                          <div className='ml-3'>
                            <p className='text-sm font-medium text-gray-900'>{user?.name}</p>
                            <p className='text-sm font-medium text-gray-500'>
                              {PermissionTypes.findByValue(user?.permission)?.displayName}
                            </p>
                          </div>
                          <div className='ml-3'>
                            <p className='text-sm text-gray-500'>{user?.username}</p>
                            <p className='text-sm text-gray-500'>{user?.email}</p>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </>
                }
              />
            }
          />

          <Card
            header={
              <CardHeader
                title={'Chores'}
                rightSideContent={
                  <Button
                    title='Add Chores'
                    size='sm'
                    onClick={() => navigate(`../chores/create`)}
                  />
                }
              />
            }
            body={
              <CardBody
                children={
                  <>
                    <ul className='divide-y divide-gray-200 h-52 overflow-scroll'>
                      {chores?.map((chore: ChoreType) => (
                        <li key={chore?.id} className='flex py-4 justify-between'>
                          <div className='ml-3'>
                            <p className='text-sm font-medium text-gray-900'>{chore?.name}</p>
                            <p className='text-sm font-medium text-gray-500'>
                              {chore?.description}
                            </p>
                          </div>
                          <div className='ml-3'>
                            <p className='text-sm text-gray-500'>
                              ${MoneyFormatter.toDollars(chore?.cost)}
                            </p>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </>
                }
              />
            }
          />
        </div>
      </div>
      <PaddedLayout classNames='flex justify-center pb-20'>
        <Button
          title='Done with Setup'
          size='xl'
          onClick={() => navigate(`../user/${authUser.id}`)}
        />
      </PaddedLayout>
    </>
  )
}

export default FamilySetupPage
