import { colorThemes, sizeThemes } from '../../configs/global-styles'

type Props = {
  title: string
  colorStatus: string
  size?: string
}

const StatusBadge = ({ title, colorStatus, size = 'md' }: Props) => {
  return (
    <span
      className={[
        'inline-flex items-center py-0.5 text-xs font-medium',
        colorThemes['badge'][colorStatus],
        sizeThemes['badge'][size],
      ].join(' ')}
    >
      {title}
    </span>
  )
}

export default StatusBadge
