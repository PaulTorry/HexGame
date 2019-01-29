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

function getUpdatedViewMask(player, baseArray, shipArray, tiles, mask){
  baseArray.forEach(b => {
    if(b.owner === player){
      mask[b.location.id] = 2;
      b.territory.forEach(t => {
        mask[t.id] = 2;
      })
    }
  })

  shipArray.forEach(s => {
    if(s.owner === player){
      mask[s.location.id] = 2;
      s.location.within(s.view).forEach(n => { mask[n.id] = 2; })
    }
  })

  for(let [id , tile] of tiles){
    if(tile.navBeacon && tile.navBeacon.owner === player){ mask[tile.hex.id] = 2; }
  }

  return mask;
}
