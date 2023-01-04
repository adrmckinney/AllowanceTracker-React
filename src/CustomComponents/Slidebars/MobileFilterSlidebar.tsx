import { Dialog, Disclosure } from '@headlessui/react'
import MobileSlidbarTransition from '../Transitions/MobileSlidbarTransition'
import Icon from '../Icon'
import ChoreStatuses from '../../configs/Enums/ChoreStatuses'
import usePersistentModifiers from '../../hooks/usePersistentModifiers'
import Checkbox from '../../CustomComponents/Inputs/Checkbox'

type Props = {
  mobileFiltersOpen: boolean
  close: () => void
  title: string
}

const MobileFilterSlidebar = ({ mobileFiltersOpen, close, title }: Props) => {
  const { setPersistentFilters } = usePersistentModifiers(null)

  const filters = [
    {
      id: 'status',
      name: 'Chore Statuses',
      options: ChoreStatuses?.filter((item) => typeof item === 'object'),
    },
    {
      id: 'category',
      name: 'Category',
      options: [
        { value: 'new-arrivals', label: 'New Arrivals', checked: false },
        { value: 'sale', label: 'Sale', checked: false },
        { value: 'travel', label: 'Travel', checked: true },
        { value: 'organization', label: 'Organization', checked: false },
        { value: 'accessories', label: 'Accessories', checked: false },
      ],
    },
    {
      id: 'size',
      name: 'Size',
      options: [
        { value: '2l', label: '2L', checked: false },
        { value: '6l', label: '6L', checked: false },
        { value: '12l', label: '12L', checked: false },
        { value: '18l', label: '18L', checked: false },
        { value: '20l', label: '20L', checked: false },
        { value: '40l', label: '40L', checked: true },
      ],
    },
  ]

  const handleSelected = ({ name, value }) => {
    console.log('name', name)
    console.log('value', value)

    setPersistentFilters('choreStatuses', value)
  }
  return (
    <>
      <MobileSlidbarTransition mobileFiltersOpen={mobileFiltersOpen} close={close}>
        <Dialog.Panel className='relative ml-auto flex h-full w-full max-w-xs flex-col overflow-y-auto bg-white py-4 pb-12 shadow-xl'>
          <div className='flex items-center justify-between px-4'>
            <h2 className='text-lg font-medium text-gray-900'>{title}</h2>
            <button
              type='button'
              className='-mr-2 flex h-10 w-10 items-center justify-center rounded-md bg-white p-2 text-gray-400'
              onClick={close}
            >
              <span className='sr-only'>Close menu</span>
              <Icon icon='xicon' size='xl' customIconStyle='mr-0' />
            </button>
          </div>

          <form className='mt-4 border-t border-gray-200'>
            {filters.map((section) => (
              <Disclosure as='div' key={section.id} className='border-t border-gray-200 px-4 py-6'>
                {({ open }) => (
                  <>
                    <h3 className='-mx-2 -my-3 flow-root'>
                      <Disclosure.Button className='flex w-full items-center justify-between bg-white px-2 py-3 text-gray-400 hover:text-gray-500'>
                        <span className='font-medium text-gray-900'>{section.name}</span>
                        <span className='ml-6 flex items-center'>
                          {open ? (
                            <Icon icon='minus' size='lg' customIconStyle='mr-0' />
                          ) : (
                            <Icon icon='plusSm' size='lg' customIconStyle='mr-0' />
                          )}
                        </span>
                      </Disclosure.Button>
                    </h3>
                    <Disclosure.Panel className='pt-6'>
                      <div className='space-y-6'>
                        {section.options.map((option, optionIdx: number) => (
                          <div key={option?.value} className='flex items-center'>
                            <Checkbox
                              id={`chore-statuses`}
                              name={option?.name}
                              label={option?.name}
                              value={option?.value}
                              legend='Chore Statuses'
                              checked={option?.checked}
                              handleChange={(e) => handleSelected(e?.target)}
                            />
                          </div>
                        ))}
                      </div>
                    </Disclosure.Panel>
                  </>
                )}
              </Disclosure>
            ))}
          </form>
        </Dialog.Panel>
      </MobileSlidbarTransition>
    </>
  )
}

export default MobileFilterSlidebar
