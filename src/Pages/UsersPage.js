// @flow
import React, { useEffect, useState } from 'react'
import { getUsersList } from '../api/getUsersList'
import { useUserContext } from '../HOC/withUserContext'

const UsersPage = () => {
  const { authUser } = useUserContext()
  const [users, setUsers] = useState(null)
  useEffect(() => {
    getUsersList(authUser?.api_token).then(data => {
      console.log('data', data)
      if (data?.hasOwnProperty('errorMessage')) {
        // setHTTPCodeMessage(data?.errorMessage)
        // navigate('/error-page')
      } else {
        setUsers(data)
      }
    })
  }, [])

  console.log('authUser', authUser)
  console.log('users', users)
  return (
    <>
      <div>users page</div>
    </>
  )
}

export default UsersPage
