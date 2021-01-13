config = {
    apiKey: 'AIzaSyBY049RvUmDowbIygkFiJfhj17e6-XCy8o',
    authDomain: 'climatedu-957b7.firebaseapp.com',
    databaseURL: 'https://climatedu-957b7.firebaseio.com',
    messagingSenderId: '162049068533',
    projectId: 'climatedu-957b7',
    storageBucket: 'climatedu-957b7.appspot.com',
}


firebase.initializeApp(config)

db = firebase.firestore()

currentUser = firebase.auth().currentUser

savedResponses = {}

function editedResponse(element) {
    savedResponses[element] = false
}

async function updateResponse(element){
    if(!currentUser) return
    unit = element.dataset.unit
    key = element.dataset.key
    data = element.value
    await db.collection("accounts").doc(currentUser.uid).collection("responses").doc(unit).set({[key]:data}, {merge:true})
    savedResponses[element] = true
}

function loadAllResponses() {
    let example = document.querySelector("textarea")
    db.collection("accounts").doc(currentUser.uid).collection("responses").doc(example.dataset.unit).get().then((e) => {
        for (const [key, value] of Object.entries(e.data())) {
            document.getElementById(example.dataset.unit + "." + key.toString()).textContent = value
        }
    })
}

firebase.auth().onAuthStateChanged(auth => {
    currentUser = auth

    loadAllResponses()
})

window.addEventListener("beforeunload", function (e) {
    if (savedResponses[document.activeElement] === false) {
        setTimeout(function () {
            updateResponse(document.activeElement)
        }, 0)
        e.returnValue ='You have unsaved changes. Are you sure you want to exit?'
        return e.returnValue
    }
})
