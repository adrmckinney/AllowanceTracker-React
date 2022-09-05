import { useEffect, useState } from 'react'
import { getUser } from '../api/getUser'
import { useUserContext } from '../HOC/withUserContext'
import { useParams } from 'react-router-dom'
import Icon from '../CustomComponents/Icon'
import FeatureCard from '../CustomComponents/Card/feature-card'
import Paddedlayout from '../CustomComponents/padded-layout'
import GridSection from '../CustomComponents/grid-section'
import DetailCard from '../CustomComponents/Card/detail-card'

const UserDetailsPage = () => {
  const { id } = useParams()
  const { authUser } = useUserContext()
  const [user, setUser] = useState(null)
  console.log('user', user)

  useEffect(() => {
    if (!!authUser?.api_token) {
      getUser(authUser?.api_token, id).then(data => {
        setUser(data)
      })
    }
  }, [authUser])

  const features = [
    {
      id: 1,
      name: 'Transactions',
      description:
        'Ac tincidunt sapien vehicula erat auctor pellentesque rhoncus. Et magna sit morbi vitae lobortis.',
      icon: <Icon icon='money' customIconStyle={'text-white mr-0'} size='xl' />,
    },
    {
      id: 2,
      name: 'Chores',
      description:
        'Qui aut temporibus nesciunt vitae dicta repellat sit dolores pariatur. Temporibus qui illum aut.',
      icon: <Icon icon='list' customIconStyle={'text-white mr-0'} />,
    },
    {
      id: 3,
      name: 'Simple Queues',
      description:
        'Rerum quas incidunt deleniti quaerat suscipit mollitia. Amet repellendus ut odit dolores qui.',
      icon: <Icon icon='check' customIconStyle={'text-white mr-0'} />,
    },
  ]

  return (
    <>
      <main className='relative -mt-40'>
        <header className='relative py-10'>
          <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
            <h1 className='text-3xl font-bold tracking-tight text-white'>Settings</h1>
          </div>
        </header>
        <div className='mx-auto max-w-screen-xl px-4 pb-6 sm:px-6 lg:px-8 lg:pb-16'>
          <div className='overflow-hidden rounded-lg bg-white shadow'>
            <Paddedlayout>
              <GridSection>
                {features.map(feature => (
                  <FeatureCard key={`${feature.id}`} feature={feature}>
                    <DetailCard />
                  </FeatureCard>
                ))}
              </GridSection>
            </Paddedlayout>
          </div>
        </div>
      </main>
    </>
  )
}

export default UserDetailsPage
