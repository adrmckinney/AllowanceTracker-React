import Page from '../../CustomComponents/Page'
import useGetChoresList from '../../api/Chore/useGetChoresList'
import useAuthUser from '../../hooks/useAuthUser'
import Checkbox from '../../CustomComponents/Inputs/Checkbox'
import { ChoreType } from '../../types/Chores/ChoreType'
import ConditionalRender from '../../CustomComponents/conditional-render'
import SkeletonList from '../../CustomComponents/skeletons/SkeletonList'
import Button from '../../CustomComponents/Buttons/Button'
import PaddedLayout from '../../CustomComponents/padded-layout'
import { FormChangeType } from '../../types/FormChangeType'
import { useState } from 'react'
import ChoreStatuses from '../../configs/Enums/ChoreStatuses'
import useUpsertUserChore from '../../api/UserChore/useUpsertUserChore'
import MoneyFormatter from '../../library/MoneyFormatter'
import OneButtonModal from '../../CustomComponents/Modals/OneButtonModal'
import { UpsertUserChoreInputType, UserChoreType } from '../../types/UserChoreType'
import { useNavigate } from 'react-router-dom'
import Card from '../../CustomComponents/Card/Card'
import CardBody from '../../CustomComponents/Card/card-body'

interface Props {
  title: string
}

const ChoresPage = ({ title }: Props): JSX.Element => {
  const { authUser, isChild } = useAuthUser()
  const { chores, isLoading: choresLoading } = useGetChoresList(authUser?.api_token)
  const { upsertUserChore } = useUpsertUserChore()
  const [selectedChoreIds, setSelectedChoreIds] = useState<number[]>([])
  const [modalOpen, setModalOpen] = useState(false)
  const [modalData, setModalData] = useState([])
  const navigate = useNavigate()

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    selectedChoreIds?.map((choreId: number) => {
      const chore = chores?.filter((chore: ChoreType) => chore?.id === choreId)[0]

      const input: UpsertUserChoreInputType = {
        user_id: authUser?.id,
        chore_id: choreId,
        chore_name: chore?.name,
        amount: chore?.cost,
        chore_status: ChoreStatuses.in_progress?.value,
      }

      return upsertUserChore(authUser?.api_token, input).then((data: UserChoreType) => {
        setModalData(modalData => [...modalData, data])
      })
    })
    setModalOpen(true)
  }

  const handleChange = ({ value }) => {
    let selectedChoreIdsCopy = [...selectedChoreIds]

    if (!selectedChoreIds?.includes(+value)) {
      selectedChoreIdsCopy?.push(+value)
      setSelectedChoreIds(selectedChoreIdsCopy)
    } else {
      const valueIdx = selectedChoreIds?.indexOf(+value)
      selectedChoreIdsCopy?.splice(valueIdx, 1)
      setSelectedChoreIds(selectedChoreIdsCopy)
    }
  }

  const createModalDataComponents = () => {
    return modalData?.map((datum: UpsertUserChoreInputType) => (
      <Card
        key={datum?.id}
        body={
          <CardBody
            children={
              <>
                <ul className='h-auto'>
                  <li className='flex py-4 justify-between'>
                    <div className='ml-3 flex flex-col items-start'>
                      <p className='text-sm font-medium text-gray-900'>{datum?.chore_name}</p>
                    </div>
                    <div className='ml-3 flex flex-col items-end'>
                      <p className='text-sm text-gray-500'>
                        ${MoneyFormatter.toDollars(datum?.amount)}
                      </p>
                    </div>
                  </li>
                </ul>
              </>
            }
          />
        }
      />
    ))
  }

  return (
    <>
      <Page
        title={title}
        upperSection={
          <>
            <form onSubmit={handleSubmit}>
              <ConditionalRender condition={!choresLoading} falseRender={<SkeletonList />}>
                <fieldset className='space-y-5'>
                  {chores?.map((chore: ChoreType) => {
                    return (
                      <Checkbox
                        key={chore?.id}
                        id={`${chore?.name}`}
                        name={chore?.name}
                        label={`${chore?.name} - $${MoneyFormatter.toDollars(chore?.cost)}`}
                        value={chore?.id}
                        description={chore?.description}
                        legend={'Chore'}
                        checked={selectedChoreIds?.includes(chore?.id)}
                        handleChange={(e: FormChangeType) => handleChange(e?.target)}
                      />
                    )
                  })}
                </fieldset>
                <PaddedLayout>
                  <Button
                    title='Sign Up'
                    status='primary'
                    type='submit'
                    disabled={!isChild(authUser)}
                  />
                </PaddedLayout>
              </ConditionalRender>
            </form>
          </>
        }
      />
      <ConditionalRender condition={modalOpen}>
        <OneButtonModal
          dataComponent={createModalDataComponents()}
          open={modalOpen}
          closeModal={() => setModalOpen(false)}
          title='You successfully signed up for these chores'
          buttonComponent={
            <Button
              title='Go to your page'
              status='primary'
              customClassName='w-full'
              onClick={() => navigate(`../user/${authUser.id}`)}
            />
          }
        />
      </ConditionalRender>
    </>
  )
}

export default ChoresPage
