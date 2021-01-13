const config = {
    apiKey: 'AIzaSyBY049RvUmDowbIygkFiJfhj17e6-XCy8o',
    authDomain: 'climatedu-957b7.firebaseapp.com',
    databaseURL: 'https://climatedu-957b7.firebaseio.com',
    messagingSenderId: '162049068533',
    projectId: 'climatedu-957b7',
    storageBucket: 'climatedu-957b7.appspot.com',
}


firebase.initializeApp(config)

var db = firebase.firestore()

var currentUser = firebase.auth().currentUser




function updateResponse(element){
    if(!currentUser) return
    unit = element.dataset.unit
    key = element.dataset.key
    data = element.value
    db.collection("accounts").doc(currentUser.uid).collection("responses").doc(unit).set({[key]:data}, {merge:true})
}


function saveAllResponses(){
    console.log("saved all")
}



function loadAllResponses() {
    var example = document.querySelector("textarea")
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



console.log("good")
//updateResponse("1", "2", "A")