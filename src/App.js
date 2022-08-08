import { Routes, Route, Link } from 'react-router-dom'
import ChoresPage from './Pages/ChoresPage'
import LoginPage from './Pages/LoginPage'
import RegisterationPage from './Pages/RegisterationPage'
import TransactionsPage from './Pages/TransactionsPage'
import UserDetailsPage from './Pages/UserDetailsPage'

function App() {
  return (
    <div className='App'>
      <header className='App-header'>
        {' '}
        <nav
          style={{
            borderBottom: 'solid 1px',
            paddingBottom: '1rem',
          }}
        >
          <Link to='/'>home</Link> | <Link to='/transactions'>transactions</Link> |{' '}
          <Link to='/chores'>chores</Link> | <Link to='/login'>Login</Link>
        </nav>
      </header>
      <Routes>
        <Route path='/' element={<div>Home Page</div>} />
        <Route path='/transactions' element={<TransactionsPage />} />
        <Route path='/chores' element={<ChoresPage />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/registration' element={<RegisterationPage />} />
        <Route path='/user/:id' element={<UserDetailsPage />} />
      </Routes>
    </div>
  )
}

export default App
