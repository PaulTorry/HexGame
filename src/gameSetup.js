"use strict"

/* global Hex, Map, Vec, makeNewViewMask, randomName, generateID     */
/* eslint-disable no-unused-vars */


let preturn = true;

let state = {};

let sel = {state:0, attacks:[], menu:[], moves:[]}

state = setup(5, 9, 2, false, "default", generateID(20))



function setup(numPlayersP, boardSizeP = 8, numHumansP = numPlayersP, playersTogetherP = false, gameNameP = "noName", gameID = generateID(20), meta = {online:false}){
  let config = {}
  config.numPlayers = numPlayersP
  config.numHumans = numHumansP;
  config.boardSize = boardSizeP;
  config.allied = playersTogetherP;
  config.gameName = gameNameP;

  return setupNew(config, meta);
}

function makePlayerListConsole(config){
  let playerlist = []

  // TODO Fix this
  for(let i = 0; i < config.numPlayers; i++){  playerlist.push("AI")  }
  // if(playersTogether){
  for(let i = 0; i < config.numHumans; i++){ playerlist[i] = "Human";  }
  // } else {
  //   for(let i = 0; i < numHumans; i++){ playerlist[Math.floor(i*numPlayers/numHumans)] = "Human";  }
  // }
  // TODO make playerorder grid to space out players
  return playerlist;
}

function makeAlliesGridConsole(config, playerlist){
  let alliesGrid = []

  for(let i = 0; i < config.numPlayers; i++){
    if(config.allied){
      alliesGrid[i] = [];
      for(let j = 0; j < config.numPlayers; j++){ alliesGrid[i][j] = playerlist[i] === playerlist[j] }
    } else {
      alliesGrid[i] = [];
      for(let j = 0; j < config.numPlayers; j++){ alliesGrid[i][j] = i === j }
    }
  }
  return alliesGrid;
}


function setupNew(config,  meta = {online:false}, playerlist = makePlayerListConsole(config), alliesGrid = makeAlliesGridConsole(config, playerlist )){
  let gameID = generateID(20);

  if(gameID.length < 15) console.log("check game id length");
  let tiles = new Map();
  let playerData = [];
  let baseArray = [];
  let shipArray = [];
  let randomPicker = Hex.getRandomPicker(config.boardSize - 1);


  for(let hex of Hex.findWithin(config.boardSize)){
    let buildingHex = {hex: hex, terrain:"space", station:null, resource:null};
    if(Math.random()<0.1){buildingHex.terrain = "nebula"; buildingHex.resource = "hydrogen" }
    else if(Math.random()<0.1){buildingHex.terrain = "nebula"}
    else if(Math.random()<0.05){buildingHex.terrain = "protostar"}
    else if(Math.random()<0.15){buildingHex.terrain = "asteroids"}
    else if(Math.random()<0.15){buildingHex.terrain = "asteroids"; buildingHex.resource = "icyAsteroids"}
    else if(Math.random()<0.05){buildingHex.terrain = "gasGiant"}

    tiles.set(hex.id, buildingHex);
  }

  // let playerlist = []
  //
  // // TODO Fix this
  // for(let i = 0; i < config.numPlayers; i++){  playerlist.push("AI")  }
  // // if(playersTogether){
  // for(let i = 0; i < config.numHumans; i++){ playerlist[i] = "Human";  }
  // // } else {
  // //   for(let i = 0; i < numHumans; i++){ playerlist[Math.floor(i*numPlayers/numHumans)] = "Human";  }
  // // }
  // // TODO make playerorder grid to space out players

  // let alliesGrid = []
  //
  // for(let i = 0; i < config.numPlayers; i++){
  //   if(config.allied){
  //     alliesGrid[i] = [];
  //     for(let j = 0; j < config.numPlayers; j++){ alliesGrid[i][j] = playerlist[i] === playerlist[j] }
  //   } else {
  //     alliesGrid[i] = [];
  //     for(let j = 0; j < config.numPlayers; j++){ alliesGrid[i][j] = i === j }
  //   }
  // }

  for(let i = 0; i < config.numPlayers; i++){
    let angle = 2*Math.PI*i/config.numPlayers
    let hexloc = Hex.getUnitHexFromXY(new Vec(Math.sin(angle), Math.cos(angle)).scale(config.boardSize/1)).randomNeighbour

    baseArray.push({type:"planet", owner:i, hex: hexloc, territory:hexloc.secondNeighboursInclusive});
    playerData.push({type: playerlist[i], money:5, income:1, tech:{}, capital:hexloc, viewMask:makeNewViewMask(tiles, 0)})
    shipArray.push({"type":"scoutShip","hull":2,"shield":3,"moved":false,"attacked":false, hex:hexloc, "owner":i,
      "attack":2,"retaliate":1, view:2, "maxMove":4, range:1})
    tiles.set(hexloc.id, {hex: hexloc, terrain:"planet", station:null, navBeacon:{owner: i}});

    let hexStar = hexloc.randomNeighbour;
    tiles.set(hexStar.id, {hex: hexStar, terrain:"star", station:null});
  }

  for(let i = 0; i < 100; i ++){

    let t = tiles.get(Hex.arrayToID(randomPicker(Math.random())));

    if(!t.hex.secondNeighboursInclusive.filter(n => n.mag <= config.boardSize).find(tt => tiles.get(tt.id).terrain === "planet" ) ){
      t.terrain = "planet"; t.resource = null;
      if(!t.hex.secondNeighboursInclusive.filter(n => n.mag <= config.boardSize).find(tt => tiles.get(tt.id).terrain === "star" ) ){
        let starMaybe = t.hex.neighbours.filter(n => n.mag <= config.boardSize).filter(n => n.mag < config.boardSize && tiles.get(n.id).terrain === "space")
        if (starMaybe[0]) tiles.get(starMaybe[0].id).terrain  = "star";
      }
    }
  }

  let blackHoleLoc = tiles.get(Hex.arrayToID(randomPicker(0.5)));
  blackHoleLoc.terrain = "blackHole";
  blackHoleLoc.resource = null;
  blackHoleLoc.hex.neighbours.forEach(s => {
    tiles.get(s.id).terrain  = "space";
    tiles.get(s.id).resource  = null;
  })

  return {
    meta:meta, gameID:gameID, gameName:config.gameName, boardSize:config.boardSize, numPlayers:config.numPlayers,
    playerTurn:0, turnNumber:1,
    shipArray:shipArray, tiles:tiles, playerData:playerData, baseArray:baseArray, alliesGrid:alliesGrid,
    history:[[],[]],       log:[]}
}

function subTurn(){
  return state.numPlayers * (state.turnNumber -1) + state.playerTurn;
}
