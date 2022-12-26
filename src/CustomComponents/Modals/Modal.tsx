import { Dialog, Transition } from '@headlessui/react'
import { Fragment } from 'react'
import ConditionalRender from '../conditional-render'
import Icon from '../Icon'
import ModalChildTransition from './ModalChildTransition'
import { colorThemes } from '../../configs/global-styles'

type Props = {
  dataComponent?: React.ReactNode[] | React.ReactNode
  open: boolean
  closeModal: () => void
  title: string
  subTitle?: string
  modalTheme?: string
  buttonComponent?: React.ReactNode
  twoButtonComponent?: React.ReactNode
}

const Modal = ({
  dataComponent,
  open,
  closeModal,
  title,
  subTitle = '',
  modalTheme = '',
  buttonComponent,
  twoButtonComponent,
}: Props) => {
  const getModalIconTheme = () => {
    switch (modalTheme) {
      case 'success':
        return (
          <div className='mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100'>
            <Icon icon='check' size='xl' customIconStyle='mr-0 text-green-600' />
          </div>
        )
      case 'danger':
        return (
          <div
            className={[
              'mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full',
              colorThemes.danger.bgColor,
            ].join(' ')}
          >
            <Icon icon='exclamationTriangle' iconStatus='danger' size='xl' customIconStyle='mr-0' />
          </div>
        )
    }
  }

  return (
    <>
      <Transition.Root show={open} as={Fragment}>
        <Dialog as='div' className='relative z-10' onClose={closeModal}>
          <ModalChildTransition
            children={
              <Dialog.Panel className='relative transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-sm sm:p-6'>
                <div>
                  <ConditionalRender condition={!!modalTheme?.length}>
                    {getModalIconTheme()}
                  </ConditionalRender>
                  <div className='mt-3 text-center sm:mt-5'>
                    <Dialog.Title as='h3' className='text-lg font-medium leading-6 text-gray-900'>
                      {title}
                    </Dialog.Title>
                    <ConditionalRender condition={subTitle?.length > 0}>
                      <div className='mt-2'>
                        <p className='text-sm text-gray-500'>{subTitle}</p>
                      </div>
                    </ConditionalRender>
                    <div className='py-4 space-y-8'>{dataComponent}</div>
                  </div>
                </div>
                <ConditionalRender
                  condition={typeof twoButtonComponent === 'undefined'}
                  falseRender={
                    <div className='mt-5 sm:mt-6 sm:grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-3'>
                      {twoButtonComponent}
                    </div>
                  }
                >
                  <div className='mt-5 sm:mt-6'>{buttonComponent}</div>
                </ConditionalRender>
              </Dialog.Panel>
            }
          />
        </Dialog>
      </Transition.Root>
    </>
  )
}

export default Modal
