import { UserType } from '../types/UserType'

export const fakeUser: UserType = {
  id: 4,
  family_id: 1,
  name: 'Olivia McKinney',
  username: 'olivia_mck',
  email: 'olivia@email.com',
  wallet: 94802,
  number: '(555) 222-1234',
  date_of_birth: new Date(),
  permission: 4,
  image: '',
  thumbnail: '',
  chores: {
    choresCount: 6,
    totalChoresIncome: 1000,
    inProgressChoresCount: 2,
    pendingChoresCount: 2,
    rejectedChoresCount: 1,
    completedChoresCount: 2,
  },
  transactions: {
    totalDebit: 0,
    totalCredit: 54802,
  },
  created_at: '2006-20-02',
}
