import { useEffect, useState } from 'react'
import { navigate } from 'gatsby'
import useFirebase from '../firebase'

const useAuth = authRequired => {
  const firebaseApp = useFirebase()
  const [user, setUser] = useState(null)
  useEffect(() => {
    if (!firebaseApp) return
    if (authRequired) {
      return firebaseApp.auth().onAuthStateChanged(auth => {
        if (auth === null) navigate('/')
        setUser(auth)
      })
    }
    return firebaseApp.auth().onAuthStateChanged(setUser)
  }, [firebaseApp, authRequired])
  return user
}

export default useAuth
