import HeaderSortFilterActions from '../Filters/HeaderSortFilterActions'
import { SortDirection } from '../../types/QueryModifierType'
import IconButton from '../Buttons/IconButton'
import ConditionalRender from '../conditional-render'

type Props = {
  title: string
  bodyComponent: React.ReactNode
  filterComponent: React.ReactNode
  mobileFilterComponent: React.ReactNode
  handleSort: (arg0: string, arg1: SortDirection) => void
  setSlidebarOpen: () => void
  footer: React.ReactNode
}

const FilterPage = ({
  title,
  bodyComponent,
  filterComponent,
  mobileFilterComponent,
  handleSort,
  setSlidebarOpen,
  footer,
}: Props) => {
  return (
    <>
      <main className='relative -mt-40'>
        <header className='relative py-10'>
          <div className='flex justify-between items-center mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
            <h1 className='text-3xl font-bold tracking-tight text-white'>{title}</h1>
            <div>
              {
                <HeaderSortFilterActions
                  handleSort={handleSort}
                  mobileFilterButton={
                    <IconButton
                      icon='funnel'
                      type='button'
                      size='lg'
                      classNames={['-m-2 ml-4 p-2 sm:ml-6 lg:hidden'].join(' ')}
                      customIconStyle='text-white hover:text-gray-500'
                      onClick={setSlidebarOpen}
                    />
                  }
                />
              }
            </div>
          </div>
        </header>
        <div>
          {/* Mobile filter dialog */}
          <div className='border-gray-200'>{mobileFilterComponent}</div>

          <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
            <section
              aria-labelledby='user-chore-filters'
              className='pt-6 pb-40 overflow-scroll lg:overflow-hidden mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8 lg:pb-16 rounded-lg bg-gray-100 shadow'
            >
              <h2 id='user-chore-filters' className='sr-only'>
                User Chore Filter Options
              </h2>

              <div className='grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4'>
                {/* Filters */}
                <div className='hidden lg:block'>{filterComponent}</div>

                {/* Product grid */}
                <div className='lg:col-span-3'>
                  <div className='h-96 border-gray-200 lg:h-full lg:border-l-4'>
                    {bodyComponent}
                  </div>
                </div>
              </div>
            </section>
            <ConditionalRender condition={!!footer}>
              <div className='mt-4 border-t border-gray-200 lg:pb-8'>
                <div className='text-base text-gray-400 xl:text-center'>{footer}</div>
              </div>
            </ConditionalRender>
          </div>
        </div>
      </main>
    </>
  )
}

export default FilterPage
