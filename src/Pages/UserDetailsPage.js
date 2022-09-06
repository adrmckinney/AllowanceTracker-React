// @flow

import { useEffect, useMemo, useState } from 'react'
import { getUser } from '../api/getUser'
import { useUserContext } from '../HOC/withUserContext'
import { useParams } from 'react-router-dom'
import Icon from '../CustomComponents/Icon'
import FeatureCard from '../CustomComponents/Card/feature-card'
import DetailCard from '../CustomComponents/Card/detail-card'
import Page from '../CustomComponents/Page'
import UserSummarySection from '../components/Users/UserSummarySection'

type Props = {
  title: String,
}

const UserDetailsPage = ({ title }: Props) => {
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

  const features = useMemo(
    () => [
      {
        id: 1,
        title: 'Chores',
        items: user?.chores,
        icon: <Icon icon='list' customIconStyle={'text-white mr-0'} />,
      },
      {
        id: 2,
        title: 'Transactions',
        items: user?.transactions,
        icon: <Icon icon='money' customIconStyle={'text-white mr-0'} size='xl' />,
      },
      {
        id: 3,
        title: 'Simple Queues',
        icon: <Icon icon='check' customIconStyle={'text-white mr-0'} />,
      },
    ],
    [user?.chores, user?.transactions]
  )

  return (
    <>
      <Page
        title={title}
        overviewSection={<UserSummarySection user={user} />}
        gridSection={features.map(feature => (
          <FeatureCard key={feature?.id} icon={feature?.icon} title={feature?.title}>
            {feature?.items?.map(item => (
              <DetailCard key={item?.id} item={item} />
            ))}
          </FeatureCard>
        ))}
      ></Page>
    </>
  )
}

export default UserDetailsPage
