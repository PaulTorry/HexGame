"use strict"

let screenSize = 800;
let screenOffset = {x:-screenSize/2,y:-screenSize/2};
let mouseDownLocation = {x:0,y:0};
let scale = 1;
let hexSize = 40
let boardSize = 6
let hexes = findHexWithin(boardSize);
let hexObjects = setupHexes(hexes);
let playerColours = ["green", "red", "blue", "orange", "purple", "brown"];
let selectedColour = ["white","red", "blue", "orange"]
let playerTurn = 0;
let currentShip = null;
let selected = {hex: null,    state:0};
let possibleMoves = [];
let possibleAttacks = [];
let menu = [];



let terainCost = {"spacenebula" : 2, "nebulaspace" : 2, "spacespace" : 1, "nebulanebula" : 3 }

let shipArray = [
  {type:"scout", hull:"2", shield:"3", owner:"1", location:Hex(0,0,0), prevLocation:Hex(1,0,-1)},
  {type:"scout", hull:"1", shield:"4", owner:"0", location:Hex(0,1,-1), prevLocation:Hex(1,0,-1)},
];

function findHexWithin(n){
  let list = []
  for(let i = -n; i<=n; i++){
    for(let j = Math.max(-n, -n-i); j <=Math.min(n, n-i); j++){
      list.push(axialToHex(i, j));
    }
  }
  return list;
}

function randomInt(num) {return Math.floor(Math.random() * num);}

function setupHexes(hexArray){
  let hexesObj = {};
  for(let i=0; i<hexArray.length; i++){
    let buildingHex = {hex: hexArray[i], terain:"space", station:null};
    if(Math.random()<0.3){buildingHex.terain = "nebula"};
    //  if(Math.random()<0.3){buildingHex.ship = {type:"scout", owner:randomInt(2)}};
    if(Math.random()<0.1){buildingHex.station = {type:"base", owner:randomInt(2)}};
    hexesObj[""+ hexArray[i].p + "," + hexArray[i].q] = buildingHex;
  }
  return hexesObj;
}

function Vec(x, y){     return {x:x, y:y};   }

function addVec(a, b){ return Vec(a.x + b.x, a.y + b.y)   }
function scaleVec(a, m){ return Vec(a.x * m, a.y * m)    }
function dotProd(a, b){ return  a.x * b.x + a.y * b.y;   }
function hexID(a){return ""+ a.p + "," + a.q}

function Hex(p,q,r){ return {p:p, q:q, r:r};   }
function addHex(a, b){ return Hex(a.p+b.p, a.q+b.q, a.r+b.r); }
function compareHexes(a, b){ return a.p==b.p && a.q==b.q && a.r==b.r}
function Axial(p, q){ return {p:p, q:q}   }
function hexToAxial(p, q, r){ return Axial(p, q)}
function axialToHex(p, q){ return Hex(p, q, -p-q)  }


function hexDistance(a, b){  return (Math.abs(a.p - b.p) + Math.abs(a.q - b.q) + Math.abs(a.r - b.r)) / 2        }

//  function getRealXYfromScreenXY(a){return addVec(a,scaleVec(screenOffset,-1))}
function getRealXYfromScreenXY(a){
//  console.log(addVec(scaleVec(a,1/scale),screenOffset));
return addVec(scaleVec(a,1/scale),screenOffset)
}
//  function getScreenXYfromRealXY(a){return addVec(a,screenOffset)}

function getXYfromHex(hexCoord){
  let hexCentre = addVec(scaleVec(hexVec.p, hexCoord.p), scaleVec(hexVec.q, hexCoord.q))
  hexCentre = addVec(hexCentre, scaleVec(hexVec.r, hexCoord.r))
  hexCentre = scaleVec(hexCentre, hexSize    )
  return hexCentre
}

function getHexFromXY(xyScaled){
  let {p, q, r} = invHexVec;
  let xy = scaleVec(xyScaled, 1/hexSize);
  return Hex(dotProd(xy,p), dotProd(xy,q), dotProd(xy,r))
}

const hexVec = {p: Vec(1,0),   q: Vec((-1/2), Math.sqrt(3)/2),  r: Vec((-1/2), -Math.sqrt(3)/2) }
const invHexVec = {p: Vec(2/(3),0),   q: Vec((-2/6), Math.sqrt(3)/3),  r: Vec((-2/6), -Math.sqrt(3)/3) }

const hexAxisList =   [{p:1, q:0, r:0}, {p:0, q:0, r:-1}, {p:0, q:1, r:0}, {p:-1, q:0, r:0},  {p:0, q:0, r:1}, {p:0, q:-1, r:0}]
const hexNeighbours = [{p:1, q:0, r:-1}, {p:0, q:-1, r:1}, {p:-1, q:0, r:1}, {p:-1, q:1, r:0},  {p:0, q:1, r:-1}, {p:1, q:-1, r:0}]

const hexTopAxisList =   [{p:1, q:0, r:0}, {p:0, q:0, r:0}, {p:0, q:0, r:0}, {p:-1, q:0, r:0},  {p:0, q:0, r:1}, {p:0, q:-1, r:0}]
const hexBotAxisList =   [{p:1, q:0, r:0}, {p:0, q:0, r:-1}, {p:0, q:1, r:0}, {p:-1, q:0, r:0},  {p:0, q:0, r:0}, {p:0, q:0, r:0}]

const hexVert = hexAxisList.map((x) => scaleVec(getXYfromHex(x),1/hexSize));
const hexTopVert = hexTopAxisList.map((x) => scaleVec(getXYfromHex(x),1/hexSize));
const hexBotVert = hexBotAxisList.map((x) => scaleVec(getXYfromHex(x),1/hexSize));
const triangleVert = [Vec(1,0), Vec(-1,0), Vec(0,-1)];
const squareVert = [Vec(1,1), Vec(-1,1), Vec(-1,-1), Vec(1,-1)];

function hex_round(h){
  let qi = Math.round(h.q);
  let ri = Math.round(h.r);
  let pi = Math.round(h.p);
  let q_diff = Math.abs(qi - h.q);
  let r_diff = Math.abs(ri - h.r);
  let p_diff = Math.abs(pi - h.p);
  if (q_diff > r_diff && q_diff > p_diff)    {           qi = -ri - pi;    }
  else  if (r_diff > p_diff)                 {           ri = -qi - pi;        }
  else                                    {            pi = -qi - ri;        }
  return Hex(pi, qi, ri);
}

function applyDamage(dammage, ship){
  let {type, hull, shield} = ship
  for(let dam = dammage; dam > 0 && hull > 0; dam--){
    if (shield > 0){shield--} else{hull--};
  }
  ship.hull = hull;
  ship.shield = shield;
  if (hull < 1){shipArray = shipArray.filter(e => e !== ship)}
}


//  UI and Draw -------------------------------------------------------------------------

function mousedown(event){
  mouseDownLocation = {x: event.offsetX, y: event.offsetY}
  document.body.querySelector("#board").addEventListener("mousemove", drag);
 document.body.querySelector("#board").addEventListener("mouseup", e => {
   document.body.querySelector("#board").removeEventListener("mousemove", drag);
 });
}

function mouseWheel(event){
  console.log(event.deltaY);
  if (event.deltaY>0){
    scale *= 1.1;
    screenOffset = scaleVec(screenOffset,1/1.1);
  }
  if (event.deltaY<0){
    scale /= 1.1;
    screenOffset = scaleVec(screenOffset,1.1);
  }
          reScale();
}

function drag(event){
  screenOffset = addVec(screenOffset,scaleVec(addVec(scaleVec(mouseDownLocation,-1),{x: event.offsetX, y: event.offsetY}),-1/(scale)))
  mouseDownLocation =  {x: event.offsetX, y: event.offsetY} ;
      reScale();
}

function menuClick(event){
console.log("click" + selected.state);
if(selected.state == 3){
  if(event.offsetY < 100){
    hexObjects[hexID(selected.hex)].station = {type: "base", owner: playerTurn}
    selected = {hex:null, state:0}
    possibleMoves = []; possibleAttacks = [];
  }
}
drawScreen();
}

function doo(event){
  let clickHex = hex_round(getHexFromXY(getRealXYfromScreenXY({x: event.offsetX, y:event.offsetY})))
  onHexClicked(clickHex);
  drawScreen();
  drawMenu();
}

function onHexClicked(clickHex){
if(selected.state ==3){

    if(hexDistance(clickHex, Hex(0,0,0))<=boardSize){selected = {hex:clickHex, state:1}}
    else{
      selected = {hex:null, state:0}
      possibleMoves = []; possibleAttacks = [];

  }
}

else if (selected.state == 2){
  if (selected.hex && compareHexes(selected.hex , clickHex)){
    selected.state =3;
    possibleMoves = []; possibleAttacks = [];
    makeMenu();
  }
  else if(possibleMoves.length > 0 && possibleMoves.find( e =>  compareHexes(e, clickHex))) {
    currentShip.location = clickHex;
    currentShip = null;
    selected = {hex:null, state:0} ;
    possibleMoves = []; possibleAttacks = []; //attacks if have some
  }
  else if(possibleAttacks.find(e =>  compareHexes(e, clickHex))) {
    let target = shipArray.find(e => compareHexes(e.location,clickHex));
    if(target){
      applyDamage(2, target);
      if(!shipArray.find(e => e === target)){currentShip.location = clickHex;}
    }else{console.log("error in attacks");}

    currentShip = null;
    selected = {hex:null, state:0} ;
    possibleMoves = []; possibleAttacks = [];
  }
  else if(hexDistance(clickHex, Hex(0,0,0))<6){
    selected = {hex:clickHex, state:1};
    possibleMoves = []; possibleAttacks = [];
  };
}

else if (selected.state == 1){
  if (selected.hex && compareHexes(selected.hex , clickHex)){
    currentShip = shipArray.find(e => compareHexes(e.location,clickHex));
    if(currentShip){
      setPossibleMoves();
      selected.state = 2
    }
    else{
      selected.state =3;
      possibleMoves = []; possibleAttacks = [];
      makeMenu();
    }
  }
  else{selected = {hex:null, state:0}}
}

else if (selected.state == 0){
  if(hexDistance(clickHex, Hex(0,0,0))<=boardSize){selected = {hex:clickHex, state:1}}
}
}

function makeMenu(){menu = ["hi"]}

function setPossibleMoves(){
  let candiateMoves = findPossibleMoves(selected.hex);
  possibleMoves = [];
  for(let local in candiateMoves){
    let hex = candiateMoves[local]
    if(hexDistance(hex, Hex(0,0,0)) <= boardSize && !shipArray.find(e => compareHexes(e.location,hex))){
      possibleMoves.push(hex);
    }
    if(shipArray.find(e => compareHexes(e.location,hex))) {
      possibleAttacks.push(hex);
    }
  }
}

function findPossibleMoves(center, moveLeft = 5){
  let frontier = [{loc:center, cost:0}];
  let visited = {[hexID(center)]: {loc:center, cost:true, from:null}}
  let itts = 0
  while (frontier.length > 0 && itts < 1000){
    let current = frontier.shift();
    itts ++;
    for (let next in hexNeighbours){
      let hex = addHex(hexNeighbours[next] , current.loc)
      if (hexDistance(hex, Hex(0,0,0)) <= boardSize ){
        let cost = current.cost + getTerrainCost( current.loc, hex);
        if(!(visited[hexID(hex)] && cost >= visited[hexID(hex)].cost) && cost < moveLeft){ // TODO WTF
          frontier.push({loc:hex, cost:cost});
          visited[hexID(hex)] = {loc:hex, cost:current.cost + 1, from:current.loc};
        }
      }
    }
  }
  let visitedArray = [];
  for (let v in visited){
    if (visited.hasOwnProperty(v)){visitedArray.push(visited[v].loc)}
  }
  return visitedArray
}

function getTerrainCost(a, b){
  return terainCost[hexObjects[hexID(a)].terain + hexObjects[hexID(b)].terain]
}



function drawScreen(){
  let line = [];

  for(let ho in hexObjects){
    if(hexObjects.hasOwnProperty(ho)){
      line.push(drawPolygon(hexVert, getXYfromHex(hexObjects[ho].hex),Vec(0,0), hexSize, 1, "#25202D", "#120F22"  ));

      if( hexObjects[ho].terain == "nebula"){
        line.push(drawPolygon(hexVert, getXYfromHex(hexObjects[ho].hex),Vec(0,0), hexSize, 2 , "#25202D", "grey"));
      }

      if( hexObjects[ho].station){
        line.push(drawPolygon(squareVert, getXYfromHex(hexObjects[ho].hex),Vec(0,15), 10, 2 , playerColours[hexObjects[ho].station.owner], "white"));
      }
    }
  }

  for(let sh in shipArray){
    line.push(drawPolygon(triangleVert, getXYfromHex(shipArray[sh].location) ,Vec(0,0), 30,  2 , playerColours[shipArray[sh].owner], playerColours[shipArray[sh].owner]));
    line.push(drawText(`${shipArray[sh].shield},${shipArray[sh].hull}`, getXYfromHex(shipArray[sh].location) ,Vec(-15,0)));
  }

  if(selected.hex){
//    line.push(drawPolygon(hexVert, getXYfromHex(selected.hex),Vec(0,0), hexSize -5, 3 , "red"));
    for (let p in possibleMoves){
    line.push(drawPolygon(hexVert, getXYfromHex(possibleMoves[p]),Vec(0,0), hexSize -5, 3 , "green"));
    }
    for (let p in possibleAttacks){
      line.push(drawPolygon(hexVert, getXYfromHex(possibleAttacks[p]),Vec(0,0), hexSize -5, 3 , "purple"));
    }
    line.push(drawPolygon(hexVert, getXYfromHex(selected.hex),Vec(0,0), hexSize -5, 3 , selectedColour[selected.state]));
  }
  reScale();
//     document.querySelector("#board").setAttribute("viewBox",`${screenOffset.x} ${screenOffset.y} ${screenSize/scale} ${screenSize/scale}`);
   document.querySelector("#board").innerHTML = line;
}

function reScale(){
document.querySelector("#board").setAttribute("viewBox",`${screenOffset.x} ${screenOffset.y} ${screenSize/scale} ${screenSize/scale}`);
}

function drawMenu(){
  let line = [];
  if (selected.state == 3){
    line.push(`<polygon points='20,20 60,20 60,60 20,60' stroke='white' stroke-width=2' fill='white' />`);
  }
  document.querySelector("#menu").innerHTML = line;
}

function coord_as_string(a){ return `${a.x},${a.y} `; }

function drawPolygon( pointVec, center, offset=Vec(0,0), size=hexSize, stroke=2, colour="white", fill="none") {
  let positions = "";
  let location = addVec(center, offset );
  for(let i=0; i<pointVec.length; i++){
    positions = positions.concat(coord_as_string(addVec(scaleVec(pointVec[i],size),location)));
  }
  return `<polygon points='${positions}' stroke='${colour}' stroke-width='${stroke}' fill='${fill}' />` ;
}

function drawText( text, center, offset=Vec(0,0), size=20, fill="white") {
  let pos = addVec(center, offset)
  return  `<text x="${pos.x}" y="${pos.y}" fill="${fill}" style="font:bold ${size}px sans-serif"> ${text} </text>`
}
