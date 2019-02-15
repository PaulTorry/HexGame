"use strict"

/* global Hex, Map, makeNewViewMask     */
/* eslint-disable no-unused-vars */


// let openTechTree = false;
// const screenSize = 800;
// let screenCenter = new Vec(screenSize/2,screenSize/2);
// let screenOffset = new Vec(0,0);
// let techTreeOffset = new Vec(400,250);
// let hexSize = 75
// let scale = 1;

const boardSize = 10;

 let state = {};

let sel = {state:0, attacks:[], menu:[], moves:[]}


state.playerTurn = 0;
let preturn = true;

state.shipArray = [
  {"type":"scoutShip","hull":1,"shield":2,"attack":2,"retaliate":1, view:2,
  "maxMove":4,"moved":false,"attacked":false, hex:new Hex(0,3,-3),"owner":0, range:1},
{"type":"scoutShip","hull":1,"shield":2,"attack":2,"retaliate":1, view:2,
"maxMove":4,"moved":false,"attacked":false,hex:new Hex(0,-3,3),"owner":1, range:1}
];

state.baseArray = [
  {type:"planet", owner:0, hex: new Hex(0,3,-3), territory:new Hex(0,3,-3).secondNeighboursInclusive},
//  {type:"planet", owner:1, location: new Hex(3,-3,0), territory:new Hex(3,-3,0).secondNeighboursInclusive},
  {type:"planet", owner:1, hex: new Hex(0,-3,3), territory:new Hex(0,-3,3).secondNeighboursInclusive}
]



state.tiles = setupTiles(Hex.findWithin(boardSize));

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

 state.playerData = [
  {"money":5, capital: new Hex(0,3,-3),"tech":{"gasGiantMove":true, asteroidMining:true}, viewMask:makeNewViewMask(state.tiles)},
  {"money":5, capital: new Hex(0,-3,3), "tech":{"gasGiantMove":false}, viewMask:makeNewViewMask(state.tiles)},
  //{"money":5, "tech":{"gasGiantMove":false}, viewMask:makeNewViewMask()}
];


 state.numPlayers = state.playerData.length ;

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
