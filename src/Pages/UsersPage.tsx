import { useEffect, useState } from 'react'
import useGetUsersList from '../api/User/useGetUsersList'
import useAuthUser from '../hooks/useAuthUser'

interface Props {
  title: string
}

const UsersPage = ({ title }: Props): JSX.Element => {
  const { authUser } = useAuthUser()
  const { getUsersList } = useGetUsersList()
  const [users, setUsers] = useState(null)

  useEffect(() => {
    if (!!authUser?.api_token) {
      //I should get this api_token from local storage instead
      getUsersList(authUser?.api_token).then(data => {
        if (data?.hasOwnProperty('errorMessage')) {
          // setHTTPCodeMessage(data?.errorMessage)
          // navigate('/error-page')
        } else {
          setUsers(data)
        }
      })
    }
  }, [])

  return (
    <>
      <div>users page</div>
    </>
  )
}

export default UsersPage
