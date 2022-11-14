interface Props {
  classNames?: string
  style?: object
  children: React.ReactNode
}

const PaddedLayout = ({ classNames = '', style = {}, children }: Props): JSX.Element => {
  return (
    <div className={`p-4 ${classNames}`} style={style}>
      {children}
    </div>
  )
}

export default PaddedLayout
