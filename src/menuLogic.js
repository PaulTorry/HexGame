"use strict"


/*global
state, territoryState, shipState, getShipOnHex, data
*/

/* eslint-disable no-unused-vars */

function makeMenu(hex){
  // console.log("makemenu");
  let base = state.baseArray.find(b => b.hex.compare(hex));
  let tile = state.tiles.get(hex.id);
  let  ship =  getShipOnHex(hex); //shipArray.find(e => e.location.compare(hex));
  return data.thingList.filter(pos => {

    if(pos.price > state.playerData[state.playerTurn].money) return false;

    if(pos.terrain.length !== 0 && !pos.terrain.find(e => e === state.tiles.get(hex.id).terrain)) return false;

    if(pos.territoryState && pos.territoryState > territoryState(hex)) return false;

    if(pos.base && !state.baseArray.filter(b => {return b.hex.compare(hex) && b.owner === state.playerTurn})[0]) {
      return false;
    }

    if(pos.inhabitedPlanet){ if (!base) return false; }

    if(pos.shipState === "noShip" && ship) return false;

    if(pos.shipState === "ownPresent" && (!ship || ship.owner !== state.playerTurn)) return false;

    if(pos.shipState === "ownPresentUnmoved"  && (!ship || ship.owner !== state.playerTurn || ship.moved === true)){
      return false;
    }

    if(pos.shipState === "noEnemy" &&  getShipOnHex(hex) && shipState(hex) < 1) return false;

    if(pos.tech && !state.playerData[state.playerTurn].tech[pos.tech]) return false;

    // if(pos.tech && pos.tech.length > 0){
    //   for (let t of pos.tech){ if(!state.playerData[state.playerTurn].tech[t]) return false; }
    // }

    if(pos.thingPresent && pos.thingPresent.find(t => t === "navBeacon") && !tile.navBeacon) return false;

    // Self check

    if(pos.thing === "navBeacon"){if (tile.navBeacon && tile.navBeacon.owner === state.playerTurn) return false;}

    if(pos.thing === "asteroidMining" && tile.station && tile.station.type === "asteroidMining") return false;

    if(pos.thing === "inhabitedPlanet" &&  base && base.owner === state.playerTurn) return false;

    return true

  }).map(pos => pos.thing);
}