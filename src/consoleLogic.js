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

let loggedInPlayer = null;
let localGameInfo = {};
let lastSaved

firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    firebase.firestore().collection("handles").where("uid","==", user.uid).get()
      .then(function(qs) {
        loggedInPlayer = {uid:user.uid, handle:qs.docs[0].id};
        console.log("loggedInPlayer:  ", loggedInPlayer)
      })
      .catch(function(error) {alert("new logged in handle failed"), console.log("gethandleserror new login") });
  } else {console.log("signedout"); loggedInPlayer = null}
});



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
  console.log("loggedInPlayer:  ", loggedInPlayer)
  let ans = prompt(`Current Game Name: ${state.gameName}
    1. New Game,
    2. Local Saves (load and save),
    3: Network Saves (load and save),
    4: Cheat / Debug
    5: Show Trails,
    6: Login
    7: Logout
    8: SignUp`, num);

  if(ans === "1"){
    setupGameViaPrompt()
  }
  if(ans === "2"){
    let saveLoad = prompt("Load or Save\n 1: Load\n 2: Save", "1")
    if(saveLoad === "1") {load(prompt("Type Save Name: (or 'a' for autoSave or 'clear')\n" + JSON.parse(localStorage.getItem("#savenames"))))}
    if(saveLoad === "2") saveAs(prompt("Type Save Name", state.gameName))
  }
  if(ans === "3"){
    let saveLoad = prompt("Load or Save\n 1: Load\n 2: Save", "1")
    if(saveLoad === "1") {getServerData()}
    else if(saveLoad === "2") {saveToServer()}
  }
  if(ans === "4"){
    let cheat = prompt("How do you want to cheat\n 1: Money\n 2: Tech\n 3: View and debug", "1")
    if(cheat === "1"){
      state.playerData[state.playerTurn].money = 99;
    }
    if(cheat === "2"){
      data.techs.forEach(t => { state.playerData[state.playerTurn].tech[t.tech] = true; })
    }
    if(ans === "3"){    debug = !debug;  }
  }
  if(ans === "5"){  screenSettings.showTrails = !screenSettings.showTrails;  }
  if(ans === "6"){  console.log("login"); loginViaPrompt()    }
  if(ans === "7"){  console.log("logout"); firebase.auth().signOut()  }
  if(ans === "8"){ console.log("signup"); signupViaPrompt() }
  if(ans === "9"){ console.log(checkForUpdatedServerGame()) }
    if(ans === "0"){
      console.log("lastSaved  localGameInfo");
       console.log(lastSaved)
       console.log(localGameInfo)
      }
  drawScreen();
}


async function setupGameViaPrompt(){
  let ans7 = prompt("Multiplayer Game y/n", "y")
  if(ans7 === "n"){  state = setupStateViaPrompt({online: false});}
  if(ans7 === "y") {
    if (loggedInPlayer){ // firebase.auth().currentUser){
      state = await setupStateViaPrompt(await setupMetaViaPrompt());
      localGameInfo = setlocalGameInfo();
    }
    else {
      console.log("not logged in");
      loginViaPrompt()
    }
  }
  drawScreen();
}



async function setupMetaViaPrompt(){
  let meta = {online:true, playergrid: []}
  let handleList =  await getHandleList()
  let additionalPlayergrid =  await getAdditionalPlayers(handleList, [loggedInPlayer.uid, loggedInPlayer.handle])
  meta.playergrid = additionalPlayergrid //meta.playergrid.concat(additionalPlayergrid)
  return meta
}

async function setupStateViaPrompt(meta){
  console.log("after");
  let ans2 = Math.min(Number(prompt("Number of players (Max 6)", 4)),6);
  //  let ans3 = Number(prompt("Number of Humans ", 2));
  let numHumans = meta.playergrid.length;
  let ans4 = Number(prompt("Size of Board ", 8));
  let ans5 = prompt("Allied Humans y/n", "n")
  let ans6 = prompt("Game Name", randomName())
  let together = false;
  if (ans5 === "y") together = true;

  console.log("2 in setup state ViaPrompt", await meta);
  let tempState = setup(ans2, ans4, numHumans, together, ans6, generateID(20), await meta);
  console.log("2.1 in setupGameViaPrompt", tempState);
  return tempState;
}

async function getHandleList(){
  return await firebase.firestore().collection("handles").get()
    .then(function(qs) {
      let handles = [];
      qs.forEach((doc) => { handles.push([handles.length, doc.id, doc.data().uid]) })
      return handles;
    })
    .catch(function(error) {alert("handlelisterror"); console.log("gethandleserror"); return "fail getHandleList" });
}

function getAdditionalPlayers(handleList, startingList){
  let additionalPlayergrid = [startingList];
  let finishedAddingPlayers = false;
  while(!finishedAddingPlayers){
    let ans = prompt(JSON.stringify( handleList), "Press cancel to stop adding")
    if (ans === null) finishedAddingPlayers = true
    else {
      let newEntry = [handleList[Number(ans)][2], handleList[Number(ans)][1]]
      if(additionalPlayergrid.findIndex(x => JSON.stringify(x) === JSON.stringify(newEntry)) === -1) {
        additionalPlayergrid.push(newEntry)
      }
    }
  }
  return additionalPlayergrid
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
      if(qs.exists)alert("handle taken  " + handle) ;
      else(handleSignUp(email, pass, handle))
    })
    .catch(function(error) {alert("please try again gethandleserror"), console.log("gethandleserror") });
}

function setDocData(){
  let docData =  {
    name: state.gameName,
    users: [firebase.auth().currentUser.uid,],
    turnNumber:state.turnNumber,
    playerTurn:state.playerTurn,
    when:getTimestamp(),
  }
  console.log("online  ", state.meta.online);
  if (state.meta.online){
    state.meta.playergrid.forEach((arr) => {
      if(docData.users.indexOf(arr[0]) === -1){
        console.log(" 6 playergrid2", docData.users,  );
        docData.users.push(arr[0])
      }
    });
  }
  return docData
}

function saveToServer(){  // Check order (make async await?)
  console.log("5 SavingTOServer", state.gameID);
  firebase.firestore().collection("gamestest").doc(state.gameID).set( setDocData() )
    .then(function(docRef) {
      console.log("7 Document written : ", state.gameID);
      lastSaved = {id:state.gameID, turnNumber:state.turnNumber, playerTurn:state.playerTurn,}
    })
    .catch(function(error) {console.error("Error adding document: ", error)  });

  firebase.firestore().collection("gamestest").doc(state.gameID).collection("state")
    .doc("current")
    .set({currentGame: packState()})
  //  .then(function(docRef) {console.log("State  with ID: ")})
    .catch(function(error) {console.error("Error adding STate: ", error)  });
}

function checkForUpdatedServerGame(gameID = state.gameID){
  return firebase.firestore().collection("gamestest").doc(gameID).get()
    .then(function(doc) {
      if (doc.data()){
        let {name, users, turnNumber, playerTurn, when} = doc.data()

        if(lastSaved.turnNumber <= turnNumber || lastSaved.playerTurn <=  playerTurn){
          console.log("new game on server")
        }

    //    if(turnNumber >= localGameInfo )
      }
    })
}

function getServerData(){
  var index = 0;
  var IDArray = [];
  firebase.firestore().collection("gamestest").where("users", "array-contains", firebase.auth().currentUser.uid)
    .get()
    .then(function(querySnapshot) {
      let promptText = "select the number for your Game:  ";
      querySnapshot.forEach(function(doc) {
        let {name, users, turnNumber, playerTurn, when} = doc.data()
        promptText =  promptText + index + " => " + " Name: "+ name + " turn: "+ playerTurn + "\n";
        index += 1;
        IDArray.push(doc.id)
      });
      console.log(IDArray);
      const gameID = IDArray[Number(prompt(promptText))]
      firebase.firestore().collection("gamestest").doc(gameID).collection("state").doc("current").get()
        .then(function(qs) {
          state = unpackState(JSON.parse(qs.data().currentGame));
          localGameInfo = setlocalGameInfo()
          drawScreen();
        });
    })
    .catch(function(error) { console.log("Error getting documents: ", error); });
}

function setlocalGameInfo(){
  let players = state.meta.playergrid
  console.log(state);
  console.log(players);
  let uidlist = players.map((a) => a[0])
  console.log(uidlist);
  let player = uidlist.indexOf(loggedInPlayer.uid)
  console.log(player);
  return {player:player}
}


// DB methods ------------------------------------------

function generateID(length){
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let autoId = '';
  for (let i = 0; i < length; i++) {
    autoId += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  //  console.log(autoId);
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
