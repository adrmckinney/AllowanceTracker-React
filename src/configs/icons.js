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

const ICON_SIZES = {
  extraSmall: 'h-3 w-3',
  small: 'h-4 w-4',
  medium: 'h-6 w-6',
  large: 'h-8 w-8',
}

export const icons = ({ customIconStyle, overrideIconStyle, size }) => [
  {
    mailOutline: (
      <MailOutline
        className={`${ICON_SIZES[size]} mr-2 self-center ${customIconStyle}`}
        style={overrideIconStyle}
        aria-hidden='true'
      />
    ),
    mailSolid: (
      <MailIcon
        className={`${ICON_SIZES[size]} mr-2 self-center ${customIconStyle}`}
        style={overrideIconStyle}
        aria-hidden='true'
      />
    ),
    refresh: (
      <RefreshIcon
        className={`${ICON_SIZES[size]} mr-2 self-center animate-spin transform rotate-180 ${customIconStyle}`}
        style={overrideIconStyle}
        aria-hidden='true'
      />
    ),
    edit: (
      <PencilAltIcon
        className={`${ICON_SIZES[size]} mr-2 self-center ${customIconStyle}`}
        style={overrideIconStyle}
        aria-hidden='true'
      />
    ),
    delete: (
      <TrashIcon
        className={`${ICON_SIZES[size]} mr-2 self-center ${customIconStyle}`}
        style={overrideIconStyle}
        aria-hidden='true'
      />
    ),
    xicon: (
      <XIcon
        className={`${ICON_SIZES[size]} mr-2 self-center ${customIconStyle}`}
        style={overrideIconStyle}
        aria-hidden='true'
      />
    ),
    check: (
      <CheckIcon
        className={`${ICON_SIZES[size]} mr-2 self-center ${customIconStyle}`}
        style={overrideIconStyle}
        aria-hidden='true'
      />
    ),
    reply: (
      <ReplyIcon
        className={`${ICON_SIZES[size]} mr-2 self-center ${customIconStyle}`}
        style={overrideIconStyle}
        aria-hidden='true'
      />
    ),
    code: (
      <CodeIcon
        className={`${ICON_SIZES[size]} mr-2 self-center ${customIconStyle}`}
        style={overrideIconStyle}
        aria-hidden='true'
      />
    ),
    terminal: (
      <TerminalIcon
        className={`${ICON_SIZES[size]} mr-2 self-center ${customIconStyle}`}
        style={overrideIconStyle}
        aria-hidden='true'
      />
    ),
    menu: (
      <MenuAlt2Icon
        className={`${ICON_SIZES[size]} mr-2 self-center ${customIconStyle}`}
        style={overrideIconStyle}
        aria-hidden='true'
      />
    ),
    plusSm: (
      <PlusSmIcon
        className={`${ICON_SIZES[size]} mr-2 self-center ${customIconStyle}`}
        style={overrideIconStyle}
        aria-hidden='true'
      />
    ),
    lock: (
      <LockClosedIcon
        className={`${ICON_SIZES[size]} mr-2 self-center ${customIconStyle}`}
        style={overrideIconStyle}
        aria-hidden='true'
      />
    ),
  },
]
