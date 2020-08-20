import { useEffect, useState } from 'react'
import useFirebase from '../firebase/useFirebase'

const useAuth = () => {
  const firebaseApp = useFirebase()
  const [user, setUser] = useState(null)
  useEffect(() => {
    if (!firebaseApp) return
    return firebaseApp.auth().onAuthStateChanged(setUser)
  }, [firebaseApp])
  return user
}

export default useAuth
