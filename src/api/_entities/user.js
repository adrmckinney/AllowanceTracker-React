const User = userData => {
  const addChoreFlag = userData => {
    return userData?.chores?.map(chore => {
      return { ...chore, _type: 'chore' }
    })
  }

  const addTransactionFlag = userData => {
    return userData?.transactions?.map(transaction => {
      return { ...transaction, _type: 'transaction' }
    })
  }

  return {
    ...userData,
    chores: addChoreFlag(userData),
    transactions: addTransactionFlag(userData),
  }
}

export default User
