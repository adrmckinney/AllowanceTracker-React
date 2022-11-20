import { useEffect, useState } from 'react'
import { getUsersList } from '../api/User/getUsersList'

interface Props {
  title: string
}

const UsersPage = ({ title }: Props): JSX.Element => {
  // const { authUser } = useUserContext()
  const tempAuthUser = {
    api_token: '1ilGJg3RKnICAdH7KGlnN750oYAQGsIPR54YJohuXLyeYxVp7u8MX5axX2zv',
    id: '1',
  }
  const [users, setUsers] = useState(null)
  console.log('users', users)
  useEffect(() => {
    if (!!tempAuthUser?.api_token) {
      //I should get this api_token from local storage instead
      getUsersList(tempAuthUser?.api_token).then(data => {
        if (data?.hasOwnProperty('errorMessage')) {
          // setHTTPCodeMessage(data?.errorMessage)
          // navigate('/error-page')
        } else {
          setUsers(data)
        }
      })
    }
  }, [])

  console.log('tempAuthUser', tempAuthUser)
  console.log('users', users)
  return (
    <>
      <div>users page</div>
    </>
  )
}

export default UsersPage
