"use strict"


function mousedown(event){
  mouseDownLocation = new Vec( event.offsetX, event.offsetY) ;
  document.body.querySelector("#board").addEventListener("mousemove", drag);
  document.body.querySelector("#board").addEventListener("mouseup", e => {
    document.body.querySelector("#board").removeEventListener("mousemove", drag);
  });
}

function mouseWheel(event){
  event.preventDefault();
  console.log(event.deltaY);
  if (event.deltaY>0){
    scale *= 1.1;
    screenOffset = screenOffset.scale(1/1.1);
  }
  if (event.deltaY<0){
    scale /= 1.1;
    screenOffset = screenOffset.scale(1.1);
  }
  reScale();
}

function drag(event){
  screenOffset = screenOffset.add(mouseDownLocation.scale(-1).add(new Vec(event.offsetX,  event.offsetY)).scale(-1/(scale)))
  mouseDownLocation =  new Vec( event.offsetX, event.offsetY) ;
  reScale();
}

function menuClick(event){
  console.log("click" + selected.state);
  if(selected.state == 3){
    if(event.offsetY < 100){
      hexObjects[selected.hex.id].station = {type: "base", owner: playerTurn}
      selected = {hex:null, state:0}
      possibleMoves = []; possibleAttacks = [];
    }
  }
  drawScreen();
}


function getRealXYfromScreenXY(a){return a.scale(1/scale).add(screenOffset)}

function doo(event){
  let clickHex = Hex.getUnitHexFromXY(getRealXYfromScreenXY(new Vec(event.offsetX,  event.offsetY)).scale(1/hexSize))
  onHexClicked(clickHex);
  drawScreen();
  drawMenu();
}
