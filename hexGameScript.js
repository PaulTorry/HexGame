"use strict"

let screenSize = 800;
let screenOffset = new Vec(-screenSize/2,-screenSize/2);
let mouseDownLocation = new Vec(0,0);
let scale = 1;
let hexSize = 40
let boardSize = 6
let hexObjects = setupHexes(Hex.findWithin(boardSize));
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
  {type:"scout", hull:"2", shield:"3", owner:"1", location: new Hex(0,0,0), prevLocation: new Hex(1,0,-1)},
  {type:"scout", hull:"1", shield:"4", owner:"0", location: new Hex(0,1,-1), prevLocation: new Hex(1,0,-1)},
];



function setupHexes(hexArray){
  let hexesObj = {};
  for(let i=0; i<hexArray.length; i++){
    let buildingHex = {hex: hexArray[i], terain:"space", station:null};
    if(Math.random()<0.3){buildingHex.terain = "nebula"};
    if(Math.random()<0.1){buildingHex.station = {type:"base", owner:randomInt(2)}};
    hexesObj[""+ hexArray[i].p + "," + hexArray[i].q] = buildingHex;
  }
  return hexesObj;
}




function getRealXYfromScreenXY(a){return a.scale(1/scale).add(screenOffset)}

function getXYfromHex(hexCoord){
  const hexVec = {p: new Vec(1,0),   q: new Vec((-1/2), Math.sqrt(3)/2),  r: new Vec((-1/2), -Math.sqrt(3)/2) }
  let hexCentre = hexVec.p.scale(hexCoord.p).add(hexVec.q.scale(hexCoord.q))
  hexCentre = hexCentre.add(hexVec.r.scale(hexCoord.r))
  hexCentre = hexCentre.scale(hexSize)
  return hexCentre
}

function getHexFromXY(xyScaled){
  const invHexVec = {p: new Vec(2/(3),0),   q: new Vec((-2/6), Math.sqrt(3)/3),  r: new Vec((-2/6), -Math.sqrt(3)/3) }
  let {p, q, r} = invHexVec;
  let xy = xyScaled.scale(1/hexSize);
  return new Hex(xy.dot(p), xy.dot(q),xy.dot(r))
}


//const hexAxisList =   [{p:1, q:0, r:0}, {p:0, q:0, r:-1}, {p:0, q:1, r:0}, {p:-1, q:0, r:0},  {p:0, q:0, r:1}, {p:0, q:-1, r:0}]



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
  return new Hex(pi, qi, ri);
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
  mouseDownLocation = new Vec( event.offsetX, event.offsetY) ;
  document.body.querySelector("#board").addEventListener("mousemove", drag);
 document.body.querySelector("#board").addEventListener("mouseup", e => {
   document.body.querySelector("#board").removeEventListener("mousemove", drag);
 });
}

function mouseWheel(event){
  console.log(event.deltaY);
  if (event.deltaY>0){
    scale *= 1.1;
    screenOffset = screenOffset.scale(1/1.1);
  }
  if (event.deltaY<0){
    scale /= 1.1;
    screenOffset = screenOffset.scale(1.1);
  }
          reScale();
}

function drag(event){
  screenOffset = screenOffset.add(mouseDownLocation.scale(-1).add(new Vec(event.offsetX,  event.offsetY)).scale(-1/(scale)))
  mouseDownLocation =  new Vec( event.offsetX, event.offsetY) ;
      reScale();
}

function menuClick(event){
console.log("click" + selected.state);
if(selected.state == 3){
  if(event.offsetY < 100){
    hexObjects[selected.hex.id].station = {type: "base", owner: playerTurn}
    selected = {hex:null, state:0}
    possibleMoves = []; possibleAttacks = [];
  }
}
drawScreen();
}

function doo(event){
  let clickHex = hex_round(getHexFromXY(getRealXYfromScreenXY(new Vec(event.offsetX,  event.offsetY))))
  onHexClicked(clickHex);
  drawScreen();
  drawMenu();
}

function onHexClicked(clickHex){
if(selected.state ==3){

    if(clickHex.mag <= boardSize){selected = {hex:clickHex, state:1}}
    else{
      selected = {hex:null, state:0}
      possibleMoves = []; possibleAttacks = [];

  }
}

else if (selected.state == 2){
  if (selected.hex && selected.hex.compare(clickHex)){
    selected.state =3;
    possibleMoves = []; possibleAttacks = [];
    makeMenu();
  }
  else if(possibleMoves.length > 0 && possibleMoves.find( e =>  e.compare(clickHex))) {
    currentShip.location = clickHex;
    currentShip = null;
    selected = {hex:null, state:0} ;
    possibleMoves = []; possibleAttacks = []; //attacks if have some
  }
  else if(possibleAttacks.find(e =>  e.compare(clickHex))) {
    let target = shipArray.find(e => e.location.compare(clickHex));
    if(target){
      applyDamage(2, target);
      if(!shipArray.find(e => e === target)){currentShip.location = clickHex;}
    }else{console.log("error in attacks");}

    currentShip = null;
    selected = {hex:null, state:0} ;
    possibleMoves = []; possibleAttacks = [];
  }
  else if(clickHex.mag <=  boardSize){
    selected = {hex:clickHex, state:1};
    possibleMoves = []; possibleAttacks = [];
  };
}

else if (selected.state == 1){
  if (selected.hex && selected.hex.compare(clickHex)){
    currentShip = shipArray.find(e => e.location.compare(clickHex));
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
  if(clickHex.mag <=boardSize){selected = {hex:clickHex, state:1}}
}
}

function makeMenu(){menu = ["hi"]}

function setPossibleMoves(){
  let candiateMoves = findPossibleMoves(selected.hex);
  possibleMoves = [];
  for(let local in candiateMoves){
    let hex = candiateMoves[local]
    if(hex.mag <=  boardSize && !shipArray.find(e => e.location.compare(hex))){
      possibleMoves.push(hex);
    }
    if(shipArray.find(e => e.location.compare(hex))) {
      possibleAttacks.push(hex);
    }
  }
}

function findPossibleMoves(center, moveLeft = 5){
  let frontier = [{loc:center, cost:0}];
  let visited = {[center.id]: {loc:center, cost:true, from:null}}
  let itts = 0
  while (frontier.length > 0 && itts < 1000){
    let current = frontier.shift();
    itts ++;
    for (let next in Hex.neighbours()){
      let hex = Hex.neighbours()[next].add(current.loc)
      if (hex.mag <= boardSize ){
        let cost = current.cost + getTerrainCost( current.loc, hex);
        if(!(visited[hex.id] && cost >= visited[hex.id].cost) && cost < moveLeft){ // TODO WTF
          frontier.push({loc:hex, cost:cost});
          visited[hex.id] = {loc:hex, cost:current.cost + 1, from:current.loc};
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
  return terainCost[hexObjects[a.id].terain + hexObjects[b.id].terain]
}

 /// DRAW SCREEN

const hexVert = [new Vec(1,0),    new Vec((1/2), Math.sqrt(3)/2) , new Vec((-1/2), Math.sqrt(3)/2),
               new Vec(-1,0) ,     new Vec((-1/2), -Math.sqrt(3)/2),  new Vec((1/2), -Math.sqrt(3)/2)  ]
const triangleVert = [new Vec(1,0), new Vec(-1,0), new Vec(0,-1)];
const squareVert = [new Vec(1,1), new Vec(-1,1), new Vec(-1,-1), new Vec(1,-1)];


function drawScreen(){
  let line = [];

  for(let ho in hexObjects){
    if(hexObjects.hasOwnProperty(ho)){
      line.push(drawPolygon(hexVert, getXYfromHex(hexObjects[ho].hex),new Vec(0,0), hexSize, 1, "#25202D", "#120F22"  ));

      if( hexObjects[ho].terain == "nebula"){
        line.push(drawPolygon(hexVert, getXYfromHex(hexObjects[ho].hex),new Vec(0,0), hexSize, 2 , "#25202D", "grey"));
      }

      if( hexObjects[ho].station){
        line.push(drawPolygon(squareVert, getXYfromHex(hexObjects[ho].hex),new Vec(0,15), 10, 2 , playerColours[hexObjects[ho].station.owner], "white"));
      }
    }
  }

  for(let sh in shipArray){
    line.push(drawPolygon(triangleVert, getXYfromHex(shipArray[sh].location) ,new Vec(0,0), 30,  2 , playerColours[shipArray[sh].owner], playerColours[shipArray[sh].owner]));
    line.push(drawText(`${shipArray[sh].shield},${shipArray[sh].hull}`, getXYfromHex(shipArray[sh].location) ,new Vec(-15,0)));
  }

  if(selected.hex){
//    line.push(drawPolygon(hexVert, getXYfromHex(selected.hex),Vec(0,0), hexSize -5, 3 , "red"));
    for (let p in possibleMoves){
    line.push(drawPolygon(hexVert, getXYfromHex(possibleMoves[p]),new Vec(0,0), hexSize -5, 3 , "green"));
    }
    for (let p in possibleAttacks){
      line.push(drawPolygon(hexVert, getXYfromHex(possibleAttacks[p]),new Vec(0,0), hexSize -5, 3 , "purple"));
    }
    line.push(drawPolygon(hexVert, getXYfromHex(selected.hex),new Vec(0,0), hexSize -5, 3 , selectedColour[selected.state]));
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
    line.push(`<polygon points='20,20 60,20 60,60 20,60' stroke='white' stroke-width=2' fill='white' />`);
  }
  document.querySelector("#menu").innerHTML = line;
}

function coord_as_string(a){ return `${a.x},${a.y} `; }

function drawPolygon( pointVec, center, offset= new Vec(0,0), size=hexSize, stroke=2, colour="white", fill="none") {
  let positions = "";
  let location = center.add(offset );
  for(let i=0; i<pointVec.length; i++){
    positions = positions.concat(coord_as_string(pointVec[i].scale(size).add(location)));
  }
  return `<polygon points='${positions}' stroke='${colour}' stroke-width='${stroke}' fill='${fill}' />` ;
}

function drawText( text, center, offset= new Vec(0,0), size=20, fill="white") {
  let pos = center.add(offset)
  return  `<text x="${pos.x}" y="${pos.y}" fill="${fill}" style="font:bold ${size}px sans-serif"> ${text} </text>`
}
