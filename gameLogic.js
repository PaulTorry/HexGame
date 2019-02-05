"use strict"

/*global
drawScreen, sel:true
nextTurn,
onMenuItemClicked,
playerTurn,   preturn:true, makeMenu,
findPossibleAttacks, getShipOnHex, findPossibleMoves, baseArray, tiles,
playerData, thingList, shipArray:true, buildShip, techs,  playerTurn:true, numPlayers,
translateContextTo, getXYfromHex, drawMenu, shipHulls, removeActiveViews, getUpdatedViewMask
*/


/* eslint-disable no-unused-vars */


function onHexClicked(clickHex){
  if(preturn){preturn = false; return }
  let viewMask = getUpdatedViewMask(playerTurn, baseArray, shipArray, tiles, playerData[playerTurn].viewMask);

  let possibleAttacks = [], possibleMoves = [];

  sel.menu = [];

  if (viewMask[clickHex.id] === 2){

    if(sel.state === 2){
      if (clickHex.compare(sel.hex)) sel = {state:0,  moves:[], attacks:[], menu: []};
      else sel = {state:2, hex:clickHex, moves:[], attacks:[], menu: makeMenu(clickHex)};
    }

    else if (sel.state === 1){
      if (clickHex.compare(sel.hex)) {
        sel = {state:2, hex:clickHex, moves:[], attacks:[], menu: makeMenu(clickHex)};
      }

      else if(sel.moves.find( e =>  e.compare(clickHex))) {
        sel.ship.location = clickHex;
        sel.ship.moved = true;
        sel.hex = clickHex;
        possibleAttacks = findPossibleAttacks(clickHex, sel.ship.range);
        if (possibleAttacks.length > 0) { sel.moves = []; sel.attacks = possibleAttacks}
        else{
          sel.ship.attacked = true;
          sel = {state:2, hex:clickHex, moves:[], attacks:[], menu: makeMenu(clickHex)};
        }
        sel.menu = [];
      }

      else if(sel.attacks.find(e =>  e.compare(clickHex))) {
        let target = getShipOnHex(clickHex);
        if(target){
          applyDamage(sel.ship, target);
          sel.ship.moved = true; sel.ship.attacked = true;
        }
        else { console.log("error in attacks"); }

         sel = {state:0, moves:[], attacks:[], menu:[]}
      }
      else sel = {state:0, moves:[], attacks:[], menu:[]}

    }

    else if (sel.state === 0){
      let currentShip = getShipOnHex(clickHex);

      if(currentShip && currentShip.owner === playerTurn){
        if (!currentShip.moved)  possibleMoves = findPossibleMoves(clickHex, currentShip.maxMove);
        if (!currentShip.attacked)  possibleAttacks = findPossibleAttacks(clickHex, currentShip.range);

        if(possibleMoves.length || possibleAttacks.length){
          sel = {state:1, hex:clickHex, ship:currentShip, moves:possibleMoves, attacks: possibleAttacks}
        }
        else sel = {state:2, hex:clickHex, moves:[], attacks:[], menu: makeMenu(clickHex)};
      }
      else{
        sel = {state:2, hex:clickHex, moves:[], attacks:[], menu: makeMenu(clickHex)};
      }
    }
  } else  sel = {state:0,  moves:[], attacks:[], menu: []};
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
  let tile = tiles.get(sel.hex.id)
  if (sel.state === 2){
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
  sel = {state:0, attacks:[], menu:[], moves:[]}
  drawMenu();
}

function onTechHexClicked (hex){
  let tech = techs.find(t => t.location.compare(hex));
  let player = playerData[playerTurn];

  if(!player.tech[tech.tech] && player.money >= tech.cost){
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

  sel = {state:0, attacks:[], menu:[], moves:[]}
  drawMenu(); drawScreen();
  preturn = true;
}

function collectMoney(){
  let bases = baseArray.filter(b => b.owner === playerTurn);
  let asteroidBases = Array.from(tiles).filter(([id, val]) => val.station && val.station.owner === playerTurn)

  return bases.length + asteroidBases.length;
}
