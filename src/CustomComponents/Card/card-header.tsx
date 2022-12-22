import ConditionalRender from '../conditional-render'

type Props = {
  title?: String | React.ReactNode
  subTitle?: String
  leftSideComponent?: React.ReactNode
  rightSideContent?: React.ReactNode
  children?: React.ReactNode
}

const CardHeader = ({ title, subTitle, leftSideComponent, rightSideContent }: Props) => {
  return (
    <div className='bg-white px-4 py-5 border-b border-gray-200 sm:px-6'>
      <div className='-ml-4 -mt-4 flex justify-between items-center flex-wrap sm:flex-nowrap'>
        <div className='ml-4 mt-4'>
          <ConditionalRender condition={!leftSideComponent} falseRender={leftSideComponent}>
            <h3 className='text-lg leading-6 font-medium text-gray-900'>{title}</h3>
          </ConditionalRender>
          <p className='mt-1 text-sm text-gray-500'>{subTitle}</p>
        </div>
        <div className='ml-4 mt-4 flex-shrink-0'>{rightSideContent}</div>
      </div>
    </div>
  )
}

export default CardHeader
