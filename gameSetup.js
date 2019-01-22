"use strict"

const shipHulls = {
  scoutShip:{type:'scoutShip',  hull:1, shield:2, maxMove:4, attack:2, retaliate:1, range:1},
  basicShip:{type:'basicShip',  hull:2, shield:3, maxMove:2, attack:2, retaliate:2},
  assaultShip:{type:'assaultShip',  hull:4, shield:3, maxMove:2, attack:5, retaliate:3},
  mineShip:{type:'mineShip',  hull:4, shield:4, maxMove:1, attack:2, retaliate:5},
  missileShip:{type:'missileShip',  hull:2, shield:2, maxMove:3, attack:3, retaliate:2, range:3}
}

const thingList = [
  {thing: 'navBeacon', price: 2, territoryState: 1,  shipState: 'noEnemy',   terrain: ['space', 'asteroids', 'nebula', ] } ,
  {thing: 'asteroidMining', price: 2, territoryState: 2,  shipState: 'noEnemy',   terrain: ['asteroids', ] } ,
  {thing: 'inhabitedPlanet', price: 0,   shipState: 'ownPresent',   terrain: ['planet', ] } ,
  {thing: 'scoutShip', price: 2, territoryState: 2, inhabitedPlanet: true, shipState: 'noShip',   terrain: [] } ,
  {thing: 'basicShip', price: 2, territoryState: 2, inhabitedPlanet: true, shipState: 'noShip',   terrain: [] } ,
  {thing: 'assaultShip', price: 5, territoryState: 2, inhabitedPlanet: true, shipState: 'noShip',   terrain: [] } ,
  {thing: 'mineShip', price: 5, territoryState: 2, inhabitedPlanet: true, shipState: 'noShip',   terrain: [] },
  {thing: 'missileShip', price: 5, territoryState: 2, inhabitedPlanet: true, shipState: 'noShip',   terrain: [] }
]

const terrainCostNew = {
  "space": {"techNeeded": null, "moveOff":0.5, "moveOn":0.5, "navBeacon":0.25},
  "asteroids": {"techNeeded": null, "moveOff":1, "moveOn":1, "navBeacon":0.25},
  "gasGiant": {"techNeeded": "gasGiantMove", "moveOff":1, "moveOn":1, "navBeacon":0.25},
  "planet": {"techNeeded": null, "moveOff":0.5, "moveOn":0.5, "navBeacon":0.25},
  "nebula": {"techNeeded": null, "moveOff":1.5, "moveOn":1.5, "navBeacon":0.25}
}

const navBeaconCost = 0.25;

const playerColours = ["green", "red", "lightblue", "orange", "purple", "brown"];
const selectedColour = ["white","red", "blue", "orange"];

let debug = false;
const screenSize = 800;
let screenOffset = new Vec(0,0);
let mouseDownLocation = new Vec(0,0);
let fingerDistance = null;
let scale = 1;
let hexSize = 40
const boardSize = 6

let currentShip = null;
let selected = {hex: null,    state:0};
let possibleMoves = [];
let possibleAttacks = [];
let menu = [];

let numPlayers = 3;
let playerData = [{"money":5, "tech":{"gasGiantMove":false}},{"money":5, "tech":{"gasGiantMove":false}},{"money":5, "tech":{"gasGiantMove":false}}];
let playerTurn = 0;

let shipArray = [
  {"type":"scoutShip","hull":1,"shield":2,"attack":2,"retaliate":1,"maxMove":4,"moved":false,"attacked":false,"location":new Hex(0,0,0),"owner":0}
];

let baseArray = [
  {type:"planet", owner:0, location: new Hex(0,3,-3), territory:new Hex(0,3,-3).secondNeighboursInclusive},
  {type:"planet", owner:1, location: new Hex(3,-3,0), territory:new Hex(3,-3,0).secondNeighboursInclusive},
  {type:"planet", owner:2, location: new Hex(-3,0,3), territory:new Hex(-3,0,3).secondNeighboursInclusive}
]

let tiles = setupTiles(Hex.findWithin(boardSize));

function setupTiles(hexArray){
  let hexesObj = new Map();
  for(let hex of hexArray){
    let buildingHex = {hex: hex, terrain:"space", station:null};
    if(Math.random()<0.3){buildingHex.terrain = "nebula"};
    if(Math.random()<0.1){buildingHex.terrain = "planet"};
    if(Math.random()<0.35){buildingHex.terrain = "asteroids"};
    if(Math.random()<0.05){buildingHex.terrain = "gasGiant"};
    //  if(Math.random()<0.05){buildingHex.navBeacon = {owner:0}};

    for(let base of baseArray){
      if(hex.compare(base.location)){
        buildingHex.terrain = "planet";
        //    buildingHex.station = {type:"inhabitedPlanet", owner:base.owner}
      }
    }
    hexesObj.set(hex.id, buildingHex);
  }
  // console.log(hexesObj)
  return hexesObj;
}
