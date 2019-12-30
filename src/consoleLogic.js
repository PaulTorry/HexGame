"use strict"

/*global
Hex, Map
state:true
drawScreen,
debug:true,
interactiveConsole,
setup
data,
screenSettings,
randomInt, sessionInfo,
firebase
*/

/* eslint-disable no-unused-vars */


var firebaseConfig = {
  apiKey: "AIzaSyDJrv9vt4GjKZQdVoSjaRpWFO2wuwd4TUY",
  authDomain: "test-23d30.firebaseapp.com",
  databaseURL: "https://test-23d30.firebaseio.com",
  projectId: "test-23d30",
  storageBucket: "test-23d30.appspot.com",
  messagingSenderId: "1074984974506",
  appId: "1:1074984974506:web:ab9e25568dfdc0ae9478d3",
  measurementId: "G-XWBNW49NG4"
};
firebase.initializeApp(firebaseConfig);




function randomName(){
  let names = [
    ["Sol","Sirius", "Vega", "Cassiopeia", "Leo", "Taurus" ],
    ["Mercury","Venus","Earth","Mars","Jupiter","Saturn","Neptune"],
    ["Io", "Europa", "Titan", "Ganymede","Calisto"],
  ]
  return names[0][randomInt(names[0].length)] + names[1][randomInt(names[1].length)] + names[2][randomInt(names[2].length)]
}

function interactiveConsole (num = ""){
  console.log(num);
  let ans = prompt(`Current Game Name: ${state.gameName}
    1. New Game,
    2. Local Saves (load and save),
    3: Network Saves (load and save),
    4: Cheat,
    5: Toggle Debug,
    6: Show Trails,
    7: Login
    8: Logout
    9: SignUp`, num);

  if(ans === "1"){
    if (prompt("Are you sure y/n","y")==="y"){
      let ans7 = prompt("Multiplayer Game y/n", "n")
      if(ans7 === "n"){      setupGameViaPrompt();}
      if(ans7 === "y") {
        if (firebase.auth().currentUser){
          setupGameViaPrompt(); saveToServer();
        }
        else {
          console.log("not logged in");
          loginViaPrompt()
        }
      }
    }
  }

  if(ans === "2"){
    let saveLoad = prompt("Load or Save\n 1: Load\n 2: Save", "1")
    if(saveLoad === "1") {load(prompt("Type Save Name: (or 'a' for autoSave or 'clear')\n" + JSON.parse(localStorage.getItem("#savenames"))))}
    if(saveLoad === "2") saveAs(prompt("Type Save Name", state.gameName))
  }
  if(ans === "3"){
    saveToServer()

    // if(firebase.auth().currentUser == null){console.log("please log in to load or save");}
    // else if(sessionInfo.currentGame){


  }
  if(ans === "4"){
    let cheat = prompt("How do you want to cheat\n 1: Money\n 2: Tech", "1")
    if(cheat === "1"){
      console.log("Cheating Money");
      state.playerData[state.playerTurn].money = 99;
    }
    if(cheat === "2"){
      console.log("Cheating Tech");
      data.techs.forEach(t => {
        state.playerData[state.playerTurn].tech[t.tech] = true;
      })
    }
  }
  if(ans === "5"){
    debug = !debug;
  }
  if(ans === "6"){
    screenSettings.showTrails = !screenSettings.showTrails;
  }
  if(ans === "7"){  console.log("login"); loginViaPrompt()    }
  if(ans === "8"){  console.log("logout"); firebase.auth().signOut()  }
  if(ans === "9"){ console.log("signup"); signupViaPrompt() }
  if(ans === "0"){getServerData()}
  drawScreen();
}



function setupGameViaPrompt(){
  let ans2 = Math.min(Number(prompt("Number of players (Max 6)", 4)),6);
  let ans3 = Number(prompt("Number of Humans ", 2));
  let ans4 = Number(prompt("Size of Board ", 8));
  let ans5 = prompt("Allied Humans y/n", "n")
  let ans6 = prompt("Game Name", randomName())
  if(ans5 === "y") state = setup(ans2, ans4, ans3, true, ans6, generateID(20));
  if(ans5 === "n") state = setup(ans2, ans4, ans3, false, ans6, generateID(20));
}

function loginViaPrompt(){
  let email = prompt("email", localStorage.getItem("lastname") || "MyEmail");
  localStorage.setItem("lastname", email)
  let pass = prompt("Password", "MyPassword");
  handleSignIn(email,pass);
}

function signupViaPrompt(){
  let email = prompt("email", "MyEmail");
  let pass = prompt("Password", "MyPassword");
  let handle = prompt("In Game Handle", "My Prefered Username");

  firebase.firestore().collection("handles").doc(handle).get()
    .then(function(qs) {
      console.log(qs);
      console.log(qs.size);
      console.log(qs.exists);
      if(qs.exists)alert("handle taken  " + handle) ;
      else(handleSignUp(email, pass, handle))
    })
    .catch(function(error) {alert("please try again gethandleserror"), console.log("gethandleserror") });
}

function saveToServer(){
  console.log("SavingTOServer", state.gameID);
  firebase.firestore().collection("gamestest").doc(state.gameID).set(
    {
      name: state.gameName,
      users: [firebase.auth().currentUser.uid,],
      turnNumber:state.turnNumber,
      playerTurn:state.playerTurn,
      when:getTimestamp(),
    //  currentGame: packState(),
    }
  )
    .then(function(docRef) {console.log("Document written : ")})
    .catch(function(error) {console.error("Error adding document: ", error)  });

  firebase.firestore().collection("gamestest").doc(state.gameID).collection("state")
    .doc("current")
    .set({currentGame: packState()})
    .then(function(docRef) {console.log("State  with ID: ")})
    .catch(function(error) {console.error("Error adding STate: ", error)  });
}


function getServerData(){
  var index = 0;
  var IDArray = [];
  firebase.firestore().collection("gamestest").where("users", "array-contains", firebase.auth().currentUser.uid)
    .get()
    .then(function(querySnapshot) {
      let promptText = "hi ";
      console.log(querySnapshot);
      console.log(querySnapshot.empty);
      querySnapshot.forEach(function(doc) {
        let {name, users, turnNumber, playerTurn, when} = doc.data()
        promptText =  promptText + index + " => " + " Name: "+ name + " turn: "+ playerTurn + "\n";
        index += 1;
        IDArray.push(doc.id)
      });
      //prompt(promptText)
      console.log(promptText);
      console.log(IDArray);
      loadGameFromID(IDArray[Number(prompt(promptText))])


    })
    .catch(function(error) { console.log("Error getting documents: ", error); });
}



function loadGameFromID(gameID){
  console.log(gameID);
  firebase.firestore().collection("gamestest").doc(gameID).collection("state").doc("current").get()
    .then(function(qs) {replaceState(qs.data())});

}
function replaceState(serverData){
  state = unpackState(JSON.parse(serverData.currentGame));
  drawScreen();
}

function getServerLoad(serverData){

  firebase.firestore().collection("gamestest").doc(state.gameID)



  console.log("saveData", serverData);
  let gamelist = serverData.rows.map(r => r.name)
  console.log("gamelist", gamelist);
  let response = prompt(
    "Type the number for the savegame you want to load" +
    gamelist.reduce( (a,c,i)  => { if(c){return" \n "+ (i+1) +  " " + c + a} else{return a}}," ")
  )
  if(Number(response)/Number(response) !== 1){console.log("Type a Number in the prompt");}
  let gameStateObj = serverData.rows[Number(response) - 1]
  console.log(gameStateObj);



  sessionInfo.currentGame = gameStateObj.id;
  state = unpackState(JSON.parse(gameStateObj.currentGame));

  drawScreen();
}



// DB methods ------------------------------------------

function generateID(length){
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let autoId = '';
  for (let i = 0; i < length; i++) {
    autoId += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  console.log(autoId);
  return autoId;
}

function handleSignIn(email, password) {
  firebase.auth().signInWithEmailAndPassword(email, password).
    catch(function(error) { alert(error.message); console.log(error);});
}

function handleSignUp(email, password, handle) {

  firebase.auth().createUserWithEmailAndPassword(email, password)
    .then(function(docRef) {
      console.log("User Createdp.... ");
      firebase.firestore().collection("handles").doc(handle)
        .set({uid: firebase.auth().currentUser.uid})
        .catch(function(error) { console.error("Error adding handle: ", error)  })
    })
    .catch(function(error) { alert(error.message); console.log("creation error", error);});
}

function toggleSignIn() {
  if (firebase.auth().currentUser) { firebase.auth().signOut();}
  else {handleSignIn()}
}

function sendResetEmail(email) {
  firebase.auth().sendPasswordResetEmail(email).
    then(function() { alert('Password Reset Email Sent!');}).
    catch(function(error) {    alert(error.message);   console.log(error);  });
}

firebase.auth().onAuthStateChanged(function(user) {
  if (user) {console.log(user)} else {console.log("signedout")}
});


// Helpers

function getTimestamp(){
  let d = new Date();
  return `${d.getMonth()}-${d.getDate()}:${d.getHours()}:${d.getMinutes()}`;
}

function getTurnstamp(){
  return `T:${state.turnNumber}-P:${state.playerTurn}`;
}

function packState(){
  let savestate = state.clone();
  savestate.tiles = [...state.tiles]
  return JSON.stringify(savestate);
}

function unpackState(newState){
  newState.tiles = new Map(newState.tiles);
  newState.shipArray = newState.shipArray.map(x => {
    x.hex = Hex.getFromPQR(x.hex);
    return x;
  })

  newState.baseArray = newState.baseArray.map(x => {
    x.hex = Hex.getFromPQR(x.hex);
    x.territory = x.territory.map(Hex.getFromPQR)
    return x;
  })

  console.log(newState.tiles);
  for (let [k,v] of newState.tiles){
    v.hex = Hex.getFromPQR(v.hex);
    newState.tiles.set(k,v)
  }
  return newState;
}

// Local Save Logic

function autoSave(){
  console.log("autosaving");
  saveAs("autoSave");
}

function saveAs(savename = "quicksave"){
  if (savename === "") savename = "autoSave";
  let savenames = JSON.parse(localStorage.getItem("#savenames")) || [];
  if (!savenames.length) savenames = [];
  let saveString = packState();
  if (savename !== "autoSave") console.log(saveString);
  localStorage.setItem(savename, saveString);
  if (savenames.indexOf(savename) === -1) savenames.push(savename);
  localStorage.setItem("#savenames", JSON.stringify(savenames));
}

function load(savename = "quicksave"){
  if (savename === "a") {savename = "autoSave"; console.log("auto");}
  if (savename === "clear"){localStorage.setItem("#savenames", JSON.stringify([]))}
  else{
    let newState = JSON.parse(localStorage.getItem(savename));
    console.log(newState);
    state = unpackState(newState);
  }
}
