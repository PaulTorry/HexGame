"use strict"

//  document.getElementById("menu").height = 500;
function getPlayerColour(player = playerTurn, opacity = 1, dark = false){
  const playerColours = ["green", "red", "lightblue", "orange", "purple", "brown"];
  const playerColoursNew = [    [0,154,129], [216,36,53], [147,38,143], [0,153,188],
  [177,0,95],[158,170,30], [216,130,25]];
  const playerColoursDark = [   [0,95,78],[130,5,20],[106,9,102],[0,90,112],[122,0,62],[101,112,8],[142,85,1]];

  let [r,g,b] = playerColoursNew[player];
  if (dark) [r,g,b] = playerColoursDark[player];
  return `rgba(${r},${g},${b},${opacity})`
}

function mapColours(string, player, transparency = 1){
  if(string == "rgb(130, 6, 20)")return getPlayerColour(player, transparency , 1)
  else if (string == "rgb(215, 35, 53)") return getPlayerColour(player, transparency);
  else if (string == "rgba(215, 35, 53, 0.00)") return getPlayerColour(player, 0);
  else return string;
}

// const playerColours = ["green", "red", "lightblue", "orange", "purple", "brown"];
const selectedColour = ["white","red", "blue", "orange"];


function getXYfromHex(hexCoord, size=hexSize){return Hex.getXYfromUnitHex(hexCoord).scale(size)}

function drawScreen() {
  var c = document.getElementById("board").getContext("2d");
  c.clearRect(-99999,-99999,199999,199999);                            // FIX THIS @TODO
  c.fillStyle = '#ff0000';
  c.strokeStyle = '#ff00ff';
  c.lineWidth = 5

  let viewMask = getUpdatedViewMask(playerTurn);

  for(let [id , tile] of tiles){
    if(viewMask[id]){
      let {x,y} = getXYfromHex(tile.hex)
      drawPoly(c, hexVert, getXYfromHex(tile.hex), hexSize, 1,  "rgb(37,32,45)", "rgb(18,15,34," + 0.5 * viewMask[id] + ")"  );
      if(tile.terrain !== "space"){
      //  let {x,y} = getXYfromHex(tile.hex)
        if(terrainCurves[tile.terrain]){
          drawFromData(c, terrainCurves[tile.terrain], x, y)
        }
        // drawPoly(c, hexVert, getXYfromHex(tile.hex), hexSize, 2 , "#25202D", "grey");
        else{
          let image = document.getElementById(tile.terrain + "Pic");
          c.drawImage(image, x - 70, y - 70, 140, 140);
        }
      }
      if(tile.station){
        if(tile.station.type = "asteroidBase"){drawFromData(c, asteroidBase, x, y, tile.station.owner)  }
        else drawPoly(c, asteroidBase, getXYfromHex(tile.hex), 10, 4 , getPlayerColour(tile.station.owner) );
      }
      if(tile.navBeacon){
        drawPoly(c, baseShapes["navBeacon"], getXYfromHex(tile.hex), 10, 4 , getPlayerColour(tile.navBeacon.owner) );
      }
      let base = baseArray.find(b => b.location.compare(tile.hex));
      if(base){
        if(planetRing){drawFromData(c, planetRing, x, y, base.owner)}
        else drawPoly(c, baseShapes["inhabitedPlanet"], getXYfromHex(tile.hex), 10, 4 , getPlayerColour(base.owner) );
      }
    }
    drawPoly(c, hexVert, getXYfromHex(tile.hex), hexSize, 1,  "rgb(37,32,45)",  );

  }

  for(let [id , tile] of tiles){
    if(viewMask[id]){
      let planet = whichPlanetsTerritory(tile.hex);
      if(planet) drawPoly(c, hexVert, getXYfromHex(tile.hex), hexSize, 1,  getPlayerColour(planet.owner)  );
      if(debug) drawText(c, `${territoryState(tile.hex)}`, getXYfromHex(tile.hex).add(new Vec(-20,-20)),10 )
      if(debug) drawText(c, `${tile.hex.id}`, getXYfromHex(tile.hex).add(new Vec(-20,+30)),14, "grey" )
    }
  }

  for(let ship of shipArray){
    if(viewMask[ship.location.id] == 2){
      let borderColour = "black";
      if (ship.owner == playerTurn && (!ship.moved || !ship.attacked)) {borderColour = "white"}

      if (curves[ship.type]){
        let {x,y} = getXYfromHex(ship.location);
        let transparency = 1;
        if (ship.owner == playerTurn && (ship.moved && ship.attacked)) {transparency =  0.4}
        drawFromData(c, curves[ship.type], x, y, ship.owner, transparency)
      }
      else if (baseShapes[ship.type]){
        drawPoly(c, baseShapes[ship.type], getXYfromHex(ship.location), 30,  2 , borderColour, getPlayerColour(ship.owner));
      }

      drawText(c, `${ship.shield}|${ship.hull}`, getXYfromHex(ship.location).add(new Vec(-20,0)), 14, "white")
    }
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

  // why cant this go atr top, very odd behavoiur
  playerData[playerTurn].viewMask = removeActiveViews(viewMask);

  drawMenu();
}

function drawMenu(){

  var c = document.getElementById("menu").getContext("2d");
  c.clearRect(-99999,-99999,199999,199999);
  c.strokeStyle = "white";
  if(menu.length > 0){
    for(let i=0; i<menu.length; i++){
      c.strokeRect (10+60*i, 10, 60, 40);

      if(curves[menu[i]]){
        drawFromData(c, curves[menu[i]], 30+60*i, 40, playerTurn)
      }

      else if(baseShapes[menu[i]]){
        drawPoly(c, baseShapes[menu[i]], new Vec(30+60*i, 30), 10, 4 , getPlayerColour(playerTurn) );
      } else i
    }
  }
  c.strokeStyle = getPlayerColour(playerTurn);
  c.strokeRect (10, 50, 780, 40);
  c.strokeRect (600, 10, 190, 40);
  c.stroke();
  c.stroke();
  drawText(c, `Player:  ${playerTurn}   Money:  ${playerData[playerTurn].money}`, new Vec(10,70), 28, "white" )
  drawText(c, `Tech Tree`, new Vec(600,30), 20, "white" )

  if (openTechTree){
    techs.forEach((t)=>{
      let center = getXYfromHex(t.location, 50).add(techTreeOffset);
      let colour = "red";
      if (playerData[playerTurn].tech[t.tech]) {colour = "yellow"}
      drawPoly(c, hexVert, center, 50, 1,  "white", "#120F22"  );
      drawText(c, `${t.tech}`, center.add(new Vec(-30,0)) , 14, colour )
      drawText(c, `${t.cost}`, center.add(new Vec(-20,-20)) , 14, "white" )
      //    console.log(getXYfromHex(t.location));
    })


  }
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


function drawFromData(c, data, xx=0, yy=0, player, transparency){
  let add = (a, x, y) => a.map((v,i) => i%2 ? v+y  : v+x)
  let gradient;
  let x = xx;
  let y = yy;

  data.forEach(([t, ...v]) => {
    if(t == "sv") c.save();
    else if(t == "of") {x = xx + v[0]; y = yy + v[1];}
    else if(t == "bp") c.beginPath();
    else if(t == "mt") c.moveTo(...add(v,x,y));
    else if(t == "lt") c.lineTo(...add(v,x,y));
    else if(t == "lw") c.lineWidth = v[0];
    else if(t == "cp") c.closePath();
    else if(t == "fs"){
      if (v && v[0] ){ c.fillStyle = mapColours(v[0], player, transparency); }
      else if (gradient) {c.fillStyle = gradient};
    }
    else if(t == "ss"){ if (v){ c.strokeStyle = mapColours(v[0], player, transparency);}}
    else if(t == "fl") c.fill();
    else if(t == "ct") c.bezierCurveTo(...add(v,x,y));
    else if(t == "re") c.restore();
    else if(t == "st") c.stroke()
    else if(t == "tr") c.transform(...v)
    else if(t == "xrg"){gradient = c.createRadialGradient(v[0]+x,v[1]+y,v[2],v[3]+x,v[4]+y,v[5])    }
    else if(t == "xlg"){gradient = c.createLinearGradient(...add(v,x,y))
    }
    else if(t == "xcs"){
      gradient.addColorStop(v[0],mapColours(v[1], player, transparency))
    }
  })

  c.beginPath();c.closePath(); // Hack to stop drawing after clear

  if (c.data) return c.data;
}


function drawText(c, text, center = new Vec(0,0), size=28, color="blue", font= "Georgia"){
  let {x,y} = center//.scale(scale)
  c.font = `${size}px ${font}`;
  c.fillStyle = color;
  c.fillText(text, x, y);
  //  c.stroke();
}
