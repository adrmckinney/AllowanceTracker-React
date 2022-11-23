import GridSection from './grid-section'
import PaddedLayout from './padded-layout'

type Props = {
  title: string
  overviewSection: React.ReactNode
  gridSection?: React.ReactNode
}

const Page = ({ title, overviewSection, gridSection }: Props) => {
  return (
    <>
      <main className='relative -mt-40'>
        <header className='relative py-10'>
          <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
            <h1 className='text-3xl font-bold tracking-tight text-white'>{title}</h1>
          </div>
        </header>
        <div className='mx-auto max-w-screen-xl px-4 pb-6 sm:px-6 lg:px-8 lg:pb-16'>
          <div className='overflow-hidden rounded-lg bg-white shadow'>
            <PaddedLayout>
              {overviewSection}
              <GridSection>{gridSection}</GridSection>
            </PaddedLayout>
          </div>
        </div>
      </main>
    </>
  )
}

export default Page
