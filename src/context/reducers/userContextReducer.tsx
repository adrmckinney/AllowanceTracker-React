import { UserType } from '../../types/UserType'

export type UserContextType = {
  user: UserType
  isLoading: boolean
}

export const userContextInitialValues: UserContextType = {
  user: {
    id: null,
    family_id: null,
    name: '',
    email: '',
    username: '',
    permission: null,
    thumbnail: '',
    created_at: '',
    wallet: null,
    number: '',
    date_of_birth: null,
    chores: {
      choresCount: null,
      totalChoresIncome: null,
      inProgressChoresCount: null,
      pendingChoresCount: null,
      rejectedChoresCount: null,
      completedChoresCount: null,
    },
    transactions: {
      totalDebit: null,
      totalCredit: null,
    },
    image: '',
  },
  isLoading: true,
}

const userContextReducer = (state: UserContextType, action) => {
  switch (action?.type) {
    case 'something':
      return null
  }
}

export default userContextReducer
