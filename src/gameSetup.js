"use strict"

/* global Hex, Map, Vec, makeNewViewMask     */
/* eslint-disable no-unused-vars */


let preturn = true;

let state = {};

let sel = {state:0, attacks:[], menu:[], moves:[]}

state = setup(5, 9, 2, false)

function setup(numPlayers, boardSize = 8, numHumans = numPlayers, playersTogether = false){
  let tiles = new Map();
  let playerData = [];
  let baseArray = [];
  let shipArray = [];
  let randomPicker = Hex.getRandomPicker(boardSize);


  for(let hex of Hex.findWithin(boardSize)){
    let buildingHex = {hex: hex, terrain:"space", station:null};
    if(Math.random()<0.3){buildingHex.terrain = "nebula"}
    if(Math.random()<0.1){buildingHex.terrain = "protostar"}
    if(Math.random()<0.35){buildingHex.terrain = "asteroids"}
    if(Math.random()<0.05){buildingHex.terrain = "gasGiant"}

    //   if(Math.random()<0.1){buildingHex.terrain = "planet"}
    //   if(Math.random()<0.05){buildingHex.terrain = "star"}
    //   if(Math.random()<0.05){buildingHex.terrain = "blackHole"}

    tiles.set(hex.id, buildingHex);
  }
  console.log(randomPicker(0.5));
  console.log(Hex.arrayToID(randomPicker(0.5)));
  console.log(tiles.get(Hex.arrayToID(randomPicker(0.5))).terrain);
  tiles.get(Hex.arrayToID(randomPicker(0.5))).terrain = "blackHole";
  console.log(tiles.get(Hex.arrayToID(randomPicker(0.5))).terrain);

  let playerlist = []

  // TODO Fix this

  for(let i = 0; i < numPlayers; i++){  playerlist.push("AI")  }
  if(playersTogether){
    for(let i = 0; i < numHumans; i++){ playerlist[i] = "human";  }
  } else {
    for(let i = 0; i < numHumans; i++){ playerlist[Math.floor(i*numPlayers/numHumans)] = "human";  }
  }

  let alliesGrid = []

  for(let i = 0; i < numPlayers; i++){
    if(playersTogether){
      alliesGrid[i] = [];
      for(let j = 0; j < numPlayers; j++){ alliesGrid[i][j] = playerlist[i] === playerlist[j] }
    } else {
      alliesGrid[i] = [];
      for(let j = 0; j < numPlayers; j++){ alliesGrid[i][j] = i === j }
    }
  }

  console.log(alliesGrid);

  for(let i = 0; i < numPlayers; i++){
    let angle = 2*Math.PI*i/numPlayers

    let hexloc = Hex.getUnitHexFromXY(new Vec(Math.sin(angle), Math.cos(angle)).scale(boardSize/1)).randomNeighbour

    baseArray.push({type:"planet", owner:i, hex: hexloc, territory:hexloc.secondNeighboursInclusive});
    playerData.push({type: playerlist[i], money:5, income:1, tech:{}, capital:hexloc, viewMask:makeNewViewMask(tiles)})
    shipArray.push({"type":"scoutShip","hull":2,"shield":3,"moved":false,"attacked":false, hex:hexloc, "owner":i,
      "attack":2,"retaliate":1, view:2, "maxMove":4, range:1})
    tiles.set(hexloc.id, {hex: hexloc, terrain:"planet", station:null});

    let hexStar = hexloc.randomNeighbour;
    tiles.set(hexStar.id, {hex: hexStar, terrain:"star", station:null});

  }



  // for (let i = 0; i < 100; i++){
  //
  // }

  return {boardSize:boardSize, numPlayers:numPlayers, playerTurn:0, turnNumber:1, shipArray:shipArray, tiles:tiles, playerData:playerData, baseArray:baseArray, alliesGrid:alliesGrid,}
}
