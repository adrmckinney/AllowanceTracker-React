import { useEffect, useState } from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'
import { getUser } from './api/getUser'
import ConditionalRender from './CustomComponents/conditional-render'
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
  const [HTTPCodeMessage, setHTTPCodeMessage] = useState(null)
  const navigate = useNavigate()

  console.log('HTTPCodeMessage', HTTPCodeMessage)

  return (
    <div className='App'>
      <header className='App-header'>
        <ConditionalRender condition={!HTTPCodeMessage}>
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
        <Route path='/error-page' element={<HTTPStatusCodePage message={HTTPCodeMessage} />} />
      </Routes>
    </div>
  )
}

export default withUserContext(App)
