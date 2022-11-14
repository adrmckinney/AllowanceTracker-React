import { Disclosure } from '@headlessui/react'
import { colorThemes } from '../configs/global-styles'
import Icon from '../CustomComponents/Icon'

interface Props {
  open: boolean
}

const NavHamburgerMenuButton = ({ open }: Props) => {
  return (
    <>
      <div className='flex items-center lg:hidden'>
        <Disclosure.Button
          className={`inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset ${colorThemes.primary.focusRing}`}
        >
          <span className='sr-only'>Open main menu</span>
          {open ? <Icon icon={'xicon'} size='xl' /> : <Icon icon={'bars'} size='xl' />}
        </Disclosure.Button>
      </div>
    </>
  )
}

export default NavHamburgerMenuButton
