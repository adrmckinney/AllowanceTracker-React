import { Link } from 'react-router-dom'
import { useErrorContext } from '../HOC/withErrorContext'

const HTTPStatusCodePage = () => {
  const { httpError, setHttpError } = useErrorContext()
  const code = httpError === 'Unauthenticated.' ? 401 : 404
  console.log('httpError', httpError)
  return (
    <main
      className='min-h-full bg-cover bg-top sm:bg-top'
      style={{
        backgroundImage:
          'url("https://images.unsplash.com/photo-1545972154-9bb223aac798?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=3050&q=80&exp=8&con=-15&sat=-75")',
      }}
    >
      <div className='max-w-7xl mx-auto px-4 py-16 text-center sm:px-6 sm:py-24 lg:px-8 lg:py-48'>
        <p className='text-base font-semibold text-black text-opacity-50'>
          {code} {httpError}
        </p>
        <h1 className='mt-2 text-4xl font-bold text-white tracking-tight sm:text-5xl'>
          Uh oh! I think you’re lost.
        </h1>
        <p className='mt-2 text-lg font-medium text-black text-opacity-50'>
          It looks like the page you’re looking for doesn't exist.
        </p>
        <div className='mt-6'>
          <Link
            to={'/login'}
            className='inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-black text-opacity-75 bg-white bg-opacity-75 sm:bg-opacity-25 sm:hover:bg-opacity-50'
            onClick={() => setHttpError(null)}
          >
            Go back home
          </Link>
        </div>
      </div>
    </main>
  )
}

export default HTTPStatusCodePage
