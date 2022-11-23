type Props = {
  header: React.ReactNode
  body: React.ReactNode
}

const Card = ({ header, body }: Props) => {
  return (
    <>
      <div className='bg-white shadow overflow-hidden sm:rounded-lg'>
        {header}
        {body}
      </div>
    </>
  )
}

export default Card
