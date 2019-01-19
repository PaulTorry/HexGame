"use strict"

function makeMenu(hex){
  // console.log(hex);
  // console.log(tiles.get(hex.id));
  // console.log(tiles.get(hex.id).terrain );
  
  let owningCity = whichPlanetsTerritory(selected.hex);
  let owned =  owningCity !== undefined;

  let menuItems = []

  if (tiles.get(hex.id).terrain == "space"){
    if( !owned || owningCity.owner == playerTurn){
      menuItems.push("Nav");
    }
  }

  if (tiles.get(hex.id).terrain == "planet"){
    menuItems.push("inhabitedPlanet");
  }

  if (tiles.get(hex.id).terrain == "asteroids"){
    if( !(owned && owningCity.owner != playerTurn)){
      menuItems.push("Nav");
    }
    if( owned && owningCity.owner == playerTurn){
      menuItems.push("base");
    }
  }
  return menuItems;
}
