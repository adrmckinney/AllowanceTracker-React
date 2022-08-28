import { Fragment } from 'react'
import { Link } from 'react-router-dom'
import { Disclosure, Menu } from '@headlessui/react'
import { colorThemes } from '../configs/global-styles'
import Search from '../CustomComponents/Search'
import NotificationIconButton from '../CustomComponents/NotificationIconButton'
import NavHamburgerMenuButton from './NavHamburgerMenuButton'
import DefaultTransition from '../CustomComponents/DefaultTransition'
import ProfileImage from './profile-image'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

const NavBar = () => {
  const isLoggedIn = true

  const navLinks = [
    {
      title: 'Login',
      path: '/login',
      condition: false,
    },
    {
      title: 'Users',
      path: '/Users',
      condition: isLoggedIn,
    },
    {
      title: 'Transactions',
      path: '/transactions',
      condition: isLoggedIn,
    },
    {
      title: 'Chores',
      path: '/chores',
      condition: isLoggedIn,
    },
  ]

  const profileLinks = [
    {
      title: 'Sign up for chore',
      path: '/settings',
      condition: isLoggedIn, // if kid … assign chore if parent
    },
    {
      title: 'Make transaction',
      path: '/settings',
      condition: isLoggedIn, // if kid
    },
    {
      title: 'Settings',
      path: '/settings',
      condition: isLoggedIn,
    },
    {
      title: 'Sign out',
      path: '/settings',
      condition: isLoggedIn,
    },
  ]

  return (
    <Disclosure as='nav' className='bg-white shadow'>
      {({ open }) => (
        <>
          <div className='max-w-7xl mx-auto px-2 sm:px-4 lg:px-8'>
            <div className='flex justify-between h-16'>
              <div className='flex px-2 lg:px-0'>
                <div className='hidden lg:ml-6 lg:flex lg:space-x-8'>
                  {navLinks?.map(link => (
                    <Link
                      key={link?.title}
                      to={link?.path}
                      className={[
                        'border-transparent',
                        colorThemes.primary.navLinkText,
                        colorThemes.primary.hoverNavLinkText,
                        'hover:border-gray-300 ',
                        'inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium',
                      ].join(' ')}
                    >
                      {link?.title}
                    </Link>
                  ))}
                </div>
              </div>
              <Search />
              {/* Mobile menu button */}
              <NavHamburgerMenuButton open={open} />
              <div className='hidden lg:ml-4 lg:flex lg:items-center'>
                <NotificationIconButton />

                {/* Profile dropdown */}
                <Menu as='div' className='ml-4 relative flex-shrink-0'>
                  <div>
                    <Menu.Button
                      className={`bg-white rounded-full flex text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 ${colorThemes.primary.focusRing}`}
                    >
                      <span className='sr-only'>Open user menu</span>

                      <ProfileImage />
                    </Menu.Button>
                  </div>
                  <DefaultTransition>
                    <Menu.Items className='origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none'>
                      {profileLinks?.map(link => (
                        <Menu.Item key={link?.title}>
                          {({ active }) => (
                            <Link
                              to={link?.path}
                              className={classNames(
                                active ? 'bg-gray-100' : '',
                                'block px-4 py-2 text-sm text-gray-700'
                              )}
                            >
                              {link?.title}
                            </Link>
                          )}
                        </Menu.Item>
                      ))}
                    </Menu.Items>
                  </DefaultTransition>
                </Menu>
              </div>
            </div>
          </div>

          <Disclosure.Panel className='lg:hidden'>
            <div className='pt-2 pb-3 space-y-1'>
              {navLinks?.map(link => (
                <Disclosure.Button
                  key={link?.title}
                  as={Link}
                  to={link?.path}
                  className={`${colorThemes.primary.navBgLinkColor} ${colorThemes.primary.border} ${colorThemes.primary.navMobileLinkText} block pl-3 pr-4 py-2 border-l-4 text-base font-medium`}
                >
                  {link?.title}
                </Disclosure.Button>
              ))}
            </div>
            <div className='pt-4 pb-3 border-t border-gray-200'>
              <div className='flex items-center px-4'>
                <div className='flex-shrink-0'>
                  <ProfileImage imageSize='lg' />
                </div>
                <div className='ml-3'>
                  <div className='text-base font-medium text-gray-800'>Tom Cook</div>
                  <div className='text-sm font-medium text-gray-500'>tom@example.com</div>
                </div>
                <NotificationIconButton />
              </div>
              <div className='mt-3 space-y-1'>
                {profileLinks.map(link => (
                  <Disclosure.Button
                    key={link.title}
                    as={Link}
                    to={link.path}
                    className='block px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100'
                  >
                    {link.title}
                  </Disclosure.Button>
                ))}
              </div>
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  )
}

export default NavBar
