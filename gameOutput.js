"use strict"

function getXYfromHex(hexCoord){return Hex.getXYfromUnitHex(hexCoord).scale(hexSize)}

const hexVert = [new Vec(1,0),    new Vec((1/2), Math.sqrt(3)/2) , new Vec((-1/2), Math.sqrt(3)/2),  new Vec(-1,0) ,     new Vec((-1/2), -Math.sqrt(3)/2),  new Vec((1/2), -Math.sqrt(3)/2)  ]
const triangleVert = [new Vec(1,0), new Vec(-1,0), new Vec(0,-1)];
const squareVert = [new Vec(1,1), new Vec(-1,1), new Vec(-1,-1), new Vec(1,-1)];


function drawScreen() {
  var c = document.getElementById("myCanvas").getContext("2d");
  c.clearRect(-99999,-99999,199999,199999);                            // FIX THIS @TODO
  //c.translate(...[400,400]);
  c.fillStyle = '#ff0000';
  c.strokeStyle = '#ff00ff';
  c.lineWidth = 5

  for(let ho in hexObjects){
    if(hexObjects.hasOwnProperty(ho)){
      drawPoly(c, hexVert, getXYfromHex(hexObjects[ho].hex), hexSize, 1, "#25202D", "#120F22"  );

      if( hexObjects[ho].terain == "nebula"){
        drawPoly(c, hexVert, getXYfromHex(hexObjects[ho].hex), hexSize, 2 , "#25202D", "grey");
      }

      if( hexObjects[ho].station){
        drawPoly(c, squareVert, getXYfromHex(hexObjects[ho].hex), 10, 2 , playerColours[hexObjects[ho].station.owner], "white");
      }
    }
  }

  for(let sh in shipArray){
    drawPoly(c, triangleVert, getXYfromHex(shipArray[sh].location), 30,  2 , playerColours[shipArray[sh].owner], playerColours[shipArray[sh].owner]);
    //  line.push(drawText(`${shipArray[sh].shield},${shipArray[sh].hull}`, getXYfromHex(shipArray[sh].location) ,new Vec(-15,0)));
  }

  if(selected.hex){
    console.log("selected.hex" + selected.state);

    for (let p in possibleMoves){
      drawPoly(c, hexVert, getXYfromHex(possibleMoves[p]), hexSize -5, 3 , "green");
    }
    for (let p in possibleAttacks){
      drawPoly(c, hexVert, getXYfromHex(possibleAttacks[p]), hexSize -5, 3 , "purple");
    }
    drawPoly(c, hexVert, getXYfromHex(selected.hex), hexSize -5, 3 , selectedColour[selected.state]);
  }

//  c.translate(...[-400,-400]);
}

function drawMenu(){
  if (selected.state == 3){    }
}

function drawPoly(c, pointVec, center = new Vec(0,0), scale = 50, width, sColor, fColor){
  if(width){c.lineWidth = width};
  if(width){c.strokeStyle = sColor};
  if(width){c.fillStyle = fColor};

  c.moveTo(pointVec[0].x, pointVec[0].y);
  c.beginPath();
  for (let points in pointVec){
    let {x,y} = pointVec[points].scale(scale).add(center);
    c.lineTo(x, y)
  }
  c.closePath();
  c.stroke();
  if(fColor){c.fill();}
}
