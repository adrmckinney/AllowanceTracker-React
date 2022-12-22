import usePreventDecimalTyping from '../../hooks/usePreventDecimalTyping'
import MoneyFormatter from '../../library/MoneyFormatter'
import { FormChangeType } from '../../types/FormChangeType'
import Input from './Input'

type Props = {
  label: string
  name: string
  type: string
  required?: boolean
  isNegative?: boolean
  onChange: (e: FormChangeType) => any
  onKeyDown?: (e: FormChangeType) => any
  handleOnBlur?: (e: FormChangeType) => boolean
  input: any
}

const DollarInput = ({
  isNegative = false,
  onChange,
  label,
  type,
  name,
  required,
  input,
  handleOnBlur,
  onKeyDown,
}: Props) => {
  const { preventDecimalTyping } = usePreventDecimalTyping(true)

  const handleChange = e => {
    let value = MoneyFormatter.convertMoneyStringToPennies(e?.target?.value)
    // move this into form helpers and add appropriate condition
    // if (isNegative) {
    //   value = value < 0 ? value : value * -1
    // }
    // const dollarAmount = MoneyFormatter.toDollars(value)
    // setFieldValue(rest?.name, isNaN(parseInt(dollarAmount)) ? '' : dollarAmount)
    // onChange(e)
  }

  return (
    <Input
      label={label}
      icon='dollar'
      name={name}
      type={type}
      id={`child-register-${name}`}
      theme='normal'
      value={input?.[name]}
      onChange={handleChange}
      handleOnBlur={handleOnBlur}
      //   touched={touched}
      //   errors={validations?.[field?.name]}
    />
  )
}

export default DollarInput
