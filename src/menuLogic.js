"use strict"
/*global
state, data, quickSetup, changeCanvas, randomName,
drawScreen,
*/
/* eslint-disable no-unused-vars */

function makeConfigFromMenu(){
  let config = {}
  config.numHumans = menuData.OfflinePlayers.filter(x => x.PlayerType === "Human").length
  config.numPlayers = menuData.OfflinePlayers.filter(x => x.PlayerType === "AI").length + config.numHumans
  config.boardSize = menuData.NewGameData.BoardSize;
  config.allied = true;
  config.gameName = menuData.NewGameData.GameName;
  console.log("config", config);
  return config
}

function makePlayerListFromMenu(){

}

function makeAlliesGridMenu(config, playerlist){
  let alliesGrid = []

  // for(let i = 0; i < config.numPlayers; i++){
  //   if(config.allied){
  //     alliesGrid[i] = [];
  //     for(let j = 0; j < config.numPlayers; j++){ alliesGrid[i][j] = playerlist[i] === playerlist[j] }
  //   } else {
  //     alliesGrid[i] = [];
  //     for(let j = 0; j < config.numPlayers; j++){ alliesGrid[i][j] = i === j }
  //   }
  // }
  return alliesGrid;
}

let menuData = {
  Screen:"MainMenu",
  NewGameData:{GameName:"DefaultName", BoardSize: 8},
  OfflinePlayers:[
    {PlayerType:"Human", Alliance:1},
    {PlayerType:"Human", Alliance:1},
    {PlayerType:"Human", Alliance:2},
    {PlayerType:"AI", Alliance:2},

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
      drawScreen();
      break;
    case "BoardSize":
      menuData.NewGameData.BoardSize = (menuData.NewGameData.BoardSize - 6) % 10 + 8
      break;
    case "Make":
      console.log("Make ");
      makeConfig();
//      setupNew({
      break;
    case "PlayerType":
      menuData.OfflinePlayers[opt.num].PlayerType
      if (menuData.OfflinePlayers[opt.num].PlayerType === "AI") menuData.OfflinePlayers[opt.num].PlayerType = "Human";
      else if (menuData.OfflinePlayers[opt.num].PlayerType === "Human") menuData.OfflinePlayers[opt.num].PlayerType = "AI";
      break;
    case "Alliance":
      menuData.OfflinePlayers[opt.num].Alliance = menuData.OfflinePlayers[opt.num].Alliance % 6 + 1;
      break;
    }
  }
  drawScreen();
}

// function onNewGameMenuHexClicked (hex){
//
//   let opt = data.newGameMenu.find(t => t.hex.compare(hex));
//   let action = opt.name;
//
//   switch(action){
//   case "GameName":
//     menuData.NewGameData.GameName = randomName();
//     drawScreen()
//     break;
//   case "BoardSize":
//     menuData.NewGameData.BoardSize = (menuData.NewGameData.BoardSize - 6) % 10 + 8
//     break;
//   case "Make":
//
//     break;
//   }
//   console.log(opt);
// }
