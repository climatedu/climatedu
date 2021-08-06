/* eslint-disable */
const config = {
  apiKey: 'AIzaSyBY049RvUmDowbIygkFiJfhj17e6-XCy8o',
  authDomain: 'climatedu-957b7.firebaseapp.com',
  databaseURL: 'https://climatedu-957b7.firebaseio.com',
  messagingSenderId: '162049068533',
  projectId: 'climatedu-957b7',
  storageBucket: 'climatedu-957b7.appspot.com',
}

firebase.initializeApp(config)

const db = firebase.firestore()

let currentUser = firebase.auth().currentUser

let savedResponses = {}

function editedResponse(element) {
  key = element.dataset.key
  savedResponses[key] = false
}

async function updateResponse(element) {
  if (!currentUser) return
  unit = element.dataset.unit
  key = element.dataset.key
  data = element.value
  await db
    .collection('accounts')
    .doc(currentUser.uid)
    .collection('responses')
    .doc(unit)
    .set({ [key]: data }, { merge: true })
  if (data == '') {
    savedResponses[key] = false
  } else {
    savedResponses[key] = true
  }
}

function loadAllResponses() {
  const example = document.querySelector('textarea')
  if(currentUser === null){
    window.location.href = '/login'
    return
  }

  db.collection('accounts')
    .doc(currentUser.uid)
    .collection('responses')
    .doc(example.dataset.unit)
    .get()
    .then(e => {
      for (const [key, value] of Object.entries(e.data())) {
        document.getElementById(
          example.dataset.unit + '.' + key.toString()
        ).textContent = value
      }
    })
}

firebase.auth().onAuthStateChanged(auth => {
  currentUser = auth

  loadAllResponses()
})

window.addEventListener('beforeunload', function (e) {
  if (savedResponses[document.activeElement.dataset.key] === false) {
    updateResponse(document.activeElement)
    e.returnValue = 'You have unsaved changes. Are you sure you want to exit?'
    return e.returnValue
  }
})
