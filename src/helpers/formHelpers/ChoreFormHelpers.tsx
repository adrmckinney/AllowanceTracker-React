import { ChoreCreationInputFieldTypes } from '../../types/ChoreInputType'

export const choreCreationInputFields: ChoreCreationInputFieldTypes[] = [
  { name: 'name', label: 'Chore Name', type: 'text' },
  { name: 'description', label: 'Description', type: 'text' },
  {
    name: 'cost',
    label: 'Cost',
    type: 'text',
    icon: 'dollar',
    iconSize: 'lg',
    iconColor: 'text-green-800',
    placeHolder: '100.00',
  },
]
