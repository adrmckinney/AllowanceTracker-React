import { colorThemes } from '../../configs/global-styles'
import { FormChangeType } from '../../types/FormChangeType'
import ConditionalRender from '../conditional-render'

type Props = {
  label: string
  name: string
  id: string
  value: number | string
  description?: string
  legend: string
  checked: boolean
  handleChange: (arg0: FormChangeType) => void
}

const Checkbox = ({
  label,
  name,
  value,
  id,
  description = '',
  legend,
  checked = false,
  handleChange,
}: Props) => {
  return (
    <>
      <legend className='sr-only'>{legend}</legend>
      <div className='relative flex items-start'>
        <div className='flex h-5 items-center'>
          <input
            id={id}
            aria-describedby={`${name}-description`}
            name={name}
            value={value}
            type='checkbox'
            checked={checked}
            onChange={handleChange}
            className={[
              'h-4 w-4 rounded',
              colorThemes?.checkbox?.border,
              colorThemes?.checkbox?.text,
              colorThemes?.checkbox?.focusRing,
            ].join(' ')}
          />
        </div>
        <div className='ml-3 text-sm'>
          <label htmlFor={name} className='font-medium text-gray-700'>
            {label}
          </label>
          <ConditionalRender condition={description?.length > 0}>
            <p id={`${name}-description`} className='text-gray-500'>
              {description}
            </p>
          </ConditionalRender>
        </div>
      </div>
    </>
  )
}

export default Checkbox
