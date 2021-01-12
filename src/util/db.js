import { useEffect, useState } from 'react'
import { navigate } from 'gatsby'
import useFirebase from '../firebase'

const firebaseApp = useFirebase()

const useAuth = authRequired => {
  const [user, setUser] = useState(null)
  const [account, setAccount] = useState(null)
  useEffect(() => {
    if (!firebaseApp) return
    if (authRequired) {
      return firebaseApp.auth().onAuthStateChanged(auth => {
        if (auth === null) navigate('/')
        setUser(auth)
        firebaseApp.firestore().collection("accounts").doc(auth.uid).onSnapshot(function (account) {
          setAccount(account.data())
        })
      })
    }
    return firebaseApp.auth().onAuthStateChanged(setUser)
  }, [firebaseApp, authRequired])
  return {user, account}
}

function joinClass (user, classCode) {
  return firebaseApp.firestore().collection("accounts").doc(user.uid).update({class: classCode})
}

export default {useAuth, joinClass}
