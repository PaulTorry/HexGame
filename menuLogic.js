"use strict"


function makeMenu(hex){

  return thingList.filter(pos => {

    if(pos.price > playerData[playerTurn].money) return false;

    if(pos.terrain.length != 0 && !pos.terrain.find(e => e == tiles.get(hex.id).terrain)) return false;

    if(pos.territoryState && pos.territoryState > territoryState(hex)) return false;

    if(pos.base && !baseArray.filter(b => {return b.location.compare(hex) && b.owner == playerTurn})[0]) {
      return false;
    }

  //  if(pos.inhabitedPlanet && !(tiles.get(hex.id).station && tiles.get(hex.id).station.type == "inhabitedPlanet")) return false;

    if(pos.inhabitedPlanet){
        let base = baseArray.find(b => b.location.compare(hex));
        if (!base)return false;
    }

    if(pos.shipState == "noShip" && getShipOnHex(hex)) return false;

    if(pos.shipState == "ownPresent" &&   shipState(hex) < 2) return false;

    if(pos.shipState == "noEnemy" &&  getShipOnHex(hex) && shipState(hex) < 1) return false;

    return true

  }).map(pos => pos.thing);
}
