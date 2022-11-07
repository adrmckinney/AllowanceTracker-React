import { useEffect, useState } from 'react'
import { getUsersList } from '../api/getUsersList'
import { useUserContext } from '../HOC/withUserContext'

interface Props {
  title: string
}

const UsersPage = ({ title }: Props): JSX.Element => {
  const { authUser } = useUserContext()
  const [users, setUsers] = useState(null)
  console.log('users', users)
  useEffect(() => {
    if (!!authUser?.api_token) {
      getUsersList(authUser?.api_token).then(data => {
        if (data?.hasOwnProperty('errorMessage')) {
          // setHTTPCodeMessage(data?.errorMessage)
          // navigate('/error-page')
        } else {
          setUsers(data)
        }
      })
    }
  }, [authUser])

  console.log('authUser', authUser)
  console.log('users', users)
  return (
    <>
      <div>users page</div>
    </>
  )
}

export default UsersPage
