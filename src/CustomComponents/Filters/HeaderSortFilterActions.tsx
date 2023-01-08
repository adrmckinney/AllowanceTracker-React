import { Menu, Transition } from '@headlessui/react'
import { Fragment, useState } from 'react'
import Icon from '../Icon'
import { SortDirection } from '../../types/QueryModifierType'

type Props = {
  handleSort: (column: string, direction: SortDirection) => void
  mobileFilterButton: React.ReactNode
}

type SortOption = {
  name: string
  current: boolean
  sortFunc: () => void
}

const HeaderSortFilterActions = ({ handleSort, mobileFilterButton }: Props) => {
  const initialValues: SortOption[] = [
    { name: 'Newest', current: true, sortFunc: () => handleSort('updated_at', 'desc') },
    { name: 'Oldest', current: false, sortFunc: () => handleSort('updated_at', 'asc') },
    { name: 'Amount: Low to High', current: false, sortFunc: () => handleSort('amount', 'asc') },
    { name: 'Amount: High to Low', current: false, sortFunc: () => handleSort('amount', 'desc') },
  ]
  const [sortOptions, setSortOptions] = useState<SortOption[]>(initialValues)

  const handleSortClick = (idx: number) => {
    let optionsCopy: SortOption[] = [...sortOptions]
    let resetOptions = optionsCopy?.map((option: SortOption) => {
      return { ...option, current: false }
    })

    const newOptions = resetOptions?.map((option: SortOption, index: number) => {
      if (index === idx) {
        return { ...option, current: true }
      } else {
        return option
      }
    })

    setSortOptions(newOptions)
  }

  return (
    <>
      <div className='flex items-center'>
        <Menu as='div' className='relative inline-block text-left'>
          <div>
            <Menu.Button
              className={[
                'group inline-flex justify-center text-sm font-medium',
                // 'text-gray-700 hover:text-gray-900',
                'text-white hover:text-gray-800',
              ].join(' ')}
            >
              Sort
              <Icon icon='chevronDown' size='lg' customIconStyle='ml-1' />
            </Menu.Button>
          </div>

          <Transition
            as={Fragment}
            enter='transition ease-out duration-100'
            enterFrom='transform opacity-0 scale-95'
            enterTo='transform opacity-100 scale-100'
            leave='transition ease-in duration-75'
            leaveFrom='transform opacity-100 scale-100'
            leaveTo='transform opacity-0 scale-95'
          >
            <Menu.Items className='absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none'>
              <div className='py-1'>
                {sortOptions.map((option, idx) => (
                  <Menu.Item key={option.name}>
                    <div
                      className={[
                        option.current ? 'font-medium text-sky-700 bg-sky-50' : 'text-gray-500',
                        'block px-4 py-2 text-xs w-full cursor-pointer hover:bg-gray-100 text-center',
                      ].join(' ')}
                      onClick={() => {
                        option.sortFunc()
                        handleSortClick(idx)
                      }}
                    >
                      {option.name}
                    </div>
                  </Menu.Item>
                ))}
              </div>
            </Menu.Items>
          </Transition>
        </Menu>

        {mobileFilterButton}
      </div>
    </>
  )
}

export default HeaderSortFilterActions
