import useGetUsersList from '../../api/User/useGetUsersList'
import useAuthUser from '../../hooks/useAuthUser'

interface Props {
  title: string
}

const UsersPage = ({ title }: Props): JSX.Element => {
  const { authUser } = useAuthUser()
  const { users } = useGetUsersList(authUser?.api_token)

  return (
    <>
      <div>
        {users?.map(user => (
          <div key={user?.id}>{user?.name}</div>
        ))}
      </div>
    </>
  )
}

export default UsersPage
