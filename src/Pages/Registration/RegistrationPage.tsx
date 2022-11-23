import Button from '../../CustomComponents/Buttons/Button'
import { fontThemes } from '../../configs/global-styles'
import { Link, useNavigate } from 'react-router-dom'
import Input from '../../CustomComponents/Input'

import { useRegister as register } from '../../api/useRegister'
import useRegisterValidation from '../../configs/ValidationRules/useRegisterValidation'
import useFormHelpers from '../../hooks/useFormHelpers'
import {
  RegistrationInputFieldTypes,
  RegistrationInputType,
} from '../../types/RegistrationInputType'
import { parentRegistrationFields } from '../../helpers/formHelpers/UserRegistrationFormHelpers'
import { FormChangeType } from '../../types/FormChangeType'
import { formatStringPhoneNumber } from '../../helpers/formHelpers/PhoneNumberHelpers'

const RegistrationPage = (): JSX.Element => {
  const initialValues: RegistrationInputType = {
    name: '',
    username: '',
    email: '',
    number: undefined,
    password: '',
    confirm_password: '',
  }
  const { input, handleChange, handleOnBlur, touched, resetTouchedFields } =
    useFormHelpers(initialValues)
  const { validations, isDisabled, apiErrors, handleApiErrors } = useRegisterValidation(
    input,
    touched
  )
  const navigate = useNavigate()

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    register(input).then(data => {
      if (data?.hasOwnProperty('errorMessage')) {
        resetTouchedFields(parentRegistrationFields)
        handleApiErrors(data?.errorMessage)
      } else {
        localStorage.setItem('authUser', JSON.stringify(data))
        navigate(`../family/setup`)
      }
    })
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
            <h2 className={`mt-6 text-center ${fontThemes.title}`}>Parent Signup</h2>
            <div className={`mt-2 text-center ${fontThemes.default}`}>
              Or <Button as={Link} to='/login' title={'sign in'} status='link' size='link' />
            </div>
          </div>
          <form className='mt-8 space-y-6' onSubmit={handleSubmit}>
            <input type='hidden' name='remember' defaultValue='true' />
            {parentRegistrationFields?.map((field: RegistrationInputFieldTypes) => (
              <Input
                key={field?.name}
                label={field?.label}
                name={field?.name}
                type={field?.type}
                id={field?.name}
                theme='normal'
                required
                value={input?.[field?.name]}
                onChange={(e: FormChangeType) => {
                  field?.name === 'number' ? formatPhoneNumber(e?.target) : handleChange(e?.target)
                }}
                touched={touched}
                handleOnBlur={(e: FormChangeType) => handleOnBlur(e.target)}
                errors={validations?.[field?.name]}
              />
            ))}
            <div>
              <Button
                title='Register'
                type='submit'
                icon='lockClosed'
                iconStatus='primary'
                relativeGroup={true}
                customClassName={['w-full mt-6', isDisabled ? 'cursor-not-allowed' : ''].join(' ')}
                disabled={isDisabled}
              ></Button>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}

export default RegistrationPage
