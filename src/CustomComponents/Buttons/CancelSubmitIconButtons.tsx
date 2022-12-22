import { colorThemes } from '../../configs/global-styles'
import IconButton from './IconButton'

type Props = {
  handleCancel: () => void
  isDisabled: boolean
}

const CancelSubmitIconButtons = ({ handleCancel, isDisabled }: Props) => {
  return (
    <>
      <div
        className={[
          'flex justify-center pl-2',
          isDisabled ? 'self-start pt-2' : 'items-center ',
        ].join(' ')}
      >
        <IconButton
          icon='xicon'
          size='lg'
          onClick={handleCancel}
          customIconStyle={[colorThemes.actionIconTextColor.danger].join(' ')}
        />
        <IconButton
          icon='check'
          type='submit'
          size='lg'
          customIconStyle={['text-bold', colorThemes.actionIconTextColor.success].join(' ')}
          isDisabled={isDisabled}
        />
      </div>
    </>
  )
}

export default CancelSubmitIconButtons
