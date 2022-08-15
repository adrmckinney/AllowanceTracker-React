// @flow

import React from 'react'
import { ExclamationCircleIcon } from '@heroicons/react/solid'
import ConditionalRender from './conditional-render'
import { MailIcon } from '@heroicons/react/solid'
import HorizontalLayout from '../CustomComponents/horizontal-layout'
import { fontThemes, inputThemes } from '../configs/global-styles'
import InputErrorMessage from './input-error-message'
import { EyeIcon, EyeOffIcon } from '@heroicons/react/outline'

type Props = {
  fieldValidationIcon?: Boolean,
  placeholder?: String,
  type: String,
  name: String,
  dataId: Number,
  id?: String,
  theme?: String,
  hiddenLabel?: Boolean,
  label?: String,
  labelRight?: any,
  defaultValue?: String,
  value: String,
  required: Boolean,
  icon?: String,
  inputStyles?: Object,
  labelStyles?: Object,
  isTextArea?: Boolean,
  textAreaHeight?: String,
  rows?: Number,
  ref?: Object,
  errors?: Object,
  touched?: Boolean,
  showPassword?: Boolean,
  setShowPassword?: () => {},
  onChange: () => {},
  onKeyDown?: () => {},
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
  labelRight = null,
  defaultValue = '',
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
  touched,
  showPassword,
  setShowPassword,
  onChange,
  onKeyDown,
}: Props) => {
  const ICONS = {
    mail: <MailIcon className='h-5 w-5 text-gray-400' aria-hidden='true' />,
  }

  return (
    <>
      <ConditionalRender
        condition={!isTextArea}
        falseRender={
          <div className={textAreaHeight}>
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
                className={`block ${fontThemes.inputLabel}`}
                style={{ ...labelStyles }}
              >
                {label}
              </label>
            </ConditionalRender>
            <div className={`mt-1 ${textAreaHeight}`}>
              <textarea
                ref={ref}
                rows={rows}
                name={name}
                id={`${id}-textarea`}
                placeholder={placeholder}
                value={value}
                required={required}
                style={{ ...inputStyles }}
                onChange={onChange}
                onKeyDown={onKeyDown}
                className={[
                  'shadow-sm block w-full px-2 h-full',
                  fontThemes.inputText,
                  inputThemes[theme],
                ].join(' ')}
              />
            </div>
          </div>
        }
      >
        <div className={theme === 'stackedTop' || theme === 'stackedBottom' ? '-space-y-px' : ''}>
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
          <div
            className={`${
              name === 'password' || name === 'confirm_password' ? 'flex' : 'relative'
            } mt-1 shadow-sm`}
          >
            <ConditionalRender condition={icon}>
              <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                {ICONS[icon]}
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
              aria-invalid={fieldValidationIcon.toString()}
              aria-describedby={`${name}-${inputThemes[theme]['error']}`}
              style={{ ...inputStyles }}
              onChange={onChange}
              onBlur={touched}
              className={[
                icon ? 'pl-10' : 'px-3',
                'py-2 ',
                fontThemes.inputText,
                inputThemes[theme],
                'block w-full',
                `${
                  name === 'password' || name === 'confirm_password'
                    ? 'border-r-0 rounded-r-none'
                    : ''
                }`,
              ].join(' ')}
            />
            <ConditionalRender condition={name === 'password' || name === 'confirm_password'}>
              <button
                type='button'
                tabIndex='-1'
                className={['px-3 py-2', inputThemes[theme], 'border-l-0 rounded-l-none'].join(' ')}
                style={
                  theme === 'stackedBottom'
                    ? { borderTopLeftRadius: 0, borderBottomLeftRadius: 0 }
                    : {}
                }
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeOffIcon className='w-4 h-4' />
                ) : (
                  <EyeIcon className='w-4 h-4' />
                )}
              </button>
            </ConditionalRender>
            <ConditionalRender condition={fieldValidationIcon}>
              <div className='absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none'>
                <ExclamationCircleIcon className='h-5 w-5 text-red-500' aria-hidden='true' />
              </div>
            </ConditionalRender>
          </div>
        </div>
        {errors?.map(error => (
          <ConditionalRender key={error?.name} condition={error?.value}>
            <InputErrorMessage name={name} theme={theme} errorMessage={error?.message} />
          </ConditionalRender>
        ))}
      </ConditionalRender>
    </>
  )
}

export default Input
