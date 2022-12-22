import { useNavigate } from 'react-router-dom'
import useDeleteUser from '../../api/User/deleteUser'
import useGetUsersList from '../../api/User/useGetUsersList'
import PermissionTypes from '../../configs/Enums/PermissionTypes'
import { colorThemes } from '../../configs/global-styles'
import Button from '../../CustomComponents/Buttons/Button'
import IconButton from '../../CustomComponents/Buttons/IconButton'
import Card from '../../CustomComponents/Card/Card'
import CardBody from '../../CustomComponents/Card/card-body'
import CardHeader from '../../CustomComponents/Card/card-header'
import Page from '../../CustomComponents/Page'
import useAuthUser from '../../hooks/useAuthUser'
import MoneyFormatter from '../../library/MoneyFormatter'
import { UserType } from '../../types/UserType'

type Props = {
  title: string
}

const FamilyMembersDetailsPage = ({ title }: Props) => {
  const { authUser } = useAuthUser()
  const { users, invalidateUsers } = useGetUsersList(authUser?.api_token)
  const { deleteUser } = useDeleteUser()
  const navigate = useNavigate()

  const handleDeleteUser = (choreId: number) => {
    deleteUser(authUser?.api_token, choreId).then((data) => {
      invalidateUsers(authUser?.api_token)
    })
  }

  return (
    <>
      <Page
        title={title}
        headerRight={
          <Button
            title='Add Child'
            size='sm'
            status='secondary'
            onClick={() => navigate(`../create/child`)}
          />
        }
        upperSection={
          <div className='space-y-8'>
            {users?.map((user: UserType) => (
              <Card
                key={user?.id}
                header={
                  <CardHeader
                    title={user?.name}
                    rightSideContent={
                      <IconButton
                        icon='delete'
                        size='lg'
                        type='button'
                        customIconStyle={colorThemes?.actionIconTextColor?.danger}
                        onClick={() => handleDeleteUser(user?.id)}
                      />
                    }
                  />
                }
                body={
                  <CardBody
                    children={
                      <ul className='divide-y divide-gray-200 h-auto overflow-scroll'>
                        <li key={user?.id} className='flex py-4 justify-between'>
                          <img
                            className='h-10 w-10 rounded-full'
                            src={user?.thumbnail}
                            alt='blank for now'
                          />
                          <div className='ml-3 flex flex-col items-start'>
                            <p className='text-sm font-medium text-gray-500'>
                              {PermissionTypes.findByValue(user?.permission)?.displayName}
                            </p>
                            <p className='text-sm font-medium text-gray-500'>
                              ${MoneyFormatter?.toDollars(user?.wallet)}
                            </p>
                          </div>
                          <div className='ml-3 flex flex-col items-end'>
                            <p className='text-sm text-gray-500'>{user?.username}</p>
                            <p className='text-sm text-gray-500'>{user?.email}</p>
                          </div>
                        </li>
                      </ul>
                    }
                  />
                }
              />
            ))}
          </div>
        }
      />
    </>
  )
}

export default FamilyMembersDetailsPage
