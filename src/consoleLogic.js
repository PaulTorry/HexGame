"use strict"

/*global
Hex, Map
state:true
drawScreen,
debug:true,
interactiveConsole
data
*/

/* eslint-disable no-unused-vars */

function interactiveConsole (num = ""){
  console.log(num);
  let ans = prompt("\n0. New Game,\n1. Save, \n2: Load, \n3:  Money,\n4:  Tech, \n5: Toggle Debug", num);

  if(ans === "0"){
    let ans2 = Number(prompt("Number of players", 2));
    let ans3 = Number(prompt("Number of Humans ", 2));
    let ans4 = Number(prompt("Size of Board ", 8));
    let ans5 = prompt("Allied Humans y/n", "n")
    console.log(ans4);
    if(ans5 === "y") state = setup(ans2, ans4, ans3, true);
    if(ans5 === "n") state = setup(ans2, ans4, ans3, false);

  }

  if(ans === "1"){
    saveAs(prompt("Type Save Name"))
  }
  if(ans === "2"){
    load(prompt("Type Save Name"))
  }
  if(ans === "3"){
    state.playerData[state.playerTurn].money = 99;
  }
  if(ans === "4"){
    data.techs.forEach(t => {
      console.log(state.playerData[state.playerTurn].tech);
      console.log(t);
      state.playerData[state.playerTurn].tech[t.tech] = true;
    })

  }
  if(ans === "5"){
    debug = !debug;
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
  newState.tiles = new Map(newState.tiles);
  newState.shipArray = newState.shipArray.map(x => {
    x.hex = Hex.getFromPQR(x.hex);
    return x;
  })

  newState.baseArray = newState.baseArray.map(x => {
    x.hex = Hex.getFromPQR(x.hex);
    x.territory = x.territory.map(Hex.getFromPQR)
    return x;
  })

  console.log(newState.tiles);
  for (let [k,v] of newState.tiles){
    v.hex = Hex.getFromPQR(v.hex);
    newState.tiles.set(k,v)
  }

  state = newState;
}
