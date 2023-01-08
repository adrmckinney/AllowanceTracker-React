import useAuthUser from '../../hooks/useAuthUser'
import ConditionalRender from '../../CustomComponents/conditional-render'
import SkeletonList from '../../CustomComponents/skeletons/SkeletonList'
import { useContext, useRef, useState } from 'react'
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
import { SortDirection } from '../../types/QueryModifierType'
import usePersistentModifiers from '../../hooks/usePersistentModifiers'
import Slidebar from '../../CustomComponents/Slidebars/Slidebar'
import UserChoresFilters from '../../components/UserChores/UserChoresFilters'
import FilterPage from '../../CustomComponents/Transitions/FilterPage'

interface Props {
  title: string
}

const UserChoresListPage = ({ title }: Props): JSX.Element => {
  const { authUser } = useAuthUser()
  const { id } = useParams()
  const formRef = useRef<UserChoreFormRefType | null>(null)
  const formId = `${title}-page-form-id`
  const { modifiers } = useQueryModifiers()
  const [slidebarOpen, setSlidebarOpen] = useState(false)
  const { handleToastSuccess, handleToastDanger } = useContext(ToastContext)
  const { userChoresContext: userChores, isLoading, paginatorInfo } = useContext(UserChoresContext)
  const [userChoreModalOpen, setUserChoreModalOpen] = useState<boolean>(false)
  const [selectedChore, setSelectedChore] = useState<UserChoreType | null>(null)
  const {
    handlePersistentSort,
    handlePersistantPagination,
    getStorageModifiers,
    resetStorageFilters,
  } = usePersistentModifiers({
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

  const handleFilterSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setSlidebarOpen(false)
    getUserChores(authUser?.api_token, getStorageModifiers())
  }

  const resetFilters = () => {
    resetStorageFilters()
    getUserChores(authUser?.api_token, getStorageModifiers())
  }

  return (
    <>
      <FilterPage
        title={title}
        bodyComponent={
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
        }
        handleSort={handleSort}
        setSlidebarOpen={() => setSlidebarOpen(true)}
        filterComponent={
          <UserChoresFilters
            handleFilterSubmit={handleFilterSubmit}
            resetStorageFilters={resetFilters}
          />
        }
        mobileFilterComponent={
          <Slidebar
            close={() => setSlidebarOpen(false)}
            mobileFiltersOpen={slidebarOpen}
            title='Chore Filters'
            bodyComponent={
              <UserChoresFilters
                handleFilterSubmit={handleFilterSubmit}
                resetStorageFilters={resetFilters}
              />
            }
          />
        }
        footer={
          <ConditionalRender condition={paginatorInfo?.lastPage > 1}>
            <Pagination
              paginationInfo={paginatorInfo}
              handlePaginationSelect={handlePaginationSelect}
            />
          </ConditionalRender>
        }
      />
    </>
  )
}

export default UserChoresListPage
