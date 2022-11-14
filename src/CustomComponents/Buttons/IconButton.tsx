import { buttonTheme } from '../../configs/global-styles'
import Icon from '../Icon'

type Props = {
  icon: string
  size?: string
  onClick: () => void
  classNames?: string
}

const IconButton = ({ icon, size = 'sm', onClick, classNames }: Props) => {
  return (
    <button
      type='button'
      onClick={onClick}
      className={[
        'inline-flex items-center rounded-full border-none bg-transparent p-1 focus:ring-0',
        buttonTheme.icon,
        classNames,
      ].join(' ')}
    >
      <Icon icon={icon} size={size} aria-hidden='true' />
    </button>
  )
}

export default IconButton
