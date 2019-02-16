"use strict"

/*global
 Hex, Map
state:true
drawScreen,
interactiveConsole
*/

/* eslint-disable no-unused-vars */

function interactiveConsole (){

    var ans = prompt("\n1. Save, \n2: Load, \n3: Cheat", "");

    if(ans === "1"){
      saveAs(prompt("Type Save Name"))
    }
    if(ans === "2"){
      load(prompt("Type Save Name"))
    }
    if(ans === "3"){
      state.playerData[0].money = 1000;
    }
    drawScreen();
  }


function saveAs(savename = "quicksave"){
  let savestate = state.clone();
  savestate.tiles = [...state.tiles]
  console.log(JSON.stringify(savestate));
   localStorage.setItem(savename, JSON.stringify(savestate));
}

function load(savename = "quicksave"){
  let newState = JSON.parse(localStorage.getItem(savename));
  //console.log(newState);
  newState.tiles = new Map(newState.tiles);
  //console.log(newState);
  newState.shipArray = newState.shipArray.map(x => {
    x.hex = Hex.getFromPQR(x.hex);
    return x;
  })
  //console.log(newState.shipArray);

  newState.baseArray = newState.baseArray.map(x => {
    x.hex = Hex.getFromPQR(x.hex);
    x.territory = x.territory.map(Hex.getFromPQR)
    return x;
  })
  //console.log(newState.baseArray);
console.log(newState.tiles);
  for (let [k,v] of newState.tiles){
    console.log(k,v);
    v.hex = Hex.getFromPQR(v.hex);
    newState.tiles.set(k,v)
  }

  console.log(newState.tiles);
  state = newState;
}