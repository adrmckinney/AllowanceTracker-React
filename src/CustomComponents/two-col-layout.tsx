import HorizontalLayout from './horizontal-layout'

type Props = {
  leftColContent: React.ReactNode
  rightColContent: React.ReactNode
  leftSrOnlyTitle?: string
  leftClassNames?: string
  leftStyles?: React.CSSProperties
  rightClassNames?: string
  rightStyles?: React.CSSProperties
  wrapperClassNames?: string
}

const TwoColLayout = ({
  leftColContent,
  rightColContent,
  leftSrOnlyTitle,
  leftClassNames,
  leftStyles,
  rightClassNames,
  rightStyles,
  wrapperClassNames,
}: Props) => {
  return (
    <>
      <HorizontalLayout classNames={`overflow-hidden ${wrapperClassNames}`} flex={{ mbl: 'flex' }}>
        {/* Left Section */}
        <section
          aria-labelledby='left-section'
          className={`min-w-0 flex-1 h-full flex flex-col overflow-auto ${leftClassNames}`}
          style={{ ...leftStyles }}
        >
          <p id='left-section' className='sr-only'>
            {leftSrOnlyTitle}
          </p>
          {leftColContent}
        </section>

        {/* Right Section */}
        <section
          aria-labelledby='right-section'
          className={`min-w-0 flex-1 h-full flex flex-col overflow-auto ${rightClassNames}`}
          style={{ ...rightStyles }}
        >
          <p id='right-section' className='sr-only'>
            {leftSrOnlyTitle}
          </p>
          {rightColContent}
        </section>
      </HorizontalLayout>
    </>
  )
}

export default TwoColLayout
