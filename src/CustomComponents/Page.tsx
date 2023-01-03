import ConditionalRender from './conditional-render'
import GridSection from './grid-section'
import PaddedLayout from './padded-layout'

type Props = {
  title: string
  upperSection: React.ReactNode
  lowerGridSection?: React.ReactNode
  footer?: React.ReactNode
  headerRight?: React.ReactNode
  modal?: React.ReactNode
}

const Page = ({ title, upperSection, lowerGridSection, footer, headerRight, modal }: Props) => {
  return (
    <>
      <main className='relative -mt-40'>
        <header className='relative py-10'>
          <ConditionalRender
            condition={!!headerRight}
            falseRender={
              <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
                <h1 className='text-3xl font-bold tracking-tight text-white'>{title}</h1>
              </div>
            }
          >
            <div className='flex justify-between items-center mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
              <h1 className='text-3xl font-bold tracking-tight text-white'>{title}</h1>
              <div>{headerRight}</div>
            </div>
          </ConditionalRender>
        </header>
        <div className='mx-auto max-w-screen-xl px-4 pb-6 sm:px-6 lg:px-8 lg:pb-16'>
          <div className='overflow-hidden rounded-lg bg-gray-100 shadow'>
            <PaddedLayout>
              {upperSection}
              <GridSection>{lowerGridSection}</GridSection>
            </PaddedLayout>
          </div>
        </div>
        <ConditionalRender condition={!!footer}>
          <div className='mt-12 border-t border-gray-200 pt-8'>
            <div className='text-base text-gray-400 xl:text-center'>{footer}</div>
          </div>
        </ConditionalRender>
      </main>
      {modal}
    </>
  )
}

export default Page
