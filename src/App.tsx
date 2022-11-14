import { lazy, Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'
import UserContext from './context/UserContext'
import NavBar from './Navigation/NavBar'

const ChoresPage = lazy(() => import('./Pages/ChoresPage'))
const TransactionsPage = lazy(() => import('./Pages/TransactionsPage'))
const UsersPage = lazy(() => import('./Pages/UsersPage'))
const UserDetailsPage = lazy(() => import('./Pages/UserDetailsPage'))
const RegistrationPage = lazy(() => import('./Pages/RegistrationPage'))
const LoginPage = lazy(() => import('./Pages/Login/LoginPage'))

function App(): JSX.Element {
  return (
    <UserContext.Provider value={'something'}>
      <div className='App'>
        <header className='App-header'>
          <NavBar />
        </header>
        {/* <Suspense fallback={'Loading...'}> */}
        <Routes>
          <Route path='/' element={<div>Landing Page</div>} />
          <Route path='/transactions' element={<TransactionsPage title={'Transactions Page'} />} />
          <Route path='/chores' element={<ChoresPage title={'Chores Page'} />} />
          <Route path='/login' element={<LoginPage />} />
          <Route path='/registration' element={<RegistrationPage />} />
          <Route path='/users' element={<UsersPage title={'Users Page'} />} />
          <Route path='/user/:id' element={<UserDetailsPage title={'User Page'} />} />
        </Routes>
        {/* </Suspense> */}
      </div>
    </UserContext.Provider>
  )
}

export default App
