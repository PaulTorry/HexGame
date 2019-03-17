"use strict"

/*global
drawScreen, sel:true, screenSettings,
nextTurn,
state, boardSize,
onMenuItemClicked,
preturn:true, makeMenu,
findPossibleAttacks, getShipOnHex, findPossibleMoves,
buildShip,
translateContextTo, getXYfromHex, drawMenu, getUpdatedViewMask
data
takeAIturn
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
        sel.ship.hex = clickHex;
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
          applyDamage(sel.ship, target, true, getTerrainDefVal(target, clickHex));
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
  return state.baseArray.find(b => b.hex.compare(hex) || b.territory.find(t => t.compare(hex)));
}

function territoryState(hex){
  if (whichPlanetsTerritory(hex) === undefined){ return 1}
  else if (whichPlanetsTerritory(hex).owner === state.playerTurn){ return 2}
  else return 0;
}


function onMenuItemClicked(item, hex = sel.hex){
  let tile = state.tiles.get(hex.id)
  let ship = getShipOnHex(hex)
  if (sel.state !== 2) console.log("sel.state !== 2");

  state.playerData[state.playerTurn].money -= data.thingList.find(t => t.thing === item).price;

  if(item === "asteroidMining"){
    tile.station = {type: "asteroidMining", owner: state.playerTurn}
  }

  if(item === "gas giant mining"){
    tile.station = {type: "gas giant mining", owner: state.playerTurn}
  }

  if(item === "white dwarf mining"){
    tile.station = {type: "white dwarf mining", owner: state.playerTurn}
  }

  if(item === "inhabitedPlanet"){
    ship.moved = true; ship.attacked = true;
    let existingBase = state.baseArray.find(b => b.hex.compare(tile.hex));
    if (existingBase){
      existingBase.owner = state.playerTurn;
      existingBase.territory.forEach(t => {
        console.log(t);
        if(state.tiles.get(t.id).station){state.tiles.get(t.id).station = {type: "asteroidMining", owner: state.playerTurn}}
      })
    }
    else {state.baseArray.push(
      {type:"planet", owner:state.playerTurn, hex: tile.hex,
        territory:tile.hex.neighbours.filter(t => territoryState(t) === 1 && t.mag <= boardSize)}
    )}
  }

  if(item === "navBeacon"){
    tile.navBeacon = {owner: state.playerTurn}
  }



  if(item === "destroy"){
    tile.navBeacon = null;
  }
  console.log("gamelogic in shiphulls", item, data.shipHulls)
  let inhulle = data.shipHulls[item];
  //console.log(inhulle);
  if(data.shipHulls[item]){state.shipArray.push(buildShip(item, state.playerTurn, tile.hex))}





  sel = {state:0, attacks:[], menu:[], moves:[]}
  drawMenu();
}

function onTechHexClicked (hex){
  let tech = data.techs.find(t => t.hex.compare(hex));
  let player = state.playerData[state.playerTurn];

  if(!player.tech[tech.tech] && player.money >= tech.cost){
    if(!tech.requires || tech.requires.filter(r => !player.tech[r]).length === 0){
      player.tech[tech.tech] = true;
      player.money -= tech.cost;
    }
  }
}


function getTerrainDefVal(ship, hex){

  if(data.terrainInfo[state.tiles.get(hex.id).terrain].defenceTech &&
   state.playerData[ship.owner].tech[data.terrainInfo[state.tiles.get(hex.id).terrain].defenceTech]) {
    console.log(ship, hex, "def1");
    return 1;
  }

  if(state.baseArray.find(b => b.hex.id === hex.id && b.owner === ship.owner)){
    console.log(ship, hex, "def1 base");
    return 1;
  }
  console.log(ship, hex, "def0");
  return 0;
}


function applyDamage(attacker, ship, attacking = true, terrainDefence = 0){
  let {type, hull, shield} = ship;
  let defence = data.shipHulls[type].defence + terrainDefence;
  let dammage = Math.max(getWeaponPower(attacker, attacking) -defence,0);
  let range = attacker.hex.distance(ship.hex);
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
    if (range === 1 && attacking){attacker.hex = ship.hex}
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
  // state.playerData[state.playerTurn].viewMask = removeActiveViews(state.playerData[state.playerTurn].viewMask);
  // state.playerData[state.playerTurn].viewMask = getUpdatedViewMask(state);
  for (let ship of state.shipArray){
    if (ship.owner === state.playerTurn){
      if (!ship.moved && !ship.attacked) ship.shield =  Math.min(ship.shield +1, data.shipHulls[ship.type].shield);
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

  if(state.playerData[state.playerTurn].type === "AI"){
    takeAIturn();
    nextTurn()
  }
}

function collectMoney(){
  let bases = state.baseArray.filter(b => b.owner === state.playerTurn);
  let stations = Array.from(state.tiles).filter(([id, val]) => val.station && val.station.owner === state.playerTurn)

  return bases.length + stations.length;
}
