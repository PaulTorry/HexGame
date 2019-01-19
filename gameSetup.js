"use strict"

const thingList = [
  {thing:"navBeacon", price:2, terrain:["space", "asteroids", "nebula"],  territoryState:1},
  {thing:"asteroidMining", price:2, terrain:["asteroids"], territoryState:2 },
  {thing:"inhabitedPlanet", price:0, terrain:["planet"], territoryState:1, shipState:2},
  {thing:"scoutShip", price:2, terrain:[], territoryState:2, inhabitedPlanet:true, noShip:true}
]

const terrainCostNew = {
  "space": {"techNeeded": null, "moveOff":1, "moveOn":1, "navBeacon":0.5},
  "asteroids": {"techNeeded": null, "moveOff":2, "moveOn":2, "navBeacon":0.5},
  "gasGiant": {"techNeeded": "gasGiantMove", "moveOff":2, "moveOn":2, "navBeacon":0.5},
  "planet": {"techNeeded": null, "moveOff":1, "moveOn":1, "navBeacon":0.5},
  "nebula": {"techNeeded": null, "moveOff":3, "moveOn":3, "navBeacon":0.5}
}

const playerColours = ["green", "red", "blue", "orange", "purple", "brown"];
const selectedColour = ["white","red", "blue", "orange"];

let debug = false;
const screenSize = 800;
let screenOffset = new Vec(0,0);
let mouseDownLocation = new Vec(0,0);
let scale = 1;
let hexSize = 40
const boardSize = 6

let currentShip = null;
let selected = {hex: null,    state:0};
let possibleMoves = [];
let possibleAttacks = [];
let menu = [];

let numPlayers = 2;
let playerData = [{"money":5, "tech":{"gasGiantMove":true}},{"money":5, "tech":{"gasGiantMove":false}}];
let playerTurn = 0;

let shipArray = [
  {type:"scoutShip", hull:"2", shield:"3", owner:"1", maxMove: 4, moved:false, attacked:false, location: new Hex(0,-1,1)},
  {type:"scoutShip", hull:"1", shield:"4", owner:"0", maxMove: 8, moved:false, attacked:false, location: new Hex(0,1,-1)},
];

let baseArray = [
  {type:"planet", owner:"0", location: new Hex(0,3,-3), territory:new Hex(0,3,-3).neighbours},
  {type:"planet", owner:"1", location: new Hex(0,-3,3), territory:new Hex(0,-3,3).neighbours}
]

let tiles = setupTiles(Hex.findWithin(boardSize));

function setupTiles(hexArray){
  let hexesObj = new Map();
  for(let hex of hexArray){
    let buildingHex = {hex: hex, terrain:"space", station:null};
    if(Math.random()<0.3){buildingHex.terrain = "nebula"};
    if(Math.random()<0.02){buildingHex.terrain = "planet"};
    if(Math.random()<0.2){buildingHex.terrain = "asteroids"};
    if(Math.random()<0.05){buildingHex.terrain = "gasGiant"};
    if(Math.random()<0.05){buildingHex.station = {type:"navBeacon", owner:randomInt(2)}};

    for(let base of baseArray){
      if(hex.compare(base.location)){
        buildingHex.terrain = "planet";
        buildingHex.station = {type:"inhabitedPlanet", owner:base.owner}
      }
    }
    hexesObj.set(hex.id, buildingHex);
  }
  // console.log(hexesObj)
  return hexesObj;
}
