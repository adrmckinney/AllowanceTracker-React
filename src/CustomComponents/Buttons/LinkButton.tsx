import { buttonTheme, fontThemes } from '../../configs/global-styles'
import { Link } from 'react-router-dom'

interface Props {
  title: string
  type?: 'submit' | 'reset' | 'button'
  size?: string
  to: string
  onClick?: (e: React.FormEvent<HTMLFormElement> | any) => void
  classNames?: string
}

const LinkButton = ({ title, type = 'button', to = '', onClick, classNames }: Props) => {
  return (
    <Link
      type={type}
      to={to}
      onClick={onClick}
      className={[buttonTheme.link, fontThemes.link, classNames].join(' ')}
    >
      {title}
    </Link>
  )
}

export default LinkButton
