"use strict"

/* global Hex, Vec, Map, makeNewViewMask     */
/* eslint-disable no-unused-vars */

const techs = [
{tech:'gasGiantMove', location:new Hex(0,1), cost:2,},
{tech:'navBeacons', location:new Hex(-1,0), cost:2, },
{tech:'missiles', location:new Hex(0,-1), cost:2, },
{tech:'heavyWeapons', location:new Hex(1,-1), cost:2, },
{tech:'mines', location:new Hex(1,0), cost:2, },
{tech:'asteroidMining', location:new Hex(-1,1), cost:2, }
];


const shipHulls = {
  scoutShip:{type:'scoutShip',  hull:1, shield:2, maxMove:3, attack:2, retaliate:1, range:1, view:2},
  basicShip:{type:'basicShip',  hull:2, shield:3, maxMove:2, attack:2, retaliate:2, range:1, view:1},
  assaultShip:{type:'assaultShip',  hull:4, shield:3, maxMove:2, attack:5, retaliate:3, range:1, view:1},
  mineShip:{type:'mineShip',  hull:4, shield:4, maxMove:1, attack:2, retaliate:5, range:1, view:1},
  missileShip:{type:'missileShip',  hull:2, shield:2, maxMove:3, attack:3, retaliate:2, range:3, view:1}
}

const thingList = [
  {thing: 'navBeacon',tech:['navBeacons'], price: 2, territoryState: 1,  shipState: 'ownPresent',   terrain: ['space', 'asteroids', 'nebula', ] } ,
  {thing: 'asteroidMining',tech:['asteroidMining'], price: 2, territoryState: 2,  shipState: 'noEnemy',   terrain: ['asteroids', ] } ,
  {thing: 'inhabitedPlanet', price: 0,   shipState: 'ownPresent',   terrain: ['planet', ] } ,
  {thing: 'scoutShip', price: 3, territoryState: 2, inhabitedPlanet: true, shipState: 'noShip',   terrain: [] } ,
  {thing: 'basicShip', price: 2, territoryState: 2, inhabitedPlanet: true, shipState: 'noShip',   terrain: [] } ,
  {thing: 'assaultShip', price: 5, territoryState: 2, inhabitedPlanet: true, shipState: 'noShip',   terrain: [], tech:['heavyWeapons'] } ,
  {thing: 'mineShip',tech:['mines'], price: 5, territoryState: 2, inhabitedPlanet: true, shipState: 'noShip',   terrain: [] },
  {thing: 'missileShip',tech:['missiles'], price: 5, territoryState: 2, inhabitedPlanet: true, shipState: 'noShip',   terrain: [] },
  {thing: 'destroy', price: 1, territoryState: 1, shipState: 'ownPresent', terrain: [], thingPresent: ["navBeacon"] },
]

const terrainCostNew = {
  space: { moveCost:1, },
  asteroids: { moveCost:3, },
  gasGiant: { moveCost:1, techNeeded: "gasGiantMove", },
  planet: { moveCost:1, },
  nebula: { moveCost:5, }
}

const navBeaconCost = 0.25;

let debug = true;

let openTechTree = false;
const screenSize = 800;
let screenCenter = new Vec(screenSize/2,screenSize/2);
let screenOffset = new Vec(0,0);
let techTreeOffset = new Vec(400,250);


let scale = 1;
let hexSize = 75
const boardSize = 10;


let sel = {state:0, attacks:[], menu:[], moves:[]}


let playerTurn = 0;
let preturn = true;

let shipArray = [
  {"type":"scoutShip","hull":1,"shield":2,"attack":2,"retaliate":1, view:2,
  "maxMove":4,"moved":false,"attacked":false,"location":new Hex(0,3,-3),"owner":0, range:1},
{"type":"scoutShip","hull":1,"shield":2,"attack":2,"retaliate":1, view:2,
"maxMove":4,"moved":false,"attacked":false,"location":new Hex(0,-3,3),"owner":1, range:1}
];

let baseArray = [
  {type:"planet", owner:0, location: new Hex(0,3,-3), territory:new Hex(0,3,-3).secondNeighboursInclusive},
//  {type:"planet", owner:1, location: new Hex(3,-3,0), territory:new Hex(3,-3,0).secondNeighboursInclusive},
  {type:"planet", owner:1, location: new Hex(0,-3,3), territory:new Hex(0,-3,3).secondNeighboursInclusive}
]

let tiles = setupTiles(Hex.findWithin(boardSize));

function setupTiles(hexArray){
  let hexesObj = new Map();
  for(let hex of hexArray){
    let buildingHex = {hex: hex, terrain:"space", station:null};
    if(Math.random()<0.3){buildingHex.terrain = "nebula"}
    if(Math.random()<0.1){buildingHex.terrain = "planet"}
    if(Math.random()<0.35){buildingHex.terrain = "asteroids"}
    if(Math.random()<0.05){buildingHex.terrain = "gasGiant"}
    //  if(Math.random()<0.05){buildingHex.navBeacon = {owner:0}};

    for(let base of baseArray){
      if(hex.compare(base.location)){
        buildingHex.terrain = "planet";
        //    buildingHex.station = {type:"inhabitedPlanet", owner:base.owner}
      }
    }
    hexesObj.set(hex.id, buildingHex);
  }
  return hexesObj;
}

let playerData = [
  {"money":5, capital: new Hex(0,3,-3),"tech":{"gasGiantMove":true, asteroidMining:true}, viewMask:makeNewViewMask(tiles)},
  {"money":5, capital: new Hex(0,-3,3), "tech":{"gasGiantMove":false}, viewMask:makeNewViewMask(tiles)},
  //{"money":5, "tech":{"gasGiantMove":false}, viewMask:makeNewViewMask()}
];


let numPlayers = playerData.length ;
