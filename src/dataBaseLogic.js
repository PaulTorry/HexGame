

/*global
state:true
drawScreen,
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
      .catch(function(error) {alert("new logged in handle failed"), console.log("gethandleserror new login",error) });
  } else {console.log("signedout"); loggedInPlayer = null}
});

async function getHandleList(){
  return await firebase.firestore().collection("handles").get()
    .then(function(qs) {
      let handles = [];
      qs.forEach((doc) => { handles.push([handles.length, doc.id, doc.data().uid]) })
      return handles;
    })
    .catch(function(error) {alert("handlelisterror"); console.log("gethandleserror"); return "fail getHandleList" });
}

async function refresh(){
     getHandleList

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
        console.log(additionalPlayergrid);
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
    //    console.log(" 6 playergrid2", docData.users,  );
        docData.users.push(arr[0])
      }
    });
  }
  console.log(docData);
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
