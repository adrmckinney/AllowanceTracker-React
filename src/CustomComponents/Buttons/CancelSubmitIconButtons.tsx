import { colorThemes } from '../../configs/global-styles'
import IconButton from './IconButton'

type Props = {
  handleCancel: () => void
  isDisabled: boolean
}

const CancelSubmitIconButtons = ({ handleCancel, isDisabled }: Props) => {
  return (
    <>
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
    </>
  )
}

export default CancelSubmitIconButtons
