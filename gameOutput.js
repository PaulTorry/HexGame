"use strict"

function getXYfromHex(hexCoord){return Hex.getXYfromUnitHex(hexCoord).scale(hexSize)}

const hexVert = [new Vec(1,0), new Vec((1/2), Math.sqrt(3)/2), new Vec((-1/2), Math.sqrt(3)/2), new Vec(-1,0), new Vec((-1/2), -Math.sqrt(3)/2), new Vec((1/2), -Math.sqrt(3)/2)]
const triangleVert = [new Vec(1,0), new Vec(-1,0), new Vec(0,-1)];
const triangleVert2 = [new Vec(1,0), new Vec(-1,0), new Vec(0,-1)];
const triangleVert3 = [new Vec(1,0), new Vec(0,0.3), new Vec(0,-0.3)];
const triangleVert4 = [new Vec(2,0), new Vec(0,1), new Vec(0,-1)];
const squareVert = [new Vec(1,1), new Vec(-1,1), new Vec(-1,-1), new Vec(1,-1)];

const baseShapes = {"asteroidMining":triangleVert, "scoutShip":triangleVert3, "inhabitedPlanet":hexVert,
"navBeacon":squareVert, "basicShip":triangleVert2, "assaultShip":triangleVert4
}

function drawScreen() {
  var c = document.getElementById("board").getContext("2d");
  c.clearRect(-99999,-99999,199999,199999);                            // FIX THIS @TODO
  c.fillStyle = '#ff0000';
  c.strokeStyle = '#ff00ff';
  c.lineWidth = 5

  for(let [ , tile] of tiles){
    drawPoly(c, hexVert, getXYfromHex(tile.hex), hexSize, 1,  "#25202D", "#120F22"  );
    if(tile.terrain !== "space"){
      // drawPoly(c, hexVert, getXYfromHex(tile.hex), hexSize, 2 , "#25202D", "grey");
      let image = document.getElementById(tile.terrain + "Pic");
      let {x,y} = getXYfromHex(tile.hex)
      c.drawImage(image, x - 50, y - 50, 100, 100);
    }
    if(tile.station){
      drawPoly(c, baseShapes[tile.station.type], getXYfromHex(tile.hex), 10, 4 , playerColours[tile.station.owner] );
    }
    if(tile.navBeacon){
      drawPoly(c, baseShapes["navBeacon"], getXYfromHex(tile.hex), 10, 4 , playerColours[tile.navBeacon.owner] );
    }
    let base = baseArray.find(b => b.location.compare(tile.hex));
    if(base){
      drawPoly(c, baseShapes["inhabitedPlanet"], getXYfromHex(tile.hex), 10, 4 , playerColours[base.owner] );

    }

  }
  for(let [ , tile] of tiles){
    let planet = whichPlanetsTerritory(tile.hex);
    if(planet) drawPoly(c, hexVert, getXYfromHex(tile.hex), hexSize, 1,  playerColours[planet.owner]  );
    if(debug) drawText(c, `${territoryState(tile.hex)}`, getXYfromHex(tile.hex).add(new Vec(-20,-20)) )
  }

  for(let ship of shipArray){
    let borderColour = "black";
    if (ship.owner == playerTurn && (!ship.moved || !ship.attacked)) {borderColour = "white"}
    drawPoly(c, baseShapes[ship.type], getXYfromHex(ship.location), 30,  2 , borderColour, playerColours[ship.owner]);
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

  drawMenu();
}

function drawMenu(){
  var c = document.getElementById("menu").getContext("2d");
  c.clearRect(-99999,-99999,199999,199999);
  c.strokeStyle = "white";
  if(menu.length > 0){
    for(let i=0; i<menu.length; i++){
      c.strokeRect (10+40*i, 10, 40, 40);
      drawPoly(c, baseShapes[menu[i]], new Vec(30+40*i, 30), 10, 4 , playerColours[playerTurn] );
    }
  }
  c.strokeStyle = playerColours[playerTurn];
  c.strokeRect (10, 50, 780, 40);
  c.stroke();
  drawText(c, `Player:  ${playerTurn}   Money:  ${playerData[playerTurn].money}`, new Vec(10,70), 28, "white" )
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
  c.beginPath();c.closePath();   // Hack to stop drawing after clear
}

function drawText(c, text, center = new Vec(0,0), size=28, color="blue", font= "Georgia"){
  let {x,y} = center//.scale(scale)
  c.font = `${size}px ${font}`;
  c.fillStyle = color;
  c.fillText(text, x, y);
  //  c.stroke();
}
