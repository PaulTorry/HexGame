"use strict"

function getXYfromHex(hexCoord){return Hex.getXYfromUnitHex(hexCoord).scale(hexSize)}

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
