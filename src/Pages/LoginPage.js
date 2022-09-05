import { useState } from 'react'
import Button from '../CustomComponents/Button'
import { fontThemes } from '../configs/global-styles'
import { Link, useNavigate } from 'react-router-dom'
import Input from '../CustomComponents/input'
import { useFormContext, withFormContext } from '../HOC/withFormContext'
import { useLogin as login } from '../api/useLogin'
import useLoginValidation from '../configs/ValidationRules/useLoginValidation'
import ConditionalRender from '../CustomComponents/conditional-render'
import InputErrorMessage from '../CustomComponents/input-error-message'
import { useUserContext } from '../HOC/withUserContext'

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false)
  const { handleChange, inputState: input } = useFormContext()
  const { setAuthUser } = useUserContext()
  const [touched, setTouched] = useState(false)
  const { usernameError, passwordError, handleApiErrors, apiErrors } = useLoginValidation(input)
  const navigate = useNavigate()

  const handleSubmit = e => {
    e.preventDefault()
    login(input).then(data => {
      if (data?.hasOwnProperty('errorMessage')) {
        setTouched(false)
        handleApiErrors(data?.errorMessage)
      } else {
        localStorage.setItem('authUser', JSON.stringify(data))
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
            <h2 className={`mt-6 text-center ${fontThemes.title}`}>Sign in</h2>
            <div className={`mt-2 text-center ${fontThemes.default}`}>
              Or <Button as={Link} to='/registration' title={'sign up'} status='link' size='link' />
            </div>
          </div>
          <form className='mt-8 space-y-6' onSubmit={handleSubmit}>
            <input type='hidden' name='remember' defaultValue='true' />
            <div>
              <Input
                hiddenLabel
                name='username'
                type='username'
                id='username'
                theme='stackedTop'
                required
                placeholder='Username'
                value={input?.username}
                onChange={e => handleChange(e.target)}
                touched={() => setTouched(true)}
                fieldValidationIcon={usernameError.value}
              />

              <Input
                hiddenLabel
                name='password'
                type={showPassword ? 'text' : 'password'}
                id='password'
                theme='stackedBottom'
                inputStyles={{
                  borderTopRightRadius: 0,
                  borderBottomRightRadius: 0,
                }}
                required
                placeholder='Password'
                showPassword={showPassword}
                setShowPassword={setShowPassword}
                value={input?.password}
                onChange={e => handleChange(e.target)}
                touched={() => setTouched(true)}
                fieldValidationIcon={passwordError.value}
              />
            </div>

            <ConditionalRender condition={usernameError.value}>
              <InputErrorMessage
                name={'username'}
                theme={'stackedBottom'}
                errorMessage={usernameError?.message}
              />
            </ConditionalRender>

            <ConditionalRender condition={passwordError.value}>
              <InputErrorMessage
                name={'password'}
                theme={'stackedBottom'}
                errorMessage={passwordError?.message}
              />
            </ConditionalRender>

            <ConditionalRender condition={!!apiErrors && !touched}>
              <InputErrorMessage
                name={'apiError'}
                theme={'stackedBottom'}
                errorMessage={apiErrors}
              />
            </ConditionalRender>

            <div className={fontThemes.link}>
              <Button
                as={Link}
                to='/chores'
                title={'Forgot your password?'}
                status='link'
                size='link'
              />
            </div>

            <div>
              <Button
                title='Sign In'
                type='submit'
                icon='lockClosed'
                iconStatus='primary'
                relativeGroup={true}
                customClassName='w-full'
                disabled={usernameError.value || passwordError.value}
              ></Button>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}

export default withFormContext(LoginPage)
