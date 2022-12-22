import { useContext, useMemo } from 'react'
import { useParams } from 'react-router-dom'
import Icon from '../../CustomComponents/Icon'
import FeatureCard from '../../CustomComponents/Card/feature-card'
import ChoreSummaryCard from '../../components/User/chore-summary-card'
import Page from '../../CustomComponents/Page'
import UserSummarySection from '../../components/User/UserSummarySection'
import TransactionSummaryCard from '../../components/User/transaction-summary-card'
import useAuthUser from '../../hooks/useAuthUser'
import { UserChoresSummaryType, UserTransactionsSummaryType } from '../../types/UserType'
import useQueryModifiers from '../../hooks/useQueryModifiers'
import useGetUserChoresList from '../../api/UserChore/useGetUserChoresList'
import useGetUserTransactions from '../../api/Transaction/useGetUserTransactions'
import useGetUserTransfers from '../../api/Transfer/useGetUserTransfers'
import TransferSummaryCard from '../../components/User/transfer-summary-card'
import useGetUser from '../../api/User/useGetUser'
import UserContext from '../../context/UserContext'
import { TransferType } from '../../types/TransferType'
import SkeletonList from '../../CustomComponents/skeletons/SkeletonList'

type Props = {
  title: string
}

type Feature = {
  id: number
  title: string
  items: UserChoresSummaryType | UserTransactionsSummaryType | TransferType | undefined
  icon: React.ReactNode
  component?: React.ReactNode
}

const UserDetailsPage = ({ title }: Props) => {
  const { id } = useParams()
  const { authUser } = useAuthUser()
  const { modifiers } = useQueryModifiers()
  const { userContext: user, isLoadingUserContext } = useContext(UserContext)
  const token = authUser?.api_token
  useGetUser(token, id)
  const resultsPerPage = 5
  const { userChores, isLoading: choresLoading } = useGetUserChoresList(token, {
    modifiers: {
      ...modifiers,
      resultsPerPage: resultsPerPage,
      filters: {
        ...modifiers?.filters,
        userChoreUserId: id,
      },
    },
  })

  const { userTransfers: transfers, isLoading: transfersLoading } = useGetUserTransfers(token, {
    modifiers: {
      ...modifiers,
      resultsPerPage: resultsPerPage,
      filters: {
        ...modifiers?.filters,
        transferUserId: id,
      },
    },
  })

  const { userTransactions: transactions, isLoading: transactionsLoading } = useGetUserTransactions(
    token,
    {
      modifiers: {
        ...modifiers,
        resultsPerPage: resultsPerPage,
        filters: {
          ...modifiers?.filters,
          transactionUserId: id,
        },
      },
    }
  )

  const features = useMemo(
    (): Feature[] => [
      {
        id: 1,
        title: 'Chores',
        items: user?.chores,
        icon: <Icon icon='list' customIconStyle={'text-white mr-0'} size='xl' />,
        component: choresLoading ? <SkeletonList /> : <ChoreSummaryCard userChores={userChores} />,
      },
      {
        id: 2,
        title: 'Transfers',
        items: user?.transactions,
        icon: <Icon icon='transfer' customIconStyle={'text-white mr-0'} size='xl' />,
        component: transfersLoading ? (
          <SkeletonList />
        ) : (
          <TransferSummaryCard transfers={transfers} />
        ),
      },
      {
        id: 3,
        title: 'Transactions',
        items: user?.transactions,
        icon: <Icon icon='dollar' customIconStyle={'text-white mr-0'} size='xl' />,
        component: transactionsLoading ? (
          <SkeletonList />
        ) : (
          <TransactionSummaryCard transactions={transactions} />
        ),
      },
    ],
    [user, userChores, transfers, transactions]
  )

  return (
    <>
      <Page
        title={title}
        upperSection={<UserSummarySection user={user} isLoading={isLoadingUserContext} />}
        lowerGridSection={features.map(feature => (
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
