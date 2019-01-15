"use strict"

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



function getRealXYfromScreenXY(a){return a.scale(1/scale).add(screenOffset)}
function getXYfromHex(hexCoord){return Hex.getXYfromUnitHex(hexCoord).scale(hexSize)}

function doo(event){
  let clickHex = Hex.getUnitHexFromXY(getRealXYfromScreenXY(new Vec(event.offsetX,  event.offsetY)).scale(1/hexSize))
  onHexClicked(clickHex);
  drawScreen();
  drawMenu();
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
