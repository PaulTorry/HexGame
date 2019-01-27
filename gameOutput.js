"use strict"

//  document.getElementById("menu").height = 500;
function getPlayerColour(player = playerTurn, opacity = 1, dark = false){
  const playerColours = ["green", "red", "lightblue", "orange", "purple", "brown"];
  const playerColoursNew = [    [0,154,129], [216,36,53], [147,38,143], [0,153,188],
  [177,0,95],[158,170,30], [216,130,25]];
  const playerColoursDark = [    [0,154,129], [216,36,53], [147,38,143], [0,153,188],
  [177,0,95],[158,170,30], [216,130,25]];

  let [r,g,b] = playerColoursNew[player];
  if (dark) [r,g,b] = playerColoursDark[player];
  return `rgba(${r},${g},${b},${opacity})`
}
// const playerColours = ["green", "red", "lightblue", "orange", "purple", "brown"];
const selectedColour = ["white","red", "blue", "orange"];


function getXYfromHex(hexCoord){return Hex.getXYfromUnitHex(hexCoord).scale(hexSize)}

const hexVert = [new Vec(1,0), new Vec((1/2), Math.sqrt(3)/2), new Vec((-1/2), Math.sqrt(3)/2), new Vec(-1,0), new Vec((-1/2), -Math.sqrt(3)/2), new Vec((1/2), -Math.sqrt(3)/2)]
const triangleVert = [new Vec(1,0), new Vec(-1,0), new Vec(0,-1)];
const triangleVert2 = [new Vec(1,0), new Vec(-1,0), new Vec(0,-1)];
const triangleVert3 = [new Vec(1,0), new Vec(0,0.3), new Vec(0,-0.3)];
const triangleVert4 = [new Vec(2,0), new Vec(0,1), new Vec(0,-1)];
const triangleVert5 = [new Vec(1,0), new Vec(-1,0), new Vec(1,-1)];
const triangleVert6 = [new Vec(2,0), new Vec(-1,1), new Vec(0,-1)];
const squareVert = [new Vec(1,1), new Vec(-1,1), new Vec(-1,-1), new Vec(1,-1)];

const laserShip = [
  {"t":"sv"},{"t":"sv"},{"t":"bp"},{"t":"mt","v":[55.6,23.9]},{"t":"lt","v":[32.2,19.6]},{"t":"lt","v":[32.2,4.5]},{"t":"ct","v":[32.2,4.4,32.2,4.3,32.2,4.2]},{"t":"lt","v":[37.2,0.1]},{"t":"lt","v":[28.3,0.1]},{"t":"lt","v":[28.4,0.1]},{"t":"ct","v":[28.1,0,27.9,0,27.7,0]},{"t":"lt","v":[15,0]},{"t":"ct","v":[12.5,0,10.5,2,10.5,4.5]},{"t":"lt","v":[10.5,50.5]},{"t":"ct","v":[10.5,53,12.5,55,15,55]},{"t":"lt","v":[27.7,55]},{"t":"ct","v":[27.9,55,28.1,55,28.4,54.9]},{"t":"lt","v":[28.3,55]},{"t":"lt","v":[37.4,55]},{"t":"lt","v":[32.1,51]},{"t":"ct","v":[32.2,50.8,32.2,50.7,32.2,50.5]},{"t":"lt","v":[32.2,34.4]},{"t":"lt","v":[55.7,28.8]},{"t":"ct","v":[56.4,28.6,56.8,28,56.8,27.3]},{"t":"lt","v":[56.8,25.4]},{"t":"ct","v":[56.8,24.7,56.3,24.1,55.6,23.9]},{"t":"cp"},{"t":"fs","v":"rgb(215, 35, 53)"},{"t":"fl"},{"t":"bp"},{"t":"mt","v":[1.3,16.4]},{"t":"lt","v":[12.3,16.4]},{"t":"ct","v":[13,16.4,13.5,15.9,13.5,15.2]},{"t":"lt","v":[13.5,11.9]},{"t":"ct","v":[13.5,11.2,13,10.6,12.3,10.6]},{"t":"lt","v":[1.2,10.6]},{"t":"ct","v":[0.6,10.6,0,11.2,0,11.9]},{"t":"lt","v":[0,15.2]},{"t":"ct","v":[0,15.9,0.6,16.4,1.3,16.4]},{"t":"cp"},{"t":"sv"},
  {"t":"tr","v":[0.957,0.29,0.29,-0.957,315.7,-718.7]},

  {"t":"xlg","v":[0,0,100.2,0]},{"t":"xcs","v":[0,"rgb(130, 6, 20)"]},{"t":"xcs","v":[1,"rgba(215, 35, 53, 0.00)"]},{"t":"fs"},{"t":"fl"},{"t":"re"},{"t":"bp"},{"t":"mt","v":[1.3,45.7]},{"t":"lt","v":[12.3,45.7]},{"t":"ct","v":[13,45.7,13.5,45.1,13.5,44.4]},{"t":"lt","v":[13.5,41.1]},{"t":"ct","v":[13.5,40.4,13,39.9,12.3,39.9]},{"t":"lt","v":[1.2,39.9]},{"t":"ct","v":[0.6,39.9,0,40.4,0,41.1]},{"t":"lt","v":[0,44.4]},{"t":"ct","v":[0,45.1,0.6,45.7,1.3,45.7]},{"t":"cp"},{"t":"sv"},
  {"t":"tr","v":[0.957,0.29,0.29,-0.957,315.7,-718.7]},
  {"t":"xlg","v":[-70,0,-79.7,0]},{"t":"xcs","v":[0,"rgb(130, 6, 20)"]},{"t":"xcs","v":[1,"rgba(215, 35, 53, 0.00)"]},{"t":"fs"},{"t":"fl"},{"t":"re"},{"t":"bp"},{"t":"mt","v":[44.5,25.9]},{"t":"lt","v":[32.5,23.2]},{"t":"ct","v":[32.2,23.1,31.8,23.3,31.8,23.7]},{"t":"lt","v":[31.8,30]},{"t":"ct","v":[31.8,30.4,32.2,30.6,32.6,30.5]},{"t":"lt","v":[44.5,26.9]},{"t":"ct","v":[45.1,26.8,45.1,26,44.5,25.9]},{"t":"cp"},
  {"t":"xlg","v":[41.1,22.3,32.5,30.9]},{"t":"xcs","v":[0,"rgb(130, 6, 20)"]},{"t":"xcs","v":[1,"rgba(215, 35, 53, 0.00)"]},
  {"t":"fs"},{"t":"fl"},{"t":"re"},{"t":"re"},{"t":"sv"},{"t":"sv"},{"t":"bp"},{"t":"mt","v":[55.6,23.9]},{"t":"lt","v":[32.2,19.6]},{"t":"lt","v":[32.2,4.5]},{"t":"ct","v":[32.2,4.4,32.2,4.3,32.2,4.2]},{"t":"lt","v":[37.2,0.1]},{"t":"lt","v":[28.3,0.1]},{"t":"lt","v":[28.4,0.1]},{"t":"ct","v":[28.1,0,27.9,0,27.7,0]},{"t":"lt","v":[15,0]},{"t":"ct","v":[12.5,0,10.5,2,10.5,4.5]},{"t":"lt","v":[10.5,50.5]},{"t":"ct","v":[10.5,53,12.5,55,15,55]},{"t":"lt","v":[27.7,55]},{"t":"ct","v":[27.9,55,28.1,55,28.4,54.9]},{"t":"lt","v":[28.3,55]},{"t":"lt","v":[37.4,55]},{"t":"lt","v":[32.1,51]},{"t":"ct","v":[32.2,50.8,32.2,50.7,32.2,50.5]},{"t":"lt","v":[32.2,34.4]},{"t":"lt","v":[55.7,28.8]},{"t":"ct","v":[56.4,28.6,56.8,28,56.8,27.3]},{"t":"lt","v":[56.8,25.4]},{"t":"ct","v":[56.8,24.7,56.3,24.1,55.6,23.9]},{"t":"cp"},{"t":"fs","v":"rgb(215, 35, 53)"},{"t":"fl"},{"t":"bp"},{"t":"mt","v":[1.3,16.4]},{"t":"lt","v":[12.3,16.4]},{"t":"ct","v":[13,16.4,13.5,15.9,13.5,15.2]},{"t":"lt","v":[13.5,11.9]},{"t":"ct","v":[13.5,11.2,13,10.6,12.3,10.6]},{"t":"lt","v":[1.2,10.6]},{"t":"ct","v":[0.6,10.6,0,11.2,0,11.9]},{"t":"lt","v":[0,15.2]},{"t":"ct","v":[0,15.9,0.6,16.4,1.3,16.4]},{"t":"cp"},{"t":"sv"},
  {"t":"tr","v":[0.957,0.29,0.29,-0.957,315.7,-718.7]},
  {"t":"xlg","v":[-78.4,0,-88.2,0]},{"t":"xcs","v":[0,"rgb(130, 6, 20)"]},{"t":"xcs","v":[1,"rgba(215, 35, 53, 0.00)"]},{"t":"fs"},{"t":"fl"},{"t":"re"},{"t":"bp"},{"t":"mt","v":[1.3,45.7]},{"t":"lt","v":[12.3,45.7]},{"t":"ct","v":[13,45.7,13.5,45.1,13.5,44.4]},{"t":"lt","v":[13.5,41.1]},{"t":"ct","v":[13.5,40.4,13,39.9,12.3,39.9]},{"t":"lt","v":[1.2,39.9]},{"t":"ct","v":[0.6,39.9,0,40.4,0,41.1]},{"t":"lt","v":[0,44.4]},{"t":"ct","v":[0,45.1,0.6,45.7,1.3,45.7]},{"t":"cp"},{"t":"sv"},
  {"t":"tr","v":[0.957,0.29,0.29,-0.957,315.7,-718.7]},
  {"t":"xlg","v":[-70,-0,-79.7,-0]},{"t":"xcs","v":[0,"rgb(130, 6, 20)"]},{"t":"xcs","v":[1,"rgba(215, 35, 53, 0.00)"]},
  {"t":"fs"},{"t":"fl"},{"t":"re"},{"t":"bp"},{"t":"mt","v":[44.5,25.9]},{"t":"lt","v":[32.5,23.2]},{"t":"ct","v":[32.2,23.1,31.8,23.3,31.8,23.7]},{"t":"lt","v":[31.8,30]},{"t":"ct","v":[31.8,30.4,32.2,30.6,32.6,30.5]},{"t":"lt","v":[44.5,26.9]},{"t":"ct","v":[45.1,26.8,45.1,26,44.5,25.9]},{"t":"cp"},{"t":"xlg","v":[41.1,22.3,32.5,30.9]},{"t":"xcs","v":[0,"rgb(130, 6, 20)"]},{"t":"xcs","v":[1,"rgba(215, 35, 53, 0.00)"]},{"t":"fs"},{"t":"fl"},{"t":"re"},{"t":"re"}
];
const gasGiant = [
  {"t":"sv"},{"t":"sv"},{"t":"bp"},{"t":"mt","v":[86.2,14.2]},{"t":"ct","v":[99.7,30.8,97.2,55.1,80.6,68.6]},{"t":"ct","v":[64.1,82.1,39.8,79.6,26.3,63]},{"t":"ct","v":[12.8,46.5,15.3,22.2,31.8,8.7]},{"t":"ct","v":[48.4,-4.8,72.7,-2.3,86.2,14.2]},{"t":"cp"},{"t":"sv"},
  {"t":"tr","v":[-0.775,0.632,0.632,0.775,5041.1,-2573.3]},{"t":"xrg","v":[5522.1,-1135.4,0,5522.1,-1135.4,45.1]},{"t":"xcs","v":[0.28,"rgb(26, 60, 87)"]},{"t":"xcs","v":[0.58,"rgb(35, 50, 85)"]},{"t":"xcs","v":[0.9,"rgb(44, 41, 83)"]},{"t":"fs"},{"t":"fs","v":"rgb(44, 41, 83)"},{"t":"fl"},{"t":"re"},{"t":"bp"},{"t":"mt","v":[108.3,15.2]},{"t":"ct","v":[105.4,8.8,95.1,6.6,81.3,8.3]},{"t":"ct","v":[83.2,9.9,84.9,11.7,86.5,13.7]},{"t":"ct","v":[93,13.2,97.4,14.3,98.7,17.1]},{"t":"ct","v":[99.9,19.8,97.9,23.6,93.7,28]},{"t":"ct","v":[87.1,34.7,74.8,42.7,59.9,49.4]},{"t":"ct","v":[46.2,55.5,33.2,59.2,23.8,60.2]},{"t":"ct","v":[16.4,60.9,11.3,59.9,9.9,56.9]},{"t":"ct","v":[8.5,53.7,11.4,49,17.3,43.7]},{"t":"ct","v":[17,41.8,16.9,39.9,16.9,38]},{"t":"ct","v":[16.9,37.3,16.9,36.6,16.9,35.9]},{"t":"ct","v":[4.6,45.9,-1.8,56.1,1.3,63.1]},{"t":"ct","v":[4.4,70.2,16.7,72.1,32.7,69.4]},{"t":"ct","v":[42.2,67.7,52.9,64.4,63.9,59.5]},{"t":"ct","v":[76.3,53.9,87,47.2,94.9,40.4]},{"t":"ct","v":[105.7,31.1,111.2,21.7,108.3,15.2]},{"t":"cp"},{"t":"xrg","v":[0.5,39.1,109,39.1]},{"t":"xcs","v":[0,"rgb(26, 60, 87)"]},{"t":"xcs","v":[0.14,"rgb(35, 50, 85)"]},{"t":"xcs","v":[0.41,"rgb(44, 41, 83)"]},{"t":"xcs","v":[0.89,"rgb(35, 50, 85)"]},{"t":"xcs","v":[1,"rgb(26, 60, 87)"]},{"t":"fs"},{"t":"fs","v":"rgb(26, 60, 87)"},{"t":"fl"},{"t":"ss","v":"rgb(18, 14, 34)"},{"t":"st"},{"t":"re"},{"t":"re"},{"t":"sv"},{"t":"sv"},{"t":"bp"},{"t":"mt","v":[86.2,14.2]},{"t":"ct","v":[99.7,30.8,97.2,55.1,80.6,68.6]},{"t":"ct","v":[64.1,82.1,39.8,79.6,26.3,63]},{"t":"ct","v":[12.8,46.5,15.3,22.2,31.8,8.7]},{"t":"ct","v":[48.4,-4.8,72.7,-2.3,86.2,14.2]},{"t":"cp"},{"t":"sv"},{"t":"tr","v":[-0.775,0.632,0.632,0.775,5041.1,-2573.3]},{"t":"xrg","v":[5522.1,-1135.4,0,5522.1,-1135.4,45.1]},{"t":"xcs","v":[0.28,"rgb(26, 60, 87)"]},{"t":"xcs","v":[0.58,"rgb(35, 50, 85)"]},{"t":"xcs","v":[0.9,"rgb(44, 41, 83)"]},{"t":"fs"},{"t":"fs","v":"rgb(44, 41, 83)"},{"t":"fl"},{"t":"re"},{"t":"bp"},{"t":"mt","v":[108.3,15.2]},{"t":"ct","v":[105.4,8.8,95.1,6.6,81.3,8.3]},{"t":"ct","v":[83.2,9.9,84.9,11.7,86.5,13.7]},{"t":"ct","v":[93,13.2,97.4,14.3,98.7,17.1]},{"t":"ct","v":[99.9,19.8,97.9,23.6,93.7,28]},{"t":"ct","v":[87.1,34.7,74.8,42.7,59.9,49.4]},{"t":"ct","v":[46.2,55.5,33.2,59.2,23.8,60.2]},{"t":"ct","v":[16.4,60.9,11.3,59.9,9.9,56.9]},{"t":"ct","v":[8.5,53.7,11.4,49,17.3,43.7]},{"t":"ct","v":[17,41.8,16.9,39.9,16.9,38]},{"t":"ct","v":[16.9,37.3,16.9,36.6,16.9,35.9]},{"t":"ct","v":[4.6,45.9,-1.8,56.1,1.3,63.1]},{"t":"ct","v":[4.4,70.2,16.7,72.1,32.7,69.4]},{"t":"ct","v":[42.2,67.7,52.9,64.4,63.9,59.5]},{"t":"ct","v":[76.3,53.9,87,47.2,94.9,40.4]},{"t":"ct","v":[105.7,31.1,111.2,21.7,108.3,15.2]},{"t":"cp"},{"t":"xrg","v":[0.5,39.1,109,39.1]},{"t":"xcs","v":[0,"rgb(26, 60, 87)"]},{"t":"xcs","v":[0.14,"rgb(35, 50, 85)"]},{"t":"xcs","v":[0.41,"rgb(44, 41, 83)"]},{"t":"xcs","v":[0.89,"rgb(35, 50, 85)"]},{"t":"xcs","v":[1,"rgb(26, 60, 87)"]},{"t":"fs"},{"t":"fs","v":"rgb(26, 60, 87)"},{"t":"fl"},{"t":"ss","v":"rgb(18, 14, 34)"},{"t":"st"},{"t":"re"},{"t":"re"}
];


const baseShapes = {"asteroidMining":triangleVert,  "inhabitedPlanet":hexVert,
"navBeacon":squareVert, "basicShip":triangleVert2, "assaultShip":triangleVert4,
"mineShip":triangleVert5, "missileShip":triangleVert6,// "scoutShip":triangleVert3,
}

const curves = {scoutShip:laserShip}

function drawScreen() {
  var c = document.getElementById("board").getContext("2d");
  c.clearRect(-99999,-99999,199999,199999);                            // FIX THIS @TODO
  c.fillStyle = '#ff0000';
  c.strokeStyle = '#ff00ff';
  c.lineWidth = 5

  let viewMask = getUpdatedViewMask(playerTurn);



  for(let [id , tile] of tiles){
    if(viewMask[id]){
      drawPoly(c, hexVert, getXYfromHex(tile.hex), hexSize, 1,  "rgb(37,32,45)", "rgb(18,15,34," + 0.5 * viewMask[id] + ")"  );
      if(tile.terrain !== "space"){
        // drawPoly(c, hexVert, getXYfromHex(tile.hex), hexSize, 2 , "#25202D", "grey");
        let image = document.getElementById(tile.terrain + "Pic");
        let {x,y} = getXYfromHex(tile.hex)
        c.drawImage(image, x - 50, y - 50, 100, 100);
      }
      if(tile.station){
        drawPoly(c, baseShapes[tile.station.type], getXYfromHex(tile.hex), 10, 4 , getPlayerColour(tile.station.owner) );
      }
      if(tile.navBeacon){
        drawPoly(c, baseShapes["navBeacon"], getXYfromHex(tile.hex), 10, 4 , getPlayerColour(tile.navBeacon.owner) );
      }
      let base = baseArray.find(b => b.location.compare(tile.hex));
      if(base){
        drawPoly(c, baseShapes["inhabitedPlanet"], getXYfromHex(tile.hex), 10, 4 , getPlayerColour(base.owner) );
      }
    }
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
      if (baseShapes[ship.type]){
        drawPoly(c, baseShapes[ship.type], getXYfromHex(ship.location), 30,  2 , borderColour, getPlayerColour(ship.owner));
      }
      else if (curves[ship.type]){
        let {x,y} = getXYfromHex(ship.location);
        borderColour = getPlayerColour(ship.owner)
        if (ship.owner == playerTurn && (ship.moved && ship.attacked)) {borderColour = getPlayerColour(ship.owner, 0.4)}
        drawFromData(c, curves[ship.type], x-20, y-20, borderColour)
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
      c.strokeRect (10+40*i, 10, 40, 40);
      drawPoly(c, baseShapes[menu[i]], new Vec(30+40*i, 30), 10, 4 , getPlayerColour(playerTurn) );
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
      let center = getXYfromHex(t.location).add(techTreeOffset);
      let colour = "red";
      if (playerData[playerTurn].tech[t.tech]) {colour = "yellow"}
      drawPoly(c, hexVert, center, hexSize, 1,  "white", "#120F22"  );
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

function drawFromData(c, data, x=0, y=0, color){
  let add = (a, x, y) => a.map((v,i) => i%2 ? v+y  : v+x)
  let gradient;

  data.forEach(({t,v}) => {
    if(t == "sv") c.save();
    else if(t == "bp") c.beginPath();
    else if(t == "mt") c.moveTo(...add(v,x,y));
    else if(t == "lt") c.lineTo(...add(v,x,y));
    else if(t == "cp") c.closePath();
    else if(t == "fs"){
      if (v){ c.fillStyle = v;}
      else if (gradient) {c.fillStyle = gradient};
    }
    else if(t == "ss"){ if (v){ c.strokeStyle = v;}}
    else if(t == "fl") c.fill();
    else if(t == "ct") c.bezierCurveTo(...add(v,x,y));
    else if(t == "re") c.restore();
    else if(t == "st") c.stroke()

  //  else if(t == "tr") c.transform(...v)

  else if(t == "xrg"){ gradient = c.createRadialGradient(v[0]+x,v[1]+y,v[2],v[3]+x,v[4]+y,v[5])}
  else if(t == "xlg"){ gradient = c.createLinearGradient(...add(v,x,y))}
    else if(t == "xcs"){
      let col = v[1];
      console.log(v);
      if(v[1] == "rgb(130, 6, 20)") col =   getPlayerColour(playerTurn, 1 , 1);
      else if(v[1] == "rgba(215, 35, 53, 0.00)")  col = getPlayerColour(playerTurn, 0);
      console.log(col);
      gradient.addColorStop(v[0],col)
    }

  })
  if (c.data) return c.data;
}

function drawText(c, text, center = new Vec(0,0), size=28, color="blue", font= "Georgia"){
  let {x,y} = center//.scale(scale)
  c.font = `${size}px ${font}`;
  c.fillStyle = color;
  c.fillText(text, x, y);
  //  c.stroke();
}
