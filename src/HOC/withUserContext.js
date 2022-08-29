import { createContext, useContext, useEffect, useState } from 'react'

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
    const storedAuthUser = localStorage.getItem('authUser')
    console.log('storedAuthUser', storedAuthUser)
    // I think this works but the getUser doesn't work on refresh
    // check if token is being passed
    const [authUser, setAuthUser] = useState(null)
    console.log('authUser', authUser)

    useEffect(() => {
      if (storedAuthUser !== null) {
        setAuthUser(JSON.parse(storedAuthUser))
      } else if (!!authUser) {
        localStorage.setItem('authUser', JSON.stringify(authUser))
      }
    }, [])
    return (
      <UserStateContext.Provider value={authUser}>
        <SetUserStateContext.Provider value={setAuthUser}>
          <Component {...rest} />
        </SetUserStateContext.Provider>
      </UserStateContext.Provider>
    )
  }
