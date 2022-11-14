interface Props {
  imageSize?: string
}

const ProfileImage = ({ imageSize = 'md' }: Props) => {
  const size = {
    sm: 'h-6 w-6',
    md: 'h-8 w-8',
    lg: 'h-10 w-10',
  }
  return (
    <>
      <img
        className={`${size[imageSize as keyof typeof size]} rounded-full`}
        src='https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
        alt=''
      />
    </>
  )
}

export default ProfileImage
