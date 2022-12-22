import CardBody from '../../CustomComponents/Card/card-body'
import MoneyFormatter from '../../library/MoneyFormatter'
import { ChoreType } from '../../types/Chores/ChoreType'

type Props = {
  chores: ChoreType[]
}
const ChoreCardBody = ({ chores }: Props) => {
  return (
    <CardBody
      children={
        <>
          <ul className='divide-y divide-gray-200 h-52 overflow-scroll'>
            {chores?.map((chore: ChoreType) => (
              <li key={chore?.id} className='flex py-4 justify-between'>
                <div className='ml-3'>
                  <p className='text-sm font-medium text-gray-900'>{chore?.name}</p>
                  <p className='text-sm font-medium text-gray-500'>{chore?.description}</p>
                </div>
                <div className='ml-3'>
                  <p className='text-sm text-gray-500'>${MoneyFormatter.toDollars(chore?.cost)}</p>
                </div>
              </li>
            ))}
          </ul>
        </>
      }
    />
  )
}

export default ChoreCardBody
