import { lazy, Suspense, useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import UserContext from './context/UserContext'
import NavBar from './Navigation/NavBar'
import CreateChoresPage from './Pages/Chores/CreateChoresPage'
import ManageChoresPage from './Pages/Chores/ManageChoresPage'
import ManageFamilyPage from './Pages/Families/ManageFamilyPage'
import ChildRegistrationPage from './Pages/Registration/ChildRegistrationPage'
import FamilyMembersDetailsPage from './Pages/Users/FamilyMembersDetailsPage'
import { UserType } from './types/UserType'

const ChoresPage = lazy(() => import('./Pages/Chores/ChoresPage'))
const TransactionsPage = lazy(() => import('./Pages/TransactionsPage'))
const UsersPage = lazy(() => import('./Pages/Users/UsersPage'))
const UserDetailsPage = lazy(() => import('./Pages/Users/UserDetailsPage'))
const RegistrationPage = lazy(() => import('./Pages/Registration/RegistrationPage'))
const LoginPage = lazy(() => import('./Pages/Login/LoginPage'))

function App(): JSX.Element {
  const [userContext, setUserContext] = useState<UserType | null>({} as UserType)
  const [isLoadingUserContext, setIsLoadingUserContext] = useState<boolean>(true)

  return (
    <UserContext.Provider
      value={{ userContext, setUserContext, isLoadingUserContext, setIsLoadingUserContext }}
    >
      <div className='App'>
        <header className='App-header'>
          <NavBar />
        </header>
        <Suspense fallback={'Loading...'}>
          <Routes>
            <Route path='/' element={<div>Landing Page</div>} />
            <Route
              path='/transactions'
              element={<TransactionsPage title={'Transactions Page'} />}
            />
            <Route path='/chores' element={<ChoresPage title={'Chores Signup'} />} />
            <Route path='/login' element={<LoginPage />} />
            <Route path='/registration' element={<RegistrationPage />} />
            <Route path='/manage-family' element={<ManageFamilyPage />} />
            <Route path='/create/child' element={<ChildRegistrationPage />} />
            <Route path='/chores/create' element={<CreateChoresPage />} />
            <Route
              path='/family/manage'
              element={<FamilyMembersDetailsPage title='Manage Family' />}
            />
            <Route path='/chores/manage' element={<ManageChoresPage title='Manage Chores' />} />
            <Route path='/users' element={<UsersPage title={'Users Page'} />} />
            <Route path='/user/:id' element={<UserDetailsPage title={'User Page'} />} />
          </Routes>
        </Suspense>
      </div>
    </UserContext.Provider>
  )
}

export default App
