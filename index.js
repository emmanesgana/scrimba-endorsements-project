//import database from firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, get, onValue, ref, push } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

//create a var for realtime database url
const appSettings = {
    databaseURL: "https://playground-6c6ea-default-rtdb.asia-southeast1.firebasedatabase.app/"
}

//create a var to initialize firebase realtime db
const app = initializeApp(appSettings)
//create a var to assign app to getDatabase
const database = getDatabase(app)
//create a var to create a table dont forget to create a db called endorsementList!
const endorsementListInDB = ref(database, "endorsementList")

//creat a var and assign the elements from html
const textEl = document.getElementById("text-el")
const buttonEl = document.getElementById("button-el")
const endoresementListEl = document.getElementById("ul-el")

//create an eventListener for button clicks
buttonEl.addEventListener("click", function() {
    //create a variable that gets the text area's value
    let textElValue = textEl.value
    //call push to add the textElValue element to the endorsementListInDB
    push(endorsementListInDB, textElValue)
    clearTetxtEl()
})

//create onValue to check if the database is empty or not
onValue(endorsementListInDB, function(snapshot) {
    //create a condition to check if there are items in the db
    if (snapshot.exists()) {
        let itemsArray = Object.entries(snapshot.val())
    
        clearEndorsementListEl()

        for (let i = 0; i < itemsArray.length; i++) {
            let currentItem = itemsArray[i]
            let currentItemID = currentItem[0]
            let currentItemValue = currentItem[1]
            
            prependEndorsementToList(currentItem)
        }    
    } else {
        endoresementListEl.innerHTML = "We'd love to here from you!"
    }
})

//create a function to clear inner html
function clearEndorsementListEl() {
    endoresementListEl.innerHTML = ""
}

function clearTetxtEl() {
    textEl.innerHTML = ""
}

function prependEndorsementToList(endorsement) {
    let endorsementID = endorsement[0]
    let endorsementValue = endorsement[1]

    let newEndorsement = document.createElement("li")
    newEndorsement.textContent = endorsementValue

    endoresementListEl.prepend(newEndorsement)
}