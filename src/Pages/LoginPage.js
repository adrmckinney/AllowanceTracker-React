import Button from '../CustomComponents/Button'
import { fontThemes } from '../configs/global-styles'
import { Link } from 'react-router-dom'
import Input from '../CustomComponents/input'

const LoginPage = () => {
  return (
    <>
      <div className='min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8'>
        <div className='max-w-md w-full space-y-8'>
          <div>
            <h1 className={`mt-6 mb-10 text-center ${fontThemes.appTitle}`}>Allowance Tracker</h1>
            <h2 className={`mt-6 text-center ${fontThemes.title}`}>Sign in to your account</h2>
            <p className={`mt-2 text-center ${fontThemes.default}`}>
              Or <Button as={Link} to='/chores' title={'sign up'} status='link' size='link' />
            </p>
          </div>
          <form className='mt-8 space-y-6'>
            <input type='hidden' name='remember' defaultValue='true' />
            <div>
              <Input
                hiddenLabel
                name='email'
                type='email'
                theme='stackedTop'
                required
                placeholder='Email address'
                //   value={input?.title}
                //   onChange={e => handleChange(e.target)}
              />

              <Input
                hiddenLabel
                name='password'
                type='password'
                theme='stackedBottom'
                required
                placeholder='Email address'
                //   value={input?.title}
                //   onChange={e => handleChange(e.target)}
              />
            </div>

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
              ></Button>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}

export default LoginPage
