"use strict"

/*global
drawScreen, sel:true, screenSettings,
nextTurn,
state,
onMenuItemClicked,
preturn:true, makeMenu,
findPossibleAttacks, getShipOnHex, findPossibleMoves,
buildShip,
translateContextTo, getXYfromHex, drawMenu, removeActiveViews, getUpdatedViewMask
data
*/

// techs,

/* eslint-disable no-unused-vars */


function onHexClicked(clickHex){
  if(preturn){preturn = false; return }
  let viewMask = getUpdatedViewMask(state);

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

      if(currentShip && currentShip.owner === state.playerTurn){
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
  return state.baseArray.find(b => b.location.compare(hex) || b.territory.find(t => t.compare(hex)));
}

function territoryState(hex){
  if (whichPlanetsTerritory(hex) === undefined){ return 1}
  else if (whichPlanetsTerritory(hex).owner === state.playerTurn){ return 2}
  else return 0;
}


function onMenuItemClicked(item){
  let tile = state.tiles.get(sel.hex.id)
  let ship = getShipOnHex(sel.hex)
  if (sel.state === 2){
    state.playerData[state.playerTurn].money -= data.thingList.find(t => t.thing === item).price;

    if(item === "asteroidMining"){
      tile.station = {type: "asteroidMining", owner: state.playerTurn}
    }

    if(item === "inhabitedPlanet"){
      ship.moved = true;
      let existingBase = state.baseArray.find(b => b.location.compare(tile.hex));
      if (existingBase){
        existingBase.owner = state.playerTurn;
        existingBase.territory.forEach(t => {
          console.log(t);
          if(state.tiles.get(t.id).station){state.tiles.get(t.id).station = {type: "asteroidMining", owner: state.playerTurn}}
        })
      }
      else {state.baseArray.push(
        {type:"planet", owner:state.playerTurn, location: tile.hex,
        territory:tile.hex.neighbours.filter(t => territoryState(t) === 1)}
      )}
    }

    if(item === "navBeacon"){
      tile.navBeacon = {owner: state.playerTurn}
    }

    if(item === "destroy"){
      tile.navBeacon = null;
    }

    if(item === "scoutShip"){state.shipArray.push(buildShip(item, state.playerTurn, tile.hex))}
    if(item === "assaultShip"){state.shipArray.push(buildShip(item, state.playerTurn, tile.hex))}
    if(item === "basicShip"){state.shipArray.push(buildShip(item, state.playerTurn, tile.hex))}
    if(item === "mineShip"){state.shipArray.push(buildShip(item, state.playerTurn, tile.hex))}
    if(item === "missileShip"){state.shipArray.push(buildShip(item, state.playerTurn, tile.hex))}

  }
  sel = {state:0, attacks:[], menu:[], moves:[]}
  drawMenu();
}

function onTechHexClicked (hex){
  let tech = data.techs.find(t => t.location.compare(hex));
  let player = state.playerData[state.playerTurn];

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
    state.shipArray = state.shipArray.filter(e => e !== ship)
  }
}



function getWeaponPower(ship, attacking = true){
  let {type, hull, attack, retaliate} = ship;
  if(attacking){ return attack * hull / data.shipHulls[type].hull; }
  else{ return retaliate * hull / data.shipHulls[type].hull; }
}



function nextTurn(){
  state.playerData[state.playerTurn].money += collectMoney();
  state.playerData[state.playerTurn].viewMask = removeActiveViews(state.playerData[state.playerTurn].viewMask);
  for (let ship of state.shipArray){
    if (ship.owner === state.playerTurn){
      console.log(ship);console.log(data.shipHulls[ship.type].shield);
      if (!ship.moved && !ship.attacked) ship.shield =  Math.min(ship.shield +1, data.shipHulls[ship.type].shield);
      console.log(ship);
      ship.moved = false;
      ship.attacked = false;
    }
  }
  state.playerTurn = (state.playerTurn + 1) % state.numPlayers;
  translateContextTo(getXYfromHex(state.playerData[state.playerTurn].capital));
  screenSettings.openTechTree = false;
  drawMenu(); drawScreen();

  sel = {state:0, attacks:[], menu:[], moves:[]}
  drawMenu(); drawScreen();
  preturn = true;
}

function collectMoney(){
  let bases = state.baseArray.filter(b => b.owner === state.playerTurn);
  let asteroidBases = Array.from(state.tiles).filter(([id, val]) => val.station && val.station.owner === state.playerTurn)

  return bases.length + asteroidBases.length;
}
