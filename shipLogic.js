"use strict"

function buildShip(type, owner, location, moved=true, attacked=true){
  let base = shipHulls[type];
  return ({type:base.type, hull:base.hull, shield:base.shield,
    attack: base.attack, retaliate:base.retaliate, maxMove: base.maxMove,
    range: base.range, moved:moved, attacked:attacked, location:location, owner:owner
  })
}

//console.log( JSON.stringify(buildShip("scoutShip",0,new Hex(0,0))));

function getShipOnHex(hex){
  return shipArray.find(e => e.location.compare(hex));
}

function shipState(hex){
  if (getShipOnHex(hex) === undefined){ return 1}
  else if (getShipOnHex(hex).owner == playerTurn){ return 2}
  else return 0;
}

function findPossibleAttacks(center, range = 1){
  let possibleAttacksInt = [];
  for(let hex of center.within(range)){
    let ship = getShipOnHex(hex);
    if(ship && ship.owner !== playerTurn) {
      possibleAttacksInt.push(hex);
    }
  }
  return possibleAttacksInt;
}



function findPossibleMovesFunctional(frontier, visited, terrainFunc){

  if (!frontier.length) return visited;
  let [current, ...newfrontier] = frontier;
  visited[current.loc.id] = current;

  newfrontier = current.loc.neighbours
  .filter(n => n.mag <= boardSize)
  .map(n => {return{loc:n, cost:current.cost - terrainFunc(current.loc.id, n.id), from:current.loc}})
  .filter(({loc:hex, cost, from} ) => {
    return hex.mag <= boardSize && !(visited[hex.id] && cost < visited[hex.id].cost) && cost >= 0
  })
  .concat(newfrontier)
  .sort((a,b) => a.cost - b.cost)

  return findPossibleMovesFunctional(newfrontier, visited, terrainFunc)
}


function findPossibleMoves(center, moveLeft = 2){
  let temp =  findPossibleMovesFunctional([{loc:center, cost:moveLeft, from:new Hex()}], //{}
   center.neighbours.filter(n => n.mag <= boardSize)
    .map(n => {return{loc:n, cost:0, from:center}})
    .reduce((acc, c) => {acc[c.loc.id] = c; return acc}, {})
  ,getTerrainMapFunction(makeTerrainCostMap())
);
return Object.values(temp).map(v => v.loc).filter(hex => {
  return  (hex.mag <= boardSize) && !getShipOnHex(hex)
});
}


// function findPossibleMovesItterative(center, moveLeft = 2){
//   let terrainFunction = getTerrainMapFunction(makeTerrainCostMap());
//   console.log(terrainFunction);
//   let frontier = [{loc:center, cost:moveLeft, from:center}];
//   let visited = new Object();
//
//   while (frontier.length > 0 ){
//     let current = frontier.shift();
//     for (let hex of current.loc.neighbours){
//       if (hex.mag <= boardSize ){
//         let cost = current.cost - terrainFunction(current.loc.id, hex.id)
//         if(!(visited[hex.id] && cost < visited[hex.id].cost) && cost >= 0){ // TODO WTF
//           frontier.push({loc:hex, cost:cost, from:current.loc});
//           if (playerTurn) frontier.sort((a,b) => a.cost - b.cost)
//         }
//       }
//     }
//     //      console.log(frontier.length + "  " + Object.values(visited).length + "    " + JSON.stringify(visited));
//     visited[current.loc.id] = current
//   }
//   //  console.log(JSON.stringify(visited));
//   // Always to nearest neightbours
//   for (let hex of center.neighbours){
//     if (hex.mag <= boardSize && !visited[hex.id] && terrainCostMap[hex.id].moveOn < 9){
//       visited[hex.id] = {loc:hex, cost:99, from:center.loc};
//     }
//   }
//   // Filter for ships and return as array neightbours
//   return Object.values(visited).map(v => v.loc).filter(hex => {
//     return  (hex.mag <= boardSize) && !getShipOnHex(hex)
//   });
// }

function getTerrainMapFunction(terrainCostMap){
  return function(off,on){
    return terrainCostMap[off].moveOff + terrainCostMap[on].moveOn;
  }
}

function makeTerrainCostMap(){
  let terrainCostMap = {};
  for(let [ ,tile] of tiles){

    let moveOff = terrainCostNew[tile.terrain].moveOff;
    let moveOn = terrainCostNew[tile.terrain].moveOn;
    if(tile.navBeacon){moveOff = 0.25, moveOn = 0.25}

    for(let hex2 of tile.hex.neighbours){
      //  let hex2 = local.add(tile.hex);
      let ship = getShipOnHex(hex2)
      if(ship && (ship.owner != playerTurn)) {          moveOff = 9;        }
    }

    let tech = terrainCostNew[tile.terrain].techNeeded;
    if(tech && !playerData[playerTurn].tech[tech]){
      moveOff += 77; moveOn += 77;
    }

    terrainCostMap[tile.hex.id]={hex:tile.hex, "moveOff": moveOff, "moveOn": moveOn};
  }
  return terrainCostMap;
}
