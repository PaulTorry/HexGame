"use strict"

/*global     */

/* eslint-disable no-unused-vars */


function makeNewViewMask(tiles){
  let mask = {};
  tiles.forEach( (a,id,b) => { mask[id] = 0 })
  return mask;
}

function removeActiveViews(viewMaskP){
  let viewMask = viewMaskP;
  for (let mask of Object.keys(viewMask)){
    if (viewMask[mask] === 2){viewMask[mask] = 1}
  }
  return viewMask;
}


function getUpdatedViewMask(state){
  //playerTurn, baseArray, shipArray, tiles, playerData[playerTurn].viewMask

let mask = state.playerData[state.playerTurn].viewMask

  state.baseArray.forEach(b => {
    if(b.owner === state.playerTurn){
      mask[b.hex.id] = 2;
      b.territory.forEach(t => {
        mask[t.id] = 2;
      })
    }
  })

  state.shipArray.forEach(s => {
    if(s.owner === state.playerTurn){
      mask[s.hex.id] = 2;
      s.hex.within(s.view).forEach(n => { mask[n.id] = 2; })
    }
  })

  for(let [id , tile] of state.tiles){
    if(tile.navBeacon && tile.navBeacon.owner === state.playerTurn){ mask[tile.hex.id] = 2; }
  }

  return mask;
}

function getUpdatedViewMaskold(player, baseArray, shipArray, tiles, mask){
  baseArray.forEach(b => {
    if(b.owner === player){
      mask[b.hex.id] = 2;
      b.territory.forEach(t => {
        mask[t.id] = 2;
      })
    }
  })

  shipArray.forEach(s => {
    if(s.owner === player){
      mask[s.hex.id] = 2;
      s.hex.within(s.view).forEach(n => { mask[n.id] = 2; })
    }
  })

  for(let [id , tile] of tiles){
    if(tile.navBeacon && tile.navBeacon.owner === player){ mask[tile.hex.id] = 2; }
  }

  return mask;
}
