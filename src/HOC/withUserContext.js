import { createContext, useContext, useState } from 'react'

const UserStateContext = createContext()
const SetUserStateContext = createContext()

export const useUserContext = validate => {
  const authUser = useContext(UserStateContext)
  const setAuthUser = useContext(SetUserStateContext)

  return {
    authUser,
    setAuthUser,
  }
}

export const withUserContext =
  Component =>
  ({ ...rest }) => {
    const [authUser, setAuthUser] = useState(null)
    console.log('authUser', authUser)

    return (
      <UserStateContext.Provider value={authUser}>
        <SetUserStateContext.Provider value={setAuthUser}>
          <Component {...rest} />
        </SetUserStateContext.Provider>
      </UserStateContext.Provider>
    )
  }
