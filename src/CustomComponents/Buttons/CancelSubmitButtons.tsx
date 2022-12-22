import { colorThemes } from '../../configs/global-styles'
import Button from './Button'

type Props = {
  handleCancel: () => void
  isDisabled: boolean
  cancelTitle?: string
  submitTitle?: string
  size?: string
}

const CancelSubmitButtons = ({
  handleCancel,
  isDisabled,
  cancelTitle = 'Cancel',
  submitTitle = 'Save',
  size = 'lg',
}: Props) => {
  return (
    <>
      <div className={['flex justify-center space-x-4 items-center pt-2'].join(' ')}>
        <Button
          title={cancelTitle}
          type='button'
          size={size}
          onClick={handleCancel}
          customIconStyle={[colorThemes.actionIconTextColor.danger].join(' ')}
        />
        <Button
          title={submitTitle}
          type='submit'
          size={size}
          customIconStyle={['text-bold', colorThemes.actionIconTextColor.success].join(' ')}
          disabled={isDisabled}
        />
      </div>
    </>
  )
}

export default CancelSubmitButtons
