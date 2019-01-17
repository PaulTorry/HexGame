"use strict"
const screenSize = 800;
let screenOffset = new Vec(0,0);
let mouseDownLocation = new Vec(0,0);
let scale = 1;
let hexSize = 40
const boardSize = 6
let hexObjects = setupHexes(Hex.findWithin(boardSize));
const playerColours = ["green", "red", "blue", "orange", "purple", "brown"];
const selectedColour = ["white","red", "blue", "orange"]
const numPlayers = 2;
let playerTurn = 0;
let currentShip = null;
let selected = {hex: null,    state:0};
let possibleMoves = [];
let possibleAttacks = [];
let menu = [];

let terainCost = {"spacenebula" : 2, "nebulaspace" : 2, "spacespace" : 1, "nebulanebula" : 3 }

let shipArray = [
  {type:"scout", hull:"2", shield:"3", owner:"1", maxMove: 1, moved:false, attacked:false, location: new Hex(0,0,0)},
  {type:"scout", hull:"1", shield:"4", owner:"0", maxMove: 1, moved:false, attacked:false, location: new Hex(0,1,-1)},
];

function setupHexes(hexArray){
  let hexesObj = {};
  for(let i=0; i<hexArray.length; i++){
    let buildingHex = {hex: hexArray[i], terain:"space", station:null};
    if(Math.random()<0.3){buildingHex.terain = "nebula"};
    if(Math.random()<0.02){buildingHex.terain = "planet"};
    if(Math.random()<0.2){buildingHex.terain = "asteroids"};
    if(Math.random()<0.05){buildingHex.terain = "gasGiant"};
    if(Math.random()<0.05){buildingHex.station = {type:"base", owner:randomInt(2)}};
    hexesObj[""+ hexArray[i].p + "," + hexArray[i].q] = buildingHex;
  }
  return hexesObj;
}
