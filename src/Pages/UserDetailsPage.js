import { useEffect } from 'react'
import { getUser } from '../api/getUser'
import { useUserContext } from '../HOC/withUserContext'
import { useParams } from 'react-router-dom'
import Icon from '../CustomComponents/Icon'

const UserDetailsPage = () => {
  const { id } = useParams()
  const { authUser } = useUserContext()
  useEffect(() => {
    getUser(authUser?.api_token, id).then(data => {
      console.log('data', data)
    })
  }, [])

  const features = [
    {
      name: 'Transactions',
      description:
        'Ac tincidunt sapien vehicula erat auctor pellentesque rhoncus. Et magna sit morbi vitae lobortis.',
      icon: <Icon icon='money' customIconStyle={'text-white mr-0'} size='xl' />,
    },
    {
      name: 'Chores',
      description:
        'Qui aut temporibus nesciunt vitae dicta repellat sit dolores pariatur. Temporibus qui illum aut.',
      icon: <Icon icon='list' customIconStyle={'text-white mr-0'} />,
    },
    {
      name: 'Simple Queues',
      description:
        'Rerum quas incidunt deleniti quaerat suscipit mollitia. Amet repellendus ut odit dolores qui.',
      icon: <Icon icon='check' customIconStyle={'text-white mr-0'} />,
    },
  ]

  return (
    <>
      <div>
        <h1>User Details Page</h1>
      </div>
      <div className='relative bg-white py-16 sm:py-24 lg:py-32'>
        <div className='mx-auto max-w-md px-4 text-center sm:max-w-3xl sm:px-6 lg:max-w-7xl lg:px-8'>
          <h2 className='text-lg font-semibold text-cyan-600'>Deploy faster</h2>
          <p className='mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl'>
            Everything you need to deploy your app
          </p>
          <p className='mx-auto mt-5 max-w-prose text-xl text-gray-500'>
            Phasellus lorem quam molestie id quisque diam aenean nulla in. Accumsan in quis quis
            nunc, ullamcorper malesuada. Eleifend condimentum id viverra nulla.
          </p>
          <div className='mt-12'>
            <div className='grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3'>
              {features.map(feature => (
                <div key={feature.name} className='pt-6'>
                  <div className='flow-root rounded-lg bg-gray-50 px-6 pb-8'>
                    <div className='-mt-6'>
                      <div>
                        <span className='inline-flex items-center justify-center rounded-md bg-gradient-to-r from-teal-500 to-cyan-600 p-3 shadow-lg'>
                          {feature.icon}
                        </span>
                      </div>
                      <h3 className='mt-8 text-lg font-medium tracking-tight text-gray-900'>
                        {feature.name}
                      </h3>
                      <p className='mt-5 text-base text-gray-500'>{feature.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default UserDetailsPage
