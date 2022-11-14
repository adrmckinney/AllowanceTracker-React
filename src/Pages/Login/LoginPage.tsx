import Button from '../../CustomComponents/Buttons/Button'
import { fontThemes } from '../../configs/global-styles'
import { Link, useNavigate } from 'react-router-dom'
import { useLogin as login } from '../../api/useLogin'
import useLoginValidation from '../../configs/ValidationRules/useLoginValidation'
import ConditionalRender from '../../CustomComponents/conditional-render'
import InputErrorMessage from '../../CustomComponents/input-error-message'
import useFormHelpers from '../../hooks/useFormHelpers'
import { LoginInputType } from '../../types/LoginInputType'
import { FormChangeType } from '../../types/FormChangeType'
import { FormFocusType } from '../../types/FormFocusType'
import Icon from '../../CustomComponents/Icon'

const LoginPage = (): JSX.Element => {
  const navigate = useNavigate()

  const initialValues: LoginInputType = {
    username: '',
    password: '',
  }

  const { input, handleChange, handleTouched, touched } = useFormHelpers(initialValues)

  const { usernameError, passwordError, handleApiErrors, apiErrors } = useLoginValidation(
    input,
    touched
  )

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    login(input).then(data => {
      if (data?.hasOwnProperty('errorMessage')) {
        // setTouched(false)
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
            <div className='-space-y-px rounded-md shadow-sm'>
              <div>
                <label htmlFor='username' className='sr-only'>
                  Username
                </label>
                <input
                  id='username'
                  name='username'
                  type='username'
                  value={input?.username}
                  required
                  className='relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm'
                  placeholder='Username'
                  onChange={(e: FormChangeType) => handleChange(e.target)}
                  onBlur={(e: FormFocusType) => handleTouched(e.target)}
                />
                <ConditionalRender condition={usernameError.value}>
                  <div className='absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none'>
                    <Icon icon='exclamation' iconStatus='danger' />
                  </div>
                </ConditionalRender>
              </div>
              <div>
                <label htmlFor='password' className='sr-only'>
                  Password
                </label>
                <input
                  id='password'
                  name='password'
                  type='password'
                  required
                  className='relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm'
                  placeholder='Password'
                  value={input?.password}
                  onChange={(e: FormChangeType) => handleChange(e.target)}
                  onBlur={(e: FormFocusType) => handleTouched(e.target)}
                />
                <ConditionalRender condition={passwordError.value}>
                  <div className='absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none'>
                    <Icon icon='exclamation' iconStatus='danger' />
                  </div>
                </ConditionalRender>
              </div>
            </div>

            {/* <div>
              <Input
                hiddenLabel
                name='username'
                type='username'
                id='username'
                theme='stackedTop'
                required
                placeholder='Username'
                value={input?.['username']}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange(e.target)}
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
                value={input?.['password']}
                onChange={e => handleChange(e.target)}
                touched={() => setTouched(true)}
                fieldValidationIcon={passwordError.value}
              />
            </div> */}

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

export default LoginPage
