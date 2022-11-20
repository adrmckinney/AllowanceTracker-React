import { buttonTheme } from '../../configs/global-styles'
import ConditionalRender from '../conditional-render'
import Icon from '../Icon'

interface Props {
  as?: any
  type?: string
  title: string
  size?: string
  status?: string
  disabled?: boolean
  icon?: string
  iconStatus?: string
  onClick?: () => void
  to?: string
  customClassName?: string
  overwriteButtonStyle?: object
  customIconStyle?: string
  overwriteIconStyle?: object
  role?: string
  labelPosition?: string
  children?: React.ReactNode
  ariaControls?: string
  ariaHaspopup?: string
  ariaExpanded?: string
  srOnly?: string
  ref?: object
  onKeyPress?: () => {}
  relativeGroup?: boolean
}

const Button = ({
  as: CustomTag = 'button',
  type = 'button',
  title,
  size = 'md',
  status = 'primary',
  disabled = false,
  icon = '',
  iconStatus = '',
  onClick,
  to = '/',
  customClassName = '',
  overwriteButtonStyle,
  customIconStyle = '',
  overwriteIconStyle = {},
  role,
  labelPosition = 'center',
  children,
  ariaControls,
  ariaExpanded,
  ariaHaspopup,
  srOnly,
  ref,
  onKeyPress,
  relativeGroup = false,
}: Props) => {
  return (
    <CustomTag
      type={type}
      to={to}
      ref={ref}
      disabled={disabled}
      onClick={onClick}
      onKeyPress={onKeyPress}
      style={overwriteButtonStyle}
      role={role}
      aria-controls={ariaControls}
      aria-expanded={ariaExpanded}
      aria-haspopup={ariaHaspopup}
      className={[
        'inline-flex',
        'rounded-md',
        'shadow-sm',
        'border',
        'border-transparent',
        'focus:outline-none',
        'focus:ring-2',
        'focus:ring-offset-2',
        'leading-4',
        sizes[size],
        buttonTheme[status],
        label_position[labelPosition],
        `${relativeGroup ? 'relative group' : ''}`,
        `${customClassName}`,
      ].join(' ')}
    >
      <ConditionalRender
        condition={relativeGroup}
        falseRender={
          <Icon
            icon={icon}
            size={size}
            iconStatus={status}
            customIconStyle={customIconStyle}
            overwriteIconStyle={overwriteIconStyle}
          />
        }
      >
        <span className='absolute left-0 inset-y-0 flex items-center pl-3'>
          <Icon
            icon={icon}
            size={size}
            iconStatus={status}
            customIconStyle={customIconStyle}
            overwriteIconStyle={overwriteIconStyle}
          />
        </span>
      </ConditionalRender>
      {title}
      {children}
      {!!srOnly && <span className='sr-only'>{srOnly}</span>}
    </CustomTag>
  )
}

export default Button

type Sizes = {
  xs: string
  sm: string
  md: string
  lg: string
  xl: string
  text: string
  mobileHamburger: string
  link: string
  null: string
}

type LabelPosition = {
  left: string
  center: string
  right: string
}

const sizes: Sizes = {
  xs: ['px-1', 'py-0.5', 'text-xs', 'items-center'].join(' '),
  sm: ['px-3', 'py-2', 'text-sm', 'leading-4', 'items-center'].join(' '),
  md: ['px-4', 'py-2', 'text-sm', 'font-medium', 'items-center'].join(' '),
  lg: ['px-4', 'py-2', 'text-base', 'font-medium', 'items-center'].join(' '),
  xl: ['px-6', 'py-3', 'text-lg', 'font-medium', 'items-center'].join(' '),
  text: ['py-2', 'px-4', 'text-sm'].join(' '),
  mobileHamburger: 'p-2',
  link: 'p-0 text-sm',
  null: '',
}

const label_position: LabelPosition = {
  left: 'justify-start',
  center: 'justify-center',
  right: 'justify-end',
}
