"use strict"

function onHexClicked(clickHex){
  if(selected.state ==3){

    if(clickHex.mag <= boardSize){selected = {hex:clickHex, state:1}}
    else{
      selected = {hex:null, state:0}
      possibleMoves = []; possibleAttacks = [];
    }
  }

  else if (selected.state == 2){
    if (selected.hex && selected.hex.compare(clickHex)){
      selected.state =3;
      possibleMoves = []; possibleAttacks = [];
      menu = makeMenu();
    }
    else if(possibleMoves.length > 0 && possibleMoves.find( e =>  e.compare(clickHex))) {
      currentShip.location = clickHex;
      currentShip.moved = true;
      selected.hex = clickHex;
      possibleAttacks = findPossibleAttacks(selected.hex);
      if (possibleAttacks.length > 0){
        possibleMoves = [];
      }
      else{
        currentShip.attacked = true;
        currentShip = null;
        selected = {hex:null, state:0} ;
        possibleMoves = []; possibleAttacks = []; //attacks if have some
      }
    }
    else if(possibleAttacks.find(e =>  e.compare(clickHex))) {
      let target = shipArray.find(e => e.location.compare(clickHex));
      if(target){
        applyDamage(2, target);
        currentShip.moved = true; currentShip.attacked = true;
        if(!shipArray.find(e => e === target)){currentShip.location = clickHex;}
      }else{console.log("error in attacks");}

      currentShip = null;
      selected = {hex:null, state:0} ;
      possibleMoves = []; possibleAttacks = [];
    }
    else if(clickHex.mag <=  boardSize){
      selected = {hex:clickHex, state:1};
      possibleMoves = []; possibleAttacks = [];
    };
  }

  else if (selected.state == 1){
    if (selected.hex && selected.hex.compare(clickHex)){
      currentShip = shipArray.find(e => e.location.compare(clickHex));
      if(currentShip && currentShip.owner != playerTurn){
        selected = {hex:clickHex, state:1}
      }
      if(currentShip && currentShip.owner == playerTurn && (!currentShip.moved || !currentShip.attacked)){
        if (!currentShip.moved) {possibleMoves = findPossibleMoves(selected.hex, currentShip.maxMove);}
        possibleAttacks = findPossibleAttacks(selected.hex);
        selected.state = 2
      }
      else{
        selected.state =3;
        possibleMoves = []; possibleAttacks = [];
        menu = makeMenu();
      }
    }
    else{selected = {hex:null, state:0}}
  }

  else if (selected.state == 0){
    if(clickHex.mag <=boardSize){selected = {hex:clickHex, state:1}}
  }
}

function onMenuItemClicked(item){
  if(item = "Nav" && selected.state == 3){buildBase()}
}




function buildBase(){
  tiles.get(selected.hex.id).station = {type: "base", owner: playerTurn}
  selected = {hex:null, state:0}
  possibleMoves = []; possibleAttacks = []; menu = [];
  drawMenu();
}

function applyDamage(dammage, ship){
  let {type, hull, shield} = ship
  for(let dam = dammage; dam > 0 && hull > 0; dam--){
    if (shield > 0){shield--} else{hull--};
  }
  ship.hull = hull;
  ship.shield = shield;
  if (hull < 1){shipArray = shipArray.filter(e => e !== ship)}
}

function nextTurn(){
  playerTurn = (playerTurn + 1) % numPlayers;
  for (let ship in shipArray){
    if (shipArray[ship].owner == playerTurn){
      shipArray[ship].moved = false;
      shipArray[ship].attacked = false;
    }
  }
  possibleMoves = []; possibleAttacks = []; menu=[]
  selected = {hex:null, state:0}
}
