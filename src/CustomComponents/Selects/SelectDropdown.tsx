import { Fragment } from 'react'
import { Listbox, Transition } from '@headlessui/react'
import Icon from '../Icon'
import { colorThemes } from '../../configs/global-styles'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export type ItemType = {
  name: string
  value: number
  id?: number | string
  [key: string]: string | number | boolean
}

type Props = {
  label: string
  items: ItemType[]
  selected: ItemType
  setSelected: (arg0: ItemType) => void
  optionsHeight?: string
}

const SelectDropdown = ({
  label,
  items,
  selected,
  setSelected,
  optionsHeight = 'max-h-60',
}: Props) => {
  const defaultValue = { name: 'Select', value: 0 }
  const preparedItems = items
    ?.filter((item: ItemType) => typeof item === 'object')
    ?.filter((item: ItemType) => item?.value !== selected?.value)

  return (
    <>
      <Listbox value={selected ?? defaultValue} onChange={setSelected}>
        {({ open }) => (
          <>
            <Listbox.Label className='block text-sm font-medium text-gray-700'>
              {label}
            </Listbox.Label>
            <div className='relative mt-1'>
              <Listbox.Button
                className={[
                  'relative w-full cursor-default rounded-md border border-gray-300 bg-white py-2 pl-3 pr-10 text-left shadow-sm',
                  colorThemes.primary.focusBorder,
                  colorThemes.primary.focusRing,
                  'focus:outline-none focus:ring-1 text-xs sm:text-sm',
                ].join(' ')}
              >
                <span className='block truncate'>{selected?.name}</span>
                <span className='pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2'>
                  <Icon icon='chevronUpDown' size='lg' customIconStyle='text-gray-400' />
                </span>
              </Listbox.Button>

              <Transition
                show={open}
                as={Fragment}
                leave='transition ease-in duration-100'
                leaveFrom='opacity-100'
                leaveTo='opacity-0'
              >
                <Listbox.Options
                  className={[
                    optionsHeight,
                    'absolute z-10 mt-1 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm',
                  ].join(' ')}
                >
                  {preparedItems.map((item) => (
                    <Listbox.Option
                      key={`${item.value}-${item.name}`}
                      className={({ active }) =>
                        classNames(
                          active
                            ? ['text-white', colorThemes.primary.bgColor].join(' ')
                            : 'text-gray-900',
                          'relative cursor-default select-none py-2 pl-3 pr-9'
                        )
                      }
                      value={item}
                    >
                      {({ selected, active }) => (
                        <>
                          <span
                            className={classNames(
                              selected ? 'font-semibold' : 'font-normal',
                              'block truncate'
                            )}
                          >
                            {item.name}
                          </span>

                          {selected ? (
                            <span
                              className={classNames(
                                active ? 'text-white' : colorThemes.primary.text,
                                'absolute inset-y-0 right-0 flex items-center pr-4'
                              )}
                            >
                              <Icon
                                icon='check'
                                customIconStyle={colorThemes.primary.iconText}
                                size='lg'
                              />
                            </span>
                          ) : null}
                        </>
                      )}
                    </Listbox.Option>
                  ))}
                </Listbox.Options>
              </Transition>
            </div>
          </>
        )}
      </Listbox>
    </>
  )
}

export default SelectDropdown
