interface Props {
  title: string
}

const ChoresPage = ({ title }: Props): JSX.Element => {
  console.log('title', title)
  return (
    <>
      <h1 className='text-lg leading-relaxed text-red-500'>Chores Page component</h1>
    </>
  )
}

export default ChoresPage
