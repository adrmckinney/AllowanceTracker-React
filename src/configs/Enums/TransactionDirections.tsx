import ConfigTools from '../ConfigTools'

export default ConfigTools({
  credit: {
    value: 1,
    name: 'Credit', // sender perspective
    displayName: 'Withdraw', // receiver perspective
    color: 'text-gray-900',
  },
  debit: {
    value: 2,
    name: 'Debit', // sender perspective
    displayName: 'Deposit', // receiver perspective
    color: 'text-green-800',
  },
})
