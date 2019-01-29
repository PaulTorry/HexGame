"use strict"


function makeMenu(hex){
console.log("makemenu");
  let base = baseArray.find(b => b.location.compare(hex));
  let tile = tiles.get(selected.hex.id);
  return thingList.filter(pos => {

    if(pos.price > playerData[playerTurn].money) return false;

    if(pos.terrain.length != 0 && !pos.terrain.find(e => e == tiles.get(hex.id).terrain)) return false;

    if(pos.territoryState && pos.territoryState > territoryState(hex)) return false;

    if(pos.base && !baseArray.filter(b => {return b.location.compare(hex) && b.owner == playerTurn})[0]) {
      return false;
    }

  //  if(pos.inhabitedPlanet && !(tiles.get(hex.id).station && tiles.get(hex.id).station.type == "inhabitedPlanet")) return false;

    if(pos.inhabitedPlanet){
        // let base = baseArray.find(b => b.location.compare(hex));
        if (!base)return false;
    }

    if(pos.shipState == "noShip" && getShipOnHex(hex)) return false;

    if(pos.shipState == "ownPresent" &&   shipState(hex) < 2) return false;

    if(pos.shipState == "noEnemy" &&  getShipOnHex(hex) && shipState(hex) < 1) return false;

    if(pos.tech && pos.tech.length > 0){
      for (let t of pos.tech){ if(!playerData[playerTurn].tech[t]) return false; }
    }

    // Self check

     if(pos.thing == "navBeacon" && tile.navBeacon) return false;

     console.log(pos.thing);
     console.log(tile.station);
     if(tile.station) console.log(tile.station.type);
     if(pos.thing == "asteroidMining" && tile.station && tile.station.type == "asteroidMining") return false;
     if(pos.thing == "inhabitedPlanet" &&  !(base && base.owner !== playerTurn)) return false;

    return true

  }).map(pos => pos.thing);
}
