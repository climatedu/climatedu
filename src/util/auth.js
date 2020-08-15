import React, { useEffect, useContext, useState } from 'react'
import firebaseAuth from './firebase-auth'

const AuthContext = React.createContext()
const auth = firebaseAuth()

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(auth.currentUser)
  useEffect(() => auth.onAuthStateChanged(user => setUser(user)), [])
  return (
    <AuthContext.Provider value={user}>
      {children}
    </AuthContext.Provider>
  )
}

export default () => useContext(AuthContext)
export { AuthProvider }
