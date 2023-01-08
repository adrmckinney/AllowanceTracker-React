import { Dialog } from '@headlessui/react'
import MobileSlidbarTransition from '../Transitions/MobileSlidbarTransition'
import Icon from '../Icon'

type Props = {
  mobileFiltersOpen: boolean
  close: () => void
  title: string
  bodyComponent: React.ReactNode
}

const Slidebar = ({ mobileFiltersOpen, close, title, bodyComponent }: Props) => {
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
          {bodyComponent}
        </Dialog.Panel>
      </MobileSlidbarTransition>
    </>
  )
}

export default Slidebar
