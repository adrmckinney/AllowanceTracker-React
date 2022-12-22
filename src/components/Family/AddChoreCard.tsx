import { useNavigate } from 'react-router-dom'
import Button from '../../CustomComponents/Buttons/Button'
import Card from '../../CustomComponents/Card/Card'
import CardHeader from '../../CustomComponents/Card/card-header'
import ChoreCardBody from '../../Pages/Chores/chore-card-body'
import { ChoreType } from '../../types/Chores/ChoreType'
import ConditionalRender from '../../CustomComponents/conditional-render'

type Props = {
  chores: ChoreType[]
}

const AddChoreCard = ({ chores }: Props) => {
  const navigate = useNavigate()

  return (
    <>
      <Card
        header={
          <CardHeader
            title={'Chores'}
            rightSideContent={
              <Button title='Add Chores' size='sm' onClick={() => navigate(`../chores/create`)} />
            }
          />
        }
        body={
          <ConditionalRender condition={chores?.length > 0}>
            <ChoreCardBody chores={chores} />
          </ConditionalRender>
        }
      />
    </>
  )
}

export default AddChoreCard
