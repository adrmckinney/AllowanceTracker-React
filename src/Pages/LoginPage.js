import Button from '../CustomComponents/Button'
import { buttonTheme } from '../configs/global-styles'
import { icons } from '../configs/icons'

const LoginPage = () => {
  return (
    <>
      <div className='min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8'>
        <div className='max-w-md w-full space-y-8'>
          <div>
            <h2 className='mt-6 text-center text-3xl font-extrabold text-gray-900'>
              Sign in to your account
            </h2>
            <p className='mt-2 text-center text-sm text-gray-600'>
              Or{' '}
              <a href='#' className='font-medium text-sky-600 hover:text-sky-500'>
                sign up
              </a>
            </p>
          </div>
          <form className='mt-8 space-y-6' action='#' method='POST'>
            <input type='hidden' name='remember' defaultValue='true' />
            <div className='rounded-md shadow-sm -space-y-px'>
              <div>
                <label htmlFor='email-address' className='sr-only'>
                  Email address
                </label>
                <input
                  id='email-address'
                  name='email'
                  type='email'
                  autoComplete='email'
                  required
                  className='appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-sky-500 focus:border-sky-500 focus:z-10 sm:text-sm'
                  placeholder='Email address'
                />
              </div>
              <div>
                <label htmlFor='password' className='sr-only'>
                  Password
                </label>
                <input
                  id='password'
                  name='password'
                  type='password'
                  autoComplete='current-password'
                  required
                  className='appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-sky-500 focus:border-sky-500 focus:z-10 sm:text-sm'
                  placeholder='Password'
                />
              </div>
            </div>

            <div className='flex items-center justify-between'>
              <div className='text-sm'>
                <a href='#' className='font-medium text-sky-600 hover:text-sky-500'>
                  Forgot your password?
                </a>
              </div>
            </div>

            <div>
              <button
                type='submit'
                className='group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-sky-600 hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500'
              >
                <span className='absolute left-0 inset-y-0 flex items-center pl-3'>
                  {/* <LockClosedIcon
                    className='h-5 w-5 text-sky-500 group-hover:text-sky-400'
                    aria-hidden='true'
                  /> */}
                  {icons({ customIconStyle })[0]['lock']}
                </span>
                Sign in
              </button>
              {/* <Button
                title={'Sign In'}
                icon={'lock'}
                customClassName={'w-full group'}
              /> */}
            </div>
          </form>
        </div>
      </div>
    </>
  )
}

export default LoginPage

const customIconStyle = 'h-5 w-5 text-sky-500 group-hover:text-sky-400'
