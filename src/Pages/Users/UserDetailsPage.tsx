import React, { Fragment, useContext, useMemo, useRef, useState } from 'react'
import { useParams } from 'react-router-dom'
import Icon from '../../CustomComponents/Icon'
import FeatureCard from '../../CustomComponents/Card/feature-card'
import UserChoreSummaryCard from '../../components/User/user-chore-summary-card'
import Page from '../../CustomComponents/Page'
import UserSummarySection from '../../components/User/UserSummarySection'
import TransactionSummaryCard from '../../components/User/transaction-summary-card'
import useAuthUser from '../../hooks/useAuthUser'
import useQueryModifiers from '../../hooks/useQueryModifiers'
import useGetUserChoresSummaryList from '../../api/UserChore/useGetUserChoresSummaryList'
import useGetUserTransactions from '../../api/Transaction/useGetUserTransactions'
import useGetUserTransfers from '../../api/Transfer/useGetUserTransfers'
import TransferSummaryCard from '../../components/User/transfer-summary-card'
import useGetUser from '../../api/User/useGetUser'
import UserContext from '../../context/UserContext'
import { TransferType } from '../../types/TransferType'
import SkeletonList from '../../CustomComponents/skeletons/SkeletonList'
import { UserChoreType } from '../../types/UserChoreType'
import { UserChoresSummaryContext } from '../../context/UserChoresSummaryProvider'
import ConditionalRender from '../../CustomComponents/conditional-render'
import UpdateChoreStatusModal from '../../components/Chores/UpdateChoreStatusModal'
import UpdateTransferModal from '../../components/transfers/UpdateTransferModal'
import { TransferSummaryContext } from '../../context/TransferSummaryProvider'
import { TransactionSummaryContext } from '../../context/TransactionSummaryContext'
import { TransactionType } from '../../types/TransactionType'
import useUpsertUserChore from '../../api/UserChore/useUpsertUserChore'
import { ToastContext } from '../../context/ToastProvider'
import useUpsertTransfer from '../../api/Transfer/useUpsertTransfer'

type Props = {
  title: string
}

type Feature = {
  id: number
  title: string
  icon: React.ReactNode
  component?: React.ReactNode
  modal?: React.ReactNode
  linkPath: string
}

const UserDetailsPage = ({ title }: Props) => {
  const [userChoreModalOpen, setUserChoreModalOpen] = useState(false)
  const [selectedChore, setSelectedChore] = useState<UserChoreType | null>(null)
  const [transferModalOpen, setTransferModalOpen] = useState(false)
  const [selectedTransfer, setSelectedTransfer] = useState<TransferType | null>(null)
  const { handleToastSuccess, handleToastDanger } = useContext(ToastContext)
  const { id } = useParams()
  let formRef = useRef(null)
  const { authUser } = useAuthUser()
  const { modifiers } = useQueryModifiers()
  const { upsertUserChore } = useUpsertUserChore()
  const { upsertTransfer } = useUpsertTransfer()
  const { userContext: user, isLoadingUserContext } = useContext(UserContext)
  const { transferSummaryContext: transfers, isLoading: transfersLoading } =
    useContext(TransferSummaryContext)
  const { isLoading: choresLoading, userChoresSummaryContext: userChores } =
    useContext(UserChoresSummaryContext)
  const { transactionsSummaryContext: transactions, isLoading: transactionsLoading } =
    useContext(TransactionSummaryContext)
  const token = authUser?.api_token
  useGetUser(token, id)
  const resultsPerPage = 25

  const getModifiers = (target: 'userChoreUserId' | 'transferUserId' | 'transactionUserId') => {
    return {
      modifiers: {
        ...modifiers,
        resultsPerPage: resultsPerPage,
        filters: {
          ...modifiers?.filters,
          [target]: id,
        },
      },
    }
  }

  const { getUserChores } = useGetUserChoresSummaryList(token, getModifiers('userChoreUserId'))

  const { getUserTransfers } = useGetUserTransfers(token, getModifiers('transferUserId'))

  const { getUserTransactions } = useGetUserTransactions(token, getModifiers('transactionUserId'))

  const handleUserChoreClick = (userChore: UserChoreType = null) => {
    setSelectedChore(userChore)
    setUserChoreModalOpen(true)
  }

  const handleTransferClick = (transfer: TransferType = null) => {
    setSelectedTransfer(transfer)
    setTransferModalOpen(true)
  }

  const features: Feature[] = [
    {
      id: 1,
      title: 'Chores',
      icon: <Icon icon='list' customIconStyle={'text-white mr-0'} size='xl' />,
      linkPath: `/user-chores/${id}`,
      component: useMemo(
        () =>
          choresLoading ? (
            <SkeletonList />
          ) : (
            <>
              {userChores?.map((chore: UserChoreType) => (
                <div key={chore?.id} onClick={() => handleUserChoreClick(chore)}>
                  <UserChoreSummaryCard userChore={chore} />
                </div>
              ))}
            </>
          ),
        [userChores, choresLoading]
      ),
    },
    {
      id: 2,
      title: 'Transfers',
      icon: <Icon icon='transfer' customIconStyle={'text-white mr-0'} size='xl' />,
      linkPath: `/user-transfers/${id}`,
      component: useMemo(
        () =>
          transfersLoading ? (
            <SkeletonList />
          ) : (
            <>
              {transfers?.map((transfer: TransferType) => (
                <div key={transfer?.id} onClick={() => handleTransferClick(transfer)}>
                  <TransferSummaryCard transfer={transfer} />
                </div>
              ))}
            </>
          ),
        [transfers, transfersLoading]
      ),
    },
    {
      id: 3,
      title: 'Transactions',
      icon: <Icon icon='dollar' customIconStyle={'text-white mr-0'} size='xl' />,
      linkPath: `/user-transactions/${id}`,
      component: useMemo(
        () =>
          transactionsLoading ? (
            <SkeletonList />
          ) : (
            <>
              {transactions?.map((transaction: TransactionType) => (
                <TransactionSummaryCard key={transaction?.id} transaction={transaction} />
              ))}
            </>
          ),
        [transactions, transactionsLoading]
      ),
    },
  ]

  const handleUserChoreSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if ('userChoreId' in formRef.current) {
      upsertUserChore(
        authUser?.api_token,
        {
          chore_status: formRef.current?.status?.value,
        },
        formRef.current?.userChoreId
      ).then((data) => {
        if ('error' in data) {
          handleToastDanger(data?.error)
        } else {
          if (data?.transactions_created) {
            handleToastSuccess('Chore status updated')
            getUserChores(authUser?.api_token, getModifiers('userChoreUserId'))
            getUserTransactions(authUser?.api_token, getModifiers('transactionUserId'))
            setUserChoreModalOpen(false)
          } else {
            handleToastSuccess('Chore status updated')
            getUserChores(authUser?.api_token, getModifiers('userChoreUserId'))
            setUserChoreModalOpen(false)
          }
        }
      })
    }
  }

  const handleTransferSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if ('transferId' in formRef.current) {
      upsertTransfer(
        authUser?.api_token,
        {
          transfer_status: formRef.current?.status?.value,
        },
        formRef.current?.transferId
      ).then((data) => {
        if ('error' in data) {
          handleToastDanger(data?.error)
        } else {
          if (data?.transferData?.transactions_created) {
            handleToastSuccess('Transfer status updated')
            getUserTransfers(authUser?.api_token, getModifiers('transferUserId'))
            getUserTransactions(authUser?.api_token, getModifiers('transactionUserId'))
            setTransferModalOpen(false)
          } else {
            handleToastSuccess('Transfer status updated')
            getUserTransfers(authUser?.api_token, getModifiers('transferUserId'))
            setTransferModalOpen(false)
          }
        }
      })
    }
  }

  return (
    <>
      <Page
        title={title}
        upperSection={<UserSummarySection user={user} isLoading={isLoadingUserContext} />}
        lowerGridSection={features.map((feature) => (
          <Fragment key={feature?.title}>
            <FeatureCard
              key={feature?.title}
              icon={feature?.icon}
              title={feature?.title}
              component={feature.component}
              linkPath={feature.linkPath}
            />
          </Fragment>
        ))}
        modal={
          <>
            <ConditionalRender condition={userChoreModalOpen}>
              <form onSubmit={handleUserChoreSubmit} id='user-chore-summary-form' ref={formRef}>
                <UpdateChoreStatusModal
                  userChore={selectedChore}
                  modalOpen={userChoreModalOpen}
                  closeModal={() => setUserChoreModalOpen(false)}
                  formId='user-chore-summary-form'
                  formRef={formRef}
                />
              </form>
            </ConditionalRender>
            <ConditionalRender condition={transferModalOpen}>
              <form onSubmit={handleTransferSubmit} id='user-transfer-summary-form' ref={formRef}>
                <UpdateTransferModal
                  transfer={selectedTransfer}
                  modalOpen={transferModalOpen}
                  closeModal={() => setTransferModalOpen(false)}
                  formId='user-transfer-summary-form'
                  formRef={formRef}
                />
              </form>
            </ConditionalRender>
          </>
        }
      />
    </>
  )
}

export default UserDetailsPage
