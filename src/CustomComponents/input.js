// @flow

import React from 'react'
import { ExclamationCircleIcon } from '@heroicons/react/solid'
import ConditionalRender from './conditional-render'
import { MailIcon } from '@heroicons/react/solid'
import HorizontalLayout from '../CustomComponents/horizontal-layout'
import { fontThemes, inputThemes } from '../configs/global-styles'

type Props = {
  validation?: Boolean,
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
  icon?: String,
  inputStyles?: Object,
  labelStyles?: Object,
  isTextArea?: Boolean,
  textAreaHeight?: String,
  rows?: Number,
  ref?: Object,
  onChange: () => {},
  onKeyDown?: () => {},
}

const Input = ({
  validation = false,
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
  icon = '',
  inputStyles,
  labelStyles,
  isTextArea = false,
  textAreaHeight = '',
  rows = 4,
  ref,
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
                id={id}
                placeholder={placeholder}
                value={value}
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
          <div className='mt-1 relative rounded-md shadow-sm'>
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
              id={id}
              placeholder={placeholder}
              value={value}
              aria-invalid={validation.toString()}
              aria-describedby={`${name}-${inputThemes[theme]['error']}`}
              style={{ ...inputStyles }}
              onChange={onChange}
              className={[
                icon ? 'pl-10' : 'px-3',
                'py-2 ',
                fontThemes.inputText,
                inputThemes[theme],
                'block w-full',
              ].join(' ')}
            />
            <ConditionalRender condition={validation}>
              <div className='absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none'>
                <ExclamationCircleIcon className='h-5 w-5 text-red-500' aria-hidden='true' />
              </div>
            </ConditionalRender>
          </div>
        </div>
        <ConditionalRender condition={validation}>
          <p className='mt-2 text-sm text-red-600' id={`${name}-${inputThemes[theme]['error']}`}>
            Your password must be less than 4 characters.
          </p>
        </ConditionalRender>
      </ConditionalRender>
    </>
  )
}

export default Input
