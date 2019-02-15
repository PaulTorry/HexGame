"use strict"

/* global Hex, Map, Vec, makeNewViewMask     */
/* eslint-disable no-unused-vars */


// let openTechTree = false;
// const screenSize = 800;
// let screenCenter = new Vec(screenSize/2,screenSize/2);
// let screenOffset = new Vec(0,0);
// let techTreeOffset = new Vec(400,250);
// let hexSize = 75
// let scale = 1;

const boardSize = 8;
let preturn = true;

let state = {};

let sel = {state:0, attacks:[], menu:[], moves:[]}



state = setup(6, boardSize)
//
// state.tiles = setupTiles(Hex.findWithin(boardSize));
// state.numPlayers = 2;
// state.playerTurn = 0;
//
// state.shipArray = [
//   {"type":"scoutShip","hull":1,"shield":2,"attack":2,"retaliate":1, view:2,
//   "maxMove":4,"moved":false,"attacked":false, hex:new Hex(0,3,-3),"owner":0, range:1},
// {"type":"scoutShip","hull":1,"shield":2,"attack":2,"retaliate":1, view:2,
// "maxMove":4,"moved":false,"attacked":false,hex:new Hex(0,-3,3),"owner":1, range:1}
// ];
//
// state.baseArray = [
//   {type:"planet", owner:0, hex: new Hex(0,3,-3), territory:new Hex(0,3,-3).secondNeighboursInclusive},
// //  {type:"planet", owner:1, location: new Hex(3,-3,0), territory:new Hex(3,-3,0).secondNeighboursInclusive},
//   {type:"planet", owner:1, hex: new Hex(0,-3,3), territory:new Hex(0,-3,3).secondNeighboursInclusive}
// ]
//
// state.playerData = [
//  {"money":5, capital: new Hex(0,3,-3),"tech":{"gasGiantMove":true, asteroidMining:true}, viewMask:makeNewViewMask(state.tiles)},
//  {"money":5, capital: new Hex(0,-3,3), "tech":{"gasGiantMove":false}, viewMask:makeNewViewMask(state.tiles)},
//  //{"money":5, "tech":{"gasGiantMove":false}, viewMask:makeNewViewMask()}
// ];



function setup(numPlayers, boardSize){
  let tiles = new Map();
  let playerData = [];
  let baseArray = [];

  for(let hex of Hex.findWithin(boardSize)){
    let buildingHex = {hex: hex, terrain:"space", station:null};
    if(Math.random()<0.3){buildingHex.terrain = "nebula"}
    if(Math.random()<0.1){buildingHex.terrain = "planet"}
    if(Math.random()<0.35){buildingHex.terrain = "asteroids"}
    if(Math.random()<0.05){buildingHex.terrain = "gasGiant"}
    //  if(Math.random()<0.05){buildingHex.navBeacon = {owner:0}};
    tiles.set(hex.id, buildingHex);
  }

  for(let i = 0; i < numPlayers; i++){
    //let player = {money:5, tech:{}, viewMask:makeNewViewMask(tiles)}

  //  console.log(2 * 3.14, Math.PI, i, numPlayers, 2*Math.PI*i/numPlayers);
    let hexloc = Hex.getUnitHexFromXY(   new Vec(
        Math.sin(2*Math.PI*i/numPlayers), Math.cos(2*Math.PI*i/numPlayers )
    ).scale(boardSize/1.2)  )

    console.log("hexloc", hexloc);


    baseArray.push({type:"planet", owner:i, hex: hexloc, territory:hexloc.secondNeighboursInclusive});
    playerData.push({money:5, tech:{}, capital:hexloc, viewMask:makeNewViewMask(tiles)})
    tiles.set(hexloc.id, {hex: hexloc, terrain:"planet", station:null});
  }

  return {numPlayers:numPlayers, playerTurn:0, shipArray:[], tiles:tiles,   playerData:playerData, baseArray:baseArray}

}


function setupTiles(hexArray){
  let hexesObj = new Map();
  for(let hex of hexArray){
    let buildingHex = {hex: hex, terrain:"space", station:null};
    if(Math.random()<0.3){buildingHex.terrain = "nebula"}
    if(Math.random()<0.1){buildingHex.terrain = "planet"}
    if(Math.random()<0.35){buildingHex.terrain = "asteroids"}
    if(Math.random()<0.05){buildingHex.terrain = "gasGiant"}
    //  if(Math.random()<0.05){buildingHex.navBeacon = {owner:0}};

    for(let base of state.baseArray){
      if(hex.compare(base.hex)){
        buildingHex.terrain = "planet";
        //    buildingHex.station = {type:"inhabitedPlanet", owner:base.owner}
      }
    }
    hexesObj.set(hex.id, buildingHex);
  }
  return hexesObj;
}

//  state.playerData = [
//   {"money":5, capital: new Hex(0,3,-3),"tech":{"gasGiantMove":true, asteroidMining:true}, viewMask:makeNewViewMask(state.tiles)},
//   {"money":5, capital: new Hex(0,-3,3), "tech":{"gasGiantMove":false}, viewMask:makeNewViewMask(state.tiles)},
//   //{"money":5, "tech":{"gasGiantMove":false}, viewMask:makeNewViewMask()}
// ];
//



 // function setupTiles(hexArray){
 //   let hexesObj = new Map();
 //   for(let hex of hexArray){
 //     let buildingHex = {hex: hex, terrain:"space", station:null};
 //     if(Math.random()<0.3){buildingHex.terrain = "nebula"}
 //     if(Math.random()<0.1){buildingHex.terrain = "planet"}
 //     if(Math.random()<0.35){buildingHex.terrain = "asteroids"}
 //     if(Math.random()<0.05){buildingHex.terrain = "gasGiant"}
 //     //  if(Math.random()<0.05){buildingHex.navBeacon = {owner:0}};
 //
 //     for(let base of state.baseArray){
 //       if(hex.compare(base.hex)){
 //         buildingHex.terrain = "planet";
 //         //    buildingHex.station = {type:"inhabitedPlanet", owner:base.owner}
 //       }
 //     }
 //     hexesObj.set(hex.id, buildingHex);
 //   }
 //   return hexesObj;
 // }
