import { buttonTheme } from '../../configs/global-styles'
import Icon from '../Icon'

interface Props {
  icon: string
  type?: 'submit' | 'reset' | 'button'
  size?: string
  onClick?: (e: React.FormEvent<HTMLFormElement> | any) => void
  classNames?: string
  customIconStyle?: string
}

const IconButton = ({
  icon,
  type = 'button',
  size = 'sm',
  onClick,
  classNames,
  customIconStyle,
}: Props) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={[
        'inline-flex items-center rounded-full border-none bg-transparent p-1 focus:ring-0',
        buttonTheme.icon,
        classNames,
      ].join(' ')}
    >
      <Icon icon={icon} size={size} aria-hidden='true' customIconStyle={customIconStyle} />
    </button>
  )
}

export default IconButton
