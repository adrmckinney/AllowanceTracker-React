import { useNavigate } from 'react-router-dom'
import useDeleteChore from '../../api/Chore/useDeleteChore'
import useGetChoresList from '../../api/Chore/useGetChoresList'
import { colorThemes } from '../../configs/global-styles'
import Button from '../../CustomComponents/Buttons/Button'
import IconButton from '../../CustomComponents/Buttons/IconButton'
import Card from '../../CustomComponents/Card/Card'
import CardBody from '../../CustomComponents/Card/card-body'
import CardHeader from '../../CustomComponents/Card/card-header'
import Page from '../../CustomComponents/Page'
import useAuthUser from '../../hooks/useAuthUser'
import MoneyFormatter from '../../library/MoneyFormatter'
import { ChoreType } from '../../types/Chores/ChoreType'

type Props = {
  title: string
}

const ManageChoresPage = ({ title }: Props) => {
  const { authUser } = useAuthUser()
  const { chores, invalidateChores } = useGetChoresList(authUser?.api_token)
  const { deleteChore } = useDeleteChore()
  const navigate = useNavigate()

  const handleDeleteChore = (choreId: number) => {
    deleteChore(authUser?.api_token, choreId).then(data => {
      invalidateChores(authUser?.api_token)
    })
  }

  return (
    <>
      <Page
        title={title}
        headerRight={
          <Button
            title='Add Chores'
            size='sm'
            status='secondary'
            onClick={() => navigate(`../chores/create`)}
          />
        }
        upperSection={
          <div className='space-y-8'>
            {chores?.map((chore: ChoreType) => (
              <Card
                key={chore?.id}
                header={
                  <CardHeader
                    title={chore?.name}
                    rightSideContent={
                      <IconButton
                        icon='delete'
                        size='lg'
                        type='button'
                        customIconStyle={colorThemes?.actionIconTextColor?.danger}
                        onClick={() => handleDeleteChore(chore?.id)}
                      />
                    }
                  />
                }
                body={
                  <CardBody
                    children={
                      <ul className='divide-y divide-gray-200 h-auto'>
                        <li className='flex py-4 justify-between'>
                          <div className='ml-3'>
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

export default ManageChoresPage
