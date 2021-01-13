import { useEffect, useState } from 'react'
import { navigate } from 'gatsby'
import useFirebase from '../firebase'
import { toast } from 'react-toastify'

const firebaseApp = useFirebase()

const useAuth = authRequired => {
  const [user, setUser] = useState(null)
  const [account, setAccount] = useState(null)
  const [classroom, setClassroom] = useState(null)
  const [students, setStudents] = useState(null)
  useEffect(() => {
    if (!firebaseApp) return
    if (authRequired) {
      return firebaseApp.auth().onAuthStateChanged(auth => {
        if (auth === null) navigate('/')
        setUser(auth)
        firebaseApp.firestore().collection("accounts").doc(auth.uid).onSnapshot(function (a) {
          setAccount({id: a.id, ...a.data()})
          a = a.data()
          if (a && a.class) {
            setTimeout(() => firebaseApp.firestore().collection("classes").doc(a.class).get().then(function (c) {
              setClassroom({code: c.id, ...c.data()})
              firebaseApp.firestore().collection("accounts").where("class", "==", c.id).where("teacher", "==", auth.uid).where("type", "==", "Student").onSnapshot(function (s) {
                let stu = []
                s.forEach(d => stu.push({id: d.id, ...d.data()}))
                setStudents(stu)
              })
            }), 100)
          } else {
            setClassroom(null)
          }
        })
      })
    }
    return firebaseApp.auth().onAuthStateChanged(setUser)
  }, [firebaseApp, authRequired])
  return {user, account, classroom, students}
}

function joinClass (user, classCode) {
  return firebaseApp.firestore().collection("classes").doc(classCode).get().then((result) => firebaseApp.firestore().collection("accounts").doc(user.uid).update({class: classCode, teacher: result.data().owner}))
}


function leaveFeedback (user, feedback){
  return firebaseApp.firestore().collection("feedback").add({
    uid: user.uid,
    feedback: feedback,
    name: user.displayName,
    email: user.email,
  })
}

function createClass(user, title, code) {
  return firebaseApp.firestore().collection("classes").doc(code).set({title, owner: user.uid})
}

function useResponses(uid, unit) {
  const [responses, setResponses] = useState(null)
  useEffect(() => {
    if (!firebaseApp) return
    let unsubscribe = firebaseApp.firestore().collection('accounts').doc(uid).collection('responses').doc(unit.toString()).onSnapshot(function (r) {
      setResponses(r.data())
    })
    return ()=>unsubscribe()
  }, [firebaseApp, uid, unit])
  return responses
}

function teacherFeedback(uid, unit, key, feedback) {
  return firebaseApp.firestore().collection('accounts').doc(uid).collection('responses').doc(unit.toString()).update({['feedback.'+key]: feedback})
}

export default {useAuth, joinClass, leaveFeedback, createClass, useResponses, teacherFeedback}
