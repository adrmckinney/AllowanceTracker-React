import Button from '../../CustomComponents/Buttons/Button'
import { fontThemes } from '../../configs/global-styles'
import { Link, useNavigate } from 'react-router-dom'
import Input from '../../CustomComponents/Input'
import useRegisterValidation from '../../configs/ValidationRules/useRegisterValidation'
import useFormHelpers from '../../hooks/useFormHelpers'
import {
  ChildRegistrationInputType,
  RegistrationInputFieldTypes,
  RegistrationInputType,
} from '../../types/RegistrationInputType'
import { useState } from 'react'
import useUpsertUser from '../../api/User/useUpsertUser'
import useAuthUser from '../../hooks/useAuthUser'
import PermissionTypes from '../../configs/Enums/PermissionTypes'
import ConditionalRender from '../../CustomComponents/conditional-render'
import RegistrationSummaryCard from '../../components/User/RegistrationSummaryCard'
import { childRegistrationFields } from '../../helpers/formHelpers/UserRegistrationFormHelpers'
import MoneyFormatter from '../../library/MoneyFormatter'
import { FormChangeType } from '../../types/FormChangeType'
import { formatStringPhoneNumber } from '../../helpers/formHelpers/PhoneNumberHelpers'

const ChildRegistrationPage = (): JSX.Element => {
  const [children, setChildren] = useState<ChildRegistrationInputType[]>([])
  const [isChildrenSummary, setIsChildrenSummary] = useState(false)
  const { authUser } = useAuthUser()
  const { upsertUser } = useUpsertUser()
  const initialValues: ChildRegistrationInputType = {
    name: '',
    username: '',
    email: '',
    number: undefined,
    wallet: '',
    password: '',
    confirm_password: '',
    permission: PermissionTypes.child.value,
  }
  const {
    input,
    handleChange,
    handleOnBlur,
    touched,
    setInput: setInitialValues,
    resetTouchedFields,
  } = useFormHelpers(initialValues)
  const { validations, isDisabled, apiErrors, handleApiErrors, setInitialValidationValues } =
    useRegisterValidation(input, touched)
  const navigate = useNavigate()

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    children?.forEach((child: ChildRegistrationInputType) => {
      //   const newChild = { ...child }
      //     if (typeof child?.wallet === 'string') {
      //   newChild['wallet'] = MoneyFormatter.convertMoneyStringToPennies(child?.wallet)
      //     }
      upsertUser(authUser?.api_token, child).then(data => {
        //   navigate(`../user/${data.id}`)
        console.log('data', data)
      })
    })
  }

  const handleStoreChild = () => {
    setChildren([
      ...children,
      {
        name: input?.name,
        username: input?.username,
        email: input?.email,
        number: input?.number,
        wallet: input?.wallet,
        password: input?.password,
        confirm_password: input?.confirm_password,
        permission: PermissionTypes.child.value,
      },
    ])
    setInitialValues(initialValues)
    resetTouchedFields(childRegistrationFields)
    setIsChildrenSummary(true)
  }

  const handleUpdateStoredChild = (key: string, value: string | number, idx: number) => {
    let newStoredChildren: ChildRegistrationInputType[] = [...children]
    const childToUpdate: ChildRegistrationInputType = newStoredChildren[idx]

    let updatedChild: ChildRegistrationInputType = childToUpdate
    if (key === 'password' && typeof value === 'string') {
      updatedChild = {
        ...childToUpdate,
        [key]: value,
        confirm_password: value,
      }
    } else {
      updatedChild = {
        ...childToUpdate,
        [key]: value,
      }
    }

    newStoredChildren[idx] = updatedChild
    setChildren(newStoredChildren)
  }

  const handleAddAnotherChild = () => {
    setInitialValidationValues()
    setIsChildrenSummary(false)
    resetTouchedFields(childRegistrationFields)
  }

  const formatPhoneNumber = ({ name, value }): void => {
    const formattedNumber = formatStringPhoneNumber(value)
    handleChange({ name: name, value: formattedNumber })
  }

  return (
    <>
      <div className='min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8'>
        <div className='max-w-md w-full space-y-8'>
          <div>
            <h1 className={`mt-6 mb-10 text-center ${fontThemes.appTitle}`}>Allowance Tracker</h1>
            <h2 className={`mt-6 text-center ${fontThemes.title}`}>
              {isChildrenSummary ? 'Children You Have Added' : 'Register You Children'}
            </h2>
          </div>
          <form className='mt-8 space-y-6' onSubmit={handleSubmit}>
            <ConditionalRender
              condition={isChildrenSummary}
              falseRender={
                <>
                  {childRegistrationFields?.map((field: RegistrationInputFieldTypes) => (
                    <Input
                      key={field?.name}
                      label={field?.label}
                      name={field?.name}
                      type={field?.type}
                      icon={field?.name === 'wallet' ? 'dollar' : ''}
                      iconSize={field?.name === 'wallet' ? 'lg' : ''}
                      customIconStyle={field?.name === 'wallet' ? 'text-green-800' : ''}
                      placeholder={field?.name === 'wallet' ? '100.00' : ''}
                      id={`child-register-${field?.name}`}
                      theme='normal'
                      value={input?.[field?.name]}
                      onChange={(e: FormChangeType) => {
                        field?.name === 'number'
                          ? formatPhoneNumber(e?.target)
                          : handleChange(e?.target)
                      }}
                      handleOnBlur={(e: FormChangeType) => handleOnBlur(e?.target)}
                      touched={touched}
                      errors={validations?.[field?.name]}
                    />
                  ))}
                </>
              }
            >
              {children?.map((child: ChildRegistrationInputType, childIdx: number) => (
                <RegistrationSummaryCard
                  key={child?.username}
                  child={child}
                  handleUpdateStoredChild={handleUpdateStoredChild}
                  childIdx={childIdx}
                />
              ))}
            </ConditionalRender>
            <div>
              <ConditionalRender
                condition={isChildrenSummary}
                falseRender={
                  <Button
                    title='Save'
                    type='button'
                    customClassName={['w-full mt-6', isDisabled ? 'cursor-not-allowed' : ''].join(
                      ' '
                    )}
                    disabled={isDisabled}
                    onClick={handleStoreChild}
                  />
                }
              >
                <Button
                  title='Add Another Child'
                  type='button'
                  customClassName='w-full mt-6'
                  disabled={false}
                  onClick={handleAddAnotherChild}
                />
                <Button
                  title='Done Adding Children'
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

export default ChildRegistrationPage
