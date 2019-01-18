"use strict"

function findPossibleAttacks(center){
  let possibleAttacksInt = [];
  for(let hex of center.neighbours){
    let ship = shipArray.find(e => e.location.compare(hex))
    if(ship && ship.owner !== playerTurn) {
      possibleAttacksInt.push(hex);
    }
  }
  return possibleAttacksInt;
}

function findPossibleMoves(center, moveLeft = 5){
  let terainCostMap = makeTerainCostMap();
  let frontier = [{loc:center, cost:0}];
  let visited = {[center.id]: {loc:center, cost:0, from:null}}
  let itts = 0
  while (frontier.length > 0 && itts < 1000){
    let current = frontier.shift();
    itts ++;
    for (let hex of current.loc.neighbours){
      if (hex.mag <= boardSize ){
        // console.log(`current.loc.id  ${current.loc.id}  hex.id  ${hex.id} `);
        let cost = current.cost + terainCostMap[current.loc.id].moveOff + terainCostMap[hex.id].moveOn;
        if(!(visited[hex.id] && cost < visited[hex.id].cost) && cost < moveLeft){ // TODO WTF
          frontier.push({loc:hex, cost:cost});
          visited[hex.id] = {loc:hex, cost:current.cost + 1, from:current.loc};
        }
      }
    }
  }
  // Always to nearest neightbours
  for (let hex of center.neighbours){
    if (hex.mag <= boardSize && !visited[hex.id] && terainCostMap[hex.id].moveOn < 9){
      visited[hex.id] = {loc:hex, cost:99, from:center.loc};
    }
  }
 // Filter for ships and return as array neightbours
  return Object.values(visited).map(v => v.loc).filter(hex => {
    return  (hex.mag <= boardSize) && !shipArray.find(e => e.location.compare(hex))
  });
}

function makeTerainCostMap(){
  let terainCostMap = {};
  for(let [ ,tile] of tiles){

    let moveOff = terainCostNew[tile.terain].moveOff;
    let moveOn = terainCostNew[tile.terain].moveOn;
    if(tile.station){moveOff = 0.5, moveOn = 0.5}

    for(let hex2 of tile.hex.neighbours){
    //  let hex2 = local.add(tile.hex);
      let ship = shipArray.find(e => e.location.compare(hex2))
      if(ship && (ship.owner != playerTurn)) {          moveOff = 9;        }
    }

    let tech = terainCostNew[tile.terain].techNeeded;
    if(tech && !playerData[playerTurn].tech[tech]){
      moveOff += 77; moveOn += 77;
    }

    terainCostMap[tile.hex.id]={hex:tile.hex, "moveOff": moveOff, "moveOn": moveOn};
  }
  return terainCostMap;
}
