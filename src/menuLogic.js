"use strict"
/*global
state, data, quickSetup, changeCanvas
*/
/* eslint-disable no-unused-vars */

let menuData = {
  Screen:"MainMenu",
  NewGameData:{GameName:"DefaultName", BoardSize: 8},
  OfflinePlayers:[
    {Type:"Human", Alliance:1},
    {Type:"Human", Alliance:1},
    {Type:"Human", Alliance:2},
    {Type:"AI", Alliance:2},

  ]
}

function onTechHexClicked (hex){
  let tech = data.techs.find(t => t.hex.compare(hex));
  let player = state.playerData[state.playerTurn];

  if(!player.tech[tech.tech] && player.money >= tech.cost){
    if(!tech.requires || tech.requires.filter(r => !player.tech[r]).length === 0){
      player.tech[tech.tech] = true;
      player.money -= tech.cost;
    }
  }
}


function onMenuHexClicked (hex){
  //
  // let opt = data.mainMenu.find(t => t.hex.compare(hex));
  // let action = opt.name;
  // console.log(opt);

  if(menuData.Screen === "MainMenu"){
    let opt = data.mainMenu.find(t => t.hex.compare(hex));
    let action = opt.name;
    console.log(opt);

    switch(action){
    case "Quick Setup":
      quickSetup();
      changeCanvas("nextTurnScreen");
      break;
    case "Setup":
      menuData.Screen = "NewGame";
      console.log("menuData.Screen === NewGame");
      // changeCanvas("newGameMenu");
      break;
    }
  }
  else if(menuData.Screen === "NewGame"){
    let opt = data.newGameMenu.find(t => t.hex.compare(hex));
    let action = opt.name;
    console.log(opt);

    switch(action){
    case "GameName":
      menuData.NewGameData.GameName = randomName();
      drawScreen()
      break;
    case "BoardSize":
      menuData.NewGameData.BoardSize = (menuData.NewGameData.BoardSize - 6) % 10 + 8
      break;
    case "Make":

      break;
    }
  }
  drawScreen();
}

function onNewGameMenuHexClicked (hex){

  let opt = data.newGameMenu.find(t => t.hex.compare(hex));
  let action = opt.name;

  switch(action){
  case "GameName":
    menuData.NewGameData.GameName = randomName();
    drawScreen()
    break;
  case "BoardSize":
    menuData.NewGameData.BoardSize = (menuData.NewGameData.BoardSize - 6) % 10 + 8
    break;
  case "Make":

    break;
  }
  console.log(opt);
}
