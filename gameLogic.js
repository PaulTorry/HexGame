"use strict"

/*global
drawScreen, currentShip:true, selected:true, menu:true
possibleMoves:true, possibleAttacks:true, nextTurn,
onMenuItemClicked,
playerTurn,  boardSize, preturn:true, makeMenu,
findPossibleAttacks, getShipOnHex, findPossibleMoves, baseArray, tiles,
playerData, thingList, shipArray:true, buildShip, techs,  playerTurn:true, numPlayers,
translateContextTo, getXYfromHex, drawMenu, shipHulls, removeActiveViews, getUpdatedViewMask
*/


/* eslint-disable no-unused-vars */


function onHexClicked(clickHex){
  if(preturn){preturn = false; return }
  let viewMask = getUpdatedViewMask(playerTurn, baseArray, shipArray, tiles, playerData[playerTurn].viewMask);

  menu = [];

  if (viewMask[clickHex.id] === 2){

    if(selected.state ===3){

      if(clickHex.mag <= boardSize){selected = {hex:clickHex, state:1}}
      else{
        selected = {hex:null, state:0}
        possibleMoves = []; possibleAttacks = [];
      }
    }

    else if (selected.state === 2){
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
          //  if(!shipArray.find(e => e === target)){currentShip.location = clickHex;}
        }else{console.log("error in attacks");}

        currentShip = null;
        selected = {hex:null, state:0} ;
        possibleMoves = []; possibleAttacks = []; menu = [];
      }
      else if(clickHex.mag <=  boardSize){
        selected = {hex:clickHex, state:1};
        possibleMoves = []; possibleAttacks = []; menu = [];
      }
    }

    else if (selected.state === 1){
      if (selected.hex && selected.hex.compare(clickHex)){
        currentShip = getShipOnHex(clickHex);
        if(currentShip && currentShip.owner !== playerTurn){
          selected = {hex:clickHex, state:1}
        }
        if(currentShip && currentShip.owner === playerTurn && (!currentShip.moved || !currentShip.attacked)){
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

    else if (selected.state === 0){
      if(clickHex.mag <=boardSize){selected = {hex:clickHex, state:1}}
    }
  }
}

function whichPlanetsTerritory(hex){
  return baseArray.find(b => b.location.compare(hex) || b.territory.find(t => t.compare(hex)));
}

function territoryState(hex){
  if (whichPlanetsTerritory(hex) === undefined){ return 1}
  else if (whichPlanetsTerritory(hex).owner === playerTurn){ return 2}
  else return 0;
}





function onMenuItemClicked(item){
  let tile = tiles.get(selected.hex.id)
  if (selected.state === 3){
    playerData[playerTurn].money -= thingList.find(t => t.thing === item).price;
    if(item === "asteroidMining"){
      tile.station = {type: "asteroidMining", owner: playerTurn}
    }

    if(item === "inhabitedPlanet"){
      let existingBase = baseArray.find(b => b.location.compare(tile.hex));
      if (existingBase){
        existingBase.owner = playerTurn;
        existingBase.territory.forEach(t => {
          console.log(t);
          if(tiles.get(t.id).station){tiles.get(t.id).station = {type: "asteroidMining", owner: playerTurn}}
        })
      }
      else {baseArray.push(
        {type:"planet", owner:playerTurn, location: tile.hex,
        territory:tile.hex.neighbours.filter(t => territoryState(t) === 1)}
      )}
    }

    if(item === "navBeacon"){
      tile.navBeacon = {owner: playerTurn}
    }

    if(item === "destroy"){
      tile.navBeacon = null;
    }

    if(item === "scoutShip"){shipArray.push(buildShip(item, playerTurn, tile.hex))}
    if(item === "assaultShip"){shipArray.push(buildShip(item, playerTurn, tile.hex))}
    if(item === "basicShip"){shipArray.push(buildShip(item, playerTurn, tile.hex))}
    if(item === "mineShip"){shipArray.push(buildShip(item, playerTurn, tile.hex))}
    if(item === "missileShip"){shipArray.push(buildShip(item, playerTurn, tile.hex))}

  }
  selected = {hex:null, state:0}
  possibleMoves = []; possibleAttacks = []; menu = [];
  drawMenu();
}

function onTechHexClicked (hex){
  let tech = techs.find(t => t.location.compare(hex));
  let player = playerData[playerTurn];

  if(!player.tech[tech.tech] && player.money >= tech.cost){
    // console.log("doing");
    player.tech[tech.tech] = true;
    player.money -= tech.cost;
  }
}


function applyDamage(attacker, ship, attacking = true){
  let {type, hull, shield} = ship;
  let dammage = getWeaponPower(attacker, attacking);
  let range = attacker.location.distance(ship.location);
  if ( attacker.range < range ){ dammage = 0}

  if (shield >= dammage){
    ship.shield -= dammage;
    if(attacking) applyDamage(ship, attacker, false);
  }
  else if (shield + hull > dammage) {
    ship.hull -= dammage - shield; ship.shield = 0;
    if(attacking) applyDamage(ship, attacker, false);
  }
  else {
    if (range === 1 && attacking){attacker.location = ship.location}
    shipArray = shipArray.filter(e => e !== ship)
  }
}



function getWeaponPower(ship, attacking = true){
  let {type, hull, attack, retaliate} = ship;
  if(attacking){ return attack * hull / shipHulls[type].hull; }
  else{ return retaliate * hull / shipHulls[type].hull; }
}



function nextTurn(){
  playerData[playerTurn].money += collectMoney();
  playerData[playerTurn].viewMask = removeActiveViews(playerData[playerTurn].viewMask);
  for (let ship of shipArray){
    if (ship.owner === playerTurn){
      console.log(ship);console.log(shipHulls[ship.type].shield);
      if (!ship.moved && !ship.attacked) ship.shield =  Math.min(ship.shield +1, shipHulls[ship.type].shield);
      console.log(ship);
      ship.moved = false;
      ship.attacked = false;
    }
  }
  playerTurn = (playerTurn + 1) % numPlayers;
  translateContextTo(getXYfromHex(playerData[playerTurn].capital));
  drawMenu(); drawScreen();

  possibleMoves = []; possibleAttacks = []; menu=[]
  selected = {hex:null, state:0}
  drawMenu(); drawScreen();
  preturn = true;
}

function collectMoney(){
  let bases = baseArray.filter(b => b.owner === playerTurn);
  let asteroidBases = Array.from(tiles).filter(([id, val]) => val.station && val.station.owner === playerTurn)

  return bases.length + asteroidBases.length;
}
