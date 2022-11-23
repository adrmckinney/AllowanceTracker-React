import { convertNumberTypePhoneNumberToFormattedStringType } from '../../helpers/formHelpers/PhoneNumberHelpers'

const User = userData => {
  return {
    ...userData,
    number: convertNumberTypePhoneNumberToFormattedStringType(userData?.number),
  }
}

export default User
