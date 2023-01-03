import { createContext, useState } from 'react'

export const ToastContext = createContext(null)

type Props = {
  children: React.ReactNode
}

export type ToastType = {
  active: boolean
  message: string
}

const initialValues = {
  active: false,
  message: '',
}

const ToastProvider = ({ children }: Props) => {
  const [toastSuccess, setToastSuccess] = useState<ToastType>(initialValues)
  const [toastDanger, setToastDanger] = useState<ToastType>(initialValues)
  const duration = 7000

  const resetToast = (target: 'success' | 'danger') => {
    switch (target) {
      case 'success':
        setToastSuccess(initialValues)
        break
      case 'danger':
        setToastDanger(initialValues)
        break
      default:
        setToastSuccess(initialValues)
        setToastDanger(initialValues)
        break
    }
  }

  const handleToastSuccess = (message: string) => {
    setToastSuccess({ active: true, message: message })
  }

  const handleToastDanger = (message: string) => {
    setToastDanger({ active: true, message: message })
  }

  return (
    <ToastContext.Provider
      value={{
        toastSuccess,
        resetToast,
        handleToastSuccess,
        toastDanger,
        setToastDanger,
        handleToastDanger,
        duration,
      }}
    >
      {children}
    </ToastContext.Provider>
  )
}

export default ToastProvider
