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
      if(currentShip && currentShip.owner == playerTurn && !currentShip.moved || !currentShip.attacked){
        if (!currentShip.moved) setPossibleMoves();
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
      if(item = "base" && selected.state == 3){buildBase()}
}

function makeMenu(){menu = ["base"]}

function setPossibleMoves(){
  let candiateMoves = findPossibleMoves(selected.hex);
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
  console.log(candiateMoves)
  for(let local in candiateMoves){
    let hex = candiateMoves[local].add(selected.hex);
    console.log(hex)
    let ship = shipArray.find(e => e.location.compare(hex))
    if(ship && ship.owner !== playerTurn) {
      possibleAttacks.push(hex);
    }
  }
  console.log(possibleAttacks);
}


function findPossibleMoves(center, moveLeft = 5){
  let frontier = [{loc:center, cost:0}];
  let visited = {[center.id]: {loc:center, cost:true, from:null}}
  let itts = 0
  while (frontier.length > 0 && itts < 1000){
    let current = frontier.shift();
    itts ++;
    for (let next in Hex.neighbours()){
      let hex = Hex.neighbours()[next].add(current.loc)
      if (hex.mag <= boardSize ){
        let cost = current.cost + getTerrainCost( current.loc, hex);
        if(!(visited[hex.id] && cost >= visited[hex.id].cost) && cost < moveLeft){ // TODO WTF
          frontier.push({loc:hex, cost:cost});
          visited[hex.id] = {loc:hex, cost:current.cost + 1, from:current.loc};
        }
      }
    }
  }
  let visitedArray = [];
  for (let v in visited){
    if (visited.hasOwnProperty(v)){visitedArray.push(visited[v].loc)}
  }
  return visitedArray
}

function getTerrainCost(a, b){
  return terainCost[hexObjects[a.id].terain + hexObjects[b.id].terain]
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
