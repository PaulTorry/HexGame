"use strict"

/*global  boardSize   */

/* eslint-disable no-unused-vars */

function makeNewViewMask(tiles){
  let mask = {};
  tiles.forEach( (a,id,b) => { mask[id] = 0 })
  return mask;
}


function removeActiveViews(viewMask){
  let mask = {};

  for (let k of Object.keys(viewMask)){
    if (viewMask[k] === 2 || viewMask[k] === 1){mask[k] = 1}
  }

  return mask;
}


function addViewMasks(state, vm1, vm2){
  let mask = {};

  state.tiles.forEach(b => {
    mask[b.hex.id] = Math.max(vm1[b.hex.id], vm2[b.hex.id]);
  })

  return mask;
}

function getUpdatedViewMask(state, player = state.playerTurn){

  let mask = state.playerData[state.playerTurn].viewMask

  for(let i = 0; i < state.numPlayers; i++){
    if(i === player || state.alliesGrid[player][i]){
      mask = addViewMasks(state, mask, getOwnViewMask(state, i));
    }
  }

  return mask;
}

function getOwnViewMask(state, player = state.playerTurn){

  let mask = removeActiveViews(state.playerData[state.playerTurn].viewMask)

  state.baseArray.forEach(b => {
    if(b.owner === player){
      mask[b.hex.id] = 2;
      b.territory.forEach(t => {
        mask[t.id] = 2;
      })
    }
  })

  state.shipArray.forEach(s => {
    if(s.owner === player){
      mask[s.hex.id] = 2;
      s.hex.within(s.view).filter(h => h.mag <= boardSize) .forEach(n => { mask[n.id] = 2; })
    }
  })

  for(let [id , tile] of state.tiles){
    if(tile.navBeacon && tile.navBeacon.owner === player){ mask[tile.hex.id] = 2; }
  }
  state.playerData[state.playerTurn].viewMask = removeActiveViews(mask);
  return mask;
}
