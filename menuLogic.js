"use strict"


/*global
    playerTurn, playerData, baseArray,
   tiles, territoryState,  , shipState, getShipOnHex, thingList,
 */
 /* eslint-disable no-unused-vars */

function makeMenu(hex){
// console.log("makemenu");
  let base = baseArray.find(b => b.location.compare(hex));
  let tile = tiles.get(hex.id);
  let  ship =  getShipOnHex(hex); //shipArray.find(e => e.location.compare(hex));
  return thingList.filter(pos => {

// console.log(pos);
// if(pos.thing === "inhabitedPlanet") console.log(base, tile);

    if(pos.price > playerData[playerTurn].money) return false;

    if(pos.terrain.length !== 0 && !pos.terrain.find(e => e === tiles.get(hex.id).terrain)) return false;

    if(pos.territoryState && pos.territoryState > territoryState(hex)) return false;

    if(pos.base && !baseArray.filter(b => {return b.location.compare(hex) && b.owner === playerTurn})[0]) {
      return false;
    }

  //  if(pos.inhabitedPlanet x&& !(tiles.get(hex.id).station && tiles.get(hex.id).station.type == "inhabitedPlanet")) return false;

    if(pos.inhabitedPlanet){
        // let base = baseArray.find(b => b.location.compare(hex));
        if (!base)return false;
    }

    if(pos.shipState === "noShip" && ship) return false;
    // if(pos.thing === "inhabitedPlanet") console.log("aft noship", pos.shipState);

    if(pos.shipState === "ownPresent" && (!ship || ship.owner !== playerTurn)) return false;
    if(pos.shipState === "ownPresentUnmoved"  && (!ship || ship.owner !== playerTurn || ship.moved === true)){
      return false;
    }




    // if(pos.thing === "inhabitedPlanet") console.log("aft own", pos.shipState);



    if(pos.shipState === "noEnemy" &&  getShipOnHex(hex) && shipState(hex) < 1) return false;

    if(pos.tech && pos.tech.length > 0){
      for (let t of pos.tech){ if(!playerData[playerTurn].tech[t]) return false; }
    }

    if(pos.thingPresent && pos.thingPresent.find(t => t === "navBeacon") && !tile.navBeacon) return false;

    // Self check

    // if(pos.thing === "inhabitedPlanet") console.log("aft selfcheck", pos.shipState);


     if(pos.thing === "navBeacon"){if (tile.navBeacon && tile.navBeacon.owner === playerTurn) return false;}


     // console.log(pos.thing);
     // console.log(tile.station);
     // if(tile.station) console.log(tile.station.type);
     if(pos.thing === "asteroidMining" && tile.station && tile.station.type === "asteroidMining") return false;
     if(pos.thing === "inhabitedPlanet" &&  base && base.owner === playerTurn) return false;


     // if(pos.thing === "inhabitedPlanet") console.log("end", pos.shipState);



    return true

  }).map(pos => pos.thing);
}
