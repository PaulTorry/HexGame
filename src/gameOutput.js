"use strict"



/*global
screenSettings, Vec, Hex,
drawScreen,  sel, state,
getUpdatedViewMask,
simpleShapes,
 Map,  makeNewViewMask, preturn,
curves, debug, territoryState,  whichPlanetsTerritory,
baseShapes,
data,

*/


/* eslint-disable no-unused-vars */


//  document.getElementById("menu").height = 500;



function getPlayerColour(player = state.playerTurn, opacity = 1, mid = false, dark = false){
  const playerColours = ["green", "red", "lightblue", "orange", "purple", "brown"];
  const playerColoursNew = [    [33,163,79], [216,36,53], [124,0,255], [0,131,219],
  [177,0,95],[158,170,30], [216,130,25]];
  const playerColoursMid = [    [3,124,52], [158,28,35], [95,0,186], [0,113,170],
  [139,0,73],[126,137,20], [172,104,14]];
  const playerColoursDark = [   [0,110,43],[130,6,20],[19,55,-70],[0,80,124],[122,0,62],[101,112,8],[142,85,1]];

  let [r,g,b] = playerColoursNew[player];
  if (mid) [r,g,b] = playerColoursMid[player];
  if (dark) [r,g,b] = playerColoursDark[player];
  return `rgba(${r},${g},${b},${opacity})`
}

function mapColours(string, player, transparency = 1){
  if(string === "rgb(130, 6, 20)")return getPlayerColour(player, transparency , 1) // MAYBE 0,1)
  else if (string === "rgb(158, 28, 35)") return getPlayerColour(player, transparency, 1);
  else if (string === "rgb(215, 35, 53)") return getPlayerColour(player, transparency);
  else if (string === "rgba(215, 35, 53, 0.00)") return getPlayerColour(player, 0);
  else return string;
}

const selectedColour = ["white", "purple", "blue", "orange"];


function getXYfromHex(hexCoord, size=screenSettings.hexSize){return Hex.getXYfromUnitHex(hexCoord).scale(size)}

function drawScreen() {
  let ss = screenSettings;
  var c = document.getElementById("board").getContext("2d");
  c.clearRect(-99999,-99999,199999,199999);                            // FIX THIS @TODO
  c.fillStyle = '#ff0000';
  c.strokeStyle = '#ff00ff';
  c.lineWidth = 5

  let viewMask = getUpdatedViewMask(state)
  if (preturn){
    viewMask = makeNewViewMask(new Map());
    drawText(c, `Click to Start`, getXYfromHex(state.playerData[state.playerTurn].capital), 30, "white" )
  }

  for(let [id , tile] of state.tiles){
    if(viewMask[id] || debug){
      let {x,y} = getXYfromHex(tile.hex)
      drawPoly(c, simpleShapes["hexVert"], getXYfromHex(tile.hex), ss.hexSize, 1,  "rgb(37,32,45)", "rgb(18,15,34," + 0.5 * (viewMask[id] || debug) + ")"  );
      if(tile.terrain !== "space"){
        if(curves[tile.terrain]){
          drawFromData(c, curves[tile.terrain], x, y)
        }
        else{
          let image = document.getElementById(tile.terrain + "Pic");
          c.drawImage(image, x - 70, y - 70, 140, 140);
        }
      }
      if(tile.station){
        if(tile.station.type === "asteroidMining"){drawFromData(c, curves["asteroidMining"], x, y, tile.station.owner)  }
        else drawPoly(c, baseShapes["asteroidMining"], getXYfromHex(tile.hex), 10, 4 , getPlayerColour(tile.station.owner) );
      }
      if(tile.navBeacon){
        drawPoly(c, baseShapes["navBeacon"], getXYfromHex(tile.hex), 10, 4 , getPlayerColour(tile.navBeacon.owner) );
      }
      let base = state.baseArray.find(b => b.hex.compare(tile.hex));
      if(base){
        if(curves["planetRing"]){drawFromData(c, curves["planetRing"], x, y, base.owner)}
        else drawPoly(c, baseShapes["inhabitedPlanet"], getXYfromHex(tile.hex), 10, 4 , getPlayerColour(base.owner) );
      }
    }
    drawPoly(c, simpleShapes["hexVert"], getXYfromHex(tile.hex), ss.hexSize, 2,  "rgb(37,32,45)");

  }

  for(let [id , tile] of state.tiles){
    if(viewMask[id] || debug ){
      let planet = whichPlanetsTerritory(tile.hex);
      if(planet) drawPoly(c,  simpleShapes["hexVert"], getXYfromHex(tile.hex), ss.hexSize, 1,  getPlayerColour(planet.owner)  );
      if(debug) drawText(c, `${territoryState(tile.hex)}`, getXYfromHex(tile.hex).add(new Vec(-30,-30)),14 )
      if(debug) drawText(c, `${tile.hex.id}`, getXYfromHex(tile.hex).add(new Vec(-40,+40)),14, "grey" )
    }
  }

  for(let ship of state.shipArray){
    if(viewMask[ship.hex.id] === 2 || debug){
      let borderColour = "black";
      if (ship.owner === state.playerTurn && (!ship.moved || !ship.attacked)) {borderColour = "white"}

      if (curves[ship.type]){
        let {x,y} = getXYfromHex(ship.hex);
        let transparency = 1;
        if (ship.owner === state.playerTurn && (ship.moved && ship.attacked)) {transparency =  0.4}
        drawFromData(c, curves[ship.type], x, y, ship.owner, transparency)
      }
      else if (baseShapes[ship.type]){
        drawPoly(c, baseShapes[ship.type], getXYfromHex(ship.hex), 30,  2 , borderColour, getPlayerColour(ship.owner));
      }

      drawText(c, `${Math.round(ship.shield+ship.hull)}(${ship.hull})`, getXYfromHex(ship.hex).add(new Vec(-20,0)), 28, "white")
    }
  }

  if(sel.hex){
    for (let move of sel.moves){
      drawPoly(c,  simpleShapes["hexVert"], getXYfromHex(move), ss.hexSize -5, 3 , "rgb(166,191,187)");
    }
    for (let attack of sel.attacks){
      drawPoly(c,  simpleShapes["hexVert"], getXYfromHex(attack), ss.hexSize -5, 3 , "red");
    }
    drawPoly(c,  simpleShapes["hexVert"], getXYfromHex(sel.hex), ss.hexSize -5, 3 , selectedColour[sel.state]);
  }
  drawMenu();
}

function drawMenu(){
  let ss = screenSettings;
  var c = document.getElementById("menu").getContext("2d");
  document.getElementById("menu").height = 100 + 300 * ss.openTechTree;
  c.clearRect(-99999,-99999,199999,199999);
  c.strokeStyle = "white";
  if(sel.menu && sel.menu.length > 0){
    let menu = sel.menu
    for(let i=0; i<menu.length; i++){
      c.strokeRect (110+60*i, 10, 60, 80);

      if(curves[menu[i]]){
        drawFromData(c, curves[menu[i]], 130+60*i, 40, state.playerTurn)
      }

      else if(baseShapes[menu[i]]){
        drawPoly(c, baseShapes[menu[i]], new Vec(130+60*i, 30), 10, 4 , getPlayerColour(state.playerTurn) );
      } else i
    }
  }
  c.strokeStyle = getPlayerColour(state.playerTurn);
  c.strokeRect (10, 10, 80, 80);
  c.strokeRect (710, 10, 80, 80);
  c.stroke();
  c.stroke();
  drawText(c, `Player: ${state.playerTurn}`, new Vec(10,30), 15, "white" )
  if(!preturn) drawText(c, `Money:  ${state.playerData[state.playerTurn].money}`, new Vec(10,60), 15, "white" )

  drawText(c, `Tech Tree`, new Vec(720,30), 15, "white" )

  if (screenSettings.openTechTree){
    data.techs.forEach((t)=>{
      let center = getXYfromHex(t.hex, 35).add(ss.techTreeOffset);
      let colour = "red";
      if (state.playerData[state.playerTurn].tech[t.tech]) {colour = "yellow"}
      drawPoly(c, simpleShapes["hexVert"], center, 50, 1,  "white", "#120F22"  );
      drawText(c, `${t.tech}`, center.add(new Vec(-30,0)) , 14, colour )
      drawText(c, `${t.cost}`, center.add(new Vec(-20,-20)) , 14, "white" )
    })
  }
}

function drawPoly(c, pointVec, center = new Vec(0,0), scale = 50, width, sColor, fColor){
  if(width){c.lineWidth = width}
  if(sColor){c.strokeStyle = sColor}
  if(fColor){c.fillStyle = fColor}

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

  //c.save();
  //c.shadowColor = "rgba(0, 0, 0, 0.35)";
  //c.shadowOffsetX = 3.0;
  //c.shadowOffsetY = 3.0;
  //c.shadowBlur = 10.0;

  data.forEach(([t, ...v]) => {
    if(t === "sv") c.save();
    else if(t === "of") {x = xx + v[0]; y = yy + v[1];}
    else if(t === "bp") c.beginPath();
    else if(t === "mt") c.moveTo(...add(v,x,y));
    else if(t === "lt") c.lineTo(...add(v,x,y));
    else if(t === "lw") c.lineWidth = v[0];
    else if(t === "cp") c.closePath();
    else if(t === "fs"){
      if (v && v[0] ){ c.fillStyle = mapColours(v[0], player, transparency); }
      else if (gradient) {c.fillStyle = gradient}
    }
    else if(t === "ss"){ if (v){ c.strokeStyle = mapColours(v[0], player, transparency);}}
    else if(t === "fl") c.fill();
    else if(t === "ct") c.bezierCurveTo(...add(v,x,y));
    else if(t === "re") c.restore();
    else if(t === "st") c.stroke()
    else if(t === "tr") c.transform(...v)
    else if(t === "xrg"){gradient = c.createRadialGradient(v[0]+x,v[1]+y,v[2],v[3]+x,v[4]+y,v[5])    }
    else if(t === "xlg"){gradient = c.createLinearGradient(...add(v,x,y))
    }
    else if(t === "xcs"){
      gradient.addColorStop(v[0],mapColours(v[1], player, transparency))
    }
  })
  c.shadowOffsetX = 0;
  c.shadowOffsetY = 0;
  c.shadowBlur = 0.0;
  c.restore()
  c.beginPath();c.closePath(); // Hack to stop drawing after clear

  if (c.data) return c.data;
}


function drawText(c, text, center = new Vec(0,0), size=28, color="blue", font= "Helvetica"){
  let {x,y} = center;
  c.font = `${size}px ${font}`;
  c.fillStyle = color;
  c.fillText(text, x, y);
  //  c.stroke();
}
