interface Props {
  title: string
}

const TransactionsPage = ({ title }: Props): JSX.Element => {
  return (
    <>
      <h1 className='text-lg leading-relaxed text-red-500'>TransactionsPage component</h1>
    </>
  )
}

export default TransactionsPage
