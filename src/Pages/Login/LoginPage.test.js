import { render, screen } from '@testing-library/react'
import React from 'react'
import useLoginValidation from '../../configs/ValidationRules/useLoginValidation'
import { useFormContext, withFormContext } from '../../HOC/withFormContext'
import LoginPage from './LoginPage'

describe('login', () => {
  const { handleChange, inputState: input } = useFormContext()
  const { usernameError, passwordError, handleApiErrors, apiErrors } = useLoginValidation(input)

  test('login page renders', async () => {
    render(await withFormContext(<LoginPage />))
    const linkElement = screen.getByText(/Allowance Tracker/i)
    expect(linkElement).toBeInTheDocument()
  })
})
