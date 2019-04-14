"use strict"



/*global
screenSettings, Vec, Hex,
drawScreen,  sel, state,
getUpdatedViewMask,
simpleShapes, getTerrainDamage
 Map,  makeNewViewMask, preturn,
gameSprites, debug, territoryState,  whichPlanetsTerritory,
baseShapes,
data,

*/


/* eslint-disable no-unused-vars */


//  document.getElementById("menu").height = 500;



function getPlayerColour(player = state.playerTurn, opacity = 1, mid = false, dark = false){
  const playerColours = ["green", "red", "lightblue", "orange", "purple", "brown"];
  const playerColoursNew = [    [33,163,79], [216,36,53], [124,0,255], [0,131,219],
    [177,0,95],[158,170,30], [216,130,25]];
  const playerColoursMid = [    [3,124,52], [158,28,35], [95,0,186], [0,107,188],
    [139,0,73],[126,137,20], [172,104,14]];
  const playerColoursDark = [   [0,110,43],[130,6,20],[58,5,161],[0,74,156],[122,0,62],[101,112,8],[142,85,1]];

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

function getColMap(player, transparency = 1){
  return (v) =>  mapColours(v, player, transparency)
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
  }

  for(let [id , tile] of state.tiles){
    if(viewMask[id] || debug){
      let {x,y} = getXYfromHex(tile.hex)//.subtract(new Vec(screenSettings.hexSize,screenSettings.hexSize))
      drawPoly(c, simpleShapes["hexVert"], getXYfromHex(tile.hex), ss.hexSize, 1,  "rgb(37,32,45)", "rgb(18,15,34)"  );

      if(tile.terrain !== "space"){
        if(gameSprites[tile.terrain]){
          drawFromData(c, gameSprites[tile.terrain], x, y)
        }
        if(gameSprites[tile.resource]){
          drawFromData(c, gameSprites[tile.resource], x, y)
        }

      }
      if(tile.station){
        drawFromData(c, gameSprites[tile.station.type], x, y,  getColMap(tile.station.owner))
        // if(tile.station.type === "asteroidMining"){drawFromData(c, curves["asteroidMining"], x, y, tile.station.owner)  }
        // else drawPoly(c, baseShapes["asteroidMining"], getXYfromHex(tile.hex), 10, 4 , getPlayerColour(tile.station.owner) );
      }
      if(tile.navBeacon){
        drawPoly(c, baseShapes["navBeacon"], getXYfromHex(tile.hex), 10, 4 , getPlayerColour(tile.navBeacon.owner) );
      }
      let base = state.baseArray.find(b => b.hex.compare(tile.hex));
      if(base){
        if(gameSprites["planetRing"]){drawFromData(c, gameSprites["planetRing"], x, y, getColMap(base.owner))}
        else drawPoly(c, baseShapes["inhabitedPlanet"], getXYfromHex(tile.hex), 10, 4 , getPlayerColour(base.owner) );
      }
      if(viewMask[id] === 1){
        drawPoly(c, simpleShapes["hexVert"], getXYfromHex(tile.hex), ss.hexSize, 1,  "rgba(200,200,200,0.1)", "rgba(200,200,200,0.1)"  );
      }
    }
    drawPoly(c, simpleShapes["hexVert"], getXYfromHex(tile.hex), ss.hexSize, 2,  "rgb(37,32,45)");

  }

  for(let [id , tile] of state.tiles){
    if(viewMask[id] || debug ){
      let planet = whichPlanetsTerritory(tile.hex);
      if(planet) drawPoly(c,  simpleShapes["hexVert"], getXYfromHex(tile.hex), ss.hexSize, 1,  getPlayerColour(planet.owner, 1, 0, 1)  );
      if(debug) drawText(c, `${territoryState(tile.hex)}`, getXYfromHex(tile.hex).add(new Vec(-30,-30)),14 )
      if(debug) drawText(c, `${tile.hex.id}`, getXYfromHex(tile.hex).add(new Vec(-40,+40)),14, "grey" )
    }
  }

  for(let ship of state.shipArray){
    if(viewMask[ship.hex.id] === 2 || debug){
      let borderColour = "black";
      if (ship.owner === state.playerTurn && (!ship.moved || !ship.attacked)) {borderColour = "white"}

      if (gameSprites[ship.type]){
        let {x,y} = getXYfromHex(ship.hex);
        let transparency = 1;
        if (ship.owner === state.playerTurn && (ship.moved && ship.attacked)) {transparency =  0.4}
        drawFromData(c, gameSprites[ship.type], x, y, getColMap(ship.owner, transparency))
      }
      // else if (baseShapes[ship.type]){
      //   drawPoly(c, baseShapes[ship.type], getXYfromHex(ship.hex), 30,  2 , borderColour, getPlayerColour(ship.owner));
      // }

      //drawText(c, `${Math.round(ship.shield+ship.hull)}(${ship.hull})`, getXYfromHex(ship.hex).add(new Vec(-20,45)), 20, "white")
      drawText(c, `${Math.round(ship.shield+ship.hull)}`, getXYfromHex(ship.hex).add(new Vec(-20,45)), 20, "white")
      drawText(c, `(${ship.hull})`, getXYfromHex(ship.hex).add(new Vec(10,45)), 15, "orange")
    }
  }

  if(sel.hex){
    for (let move of sel.moves){
      if(getTerrainDamage(sel.ship, move) > 0) drawPoly(c,  simpleShapes["hexVert"], getXYfromHex(move), ss.hexSize -5, 3 , "rgb(255,91,87)");
      else drawPoly(c,  simpleShapes["hexVert"], getXYfromHex(move), ss.hexSize -5, 3 , "rgb(166,191,187)");
    }
    for (let attack of sel.attacks){
      drawPoly(c,  simpleShapes["hexVert"], getXYfromHex(attack), ss.hexSize -5, 3 , "red");
    }
    drawPoly(c,  simpleShapes["hexVert"], getXYfromHex(sel.hex), ss.hexSize -5, 3 , selectedColour[sel.state]);
  }

  if (preturn){
  //  viewMask = makeNewViewMask(new Map());
    let playerLoc = getXYfromHex(state.playerData[state.playerTurn].capital);
    let {x,y} = playerLoc;
    drawFromData(c, gameSprites["logo"], x-20, y-230, (x)=>x , 0.3)
    drawText(c, `Player ${state.playerTurn}`, playerLoc, 50, getPlayerColour(state.playerTurn) )
    drawText(c, `Click to Start`, playerLoc.add(new Vec(0,50)), 30, "white" )
  }

  drawMenu();
}



function drawMenu(){
  let arrows = [];
  let ss = screenSettings;
  var c = document.getElementById("menu").getContext("2d");
  document.getElementById("menu").height = 100 + 700 * ss.openTechTree;
  c.clearRect(-99999,-99999,199999,199999);
  c.strokeStyle = "white";

  if(sel.menu && sel.menu.length > 0 && !screenSettings.openTechTree){
    console.log(sel.menu);
    let menu = sel.menu;
    for(let i=0; i<menu.length; i++){

      if(gameSprites[menu[i]]){
        drawFromData(c, gameSprites["roundedHex"], 110+70*i, 30, getColMap(state.playerTurn, 1) ,0.35)
        drawFromData(c, gameSprites[menu[i]], 140+70*i, 60, getColMap(state.playerTurn, 1) ,0.5)
        let details = data.thingList.find(t => t.thing === menu[i]);
        drawText(c, `${details.price}`, new Vec(125+70*i, 40), 10, "white" )
        drawText(c, `${details.name}`, new Vec(115+70*i, 95), 10, "white" )
      }
    }
  }
  c.strokeStyle = getPlayerColour(state.playerTurn);
  drawFromData(c, gameSprites["nextTurnButton"], 0, 0, getColMap(state.playerTurn, 1) ,0.15);
  drawFromData(c, gameSprites["logo"], 650, 0, getColMap(state.playerTurn, 1), 0.08)
  drawFromData(c, gameSprites["techTreeButton"], 700, 0, getColMap(state.playerTurn, 1) ,0.15)
  //c.rect(655, 5, 45, 45);
  c.stroke();

  drawText(c, `Player: ${state.playerTurn}`, new Vec(100,20), 15, "white" )
  drawText(c, `Turn: ${state.turnNumber}`, new Vec(180,20), 15, "white" )
  if(!preturn) drawText(c, `Money:  ${state.playerData[state.playerTurn].money}  ( ${state.playerData[state.playerTurn].income} )`, new Vec(245,20), 15, "white" )
  if(!preturn) drawText(c, `City Points: **`, new Vec(360,20), 15, "white" )

  if (screenSettings.openTechTree){
    data.techs.forEach((t)=>{
      if (t.requires){ t.requires.forEach(r => {
        arrows.push([t.hex, data.techs.filter(tt => tt.tech === r)[0].hex]);
      })}
    })

    arrows.forEach(a => {
      drawArrow(c, getXYfromHex(a[1],35).add(ss.techTreeOffset),getXYfromHex(a[0],35).add(ss.techTreeOffset));
    })

    data.techs.forEach((t)=>{
      let center = getXYfromHex(t.hex, 35).add(ss.techTreeOffset);
      let {x,y} = center;

      let draw = t.cost < 99;

      //let col = `rgb(${t.colour[0]},${t.colour[1]},${t.colour[2]})`

      if (t.cost > 99){
        drawFromData(c, gameSprites["roundedHex"], x - 48, y - 43, x => "rgb(0,0,0)" ,0.55);
      }

      else if (state.playerData[state.playerTurn].tech[t.tech]) {
        drawFromData(c, gameSprites["roundedHex"], x - 48, y - 43, undefined ,0.55)
        drawFromData(c, gameSprites["roundedHexOutline"], x - 48, y - 43, getColMap(state.playerTurn, 1) ,0.55)

      } else if ( t.cost > 99 || (t.requires &&
        t.requires.find(r => !state.playerData[state.playerTurn].tech[r])
      )) {
        drawFromData(c, gameSprites["roundedHex"], x - 48, y - 43, undefined ,0.55)
        drawFromData(c, gameSprites["roundedHexOutline"], x - 48, y - 43, x => "rgb(0,0,0)" ,0.55)
      } else {// if (draw){
        drawFromData(c, gameSprites["roundedHex"], x - 48, y - 43, undefined ,0.55)
        drawFromData(c, gameSprites["roundedHexOutline"], x - 48, y - 43, x => "rgb(255,255,255)" ,0.55)
      }
      //  else{
      //   drawFromData(c, gameSprites["roundedHex"], x - 48, y - 43, x => "rgb(0,0,0)" ,0.55)
      // }

      if((draw || debug) && t.sprite) {
        t.sprite.forEach(s => {
          drawFromData(c, gameSprites[s[0]], x+s[1] , y+s[2] , getColMap(state.playerTurn, 1) ,0.55*s[3])
        })
      }
      if(draw || debug) drawText(c, `${t.name}`, center.add(new Vec(-30,25)) , 12, "white" )
      if(draw || debug) drawText(c, `${t.cost}`, center.add(new Vec(-20,-20)) , 12, "white" )
    })
  }
}

function drawPoly(c, pointVec, center = new Vec(0,0), scale = 50, width, sColor, fColor){
  if(width){c.lineWidth = width}
  if(sColor){c.strokeStyle = sColor}
  if(fColor){c.fillStyle = fColor}

  c.lineWidth = 3;
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

function drawArrow(c, start, end, width = 3, color){
//  console.log(start,end);
  let midpoint = start.add(end).scale(0.5);
  //c.strokeStyle = sColor                          // keep col form last func
  c.lineWidth = width;
  c.beginPath();
  c.moveTo(start.x, start.y);
  c.lineTo(end.x, end.y);
  c.stroke();
  c.closePath();
}

function drawFromData(c, data, xx=0, yy=0, colourMap = x=>x, scale = 1, rotation = 0){

  let add = (a, x, y) => a.map((v,i) => i%2 ? v*scale+y  : v*scale+x);
  let gradient;
  let x = xx;
  let y = yy;

  //c.save();
  //c.shadowColor = "rgba(0, 0, 0, 0.35)";
  //c.shadowOffsetX = 3.0; c.shadowOffsetY = 3.0;
  //c.shadowBlur = 10.0;

  data.forEach(([t, ...v]) => {
    if(t === "sv") c.save();
    else if(t === "of") {x = xx + v[0]*scale; y = yy + v[1]*scale;}
    else if(t === "bp") c.beginPath();
    else if(t === "mt") c.moveTo(...add(v,x,y));
    else if(t === "lt") c.lineTo(...add(v,x,y));
    else if(t === "lw") c.lineWidth = v[0];
    else if(t === "cp") c.closePath();
    else if(t === "fs"){
      if (v && v[0] ){ c.fillStyle = colourMap(v[0]); }
      else if (gradient) {c.fillStyle = gradient}
    }
    else if(t === "ss"){ if (v){ c.strokeStyle = colourMap(v[0]);}}
    else if(t === "fl") c.fill();
    else if(t === "ct") c.bezierCurveTo(...add(v,x,y));
    else if(t === "re") c.restore();
    else if(t === "st") c.stroke()
    //else if(t === "tr") c.transform(...v)
    else if(t === "xrg"){gradient = c.createRadialGradient(v[0]*scale+x,v[1]*scale+y,v[2]*scale,v[3]*scale+x,v[4]*scale+y,v[5]*scale)    }
    else if(t === "xlg"){gradient = c.createLinearGradient(...add(v,x,y))
    }
    else if(t === "xcs"){gradient.addColorStop(v[0], colourMap(v[1])) }
  })
  c.shadowOffsetX = 0;  c.shadowOffsetY = 0;  c.shadowBlur = 0.0;
  c.restore(); c.beginPath();c.closePath(); // Hack to stop drawing after clear

  if (c.data) return c.data;
}


function drawText(c, text, center = new Vec(0,0), size=28, color="blue", font= "Helvetica"){
  let {x,y} = center;
  c.font = `${size}px ${font}`;
  c.fillStyle = color;
  c.fillText(text, x, y);
  //  c.stroke();
}
