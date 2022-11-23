import { useState } from 'react'
import { colorThemes } from '../configs/global-styles'
import { ReturnValidationType } from '../configs/ValidationRules/ValidationTypes/RegistrationTypes'
import useRegisterValidation from '../configs/ValidationRules/useRegisterValidation'
import Button from '../CustomComponents/Buttons/Button'
import IconButton from '../CustomComponents/Buttons/IconButton'
import ConditionalRender from '../CustomComponents/conditional-render'
import Input from '../CustomComponents/Input'
import useFormHelpers from '../hooks/useFormHelpers'
import { FormChangeType } from '../types/FormChangeType'
import { ChoreCreationInputFieldTypes, ChoreCreationInputType } from '../types/ChoreInputType'
import { choreCreationInputFields } from '../helpers/formHelpers/ChoreFormHelpers'
import InputErrorMessage from '../CustomComponents/input-error-message'

type Props = {
  chore: ChoreCreationInputType
  handleUpdateStoredChore: (key: string, value: string | number, idx: number) => void
  handleDeleteStoredChore: (idx: number) => void
  choreIdx: number
  error: ChoreApiError
}

interface ChoreApiError {
  message: string
  status: number
}

type InitialEditingValues = {
  name: boolean
  description: boolean
  cost: boolean
}

const ChoreSummaryCard = ({
  chore,
  handleUpdateStoredChore,
  handleDeleteStoredChore,
  choreIdx,
  error,
}: Props) => {
  const { handleChange, input, touched, handleOnBlur } = useFormHelpers(chore)
  const initialEditingValues: InitialEditingValues = {
    name: false,
    description: false,
    cost: false,
  }
  const { validations } = useRegisterValidation(input, touched)
  const [isEditing, setIsEditing] = useState(initialEditingValues)

  const handleIsEditing = (key: string, value: boolean): void => {
    const newIsEditing = { ...isEditing }
    setIsEditing({
      ...newIsEditing,
      [key]: value,
    })
  }

  const handleCancelEdit = (): void => {
    setIsEditing(initialEditingValues)
  }

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    key: string,
    value: string | number,
    choreIdx: number
  ): void => {
    if (e.key === 'Enter') {
      handleUpdateStoredChore(key, value, choreIdx)
      setIsEditing(initialEditingValues)
    }
  }

  const isDisabled = (validations: ReturnValidationType[]): boolean => {
    let activeErrors = 0
    validations?.map((validation: ReturnValidationType) => {
      if (!validation?.valid) activeErrors += 1
    })

    return activeErrors > 0
  }
  console.log('choreIdx', choreIdx)

  return (
    <>
      <div className='flex justify-between'>
        <h3 className='text-lg font-medium leading-6 text-gray-900'>{chore?.name}</h3>
        <div>
          <IconButton
            icon='delete'
            size='lg'
            customIconStyle={colorThemes?.actionIconTextColor?.danger}
            onClick={() => handleDeleteStoredChore(choreIdx)}
          />
        </div>
      </div>
      <div className='mt-5 border-t border-gray-200'>
        <dl className='divide-y divide-gray-200'>
          {choreCreationInputFields?.map((field: ChoreCreationInputFieldTypes) => {
            return (
              <div key={field?.name} className='py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5'>
                <dt className='text-sm font-medium text-gray-500'>{field?.label}</dt>
                <dd className='mt-1 flex text-sm text-gray-900 sm:col-span-2 sm:mt-0'>
                  <ConditionalRender
                    condition={isEditing?.[field?.name]}
                    falseRender={
                      <>
                        <span className='flex-grow'>
                          {field?.name === 'cost'
                            ? `$${chore?.[field?.name]}`
                            : chore?.[field?.name]}
                          <ConditionalRender condition={!!error?.status && field?.name === 'name'}>
                            <InputErrorMessage
                              name={field?.name}
                              theme={field?.type}
                              errorMessage={error?.message}
                            />
                          </ConditionalRender>
                        </span>

                        <span className='ml-4 flex-shrink-0'>
                          <Button
                            title='Update'
                            status='link'
                            type='button'
                            onClick={() => handleIsEditing(field?.name, true)}
                          />
                        </span>
                      </>
                    }
                  >
                    <Input
                      type={field?.type}
                      name={field?.name}
                      value={
                        field?.name === 'cost' && input?.[field?.name]?.length === 0
                          ? '0'
                          : input?.[field?.name]
                      }
                      icon={field?.icon ?? ''}
                      iconSize={field?.iconSize ?? ''}
                      customIconStyle={field?.iconColor ?? ''}
                      placeholder={field?.placeHolder ?? ''}
                      id={`child-${choreIdx}-summary-${field?.name}`}
                      onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) =>
                        handleKeyDown(e, field?.name, input?.[field?.name], choreIdx)
                      }
                      onChange={(e: FormChangeType) => handleChange(e?.target)}
                      handleOnBlur={(e: FormChangeType) => handleOnBlur(e.target)}
                      touched={touched}
                      errors={validations?.[field?.name]}
                      autoFocus
                    />
                    <div className='flex items-start pt-2 justify-center pl-2'>
                      <IconButton
                        icon='xicon'
                        size='lg'
                        onClick={handleCancelEdit}
                        customIconStyle={[colorThemes.actionIconTextColor.danger].join(' ')}
                      />
                      <IconButton
                        icon='check'
                        type='button'
                        size='lg'
                        customIconStyle={[
                          'text-bold ',
                          colorThemes.actionIconTextColor.success,
                        ].join(' ')}
                        onClick={() => {
                          handleUpdateStoredChore(field?.name, input?.[field?.name], choreIdx)
                          setIsEditing(initialEditingValues)
                        }}
                        isDisabled={isDisabled(validations?.[field?.name])}
                      />
                    </div>
                  </ConditionalRender>
                </dd>
              </div>
            )
          })}
        </dl>
      </div>
    </>
  )
}

export default ChoreSummaryCard
