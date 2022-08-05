// @flow
import { lazy } from 'react'
import ConfigTools from '../configs/ConfigTools'

export default ConfigTools({
  App: {
    title: '',
    path: '/',
    component: lazy(() => import('../App')),
    permissions: [],
  },
  TransactionsPage: {
    title: 'Transactions',
    path: '/transactions',
    component: lazy(() => import('../Pages/TransactionsPage')),
    featureKey: 'product_requests',
    permissions: ['curemint-developer', 'curemint-admin', 'organization-admin'],
  },
  ChoresPage: {
    title: 'Chores',
    path: '/chores',
    component: lazy(() => import('../Pages/ChoresPage')),
    permissions: ['curemint-developer', 'curemint-admin', 'organization-admin'],
  },
})
