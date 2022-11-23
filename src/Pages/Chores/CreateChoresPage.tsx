import Button from '../../CustomComponents/Buttons/Button'
import { fontThemes } from '../../configs/global-styles'
import { Link, useNavigate } from 'react-router-dom'
import Input from '../../CustomComponents/Input'
import useFormHelpers from '../../hooks/useFormHelpers'
import { useState } from 'react'
import useAuthUser from '../../hooks/useAuthUser'
import ConditionalRender from '../../CustomComponents/conditional-render'
import MoneyFormatter from '../../library/MoneyFormatter'
import { FormChangeType } from '../../types/FormChangeType'
import { choreCreationInputFields } from '../../helpers/formHelpers/ChoreFormHelpers'
import { ChoreCreationInputFieldTypes, ChoreCreationInputType } from '../../types/ChoreInputType'
import ChoreSummaryCard from '../../components/ChoreSummaryCard'
import useChoreValidation from '../../configs/ValidationRules/useChoreValidation'
import useUpsertChore from '../../api/Chore/useUpsertChore'

const CreateChoresPage = (): JSX.Element => {
  const [chores, setChore] = useState<ChoreCreationInputType[]>([])
  const [error, setError] = useState(null)
  const [isChoresSummary, setIsChoresSummary] = useState(false)
  const { authUser } = useAuthUser()
  const { upsertChore } = useUpsertChore()
  const initialValues: ChoreCreationInputType = {
    name: '',
    description: '',
    cost: '',
  }
  const {
    input,
    handleChange,
    handleOnBlur,
    touched,
    setInput: setInitialValues,
    resetTouchedFields,
  } = useFormHelpers(initialValues)
  const { validations, isDisabled, setInitialValidationValues } = useChoreValidation(input, touched)
  const navigate = useNavigate()

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    chores?.forEach((chore: ChoreCreationInputType) => {
      upsertChore(authUser?.api_token, chore).then(data => {
        if ('error' in data) {
          setError(data?.error)
        } else {
          navigate(`../family/setup`)
          console.log('data success', data)
        }
      })
    })
  }

  const handleStoreChore = () => {
    setChore([
      ...chores,
      {
        name: input?.name,
        description: input?.description,
        cost: input?.cost,
      },
    ])
    setInitialValues(initialValues)
    resetTouchedFields(choreCreationInputFields)
    setIsChoresSummary(true)
  }

  const handleUpdateStoredChore = (key: string, value: string | number, idx: number) => {
    let newStoredChores: ChoreCreationInputType[] = [...chores]
    const choreToUpdate: ChoreCreationInputType = newStoredChores[idx]

    let updatedChore: ChoreCreationInputType = choreToUpdate

    updatedChore = {
      ...choreToUpdate,
      [key]: value,
    }

    newStoredChores[idx] = updatedChore
    setChore(newStoredChores)
  }

  const handleDeleteStoredChore = (idx: number) => {
    let choresCopy: ChoreCreationInputType[] = [...chores]
    choresCopy?.splice(idx, 1)

    setChore(choresCopy)
  }

  const handleAddAnotherChore = () => {
    setInitialValidationValues()
    setIsChoresSummary(false)
    resetTouchedFields(choreCreationInputFields)
  }

  return (
    <>
      <div className='min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8'>
        <div className='max-w-md w-full space-y-8'>
          <div>
            <h1 className={`mt-6 mb-10 text-center ${fontThemes.appTitle}`}>Allowance Tracker</h1>
            <h2 className={`mt-6 text-center ${fontThemes.title}`}>
              {isChoresSummary ? 'Chroes you have created' : 'Create a Chore'}
            </h2>
          </div>
          <form className='mt-8 space-y-6' onSubmit={handleSubmit}>
            <ConditionalRender
              condition={isChoresSummary}
              falseRender={
                <>
                  {choreCreationInputFields?.map((field: ChoreCreationInputFieldTypes) => (
                    <Input
                      key={field?.name}
                      label={field?.label}
                      name={field?.name}
                      type={field?.type}
                      icon={field?.icon ?? ''}
                      iconSize={field?.iconSize ?? ''}
                      customIconStyle={field?.iconColor ?? ''}
                      placeholder={field?.placeHolder ?? ''}
                      id={`child-register-${field?.name}`}
                      theme='normal'
                      value={input?.[field?.name]}
                      onChange={(e: FormChangeType) => handleChange(e?.target)}
                      handleOnBlur={(e: FormChangeType) => handleOnBlur(e?.target)}
                      touched={touched}
                      errors={validations?.[field?.name]}
                    />
                  ))}
                </>
              }
            >
              {chores?.map((chore: ChoreCreationInputType, choreIdx: number) => (
                <ChoreSummaryCard
                  key={`${chore?.name}-${choreIdx}`}
                  chore={chore}
                  handleUpdateStoredChore={handleUpdateStoredChore}
                  handleDeleteStoredChore={handleDeleteStoredChore}
                  choreIdx={choreIdx}
                  error={error}
                />
              ))}
            </ConditionalRender>
            <div>
              <ConditionalRender
                condition={isChoresSummary}
                falseRender={
                  <Button
                    title='Save'
                    type='button'
                    customClassName={['w-full mt-6', isDisabled ? 'cursor-not-allowed' : ''].join(
                      ' '
                    )}
                    disabled={isDisabled}
                    onClick={handleStoreChore}
                  />
                }
              >
                <Button
                  title='Add Another Chore'
                  type='button'
                  customClassName='w-full mt-6'
                  disabled={false}
                  onClick={handleAddAnotherChore}
                />
                <Button
                  title='Done Adding Chores'
                  type='submit'
                  customClassName='w-full mt-6'
                  disabled={false}
                  onClick={() => {}}
                />
              </ConditionalRender>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}

export default CreateChoresPage
