import {
  CheckIcon,
  Bars3Icon,
  PlusIcon,
  EnvelopeIcon,
  LockClosedIcon,
  ExclamationCircleIcon,
  MagnifyingGlassIcon,
  PencilIcon,
  ArrowsRightLeftIcon,
  ChevronUpDownIcon,
  ChevronDownIcon,
  FunnelIcon,
  MinusIcon,
} from '@heroicons/react/24/solid'
import {
  ArrowPathIcon,
  PencilSquareIcon,
  TrashIcon,
  XMarkIcon,
  ArrowUturnLeftIcon,
  CodeBracketIcon,
  CommandLineIcon,
  EyeIcon,
  EyeSlashIcon,
  BellIcon,
  CurrencyDollarIcon,
  ListBulletIcon,
  ExclamationTriangleIcon,
} from '@heroicons/react/24/outline'
import { colorThemes } from '../configs/global-styles'

type Sizes = {
  xs: string
  sm: string
  md: string
  lg: string
  xl: string
  '2xl': string
}

const sizes: Sizes = {
  xs: 'h-3 w-3',
  sm: 'h-4 w-4',
  md: 'h-5 w-5',
  lg: 'h-5 w-5',
  xl: 'h-6 w-6',
  '2xl': 'h-8 w-8',
}

export type IconType =
  | 'mailSolid'
  | 'refresh'
  | 'pencilSquare'
  | 'edit'
  | 'delete'
  | 'xicon'
  | 'check'
  | 'reply'
  | 'code'
  | 'terminal'
  | 'bars'
  | 'plusSm'
  | 'eye'
  | 'eyeSlash'
  | 'bell'
  | 'magnifyingGlass'
  | 'dollar'
  | 'list'
  | 'exclamation'
  | 'lockClosed'
  | 'transfer'
  | 'exclamationTriangle'
  | 'chevronUpDown'
  | 'chevronDown'
  | 'funnel'
  | 'minus'
  | ''

type Props = {
  icon: IconType
  customIconStyle?: string
  overwriteIconStyle?: object
  size?: string
  iconStatus?: string
}

type Icons = {
  mailSolid: React.ReactNode
  refresh: React.ReactNode
  pencilSquare: React.ReactNode
  edit: React.ReactNode
  delete: React.ReactNode
  xicon: React.ReactNode
  check: React.ReactNode
  reply: React.ReactNode
  code: React.ReactNode
  terminal: React.ReactNode
  bars: React.ReactNode
  plusSm: React.ReactNode
  eye: React.ReactNode
  eyeSlash: React.ReactNode
  bell: React.ReactNode
  magnifyingGlass: React.ReactNode
  dollar: React.ReactNode
  list: React.ReactNode
  exclamation: React.ReactNode
  lockClosed: React.ReactNode
  transfer: React.ReactNode
  exclamationTriangle: React.ReactNode
  chevronUpDown: React.ReactNode
  chevronDown: React.ReactNode
  funnel: React.ReactNode
  minus: React.ReactNode
}

const Icon = ({
  icon = '',
  customIconStyle = '',
  overwriteIconStyle = {},
  size = 'md',
  iconStatus = '',
}: Props): JSX.Element => {
  const icons: Icons = {
    mailSolid: (
      <EnvelopeIcon
        className={`${sizes[size]} mr-2 self-center ${customIconStyle}`}
        style={overwriteIconStyle}
        aria-hidden='true'
      />
    ),
    refresh: (
      <ArrowPathIcon
        className={`${sizes[size]} mr-2 self-center animate-spin transform rotate-180 ${customIconStyle}`}
        style={overwriteIconStyle}
        aria-hidden='true'
      />
    ),
    pencilSquare: (
      <PencilSquareIcon
        className={`${sizes[size]} mr-2 self-center ${customIconStyle}`}
        style={overwriteIconStyle}
        aria-hidden='true'
      />
    ),
    edit: (
      <PencilIcon
        className={`${sizes[size]} mr-2 self-center ${customIconStyle}`}
        style={overwriteIconStyle}
        aria-hidden='true'
      />
    ),
    delete: (
      <TrashIcon
        className={`${sizes[size]} mr-2 self-center ${customIconStyle}`}
        style={overwriteIconStyle}
        aria-hidden='true'
      />
    ),
    xicon: (
      <XMarkIcon
        className={`${sizes[size]} mr-2 self-center ${customIconStyle}`}
        style={overwriteIconStyle}
        aria-hidden='true'
      />
    ),
    check: (
      <CheckIcon
        className={`${sizes[size]} mr-2 self-center ${customIconStyle}`}
        style={overwriteIconStyle}
        aria-hidden='true'
      />
    ),
    reply: (
      <ArrowUturnLeftIcon
        className={`${sizes[size]} mr-2 self-center ${customIconStyle}`}
        style={overwriteIconStyle}
        aria-hidden='true'
      />
    ),
    code: (
      <CodeBracketIcon
        className={`${sizes[size]} mr-2 self-center ${customIconStyle}`}
        style={overwriteIconStyle}
        aria-hidden='true'
      />
    ),
    terminal: (
      <CommandLineIcon
        className={`${sizes[size]} mr-2 self-center ${customIconStyle}`}
        style={overwriteIconStyle}
        aria-hidden='true'
      />
    ),
    bars: (
      <Bars3Icon
        className={`${sizes[size]} mr-2 self-center ${customIconStyle}`}
        style={overwriteIconStyle}
        aria-hidden='true'
      />
    ),
    plusSm: (
      <PlusIcon
        className={`${sizes[size]} mr-2 self-center ${customIconStyle}`}
        style={overwriteIconStyle}
        aria-hidden='true'
      />
    ),
    minus: (
      <MinusIcon
        className={`${sizes[size]} mr-2 self-center ${customIconStyle}`}
        style={overwriteIconStyle}
        aria-hidden='true'
      />
    ),
    eye: (
      <EyeIcon
        className={`${sizes[size]} mr-2 self-center ${customIconStyle}`}
        style={overwriteIconStyle}
        aria-hidden='true'
      />
    ),
    eyeSlash: (
      <EyeSlashIcon
        className={`${sizes[size]} mr-2 self-center ${customIconStyle}`}
        style={overwriteIconStyle}
        aria-hidden='true'
      />
    ),
    bell: (
      <BellIcon
        className={`${sizes[size]} mr-2 self-center ${customIconStyle}`}
        style={overwriteIconStyle}
        aria-hidden='true'
      />
    ),
    magnifyingGlass: (
      <MagnifyingGlassIcon
        className={`${sizes[size]} mr-2 self-center ${customIconStyle}`}
        style={overwriteIconStyle}
        aria-hidden='true'
      />
    ),
    dollar: (
      <CurrencyDollarIcon
        className={`${sizes[size]} mr-2 self-center ${customIconStyle}`}
        style={overwriteIconStyle}
        aria-hidden='true'
      />
    ),
    list: (
      <ListBulletIcon
        className={`${sizes[size]} mr-2 self-center ${customIconStyle}`}
        style={overwriteIconStyle}
        aria-hidden='true'
      />
    ),
    transfer: (
      <ArrowsRightLeftIcon
        className={`${sizes[size]} mr-2 self-center ${customIconStyle}`}
        style={overwriteIconStyle}
        aria-hidden='true'
      />
    ),
    chevronUpDown: (
      <ChevronUpDownIcon
        className={`${sizes[size]} mr-2 self-center ${customIconStyle}`}
        style={overwriteIconStyle}
        aria-hidden='true'
      />
    ),
    chevronDown: (
      <ChevronDownIcon
        className={`${sizes[size]} mr-2 self-center ${customIconStyle}`}
        style={overwriteIconStyle}
        aria-hidden='true'
      />
    ),
    funnel: (
      <FunnelIcon
        className={`${sizes[size]} mr-2 self-center ${customIconStyle}`}
        style={overwriteIconStyle}
        aria-hidden='true'
      />
    ),
    exclamation: (
      <ExclamationCircleIcon
        className={[
          `${sizes[size]}`,
          'mr-2 self-center',
          `${iconStatus?.length > 0 ? colorThemes[iconStatus].iconText : ''}`,
          `${customIconStyle}`,
        ].join(' ')}
        style={overwriteIconStyle}
        aria-hidden='true'
      />
    ),
    exclamationTriangle: (
      <ExclamationTriangleIcon
        className={[
          `${sizes[size]}`,
          'mr-2 self-center',
          `${iconStatus?.length > 0 ? colorThemes[iconStatus].iconText : ''}`,
          `${customIconStyle}`,
        ].join(' ')}
        style={overwriteIconStyle}
        aria-hidden='true'
      />
    ),
    lockClosed: (
      <LockClosedIcon
        className={[
          'mr-2 self-center',
          `${sizes[size]}`,
          `${iconStatus?.length > 0 ? colorThemes[iconStatus].iconText : ''}`,
          `group-${iconStatus?.length > 0 ? colorThemes[iconStatus].hoverIconText : ''}`,
          `${customIconStyle}`,
        ].join(' ')}
        style={overwriteIconStyle}
        aria-hidden='true'
      />
    ),
  }

  return icons[icon]
}

export default Icon
