import { colorThemes } from '../../configs/global-styles'
import Icon from '../Icon'
import { ToastContext } from '../../context/ToastProvider'
import { Fragment, useContext, useEffect } from 'react'
import IconButton from '../Buttons/IconButton'
import { Transition } from '@headlessui/react'

const ToastSuccess = () => {
  const { toastSuccess, resetToast, duration } = useContext(ToastContext)

  useEffect(() => {
    let ignore = false

    if (!ignore && toastSuccess.active) {
      setTimeout(() => {
        resetToast('success')
      }, duration)
    }

    return () => {
      ignore = true
    }
  }, [toastSuccess.active])

  return (
    <Transition
      as={Fragment}
      show={toastSuccess?.active}
      enter='transform transition ease-in-out duration-500 sm:duration-700'
      enterFrom='-translate-y-full'
      enterTo='translate-y-0'
      leave='transform transition transition-transform ease-in-out duration-500 sm:duration-700'
      leaveFrom='translate-y-0'
      leaveTo='-translate-y-full'
    >
      <div className='fixed inset-x-0 top-0 pt-2 sm:pb-5 z-50'>
        <div className='mx-auto max-w-7xl px-2 sm:px-6 lg:px-8'>
          <div
            className={['rounded-lg p-2 shadow-lg sm:p-3', colorThemes.toast.success.bgColor].join(
              ' '
            )}
          >
            <div className='flex flex-wrap items-center justify-between'>
              <div className='flex w-0 flex-1 items-center'>
                <span
                  className={['flex rounded-lg p-2', colorThemes.toast.success.iconBgColor].join(
                    ' '
                  )}
                >
                  <Icon
                    icon='check'
                    size='lg'
                    customIconStyle={[colorThemes.toast.success.iconColor, 'mr-0'].join(' ')}
                  />
                </span>
                <p
                  className={[
                    'ml-3 truncate font-medium text-center w-full',
                    colorThemes.toast.success.text,
                  ].join(' ')}
                >
                  <span className='inline'>{toastSuccess?.message}</span>
                </p>
              </div>
              <div className='order-2 flex-shrink-0 sm:order-3 sm:ml-2'>
                <IconButton
                  icon='xicon'
                  type='button'
                  size='lg'
                  customIconStyle={[
                    colorThemes.toast.success.bgColor,
                    colorThemes.toast.success.iconColor,
                    colorThemes.toast.success.hoverIconText,
                    'mr-0',
                  ].join(' ')}
                  onClick={() => resetToast('success')}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  )
}

export default ToastSuccess
