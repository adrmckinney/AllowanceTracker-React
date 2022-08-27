import { useState } from 'react'
import Button from '../CustomComponents/Button'
import { fontThemes } from '../configs/global-styles'
import { Link, useNavigate } from 'react-router-dom'
import Input from '../CustomComponents/input'
import { useFormContext, withFormContext } from '../HOC/withFormContext'
import { useRegister as register } from '../api/useRegister'
import useRegisterValidation from '../configs/ValidationRules/useRegisterValidation'

const RegistrationPage = () => {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const { handleChange, inputState: input, touched, setTouched, handleTouched } = useFormContext()
  const { passwordValidations, confirmPasswordValidations, isDisabled } = useRegisterValidation(
    input,
    touched
  )
  const navigate = useNavigate()

  const handleSubmit = e => {
    e.preventDefault()
    register(input).then(data => {
      if (data?.hasOwnProperty('errorMessage')) {
        setTouched(false)
        // handleApiErrors(data?.errorMessage)
      } else {
        navigate(`../user/${data.id}`)
      }
    })
  }

  return (
    <>
      <div className='min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8'>
        <div className='max-w-md w-full space-y-8'>
          <div>
            <h1 className={`mt-6 mb-10 text-center ${fontThemes.appTitle}`}>Allowance Tracker</h1>
            <h2 className={`mt-6 text-center ${fontThemes.title}`}>Register</h2>
            <div className={`mt-2 text-center ${fontThemes.default}`}>
              Or <Button as={Link} to='/login' title={'sign in'} status='link' size='link' />
            </div>
          </div>
          <form className='mt-8 space-y-6' onSubmit={handleSubmit}>
            <input type='hidden' name='remember' defaultValue='true' />

            <Input
              label='Name'
              name='name'
              type='name'
              id='name'
              theme='normal'
              required
              value={input?.name}
              onChange={e => handleChange(e.target)}
              touched={e => handleTouched(e.target)}
            />

            <Input
              label='Username'
              name='username'
              type='username'
              id='username'
              theme='normal'
              required
              value={input?.username}
              onChange={e => handleChange(e.target)}
              touched={e => handleTouched(e.target)}
            />

            <Input
              label='Email'
              name='email'
              type='email'
              id='email'
              theme='normal'
              required
              value={input?.email}
              onChange={e => handleChange(e.target)}
              touched={e => handleTouched(e.target)}
            />

            <Input
              label='Password'
              name='password'
              type={showPassword ? 'text' : 'password'}
              id='password'
              theme='normal'
              required
              showPassword={showPassword}
              setShowPassword={setShowPassword}
              value={input?.password}
              onChange={e => handleChange(e.target)}
              touched={e => handleTouched(e.target)}
              errors={passwordValidations}
            />

            <Input
              label='Confirm Password'
              name='confirm_password'
              type={showConfirmPassword ? 'text' : 'password'}
              id='confirm_password'
              theme='normal'
              required
              showPassword={showConfirmPassword}
              setShowPassword={setShowConfirmPassword}
              value={input?.confirm_password}
              onChange={e => handleChange(e.target)}
              touched={e => handleTouched(e.target)}
              errors={confirmPasswordValidations}
            />

            <div>
              <Button
                title='Register'
                type='submit'
                icon='lockClosed'
                iconStatus='primary'
                relativeGroup={true}
                customClassName='w-full mt-6'
                disabled={isDisabled}
                onClick={() => console.log('btn clicked')}
              ></Button>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}

export default withFormContext(RegistrationPage)
