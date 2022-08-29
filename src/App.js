import { Routes, Route } from 'react-router-dom'
import ConditionalRender from './CustomComponents/conditional-render'
import { useErrorContext, withErrorContext } from './HOC/withErrorContext'
import { withUserContext } from './HOC/withUserContext'
import NavBar from './Navigation/NavBar'
import ChoresPage from './Pages/ChoresPage'
import HTTPStatusCodePage from './Pages/HTTPStatusCodePage'
import LoginPage from './Pages/LoginPage'
import RegisterationPage from './Pages/RegisterationPage'
import TransactionsPage from './Pages/TransactionsPage'
import UserDetailsPage from './Pages/UserDetailsPage'
import UsersPage from './Pages/UsersPage'

function App() {
  const { httpError } = useErrorContext()

  return (
    <div className='App'>
      <header className='App-header'>
        <ConditionalRender condition={!httpError}>
          <NavBar />
        </ConditionalRender>
      </header>
      <Routes>
        <Route path='/' element={<div>Home Page</div>} />
        <Route path='/transactions' element={<TransactionsPage />} />
        <Route path='/chores' element={<ChoresPage />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/registration' element={<RegisterationPage />} />
        <Route path='/users' element={<UsersPage />} />
        <Route path='/user/:id' element={<UserDetailsPage />} />
        <Route path='/error-page' element={<HTTPStatusCodePage />} />
      </Routes>
    </div>
  )
}

export default withErrorContext(withUserContext(App))
