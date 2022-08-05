export const colorThemes = {
  primary: {
    bgColor: 'sky-600',
    hoverBgColor: 'sky-700',
    text: 'white',
    focusRing: 'sky-500',
    focusBorder: 'sky-500',
  },
  secondary: {
    bgColor: 'sky-100',
    hoverBgColor: 'sky-200',
    text: 'sky-700',
    focusRing: 'sky-500',
  },
  danger: {
    bgColor: 'red-600',
    hoverBgColor: 'red-700',
    text: 'gray-600',
    focusRing: 'red-500',
  },
}

export const buttonTheme = {
  primary: {
    bgColor: colorThemes.primary.bgColor,
    hoverBgColor: colorThemes.primary.hoverBgColor,
    text: colorThemes.primary.text,
    focus: colorThemes.primary.focusRing,
    focusBorder: colorThemes.primary.focusBorder,
  },
  secondary: {
    bgColor: colorThemes.secondary.bgColor,
    hoverBgColor: colorThemes.secondary.hoverBgColor,
    text: colorThemes.secondary.text,
    focus: colorThemes.secondary.focusRing,
  },
  cancel: {
    bgColor: 'white',
    hoverBgColor: 'bg-gray-50',
    focus: 'indigo-500',
    text: 'gray-700',
  },
  danger: {
    bgColor: colorThemes.danger.bgColor,
    hoverBgColor: colorThemes.danger.hoverBgColor,
    text: colorThemes.danger.text,
    focus: colorThemes.danger.focusRing,
  },
}

export const inputTheme = {
  normal: {
    text: 'gray-600',
    bgColor: 'white',
    borderColor: 'gray-300',
    borderWidth: '2',
    placeholder: 'gray-300',
    focusRing: colorThemes.primary.focusRing,
    focusBorder: colorThemes.primary.focusRing,
    labelText: 'gray-700',
  },
  error: {
    text: 'red-900',
    border: 'red-300',
    placeholder: 'red-300',
    focusRing: 'red-500',
    focusBorder: 'red-500',
    ariaDescribe: 'error',
  },
}
