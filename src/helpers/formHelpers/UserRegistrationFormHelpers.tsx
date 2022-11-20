import { RegistrationInputFieldTypes } from '../../types/RegistrationInputType'

export const parentRegistrationFields: RegistrationInputFieldTypes[] = [
  { name: 'name', label: 'Name', type: 'text' },
  { name: 'username', label: 'Username', type: 'text' },
  { name: 'email', label: 'Email', type: 'email' },
  { name: 'number', label: 'Phone Number', type: 'number' },
  { name: 'password', label: 'Password', type: 'password' },
  { name: 'confirm_password', label: 'Confirm Password', type: 'password' },
]

export const childRegistrationFields: RegistrationInputFieldTypes[] = [
  { name: 'name', label: "Child's Name", type: 'text' },
  { name: 'username', label: 'Username', type: 'text' },
  { name: 'email', label: 'Email', type: 'email' },
  { name: 'number', label: 'Phone Number', type: 'text' },
  { name: 'wallet', label: 'Add Money', type: 'text' },
  { name: 'password', label: 'Password', type: 'password' },
  { name: 'confirm_password', label: 'Confirm Password', type: 'password' },
]
