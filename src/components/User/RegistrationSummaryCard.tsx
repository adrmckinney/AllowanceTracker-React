import { useState } from 'react'
import { colorThemes } from '../../configs/global-styles'
import { ReturnValidationType } from '../../configs/ValidationRules/ValidationTypes/RegistrationTypes'
import useRegisterValidation from '../../configs/ValidationRules/useRegisterValidation'
import Button from '../../CustomComponents/Buttons/Button'
import IconButton from '../../CustomComponents/Buttons/IconButton'
import ConditionalRender from '../../CustomComponents/conditional-render'
import Input from '../../CustomComponents/Inputs/Input'
import { childRegistrationFields } from '../../helpers/formHelpers/UserRegistrationFormHelpers'
import useFormHelpers from '../../hooks/useFormHelpers'
import { FormChangeType } from '../../types/FormChangeType'
import {
  ChildRegistrationInputType,
  RegistrationInputFieldTypes,
} from '../../types/RegistrationInputType'

type Props = {
  child: ChildRegistrationInputType
  handleUpdateStoredChild: (key: string, value: string | number, idx: number) => void
  childIdx: number
}

type InitialEditingValues = {
  name: boolean
  username: boolean
  email: boolean
  number: boolean
  wallet: boolean
  password: boolean
}

const RegistrationSummaryCard = ({ child, handleUpdateStoredChild, childIdx }: Props) => {
  const { handleChange, input, touched, handleOnBlur } = useFormHelpers(child)
  const initialEditingValues: InitialEditingValues = {
    name: false,
    username: false,
    email: false,
    number: false,
    wallet: false,
    password: false,
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
    childIdx: number
  ): void => {
    if (e.key === 'Enter') {
      handleUpdateStoredChild(key, value, childIdx)
      setIsEditing(initialEditingValues)
    }
  }

  const isDisabled = (validations: ReturnValidationType[]): boolean => {
    console.log('validations', validations)

    let activeErrors = 0
    validations?.map((validation: ReturnValidationType) => {
      if (!validation?.valid) activeErrors += 1
    })

    return activeErrors > 0
  }

  return (
    <>
      <div>
        <h3 className='text-lg font-medium leading-6 text-gray-900'>{child?.name}</h3>
      </div>
      <div className='mt-5 border-t border-gray-200'>
        <dl className='divide-y divide-gray-200'>
          {childRegistrationFields?.slice(0, -1)?.map((field: RegistrationInputFieldTypes) => {
            console.log('validations?.[field?.name]?.valid', validations?.[field?.name])

            return (
              <div key={field?.name} className='py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5'>
                <dt className='text-sm font-medium text-gray-500'>{field?.label}</dt>
                <dd className='mt-1 flex text-sm text-gray-900 sm:col-span-2 sm:mt-0'>
                  <ConditionalRender
                    condition={isEditing?.[field?.name]}
                    falseRender={
                      <>
                        <span className='flex-grow'>
                          {field?.name === 'wallet'
                            ? `$${child?.[field?.name]}`
                            : child?.[field?.name]}
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
                        field?.name === 'wallet' && input?.[field?.name]?.length === 0
                          ? '0'
                          : input?.[field?.name]
                      }
                      icon={field?.icon ?? ''}
                      iconSize={field?.iconSize ?? ''}
                      customIconStyle={field?.iconColor ?? ''}
                      placeholder={field?.placeHolder ?? ''}
                      id={`child-${childIdx}-summary-${field?.name}`}
                      onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) =>
                        handleKeyDown(e, field?.name, input?.[field?.name], childIdx)
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
                          handleUpdateStoredChild(field?.name, input?.[field?.name], childIdx)
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

export default RegistrationSummaryCard
