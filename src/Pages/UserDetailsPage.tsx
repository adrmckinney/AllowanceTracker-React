import { useEffect, useMemo, useState } from 'react'
import { getUser } from '../api/User/getUser'
import { useParams } from 'react-router-dom'
import Icon from '../CustomComponents/Icon'
import FeatureCard from '../CustomComponents/Card/feature-card'
import ChoreSummaryCard from '../components/User/chore-summary-card'
import Page from '../CustomComponents/Page'
import UserSummarySection from '../components/User/UserSummarySection'
import TransactionSummaryCard from '../components/User/transaction-summary-card'
import useAuthUser from '../hooks/useAuthUser'
import { UserChoresSummaryType, UserTransactionsSummaryType, UserType } from '../types/UserType'
import useQueryModifiers from '../hooks/useQueryModifiers'
import useGetUserChoresList from '../api/UserChore/useGetUserChoresList'
import { UserChoreType } from '../types/UserChoreType'
import useGetUserTransactions from '../api/Transaction/useGetUserTransactions'
import useGetUserTransfers from '../api/Transfer/useGetUserTransfers'
import TransferSummaryCard from '../components/User/transfer-summary-card'

type Props = {
  title: string
}

type Feature = {
  id: number
  title: string
  items: UserChoresSummaryType | UserTransactionsSummaryType | undefined
  icon: React.ReactNode
  component?: React.ReactNode
}

const UserDetailsPage = ({ title }: Props) => {
  const { id } = useParams()
  const { authUser } = useAuthUser()
  const [user, setUser] = useState<UserType | null>(null)
  const [userChores, setUserChores] = useState<UserChoreType[] | null>(null)
  const [transfers, setTransfers] = useState(null)
  const [transactions, setTransactions] = useState(null)
  const { setters } = useQueryModifiers()
  const { getUserChores } = useGetUserChoresList()
  const { getUserTransfers } = useGetUserTransfers()
  const { getUserTransactions } = useGetUserTransactions()

  const token = authUser?.api_token

  useEffect(() => {
    if (!!token && typeof id !== 'undefined') {
      getUser(token, id).then((data: UserType) => {
        setUser(data)
      })

      getUserChores(token, { modifiers: prepareModifiers('userChoreUserId') }).then(data =>
        setUserChores(data?.chores)
      )

      getUserTransfers(token, { modifiers: prepareModifiers('transferUserId') }).then(data =>
        setTransfers(data?.transfers)
      )

      getUserTransactions(token, { modifiers: prepareModifiers('transactionUserId') }).then(data =>
        setTransactions(data?.transactions)
      )
    }
  }, [])

  const prepareModifiers = (filterKey: string) => {
    return setters.setMultipleModifierOptions({
      resultsPerPage: 5,
      filterKey: filterKey,
      filterValue: authUser?.id,
    })
  }

  const features = useMemo(
    (): Feature[] => [
      {
        id: 1,
        title: 'Chores',
        items: user?.chores,
        icon: <Icon icon='list' customIconStyle={'text-white mr-0'} />,
        component: <ChoreSummaryCard userChores={userChores} />,
      },
      {
        id: 2,
        title: 'Transfers',
        items: user?.transactions,
        icon: <Icon icon='money' customIconStyle={'text-white mr-0'} size='xl' />,
        component: <TransferSummaryCard transfers={transfers} />,
      },
      {
        id: 3,
        title: 'Transactions',
        items: user?.transactions,
        icon: <Icon icon='check' customIconStyle={'text-white mr-0'} />,
        component: <TransactionSummaryCard transactions={transactions} />,
      },
    ],
    [user, userChores, transfers, transactions]
  )

  return (
    <>
      <Page
        title={title}
        overviewSection={<UserSummarySection user={user} />}
        gridSection={features.map(feature => (
          <FeatureCard
            key={feature?.title}
            icon={feature?.icon}
            title={feature?.title}
            component={feature.component}
          ></FeatureCard>
        ))}
      ></Page>
    </>
  )
}

export default UserDetailsPage
