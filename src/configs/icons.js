import {
  CheckIcon,
  MenuAlt2Icon,
  PlusSmIcon,
  MailIcon,
  LockClosedIcon,
} from '@heroicons/react/solid'
import { MailIcon as MailOutline } from '@heroicons/react/outline'
import {
  RefreshIcon,
  PencilAltIcon,
  TrashIcon,
  XIcon,
  ReplyIcon,
  CodeIcon,
  TerminalIcon,
} from '@heroicons/react/outline'
import { colorThemes } from './global-styles'

const sizes = {
  xs: 'h-3 w-3',
  sm: 'h-4 w-4',
  md: 'h-5 w-5',
  lg: 'h-5 w-5',
  xl: 'h-6 w-6',
}

export const icons = ({
  customIconStyle = '',
  overrideIconStyle = null,
  size = 'medium',
  iconStatus = '',
}) => [
  {
    mailOutline: (
      <MailOutline
        className={`${sizes[size]} mr-2 self-center ${customIconStyle}`}
        style={overrideIconStyle}
        aria-hidden='true'
      />
    ),
    mailSolid: (
      <MailIcon
        className={`${sizes[size]} mr-2 self-center ${customIconStyle}`}
        style={overrideIconStyle}
        aria-hidden='true'
      />
    ),
    refresh: (
      <RefreshIcon
        className={`${sizes[size]} mr-2 self-center animate-spin transform rotate-180 ${customIconStyle}`}
        style={overrideIconStyle}
        aria-hidden='true'
      />
    ),
    edit: (
      <PencilAltIcon
        className={`${sizes[size]} mr-2 self-center ${customIconStyle}`}
        style={overrideIconStyle}
        aria-hidden='true'
      />
    ),
    delete: (
      <TrashIcon
        className={`${sizes[size]} mr-2 self-center ${customIconStyle}`}
        style={overrideIconStyle}
        aria-hidden='true'
      />
    ),
    xicon: (
      <XIcon
        className={`${sizes[size]} mr-2 self-center ${customIconStyle}`}
        style={overrideIconStyle}
        aria-hidden='true'
      />
    ),
    check: (
      <CheckIcon
        className={`${sizes[size]} mr-2 self-center ${customIconStyle}`}
        style={overrideIconStyle}
        aria-hidden='true'
      />
    ),
    reply: (
      <ReplyIcon
        className={`${sizes[size]} mr-2 self-center ${customIconStyle}`}
        style={overrideIconStyle}
        aria-hidden='true'
      />
    ),
    code: (
      <CodeIcon
        className={`${sizes[size]} mr-2 self-center ${customIconStyle}`}
        style={overrideIconStyle}
        aria-hidden='true'
      />
    ),
    terminal: (
      <TerminalIcon
        className={`${sizes[size]} mr-2 self-center ${customIconStyle}`}
        style={overrideIconStyle}
        aria-hidden='true'
      />
    ),
    menu: (
      <MenuAlt2Icon
        className={`${sizes[size]} mr-2 self-center ${customIconStyle}`}
        style={overrideIconStyle}
        aria-hidden='true'
      />
    ),
    plusSm: (
      <PlusSmIcon
        className={`${sizes[size]} mr-2 self-center ${customIconStyle}`}
        style={overrideIconStyle}
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
        style={overrideIconStyle}
        aria-hidden='true'
      />
    ),
  },
]
