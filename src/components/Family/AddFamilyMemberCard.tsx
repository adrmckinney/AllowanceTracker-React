import { useNavigate } from 'react-router-dom'
import PermissionTypes from '../../configs/Enums/PermissionTypes'
import Button from '../../CustomComponents/Buttons/Button'
import Card from '../../CustomComponents/Card/Card'
import CardBody from '../../CustomComponents/Card/card-body'
import CardHeader from '../../CustomComponents/Card/card-header'
import { UserType } from '../../types/UserType'
import ConditionalRender from '../../CustomComponents/conditional-render'
import useAuthUser from '../../hooks/useAuthUser'

type Props = {
  users: UserType[]
}

const AddFamilyMemberCard = ({ users }: Props) => {
  const { authUser } = useAuthUser()
  const navigate = useNavigate()

  return (
    <>
      <Card
        header={
          <CardHeader
            title={`Family ID:  ${authUser?.family_id}`}
            subTitle='Share ID to invite other caregivers'
            rightSideContent={
              <Button title='Add Children' size='sm' onClick={() => navigate(`../create/child`)} />
            }
          />
        }
        body={
          <ConditionalRender condition={users?.length > 0}>
            <CardBody
              children={
                <>
                  <ul className='divide-y divide-gray-200 h-52 overflow-scroll'>
                    {users?.map((user: UserType) => (
                      <li key={user?.id} className='flex py-4 justify-between'>
                        <img
                          className='h-10 w-10 rounded-full'
                          src={user?.thumbnail}
                          alt='blank for now'
                        />
                        <div className='ml-3 flex flex-col items-start'>
                          <p className='text-sm font-medium text-gray-900'>{user?.name}</p>
                          <p className='text-sm font-medium text-gray-500'>
                            {PermissionTypes.findByValue(user?.permission)?.displayName}
                          </p>
                        </div>
                        <div className='ml-3 flex flex-col items-end'>
                          <p className='text-sm text-gray-500'>{user?.username}</p>
                          <p className='text-sm text-gray-500'>{user?.email}</p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </>
              }
            />
          </ConditionalRender>
        }
      />
    </>
  )
}

export default AddFamilyMemberCard
