import { Link } from 'react-router-dom'
import TwoColLayout from '../two-col-layout'
const people = [
  {
    name: 'Leslie Alexander',
    email: 'leslie.alexander@example.com',
    role: 'Co-Founder / CEO',
  },
]

const DetailCard = () => {
  return (
    <>
      <div className='grid grid-cols-1 gap-4'>
        {people.map(person => (
          <div
            key={person.email}
            className='relative flex items-center space-x-3 rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 hover:border-gray-400'
          >
            <TwoColLayout
              leftColContent={
                <>
                  <p className='text-sm font-medium text-gray-900'>{person.name}</p>
                  <p className='text-sm font-medium text-gray-900'>Date</p>
                </>
              }
              rightColContent={
                <>
                  <p className='text-sm font-medium text-gray-900'>Money</p>
                  <p className='truncate text-sm text-gray-500'>Status</p>
                </>
              }
              wrapperClassNames={'w-full'}
              rightClassNames={'items-end'}
            />
          </div>
        ))}
      </div>
    </>
  )
}

export default DetailCard
