import Page from '../../CustomComponents/Page'
import useAuthUser from '../../hooks/useAuthUser'
import ConditionalRender from '../../CustomComponents/conditional-render'
import SkeletonList from '../../CustomComponents/skeletons/SkeletonList'
import { Fragment, useContext, useRef, useState } from 'react'
import useUpsertUserChore from '../../api/UserChore/useUpsertUserChore'
import { UserChoreType } from '../../types/UserChoreType'
import { useParams } from 'react-router-dom'
import useGetUserChoresList from '../../api/UserChore/useGetUserChoresList'
import useQueryModifiers from '../../hooks/useQueryModifiers'
import { UserChoresContext } from '../../context/UserChoresListProvider'
import UserChoreSummaryCard from '../../components/User/user-chore-summary-card'
import PaddedLayout from '../../CustomComponents/padded-layout'
import UpdateChoreStatusModal, {
  UserChoreFormRefType,
} from '../../components/Chores/UpdateChoreStatusModal'
import { ToastContext } from '../../context/ToastProvider'
import Pagination from '../../CustomComponents/Pagination/Pagination'
import HeaderSortFilterActions from '../../CustomComponents/Filters/HeaderSortFilterActions'
import { SortDirection } from '../../types/QueryModifierType'
import usePersistentModifiers from '../../hooks/usePersistentModifiers'
import MobileFilterSlidebar from '../../CustomComponents/Slidebars/MobileFilterSlidebar'
import IconButton from '../../CustomComponents/Buttons/IconButton'

interface Props {
  title: string
}

const UserChoresListPage = ({ title }: Props): JSX.Element => {
  const { authUser } = useAuthUser()
  const { id } = useParams()
  const formRef = useRef<UserChoreFormRefType | null>(null)
  const formId = `${title}-page-form-id`
  const { modifiers } = useQueryModifiers()
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)
  const { handleToastSuccess, handleToastDanger } = useContext(ToastContext)
  const { userChoresContext: userChores, isLoading, paginatorInfo } = useContext(UserChoresContext)
  const [userChoreModalOpen, setUserChoreModalOpen] = useState<boolean>(false)
  const [selectedChore, setSelectedChore] = useState<UserChoreType | null>(null)
  const { handlePersistentSort, handlePersistantPagination, getStorageModifiers } =
    usePersistentModifiers({
      modifiers: {
        ...modifiers,
        resultsPerPage: 10,
        filters: {
          ...modifiers?.filters,
          userChoreUserId: +id,
        },
        page: 1,
        sorts: { column: 'updated_at', direction: 'desc' },
      },
    })

  const { getUserChores } = useGetUserChoresList(authUser?.api_token, getStorageModifiers())

  const { upsertUserChore } = useUpsertUserChore()

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
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
          getUserChores(authUser?.api_token, getStorageModifiers())
          setUserChoreModalOpen(false)
        } else {
          handleToastSuccess('Chore status updated')
          getUserChores(authUser?.api_token, getStorageModifiers())
          setUserChoreModalOpen(false)
        }
      }
    })
  }

  const handleUserChoreCardClick = (userChore: UserChoreType = null) => {
    setSelectedChore(userChore)
    setUserChoreModalOpen(true)
  }

  const handlePaginationSelect = (newPage: number) => {
    getUserChores(authUser?.api_token, handlePersistantPagination(newPage))
  }

  const handleSort = (column: string, direction: SortDirection) => {
    getUserChores(authUser?.api_token, handlePersistentSort(column, direction))
  }

  const handleMobileClose = () => {
    setMobileFiltersOpen(false)
    getUserChores(authUser?.api_token, getStorageModifiers())
    // handleFilter()
  }

  //   const handleFilter = () => {
  //   }

  return (
    <>
      <Page
        title={title}
        headerRight={
          <>
            <HeaderSortFilterActions
              handleSort={handleSort}
              mobileFilterButton={
                <IconButton
                  icon='funnel'
                  type='button'
                  size='lg'
                  classNames={['-m-2 ml-4 p-2 sm:ml-6 lg:hidden'].join(' ')}
                  customIconStyle='text-white hover:text-gray-500'
                  onClick={() => setMobileFiltersOpen(true)}
                />
              }
            />
          </>
        }
        upperSection={
          <>
            <form onSubmit={handleSubmit} id={formId}>
              <ConditionalRender condition={!isLoading} falseRender={<SkeletonList />}>
                {userChores?.map((userChore: UserChoreType) => (
                  <PaddedLayout key={userChore?.id}>
                    <div onClick={() => handleUserChoreCardClick(userChore)}>
                      <UserChoreSummaryCard userChore={userChore} />
                    </div>
                  </PaddedLayout>
                ))}
              </ConditionalRender>
              <ConditionalRender condition={userChoreModalOpen}>
                <UpdateChoreStatusModal
                  userChore={selectedChore}
                  modalOpen={userChoreModalOpen}
                  closeModal={() => setUserChoreModalOpen(false)}
                  formId={formId}
                  formRef={formRef}
                />
              </ConditionalRender>
            </form>
          </>
        }
        footer={
          <Pagination
            paginationInfo={paginatorInfo}
            handlePaginationSelect={handlePaginationSelect}
          />
        }
      />
      <MobileFilterSlidebar
        close={handleMobileClose}
        mobileFiltersOpen={mobileFiltersOpen}
        title='Chore Filters'
      />
    </>
  )
}

export default UserChoresListPage
