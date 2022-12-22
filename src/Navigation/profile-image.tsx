import { useContext } from 'react'
import UserContext from '../context/UserContext'
import useAuthUser from '../hooks/useAuthUser'

interface Props {
  imageSize?: string
}

const ProfileImage = ({ imageSize = 'md' }: Props) => {
  const { userContext: user } = useContext(UserContext)
  const { authUser } = useAuthUser()
  const size = {
    sm: 'h-6 w-6',
    md: 'h-8 w-8',
    lg: 'h-10 w-10',
  }
  return (
    <>
      <img
        className={`${size[imageSize as keyof typeof size]} rounded-full`}
        src={authUser?.thumbnail}
        alt={authUser?.name}
      />
    </>
  )
}

export default ProfileImage
