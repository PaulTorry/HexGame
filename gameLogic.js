"use strict"

function onHexClicked(clickHex){
  if(selected.state ==3){

    if(clickHex.mag <= boardSize){selected = {hex:clickHex, state:1}}
    else{
      selected = {hex:null, state:0}
      possibleMoves = []; possibleAttacks = [];
    }
  }

  else if (selected.state == 2){
    if (selected.hex && selected.hex.compare(clickHex)){
      selected.state =3;
      possibleMoves = []; possibleAttacks = [];
      makeMenu();
    }
    else if(possibleMoves.length > 0 && possibleMoves.find( e =>  e.compare(clickHex))) {
      currentShip.location = clickHex;
      currentShip.moved = true;
      selected.hex = clickHex;
      setPossibleAttacks();
      if (possibleAttacks.length > 0){
        possibleMoves = [];
      }
      else{
        currentShip.attacked = true;
        currentShip = null;
        selected = {hex:null, state:0} ;
        possibleMoves = []; possibleAttacks = []; //attacks if have some
      }
    }
    else if(possibleAttacks.find(e =>  e.compare(clickHex))) {
      let target = shipArray.find(e => e.location.compare(clickHex));
      if(target){
        applyDamage(2, target);
        currentShip.moved = true; currentShip.attacked = true;
        if(!shipArray.find(e => e === target)){currentShip.location = clickHex;}
      }else{console.log("error in attacks");}

      currentShip = null;
      selected = {hex:null, state:0} ;
      possibleMoves = []; possibleAttacks = [];
    }
    else if(clickHex.mag <=  boardSize){
      selected = {hex:clickHex, state:1};
      possibleMoves = []; possibleAttacks = [];
    };
  }

  else if (selected.state == 1){
    if (selected.hex && selected.hex.compare(clickHex)){
      currentShip = shipArray.find(e => e.location.compare(clickHex));
      if(currentShip && currentShip.owner != playerTurn){
        selected = {hex:clickHex, state:1}
      }
      if(currentShip && currentShip.owner == playerTurn && (!currentShip.moved || !currentShip.attacked)){
        if (!currentShip.moved) {setPossibleMoves(currentShip.maxMove);}
        setPossibleAttacks();
        selected.state = 2
      }
      else{
        selected.state =3;
        possibleMoves = []; possibleAttacks = [];
        makeMenu();
      }
    }
    else{selected = {hex:null, state:0}}
  }

  else if (selected.state == 0){
    if(clickHex.mag <=boardSize){selected = {hex:clickHex, state:1}}
  }
}

function onMenuItemClicked(item){
      if(item = "Nav" && selected.state == 3){buildBase()}
}

function makeMenu(){menu = ["Nav"]}

function setPossibleMoves(moveLeft = 5){
  let candiateMoves = findPossibleMoves(selected.hex, moveLeft);
  possibleMoves = [];
  for(let local in candiateMoves){
    let hex = candiateMoves[local]
    if(hex.mag <=  boardSize && !shipArray.find(e => e.location.compare(hex))){
      possibleMoves.push(hex);
    }
  }
}

function setPossibleAttacks(){
  let candiateMoves = Hex.neighbours();// findPossibleMoves(selected.hex);
  possibleAttacks = [];
  for(let local in candiateMoves){
    let hex = candiateMoves[local].add(selected.hex);
    let ship = shipArray.find(e => e.location.compare(hex))
    if(ship && ship.owner !== playerTurn) {
      possibleAttacks.push(hex);
    }
  }
}

function findPossibleMoves(center, moveLeft = 5){
  makeTerainCostMap();
  let frontier = [{loc:center, cost:0}];
  let visited = {[center.id]: {loc:center, cost:0, from:null}}
  let itts = 0
  while (frontier.length > 0 && itts < 1000){
    let current = frontier.shift();
    itts ++;
    for (let next in Hex.neighbours()){
      let hex = Hex.neighbours()[next].add(current.loc)
      if (hex.mag <= boardSize ){
        let cost = current.cost + terainCostMap[current.loc.id].moveOff + terainCostMap[hex.id].moveOn;
        if(!(visited[hex.id] && cost < visited[hex.id].cost) && cost < moveLeft){ // TODO WTF
          frontier.push({loc:hex, cost:cost});
          visited[hex.id] = {loc:hex, cost:current.cost + 1, from:current.loc};
        }
      }
    }
  }
  // Always to nearest neightbours
  for (let next in Hex.neighbours()){
    let hex = Hex.neighbours()[next].add(center)
    if (hex.mag <= boardSize ){
      if (!visited[hex.id] && terainCostMap[hex.id].moveOn < 9)
      visited[hex.id] = {loc:hex, cost:99, from:center.loc};
    }
  }
  // Convery to array
  let visitedArray = [];
  for (let v in visited){
    if (visited.hasOwnProperty(v)){visitedArray.push(visited[v].loc)}
  }
  return visitedArray
}

function makeTerainCostMap(){
  terainCostMap = {};
  for(let ho in hexObjects){
    if(hexObjects.hasOwnProperty(ho)){
      let hex = hexObjects[ho];
      let moveOff = terainCostNew[hex.terain].moveOff;
      let moveOn = terainCostNew[hex.terain].moveOn;
      if(hex.station){moveOff = 0.5, moveOn = 0.5}

      for(let local in Hex.neighbours()){
        let hex2 = Hex.neighbours()[local].add(hex.hex);
        let ship = shipArray.find(e => e.location.compare(hex2))
        if(ship && (ship.owner != playerTurn)) {          moveOff = 9;        }
      }

      terainCostMap[ho]={hex:hex.hex, "moveOff": moveOff, "moveOn": moveOn};
    }
  }
}

//function getTerrainCost(a, b){  return terainCostMap[a.id].moveOff + terainCostMap[b.id].moveOn}

function buildBase(){
  hexObjects[selected.hex.id].station = {type: "base", owner: playerTurn}
  selected = {hex:null, state:0}
  possibleMoves = []; possibleAttacks = [];
}

function applyDamage(dammage, ship){
  let {type, hull, shield} = ship
  for(let dam = dammage; dam > 0 && hull > 0; dam--){
    if (shield > 0){shield--} else{hull--};
  }
  ship.hull = hull;
  ship.shield = shield;
  if (hull < 1){shipArray = shipArray.filter(e => e !== ship)}
}

function nextTurn(){
  playerTurn = (playerTurn + 1) % numPlayers;
  for (let ship in shipArray){
    if (shipArray[ship].owner == playerTurn){
      shipArray[ship].moved = false;
      shipArray[ship].attacked = false;
    }
  }

}
