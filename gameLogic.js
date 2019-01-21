"use strict"

function onHexClicked(clickHex){
  menu = [];

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
      menu = makeMenu(selected.hex);
    }
    else if(possibleMoves.length > 0 && possibleMoves.find( e =>  e.compare(clickHex))) {
      currentShip.location = clickHex;
      currentShip.moved = true;
      selected.hex = clickHex;
      possibleAttacks = findPossibleAttacks(selected.hex, currentShip.range);
      if (possibleAttacks.length > 0){
        possibleMoves = [];
      }
      else{
        currentShip.attacked = true;
        currentShip = null;
        selected = {hex:null, state:0} ;
        possibleMoves = []; possibleAttacks = []; //attacks if have some
      }
      menu = [];
    }
    else if(possibleAttacks.find(e =>  e.compare(clickHex))) {
      let target = getShipOnHex(clickHex);
      if(target){
        applyDamage(currentShip, target);
        currentShip.moved = true; currentShip.attacked = true;
        if(!shipArray.find(e => e === target)){currentShip.location = clickHex;}
      }else{console.log("error in attacks");}

      currentShip = null;
      selected = {hex:null, state:0} ;
      possibleMoves = []; possibleAttacks = []; menu = [];
    }
    else if(clickHex.mag <=  boardSize){
      selected = {hex:clickHex, state:1};
      possibleMoves = []; possibleAttacks = []; menu = [];
    };
  }

  else if (selected.state == 1){
    if (selected.hex && selected.hex.compare(clickHex)){
      currentShip = getShipOnHex(clickHex);
      if(currentShip && currentShip.owner != playerTurn){
        selected = {hex:clickHex, state:1}
      }
      if(currentShip && currentShip.owner == playerTurn && (!currentShip.moved || !currentShip.attacked)){
        if (!currentShip.moved) {possibleMoves = findPossibleMoves(selected.hex, currentShip.maxMove);}
        console.log ("currentShip.range" + currentShip.range)
        possibleAttacks = findPossibleAttacks(selected.hex, currentShip.range);
        selected.state = 2
      }
      else{
        selected.state =3;
        possibleMoves = []; possibleAttacks = [];
        menu = makeMenu(selected.hex);
      }
    }
    else{selected = {hex:null, state:0}}
  }

  else if (selected.state == 0){
    if(clickHex.mag <=boardSize){selected = {hex:clickHex, state:1}}
  }
}

function whichPlanetsTerritory(hex){
  return baseArray.find(b => b.location.compare(hex) || b.territory.find(t => t.compare(hex)));
}

function territoryState(hex){
  if (whichPlanetsTerritory(hex) === undefined){ return 1}
  else if (whichPlanetsTerritory(hex).owner == playerTurn){ return 2}
  else return 0;
}

function onMenuItemClicked(item){
  let tile = tiles.get(selected.hex.id)
  if (selected.state == 3){
    playerData[playerTurn].money -= thingList.find(t => t.thing == item).price;
    if(item == "asteroidMining"){
      tile.station = {type: "asteroidMining", owner: playerTurn}
    }

    if(item == "inhabitedPlanet"){
      let existingBase = baseArray.find(b => b.location.compare(tile.hex));
      if (existingBase){
        existingBase.owner = playerTurn;
      }
      else {baseArray.push(
        {type:"planet", owner:playerTurn, location: tile.hex,
        territory:tile.hex.neighbours.filter(t => territoryState(t) == 1)}
      )}
    }

    if(item == "navBeacon"){
      tile.navBeacon = {owner: playerTurn}
    }

    if(item == "scoutShip"){shipArray.push(buildShip(item, playerTurn, tile.hex))};
    if(item == "assaultShip"){shipArray.push(buildShip(item, playerTurn, tile.hex))};
    if(item == "basicShip"){shipArray.push(buildShip(item, playerTurn, tile.hex))};
    if(item == "mineShip"){shipArray.push(buildShip(item, playerTurn, tile.hex))};
    if(item == "missileShip"){shipArray.push(buildShip(item, playerTurn, tile.hex))};

  }
  selected = {hex:null, state:0}
  possibleMoves = []; possibleAttacks = []; menu = [];
  drawMenu();
}


function applyDamage(attacker, ship, attacking = true){
  let {type, hull, shield} = ship;
  let dammage = getWeaponPower(attacker, attacking)

  if (shield >= dammage){
    ship.shield -= dammage;
    if(attacking) applyDamage(ship, attacker, false);
  }
  else if (shield + hull >= dammage) {
    ship.hull -= dammage - shield; ship.shield = 0;
    if(attacking) applyDamage(ship, attacker, false);
  }
  else {shipArray = shipArray.filter(e => e !== ship)}
}



function getWeaponPower(ship, attacking = true){
  let {type, hull, attack, retaliate} = ship;
  if(attacking){ return attack * hull / shipHulls[type].hull; }
  else{ return retaliate * hull / shipHulls[type].hull; }
}

function nextTurn(){
  playerData[playerTurn].money += collectMoney();
  playerTurn = (playerTurn + 1) % numPlayers;
  for (let ship in shipArray){
    if (shipArray[ship].owner == playerTurn){
      shipArray[ship].moved = false;
      shipArray[ship].attacked = false;
    }
  }
  possibleMoves = []; possibleAttacks = []; menu=[]
  selected = {hex:null, state:0}
}

function collectMoney(){
  let bases = baseArray.filter(b => b.owner == playerTurn);
  let asteroidBases = Array.from(tiles).filter(([id, val]) => val.station && val.station.owner == playerTurn)

  return bases.length + asteroidBases.length;
}
