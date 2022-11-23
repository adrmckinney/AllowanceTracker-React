type Props = {
  children?: React.ReactNode
}

const CardBody = ({ children }: Props) => {
  return (
    <>
      <div className='border-t border-gray-200 px-4 py-4 sm:px-6'>{children}</div>
    </>
  )
}

export default CardBody
