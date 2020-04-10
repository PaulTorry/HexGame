"use strict"

/*global
drawScreen, sel:true,
nextTurn,
state,
onTopPanelItemClicked,
preturn:true, makeBuildBar,
findPossibleAttacks, getShipOnHex, findPossibleMoves,
buildShip,
drawMenu, getUpdatedViewMask
data
subTurn,
autoSave, changeCanvas, toggleTechTree,
saveToServer, debug, takeAIturn,
*/

// techs,

/* eslint-disable no-unused-vars */


function onHexClicked(clickHex){
//  if(preturn){preturn = false; return }
  let viewMask = getUpdatedViewMask(state);

  //let possibleAttacks = [], possibleMoves = [];
  let possibleActions = {moves:[], attacks:[]};
  sel.menu = [];

  function setShipActions(clickHex, ship){
    possibleActions = findPossibleActions(clickHex, ship);
    if (possibleActions.attacks.length || possibleActions.moves.length) {
      sel.state = 1;
      sel.hex = clickHex;
      sel.actions = possibleActions;
      sel.menu = [];
      sel.ship = ship;
    }
    else{
      ship.attacked = true;
      sel = {state:0, actions:{moves:[], attacks:[]}, menu:[]}
    }
  }



  if (viewMask[clickHex.id] === 2){

    if(sel.state === 2){
      sel = {state:0,  actions:{moves:[], attacks:[]}, menu: []};
      // else sel = {state:2, hex:clickHex, moves:[], attacks:[], menu: makeBuildBar(clickHex)};
    }

    else if (sel.state === 1){
      if (clickHex.compare(sel.hex)) {
        sel = {state:2, hex:clickHex, actions:{moves:[], attacks:[]}, menu: makeBuildBar(clickHex)};
      }

      else if(sel.actions.moves.find( e =>  e[0].compare(clickHex))) {
        sel.ship.hex = clickHex;
        state.history[subTurn()].push({type:"move" , rand:Math.random(), path:sel.actions.moves.find( e =>  e[0].compare(clickHex))})
        let ar = sel.ship.actionsRemaining;
        console.log("AR",ar);

        sel.ship.actionsRemaining = ar.slice(PaulsMath.lowestArrayIndex(ar.indexOf("m"),ar.indexOf("mm") )+1);
        console.log("SSsel.ship.actionsRemaining",sel.ship.actionsRemaining);
        sel.ship.moved = true;
        sel.hex = clickHex;

        applyTerrainDamage(sel.ship, getTerrainDamage(sel.ship, clickHex));

        // possibleAttacks = findPossibleAttacks(clickHex, sel.ship.hulltype.range);

        setShipActions(clickHex, sel.ship);
      }

      else if(sel.actions.attacks.find(e =>  e.compare(clickHex))) {
        let target = getShipOnHex(clickHex);
        if(target){
          applyDamage(sel.ship, target, true, getTerrainDefVal(target, clickHex));
          state.history[subTurn()].push({type:"attack" , rand:Math.random(), path:[clickHex, sel.ship.hex]})
          let ar = sel.ship.actionsRemaining;
          sel.ship.actionsRemaining = ar.slice(ar.indexOf("a")+1);
          setShipActions(clickHex, sel.ship);
        }
        else { console.log("error in attacks"); }
        sel = {state:0, actions:{moves:[], attacks:[]}, menu:[]}
      }
      else sel = {state:0, actions:{moves:[], attacks:[]}, menu:[]}

    }

    else if (sel.state === 0){
      console.log("State 0");
      let currentShip = getShipOnHex(clickHex);

      if(currentShip && currentShip.owner === state.playerTurn){
        setShipActions(clickHex, currentShip)
      //  else sel = {state:2, hex:clickHex, actions:{moves:[], attacks:[]}, menu: makeBuildBar(clickHex)};
      }
      else{
        sel = {state:2, hex:clickHex, actions:{moves:[], attacks:[]}, menu: makeBuildBar(clickHex)};
      }
    }
  } else  sel = {state:0,  actions:{moves:[], attacks:[]}, menu: []};
  console.log("sel", sel);
}



function findPossibleActions(clickHex, ship){
  let moveDistance = {m:0.6, mm:1.15}

  let movesLeft = ship.actionsRemaining.filter( x=> x === "m" || x === "mm")
  let attacksLeft = ship.actionsRemaining.filter( x=> x === "a")
  console.log("moveDistance[movesLeft[0]]",moveDistance[movesLeft[0]]);
  let moves = []
  if (movesLeft.length) moves = findPossibleMoves(clickHex, moveDistance[movesLeft[0]])

  let attacks = []
  if (attacksLeft.length) attacks = findPossibleAttacks(clickHex, ship.hulltype.range);

  let actions = {moves: moves, attacks: attacks}

  console.log("movesLeft", movesLeft);
  console.log("attacksLeft", attacksLeft);
  console.log("actions",actions);
  return actions
}



function whichPlanetsTerritory(hex){
  return state.baseArray.find(b => b.hex.compare(hex) || b.territory.find(t => t.compare(hex)));
}



function territoryState(hex){
  if (whichPlanetsTerritory(hex) === undefined){ return 1}
  else if (whichPlanetsTerritory(hex).owner === state.playerTurn){ return 2}
  else return 0;
}


function onTopPanelItemClicked(item, hex = sel.hex){
  let tile = state.tiles.get(hex.id);
  let ship = getShipOnHex(hex);
  let thing = data.thingList.find(t => t.thing === item);
  // if (sel.state !== 2) console.log("sel.state !== 2");

  state.playerData[state.playerTurn].money -= thing.price;

  if(thing.type && thing.type === "industry"){
    tile.station = {type: item, owner: state.playerTurn}
  }

  if(thing.type && thing.type === "resource"){  tile.resource = null;  }

  if(thing.type && thing.type === "ship"){
    state.shipArray.push(buildShip(item, state.playerTurn, tile.hex))
    //tile.station = {type: item, owner: state.playerTurn}
  }

  if(thing.type && thing.type === "nav"){
    tile.navBeacon = {owner: state.playerTurn}
  }

  if(item === "inhabitedPlanet"){
    ship.moved = true; ship.attacked = true;
    let existingBase = state.baseArray.find(b => b.hex.compare(tile.hex));
    tile.navBeacon = {owner: state.playerTurn}
    if (existingBase){
      existingBase.owner = state.playerTurn;
      existingBase.territory.forEach(t => {
        let station = state.tiles.get(t.id).station
        //      console.log(t);
        if(station) state.tiles.get(t.id).station  = {type: station.type, owner: state.playerTurn}
      })
    }
    else {state.baseArray.push(
      {type:"planet", owner:state.playerTurn, hex: tile.hex,
        territory:tile.hex.neighbours.filter(t => territoryState(t) === 1 && t.mag <= state.boardSize)}
    )}
  }


  if(item === "destroy"){
    tile.navBeacon = null;
  }

  sel = {state:0, actions:{attacks:[], menu:[]}, moves:[]}
  reSetIncomes();
  drawScreen();
  drawMenu();
}

function getTerrainDefVal(ship, hex){

  if(data.terrainInfo[state.tiles.get(hex.id).terrain].defenceTech &&
   state.playerData[ship.owner].tech[data.terrainInfo[state.tiles.get(hex.id).terrain].defenceTech]) {
    return 1;
  }

  if(state.baseArray.find(b => b.hex.compare(hex) && b.owner === ship.owner)){ //hex compare
    return 1;
  }
  return 0;
}

function getTerrainDamage(ship, hex){
//  console.log(ship, hex, state.tiles.get(hex.id));

  if (data.terrainInfo[state.tiles.get(hex.id).terrain].damTech && !state.tiles.get(hex.id).navBeacon){
    let hasTech = state.playerData[ship.owner].tech[data.terrainInfo[state.tiles.get(hex.id).terrain].damTech];
    if (!hasTech || ship.hulltype.maxMove < 2){
      return [1,hasTech]
    }
  }
  return [0,false];
}

function applyTerrainDamage(ship, damType){
  let [damage, applyToShield] = damType;
  let shipKilled
  if(applyToShield){
    shipKilled = applyDamageToShieldAndHull(ship, damage)
  } else {
    ship.hull -= damage;
    if(ship.hull <= 0) shipKilled = true;
  }
  if(shipKilled) state.shipArray = state.shipArray.filter(e => e !== ship)
}

function applyDamage(attacker, ship, attacking = true, terrainDefence = 0){
  let {hull, shield} = ship;
  let defence = ship.hulltype.defence + terrainDefence;
  let dammage = Math.max(getWeaponPower(attacker, attacking) -defence,0);
  let range = attacker.hex.distance(ship.hex);
  if ( attacker.hulltype.range < range ){ dammage = 0}

  let shipKilled = applyDamageToShieldAndHull(ship, dammage)

  if(shipKilled){
    if (range === 1 && attacking){attacker.hex = ship.hex}
    state.shipArray = state.shipArray.filter(e => e !== ship)
  } else {
    if(attacking) applyDamage(ship, attacker, false);
  }

  //
  // if (shield >= dammage){
  //   ship.shield -= dammage;
  //   if(attacking) applyDamage(ship, attacker, false);
  // }
  // else if (shield + hull > dammage) {
  //   ship.hull -= dammage - shield; ship.shield = 0;
  //   if(attacking) applyDamage(ship, attacker, false);
  // }
  // else {
  //   if (range === 1 && attacking){attacker.hex = ship.hex}
  //   state.shipArray = state.shipArray.filter(e => e !== ship)
  // }

}


function applyDamageToShieldAndHull(ship, dammage){
  let {type, hull, shield} = ship;
  if (shield >= dammage){
    ship.shield -= dammage;
    return false;
  }
  else if (shield + hull > dammage) {
    ship.hull -= dammage - shield; ship.shield = 0;
    return false;
  }
  else {    return true;  }
}


function getWeaponPower(ship, attacking = true){
  let {type, hull} = ship;
  let  {attack, retaliate} = data.shipHulls[type];

  if(attacking){ return attack * hull / data.shipHulls[type].hull; }
  else{ return retaliate * hull / data.shipHulls[type].hull; }
}

function repair(ship){
  let hex = ship.hex;
  let tState = territoryState(hex);
  console.log("repair ship", hex, territoryState(hex));
  if(tState > 1) {
    if (state.baseArray.find(b => b.hex.compare(hex))) ship.hull = Math.min(ship.hull +2, data.shipHulls[ship.type].hull);


    ship.shield =  Math.min(ship.shield +2, data.shipHulls[ship.type].shield)
  }
  else if(tState > 1)  ship.shield =  Math.min(ship.shield +1, data.shipHulls[ship.type].shield)

}



async function nextTurn(){

  if (!preturn || debug) {
    turnLogic()
    while (state.playerData[state.playerTurn].type === "AI") {takeAIturn(),turnLogic()}

    if (state.meta.online ){
      alert("sending game");
      await  saveToServer();
    }
  }
  else if(state.meta.online){
    if (checkForUpdatedServerGame()) loadGameFromID(state.gameID)
  }
}

function turnLogic(){
  if (state.playerData[state.playerTurn].type === "Human") autoSave();

  state.playerData[state.playerTurn].money += state.playerData[state.playerTurn].income;

  for (let ship of state.shipArray){
    if (ship.owner === state.playerTurn){
      console.log(ship);
      if (JSON.stringify(ship.actionsRemaining) === JSON.stringify(ship.hulltype.actionList)) repair(ship);
      ship.actionsRemaining = [...ship.hulltype.actionList];
      ship.moved = false;
      ship.attacked = false;

    }
  }
  state.playerTurn = (state.playerTurn + 1) % state.numPlayers;
  if (state.playerTurn === 0) {
    state.turnNumber += 1;
  }
  state.history.push([]);
  state.log.push(`newturn: turn${state.turnNumber}, player ${state.playerTurn}`)
  // translateContextTo(getXYfromHex(state.playerData[state.playerTurn].capital));

  toggleTechTree(false);
  preturn = true;
  changeCanvas("nextTurnScreen");

  state.log.push(`newturn: turn${state.turnNumber}, player ${state.playerTurn}`)

  sel = {state:0, actions:{attacks:[], menu:[]}, moves:[]}
  drawMenu(); drawScreen();
  //
  //
  // if(state.playerData[state.playerTurn].type === "AI"){
  //   takeAIturn();
  //   nextTurn()
  // }
}

function reSetIncomes(){
  state.playerData.forEach((v,i) => {
    state.playerData[i].income = calcIncome(i);
  })
}

function calcIncome(player){
  let bases = state.baseArray.filter(b => b.owner === player);
  let stations = Array.from(state.tiles).filter(([id, val]) => val.station && val.station.owner === player)

  return bases.length + stations.length;
}
