export const colorThemes = {
  primary: {
    bgColor: 'bg-sky-600',
    hoverBgColor: 'hover:bg-sky-700',
    text: 'text-white',
    focusRing: 'focus:ring-sky-500',
    iconText: 'text-sky-500',
    hoverIconText: 'hover:text-sky-400',
    focusBorder: 'focus:border-sky-500',
  },
  secondary: {
    bgColor: 'bg-sky-100',
    hoverBgColor: 'hover:bg-sky-200',
    text: 'text-sky-700',
    focusRing: 'focus:ring-sky-500',
    iconText: 'text-sky-300',
    hoverIconText: 'hover:text-sky-400',
  },
  danger: {
    bgColor: 'bg-red-100',
    hoverBgColor: 'bg-red-200',
    text: 'text-red-700',
    focusRing: 'focus:ring-red-500',
    iconText: 'text-red-300',
    hoverIconText: 'hover:text-red-400',
  },
  link: {
    text: 'text-sky-600',
    hoverText: 'hover:text-sky-500',
  },
}

export const fontThemes = {
  appTitle: 'text-4xl font-extrabold text-sky-600 tracking-wider',
  title: 'text-3xl font-extrabold text-gray-900 tracking-wide',
  default: 'text-sm text-gray-600 tracking-normal',
  link: 'text-sm',
  inputLabel: 'text-sm font-medium text-gray-700',
  inputText: 'sm:text-sm text-gray-900',
  placeholder: 'placeholder-gray-500',
}

export const buttonTheme = {
  primary: [
    colorThemes.primary.bgColor,
    colorThemes.primary.hoverBgColor,
    colorThemes.primary.text,
    colorThemes.primary.focusRing,
  ].join(' '),
  secondary: [
    colorThemes.secondary.bgColor,
    colorThemes.secondary.hoverBgColor,
    colorThemes.secondary.text,
    colorThemes.secondary.focusRing,
  ].join(' '),
  cancel: ['bg-white', 'hover:bg-gray-50', 'text-gray-700'].join(' '),
  danger: [
    colorThemes.danger.bgColor,
    colorThemes.danger.hoverBgColor,
    colorThemes.danger.text,
    colorThemes.danger.focusRing,
  ].join(' '),
  link: [
    'bg-transparent',
    'border-none',
    'shadow-none',
    'focus:ring-0',
    'outline-none',
    'rounded-none',
    colorThemes.link.text,
    colorThemes.link.hoverText,
  ].join(' '),
}

export const inputThemes = {
  normal: [
    'bg-white',
    'border-gray-300',
    'border-2',
    'rounded-md',
    'focus:outline-none',
    colorThemes.primary.focusRing,
    colorThemes.primary.focusBorder,
  ].join(' '),
  stackedTop: [
    'bg-white',
    'border-gray-300',
    'border',
    'appearance-none',
    'rounded-none',
    'rounded-t-md',
    'relative',
    'focus:z-10',
    'focus:outline-none',
    colorThemes.primary.focusRing,
    colorThemes.primary.focusBorder,
  ].join(' '),
  stackedBottom: [
    'bg-white',
    'border',
    'border-gray-300',
    'appearance-none',
    'rounded-none',
    'rounded-b-md',
    'relative',
    'focus:z-10',
    'focus:outline-none',
    colorThemes.primary.focusRing,
    colorThemes.primary.focusBorder,
  ].join(' '),
  error: {
    text: 'red-900',
    border: 'red-300',
    placeholder: 'red-300',
    focusRing: 'red-500',
    focusBorder: 'red-500',
    ariaDescribe: 'error',
  },
}
