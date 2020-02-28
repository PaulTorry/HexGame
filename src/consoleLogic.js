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
    if(cheat === "3"){       debug = !debug;  }
  }
  if(ans === "5"){ screenSettings.showTrails = !screenSettings.showTrails;  }
  if(ans === "6"){ console.log("login"); loginViaPrompt()    }
  if(ans === "7"){ console.log("logout"); firebase.auth().signOut()  }
  if(ans === "8"){ console.log("signup"); signupViaPrompt() }
  if(ans === "9"){ console.log(checkForUpdatedServerGame()) }
  if(ans === "0"){
    console.log("state.playerData",state.playerData);
    console.log(menuData.OfflinePlayers.filter(x => x.PlayerType === "Human"));
  //  console.log(getGameParamsViaPrompt());
  //  console.log("lastSaved  localGameInfo", lastSaved, localGameInfo);
  }
  drawScreen();
}


function quickSetup(){
  let config =  {numPlayers: 4, boardSize: 8, numHumans: 2, playersTogether:false}
  config.gameName = randomName();

  state = setupNew( config, {online: false})
}


async function setupGameViaPrompt(){
  let ans7 = prompt("Multiplayer Game y/n", "y")
  if(ans7 === "n"){
    state = setupNew(getGameParamsViaPrompt(false, ), {online: false})

  }
  if(ans7 === "y") {
    if (loggedInPlayer){ // firebase.auth().currentUser){
      let meta = await setupMetaViaPrompt()
      console.log("meta",meta);
      //  state = await setupStateViaPrompt(tempMeta);
      let players;
      if (meta.playergrid) players = meta.playergrid.length;
      state = setupNew(getGameParamsViaPrompt(meta.online, players), meta)


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
  //let handleList =  await getHandleList()
  let additionalPlayergrid =  await getAdditionalPlayers(localHandleList, [loggedInPlayer.uid, loggedInPlayer.handle])
  meta.playergrid = additionalPlayergrid;
  // console.log("additionalPlayergrid", additionalPlayergrid);
  return meta
}

function getGameParamsViaPrompt(online=false, numHumansParam){
  let config = {}
  let numPlayers = Math.min(Number(prompt("Number of players (Max 6)", 4)),6);
  if (numPlayers === null) return null;
  else config.numPlayers = numPlayers

  let numHumans;
  if(online) {numHumans = numHumansParam;}
  else numHumans = Number(prompt("Number of Humans ", 2));
  if (numHumans === null) return null;
  else config.numHumans = numHumans;

  let boardSize = Number(prompt("Size of Board ", 8));
  if (boardSize === null) return null;
  else config.boardSize = boardSize;

  let allied = prompt("Allied Humans y/n", "y")
  if (allied === null) return null;
  else {
    if(allied === "y" || allied === "y") config.allied = true;
    else config.allied = false;
  }
  let gameName = prompt("Game Name", randomName())
  if (gameName === null) return null;
  else config.gameName = gameName;
  //console.log(config);
  return config
}

async function setupStateViaPrompt(meta){
  let players;
  if (meta.playergrid) players = meta.playergrid.length;
  let tempState = setupNew(getGameParamsViaPrompt(meta.online, players), meta)
  //console.log(tempState);
  return tempState;
}


function setlocalGameInfo(){
  let players = state.meta.playergrid;
  let uidlist = players.map((a) => a[0]);
  let player = uidlist.indexOf(loggedInPlayer.uid);
  console.log("state, players, uidlist, player", state, players, uidlist, player );
  return {player:player}
}

function getAdditionalPlayers(handleList, startingList){
  console.log("getAdditionalPlayers handleList", handleList);
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
