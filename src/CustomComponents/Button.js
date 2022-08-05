import { buttonTheme } from '../configs/global-styles'
import { icons } from '../configs/icons'

const Button = ({
  as: CustomTag = 'button',
  type,
  title,
  size,
  status,
  disabled,
  icon,
  onClick,
  to,
  customClassName,
  overrideButtonStyle,
  customIconStyle,
  overrideIconStyle,
  role,
  labelPosition,
  children,
  ariaControls,
  ariaExpanded,
  ariaHaspopup,
  srOnly,
  ref,
  onKeyPress,
}) => {
  return (
    <CustomTag
      type={type}
      to={to || '/'}
      ref={ref}
      disabled={disabled ?? false}
      onClick={onClick}
      onKeyPress={onKeyPress}
      style={overrideButtonStyle}
      role={role}
      aria-controls={ariaControls}
      aria-expanded={ariaExpanded}
      aria-haspopup={ariaHaspopup}
      className={[
        'inline-flex',
        'rounded-md',
        'shadow-sm',
        `${SIZES[size] ?? SIZES['medium']}`,
        `${STATUSES[status] ?? STATUSES['primary']}`,
        `${LABEL_POSITION[labelPosition] ?? LABEL_POSITION['center']}`,
        `${customClassName}`,
      ].join(' ')}
    >
      {icons({ customIconStyle, overrideIconStyle, size })[0][icon]}
      {title}
      {children}
      {!!srOnly && <span className='sr-only'>{srOnly}</span>}
    </CustomTag>
  )
}

export default Button

const SIZES = {
  extraSmall: ['px-1', 'py-0.5', 'text-xs', 'items-center'].join(' '),
  small: ['px-3', 'py-2', 'text-sm', 'leading-4', 'items-center'].join(' '),
  medium: ['px-4', 'py-2', 'text-base', 'font-medium', 'items-center'].join(' '),
  large: ['px-6', 'py-3', 'text-lg', 'font-medium', 'items-center'].join(' '),
  text: ['py-2', 'px-4', 'text-sm'].join(' '),
  mobileHamburger: 'p-2',
  null: '',
}

const LABEL_POSITION = {
  left: 'justify-start',
  center: 'justify-center',
  right: 'justify-end',
}

const STATUSES = {
  primary: [
    `text-${buttonTheme.primary.text}`,
    `bg-${buttonTheme.primary.bgColor}`,
    `hover:bg-${buttonTheme.primary.hoverBgColor}`,
    'border',
    'border-transparent',
    'focus:outline-none',
    'focus:ring-2',
    'focus:ring-offset-2',
    `focus:ring-${buttonTheme.primary.focus}`,
  ].join(' '),
  secondary: [
    `text-${buttonTheme.secondary.text}`,
    `bg-${buttonTheme.secondary.bgColor}`,
    `hover:bg-${buttonTheme.secondary.hoverBgColor}`,
    'focus:outline-none',
    'focus:ring-2',
    'focus:ring-offset-2',
    `focus:ring-${buttonTheme.secondary.focus}`,
  ].join(' '),
  cancel: [
    `text-${buttonTheme.cancel.text}`,
    `bg-${buttonTheme.cancel.bgColor}`,
    `hover:bg-${buttonTheme.cancel.hoverBgColor}`,
    'border',
    'border-gray-300',
    'focus:outline-none',
    'focus:ring-2',
    'focus:ring-offset-2',
    `focus:ring-${buttonTheme.cancel.focus}`,
  ].join(' '),
  CTA: [
    'text-snow',
    'bg-forestGreen',
    'hover:bg-russianGreen',
    'border',
    'border-transparent',
  ].join(' '),
  text: ['block', 'text-gray-700', 'hover:bg-gray-100'].join(' '),
  mobileHamburger: [
    'bg-mediumPurple',
    'inline-flex',
    'items-center',
    'text-indigo-200',
    'hover:text-white',
    'hover:bg-darkerPurple',
    'hover:bg-opacity-75',
    'focus:outline-none',
    'focus:ring-2',
    'focus:ring-offset-2',
    'focus:ring-offset-darkerPurple',
    'focus:ring-white',
  ].join(' '),
  icon: 'bg-transparent',
  null: '',
}

console.log('STATUSES[primary]', STATUSES['primary'])
