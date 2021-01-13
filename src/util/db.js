import { useEffect, useState } from 'react'
import { navigate } from 'gatsby'
import useFirebase from '../firebase'
import { toast } from 'react-toastify'

const firebaseApp = useFirebase()

const useAuth = authRequired => {
  const [user, setUser] = useState(null)
  const [account, setAccount] = useState(null)
  const [classroom, setClassroom] = useState(null)
  useEffect(() => {
    if (!firebaseApp) return
    if (authRequired) {
      return firebaseApp.auth().onAuthStateChanged(auth => {
        if (auth === null) navigate('/')
        setUser(auth)
        firebaseApp.firestore().collection("accounts").doc(auth.uid).onSnapshot(function (a) {
          setAccount(a.data())
          a = a.data()
          if (a && a.class) {
            setTimeout(() => firebaseApp.firestore().collection("classes").doc(a.class).get().then(function (c) {
              setClassroom(c.data())
            }), 100)
          } else {
            setClassroom(null)
          }
        })
      })
    }
    return firebaseApp.auth().onAuthStateChanged(setUser)
  }, [firebaseApp, authRequired])
  return {user, account, classroom}
}

function joinClass (user, classCode) {
  return firebaseApp.firestore().collection("accounts").doc(user.uid).update({class: classCode})
}


function leaveFeedback (user, feedback){
  return firebaseApp.firestore().collection("feedback").add({
    uid: user.uid,
    feedback: feedback,
    name: user.displayName,
    email: user.email,
  })
}



export default {useAuth, joinClass, leaveFeedback}
