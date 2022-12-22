import { colorThemes } from '../../configs/global-styles'

type Props = {
  numberOfLines?: number
}

const SkeletonText = ({ numberOfLines = 2 }: Props) => {
  const getSkeletonLinesByNumber = () => {
    if (numberOfLines === 1) {
      return (
        <div className='flex items-center space-x-2 w-full'>
          <div
            className={['h-2.5 rounded-full w-32', colorThemes?.skeleton?.textHeavy].join(' ')}
          ></div>
          <div
            className={['h-2.5 rounded-full w-24', colorThemes?.skeleton?.textLight].join(' ')}
          ></div>
          <div
            className={['h-2.5 rounded-full w-full', colorThemes?.skeleton?.textLight].join(' ')}
          ></div>
        </div>
      )
    }

    if (numberOfLines === 2) {
      return (
        <>
          <div className='flex items-center space-x-2 w-full'>
            <div
              className={['h-2.5 rounded-full w-32', colorThemes?.skeleton?.textHeavy].join(' ')}
            ></div>
            <div
              className={['h-2.5 rounded-full w-24', colorThemes?.skeleton?.textLight].join(' ')}
            ></div>
            <div
              className={['h-2.5 rounded-full w-full', colorThemes?.skeleton?.textLight].join(' ')}
            ></div>
          </div>
          <div className='flex items-center w-full space-x-2 max-w-[480px]'>
            <div
              className={['h-2.5 rounded-full w-full', colorThemes?.skeleton?.textHeavy].join(' ')}
            ></div>
            <div
              className={['h-2.5 rounded-full w-full', colorThemes?.skeleton?.textLight].join(' ')}
            ></div>
            <div
              className={['h-2.5 rounded-full w-24', colorThemes?.skeleton?.textLight].join(' ')}
            ></div>
          </div>
        </>
      )
    }

    if (numberOfLines === 3) {
      return (
        <>
          <div className='flex items-center space-x-2 w-full'>
            <div
              className={['h-2.5 rounded-full w-32', colorThemes?.skeleton?.textHeavy].join(' ')}
            ></div>
            <div
              className={['h-2.5 rounded-full w-24', colorThemes?.skeleton?.textLight].join(' ')}
            ></div>
            <div
              className={['h-2.5 rounded-full w-full', colorThemes?.skeleton?.textLight].join(' ')}
            ></div>
          </div>
          <div className='flex items-center w-full space-x-2 max-w-[480px]'>
            <div
              className={['h-2.5 rounded-full w-full', colorThemes?.skeleton?.textHeavy].join(' ')}
            ></div>
            <div
              className={['h-2.5 rounded-full w-full', colorThemes?.skeleton?.textLight].join(' ')}
            ></div>
            <div
              className={['h-2.5 rounded-full w-24', colorThemes?.skeleton?.textLight].join(' ')}
            ></div>
          </div>
          <div className='flex items-center w-full space-x-2 max-w-[400px]'>
            <div
              className={['h-2.5 rounded-full w-full', colorThemes?.skeleton?.textHeavy].join(' ')}
            ></div>
            <div
              className={['h-2.5 rounded-full w-80', colorThemes?.skeleton?.textLight].join(' ')}
            ></div>
            <div
              className={['h-2.5 rounded-full w-full', colorThemes?.skeleton?.textLight].join(' ')}
            ></div>
          </div>
        </>
      )
    }
  }

  return (
    <>
      <div role='status' className='space-y-2.5 animate-pulse max-w-lg'>
        {getSkeletonLinesByNumber()}
        <span className='sr-only'>Loading...</span>
      </div>
    </>
  )
}

export default SkeletonText
