// @flow

import { inputThemes } from '../configs/global-styles'

type Props = {
  name: String,
  theme: String,
  errorMessage: String,
}

const InputErrorMessage = ({ name, theme, errorMessage }: Props) => {
  return (
    <>
      <p className='mt-2 text-sm text-red-600' id={`${name}-${inputThemes[theme]['error']}`}>
        {errorMessage}
      </p>
    </>
  )
}

export default InputErrorMessage
