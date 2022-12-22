import { colorThemes } from '../../configs/global-styles'

const SkeletonList = () => {
  return (
    <>
      <div
        role='status'
        className={[
          'p-4 space-y-4 max-w-md rounded border divide-y shadow animate-pulse md:p-6',
          colorThemes?.skeleton?.border,
          colorThemes?.skeleton?.divideLine,
        ].join(' ')}
      >
        <div className='flex justify-between items-center'>
          <div>
            <div
              className={['h-2.5 rounded-ful w-24 mb-2.5', colorThemes?.skeleton?.textHeavy].join(
                ' '
              )}
            ></div>
            <div
              className={['w-32 h-2 rounded-full', colorThemes?.skeleton?.textLight].join(' ')}
            ></div>
          </div>
          <div
            className={['h-2.5 rounded-full w-12', colorThemes?.skeleton?.textHeavy].join(' ')}
          ></div>
        </div>
        <div className='flex justify-between items-center pt-4'>
          <div>
            <div
              className={['h-2.5 rounded-ful w-24 mb-2.5', colorThemes?.skeleton?.textHeavy].join(
                ' '
              )}
            ></div>
            <div
              className={['w-32 h-2 rounded-full', colorThemes?.skeleton?.textLight].join(' ')}
            ></div>
          </div>
          <div
            className={['h-2.5 rounded-full w-12', colorThemes?.skeleton?.textHeavy].join(' ')}
          ></div>
        </div>
        <div className='flex justify-between items-center pt-4'>
          <div>
            <div
              className={['h-2.5 rounded-ful w-24 mb-2.5', colorThemes?.skeleton?.textHeavy].join(
                ' '
              )}
            ></div>
            <div
              className={['w-32 h-2 rounded-full', colorThemes?.skeleton?.textLight].join(' ')}
            ></div>
          </div>
          <div
            className={['h-2.5 rounded-full w-12', colorThemes?.skeleton?.textHeavy].join(' ')}
          ></div>
        </div>
        <div className='flex justify-between items-center pt-4'>
          <div>
            <div
              className={['h-2.5 rounded-ful w-24 mb-2.5', colorThemes?.skeleton?.textHeavy].join(
                ' '
              )}
            ></div>
            <div
              className={['w-32 h-2 rounded-full', colorThemes?.skeleton?.textLight].join(' ')}
            ></div>
          </div>
          <div
            className={['h-2.5 rounded-full w-12', colorThemes?.skeleton?.textHeavy].join(' ')}
          ></div>
        </div>
        <div className='flex justify-between items-center pt-4'>
          <div>
            <div
              className={['h-2.5 rounded-ful w-24 mb-2.5', colorThemes?.skeleton?.textHeavy].join(
                ' '
              )}
            ></div>
            <div
              className={['w-32 h-2 rounded-full', colorThemes?.skeleton?.textLight].join(' ')}
            ></div>
          </div>
          <div
            className={['h-2.5 rounded-full w-12', colorThemes?.skeleton?.textHeavy].join(' ')}
          ></div>
        </div>
        <span className='sr-only'>Loading...</span>
      </div>
    </>
  )
}

export default SkeletonList
