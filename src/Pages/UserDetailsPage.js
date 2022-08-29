import { useEffect } from 'react'
import { getUser } from '../api/getUser'
import { useUserContext } from '../HOC/withUserContext'
import { useParams } from 'react-router-dom'

const UserDetailsPage = () => {
  const { id } = useParams()
  const { authUser } = useUserContext()
  useEffect(() => {
    getUser(authUser?.api_token, id).then(data => {
      console.log('data', data)
    })
  }, [])

  return (
    <>
      <div>
        <h1>User Details Page</h1>
      </div>
    </>
  )
}

export default UserDetailsPage
