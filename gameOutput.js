"use strict"

function getXYfromHex(hexCoord){return Hex.getXYfromUnitHex(hexCoord).scale(hexSize)}

const hexVert = [new Vec(1,0), new Vec((1/2), Math.sqrt(3)/2), new Vec((-1/2), Math.sqrt(3)/2), new Vec(-1,0), new Vec((-1/2), -Math.sqrt(3)/2), new Vec((1/2), -Math.sqrt(3)/2)]
const triangleVert = [new Vec(1,0), new Vec(-1,0), new Vec(0,-1)];
const squareVert = [new Vec(1,1), new Vec(-1,1), new Vec(-1,-1), new Vec(1,-1)];
//const picNames = {"nebula":"nebula.svg", "planet":"planet.svg", "asteroids":"asteroids.svg", "gas giant.svg"}

function drawScreen() {
  var c = document.getElementById("board").getContext("2d");
  c.clearRect(-99999,-99999,199999,199999);                            // FIX THIS @TODO
  c.fillStyle = '#ff0000';
  c.strokeStyle = '#ff00ff';
  c.lineWidth = 5

  for(let [ , tile] of tiles){
    drawPoly(c, hexVert, getXYfromHex(tile.hex), hexSize, 1, "#25202D", "#120F22"  );
    if(tile.terain !== "space"){
      // drawPoly(c, hexVert, getXYfromHex(tile.hex), hexSize, 2 , "#25202D", "grey");
      let image = document.getElementById(tile.terain + "Pic");
      let {x,y} = getXYfromHex(tile.hex)
      c.drawImage(image, x - 50, y - 50, 100, 100);
    }
    if(tile.station){
      drawPoly(c, squareVert, getXYfromHex(tile.hex), 10, 2 , playerColours[tile.station.owner] );
    }
  }

  for(let ship of shipArray){
    let borderColour = "black";
    if (ship.owner == playerTurn && (!ship.moved || !ship.attacked)) {borderColour = "white"}
    drawPoly(c, triangleVert, getXYfromHex(ship.location), 30,  2 , borderColour, playerColours[ship.owner]);
    drawText(c, `${ship.shield}|${ship.hull}`, getXYfromHex(ship.location).add(new Vec(-20,0)) )
  }

  if(selected.hex){
    for (let move of possibleMoves){
      drawPoly(c, hexVert, getXYfromHex(move), hexSize -5, 3 , "green");
    }
    for (let attack of possibleAttacks){
      drawPoly(c, hexVert, getXYfromHex(attack), hexSize -5, 3 , "purple");
    }
    drawPoly(c, hexVert, getXYfromHex(selected.hex), hexSize -5, 3 , selectedColour[selected.state]);
  }
  //debug move   // for(let h in terainCostMap){ drawText(c, terainCostMap[h].moveOn + "," + terainCostMap[h].moveOff , getXYfromHex(terainCostMap[h].hex).add(new Vec(-20,20)) ); }

  drawMenu();
}

function drawMenu(){
  var c = document.getElementById("menu").getContext("2d");
  c.strokeStyle = "white"
  for(let i=0; i<menu.length; i++){c.strokeRect (10+40*i, 10, 40, 40)}

  c.strokeStyle = playerColours[playerTurn];
  c.strokeRect (10, 50, 780, 40);

  if (selected.state == 3){    }
}

function drawPoly(c, pointVec, center = new Vec(0,0), scale = 50, width, sColor, fColor){
  if(width){c.lineWidth = width};
  if(sColor){c.strokeStyle = sColor};
  if(fColor){c.fillStyle = fColor};

  c.moveTo(pointVec[0].x, pointVec[0].y);
  c.beginPath();
  for (let point of pointVec){
    let {x,y} = point.scale(scale).add(center);
    c.lineTo(x, y)
  }
  c.closePath();
  c.stroke();
  if(fColor){c.fill();}
}

function drawText(c, text, center = new Vec(0,0), size=28, color="blue", font= "Georgia"){
  let {x,y} = center//.scale(scale)
  c.font = `${size}px ${font}`;
  c.fillStyle = color;
  c.fillText(text, x, y);
  c.stroke();
}
