import { useEffect, useMemo, useState } from 'react'
import { getAuthUser } from '../api/getAuthUser'
import { useUserContext } from '../HOC/withUserContext'
import { useParams } from 'react-router-dom'
import Icon from '../CustomComponents/Icon'
import FeatureCard from '../CustomComponents/Card/feature-card'
import ChoreDetailCard from '../components/User/chore-detail-card'
import Page from '../CustomComponents/Page'
import UserSummarySection from '../components/User/UserSummarySection'
import User from '../api/_entities/user'
import TransactionDetailCard from '../components/User/transaction-detail-card'

const UserDetailsPage = ({ title: string }) => {
  const { id } = useParams()
  const { authUser } = useUserContext()
  const [user, setUser] = useState(null)
  console.log('user', user)

  useEffect(() => {
    if (!!authUser?.api_token && typeof id !== 'undefined') {
      getAuthUser(authUser?.api_token, id).then(data => {
        setUser(User(data))
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

  const renderDetailCard = item => {
    switch (item?._type) {
      case 'chore':
        return <ChoreDetailCard key={item?.id} item={item} />
      case 'transaction':
        return <TransactionDetailCard key={item?.id} item={item} />
      default:
        return null
    }
  }

  return (
    <>
      <Page
        title={title}
        overviewSection={<UserSummarySection user={user} />}
        gridSection={features.map(feature => (
          <FeatureCard key={feature?.id} icon={feature?.icon} title={feature?.title}>
            {feature?.items?.map(item => renderDetailCard(item))}
          </FeatureCard>
        ))}
      ></Page>
    </>
  )
}

export default UserDetailsPage
