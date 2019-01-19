"use strict"

const thingList = [
  {thing:"Nav", cost:2, terrain:["space", "asteroids", "nebula"]},
  {thing:"base", cost:2, terrain:["asteroids"] },
  {thing:"inhabitedPlanet", cost:0, terrain:["planet"] , ship:true},
  {thing:"ship", cost:2, terrain:[], base :true}
]

function makeMenu(hex){
  let owningCity = whichPlanetsTerritory(hex);
  let owned =  owningCity !== undefined;

  return thingList.filter(pos => {

    if(pos.cost >= playerData[playerTurn].money) return false;

    if(pos.terrain.length != 0 && !pos.terrain.find(e => e == tiles.get(hex.id).terrain)) return false;

    if(pos.ship){
      let ship = shipArray.find(s => s.location.compare(hex))
      if(!ship || ship.owner != playerTurn) return false;
    }

    if(pos.base && !baseArray.filter(b => {return b.location.compare(hex) && b.owner == playerTurn})[0]) {
      return false;
    }

    return true

  }).map(pos => pos.thing);
}
