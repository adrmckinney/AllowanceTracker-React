import { LegacyRef } from 'react'
import ConditionalRender from '../conditional-render'
import HorizontalLayout from '../horizontal-layout'
import { fontThemes, inputThemes } from '../../configs/global-styles'
import InputErrorMessage from './input-error-message'
import Icon from '../Icon'
import { Error } from '../../types/ErrorType'
import { FormChangeType } from '../../types/FormChangeType'

interface Props {
  fieldValidationIcon?: boolean
  placeholder?: string
  type: string
  name: string
  dataId?: number | null
  id?: string
  theme?: string
  hiddenLabel?: boolean
  label?: string
  labelRight?: boolean
  value: string | number
  required?: boolean
  icon?: string
  inputStyles?: object
  labelStyles?: object
  isTextArea?: boolean
  textAreaHeight?: string
  rows?: number
  ref?: LegacyRef<HTMLInputElement>
  errors?: Error[]
  apiErrors?: Error[]
  handleOnBlur?: (e: FormChangeType) => void
  touched?: { [index: string]: boolean } | null
  iconSize?: string
  iconStatus?: string
  customIconStyle?: string
  overwriteIconStyle?: object
  onChange: (e: FormChangeType) => any
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => any
  autoFocus?: boolean
}

const Input = ({
  fieldValidationIcon = false,
  placeholder = '',
  type = '',
  name = '',
  dataId = null,
  id = '',
  theme = 'normal',
  hiddenLabel = false,
  label = '',
  labelRight = false,
  value = '',
  required = false,
  icon = '',
  inputStyles,
  labelStyles,
  isTextArea = false,
  textAreaHeight = '',
  rows = 4,
  ref,
  errors,
  apiErrors,
  handleOnBlur,
  touched,
  iconSize,
  iconStatus,
  customIconStyle,
  overwriteIconStyle,
  onChange,
  onKeyDown,
  autoFocus = false,
}: Props): JSX.Element => {
  return (
    <>
      <div>
        <ConditionalRender
          condition={!labelRight}
          falseRender={
            <HorizontalLayout horizontalPosition={{ sm: 'between' }}>
              <label htmlFor={name} className={`block ${fontThemes.inputLabel}`}>
                {label}
              </label>
              <span className='text-sm text-gray-500'>{labelRight}</span>
            </HorizontalLayout>
          }
        >
          <label
            htmlFor={name}
            className={hiddenLabel ? 'sr-only' : `block ${fontThemes.inputLabel}`}
            style={{ ...labelStyles }}
          >
            {label}
          </label>
        </ConditionalRender>
        <div className={'relative mt-1 shadow-sm'}>
          <ConditionalRender condition={!!icon}>
            <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
              <Icon
                icon={icon}
                size={iconSize}
                iconStatus={iconStatus}
                customIconStyle={customIconStyle}
                overwriteIconStyle={overwriteIconStyle}
              />
            </div>
          </ConditionalRender>
          <input
            ref={ref}
            type={type}
            name={name}
            data-id={dataId}
            id={`${id}-input`}
            placeholder={placeholder}
            value={value}
            required={required}
            aria-invalid={!!fieldValidationIcon}
            style={{ ...inputStyles }}
            onChange={onChange}
            onBlur={handleOnBlur}
            onKeyDown={onKeyDown}
            className={[
              icon ? 'pl-10' : 'px-3',
              'py-2 ',
              fontThemes.inputText,
              `${inputThemes}.${theme}`,
              'block w-full',
            ].join(' ')}
            autoFocus={autoFocus}
          />
          <ConditionalRender condition={fieldValidationIcon}>
            <div className='absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none'>
              <Icon icon='exclamation' iconStatus='danger' />
            </div>
          </ConditionalRender>
        </div>
        {errors?.map((error: Error) => (
          <ConditionalRender key={error?.message} condition={!error?.valid && !!touched?.[name]}>
            <InputErrorMessage name={name} theme={theme} errorMessage={error?.message} />
          </ConditionalRender>
        ))}
        {apiErrors?.map((error: Error, idx: number) => (
          <ConditionalRender
            key={`${error?.message}-${idx}`}
            condition={!error?.valid && !touched?.[name]}
          >
            <InputErrorMessage name={name} theme={theme} errorMessage={error?.message} />
          </ConditionalRender>
        ))}
      </div>
    </>
  )
}

export default Input
