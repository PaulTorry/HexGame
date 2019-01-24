"use strict"

function getRealXYfromScreenXY(a){return a.scale(1/scale).add(screenOffset)}

function scaleContext(s){
  var c = document.getElementById("board").getContext("2d");
  scale *= s;
  c.scale(s,s)
  screenOffset = screenOffset.scale(1/s);
}

function translateContext(dif, ctx = "board"){
  var c = document.getElementById(ctx).getContext("2d");
  screenOffset = screenOffset.add(dif)
  c.translate(-dif.x,-dif.y)
}


function mousedown(event){
  mouseDownLocation = new Vec( event.offsetX, event.offsetY) ;
//  console.log("mousedown");
  document.getElementById("board").addEventListener("mousemove", drag);
  document.getElementById("board").addEventListener("mouseup", removeMousemove);
}

function removeMousemove(event){
//  console.log("removeMousemove");
  document.getElementById("board").removeEventListener("mousemove", drag);
  document.getElementById("board").removeEventListener("mouseup", removeMousemove);
}


function mouseWheel(event){
  event.preventDefault();
  if (event.deltaY>0){    scaleContext(1.1);  }
  if (event.deltaY<0){    scaleContext(1/1.1);  }
  drawScreen();
}

function drag(event){
  currentShip = null; selected = {hex:null, state:0} ;
  possibleMoves = []; possibleAttacks = []; menu = [];

  event.preventDefault();
  event.stopPropagation();
  var c = document.getElementById("board").getContext("2d");
  let dif = mouseDownLocation.scale(-1).add(new Vec(event.offsetX,  event.offsetY)).scale(-1/(scale));
  translateContext(dif)
  mouseDownLocation =  new Vec( event.offsetX, event.offsetY) ;
  drawScreen();
}


function menuClick(event){
  event.preventDefault();
  if(event.offsetY > 50 && event.offsetY < 100){nextTurn()}
  else if (event.offsetY < 50 && event.offsetX > 600) {
  //  console.log(openTechTree);
    openTechTree = !openTechTree;
    document.getElementById("menu").height = 100 + 300 * openTechTree;
  }
  else if(event.offsetY < 50 && event.offsetY > 10){
    let num = Math.round((event.offsetX+10)/40);
    if (num && menu[num -1]){
      onMenuItemClicked(menu[num -1]);
    }
  }
  else{
//    console.log(new Vec(event.offsetX,  event.offsetY));
//    console.log((new Vec(event.offsetX,  event.offsetY).add(techTreeOffset.invert())).scale(1/50));
    let clickHex = Hex.getUnitHexFromXY((new Vec(event.offsetX,  event.offsetY).add(techTreeOffset.invert())).scale(1/50))
  //  console.log(clickHex);

      onTechHexClicked(clickHex);
    }
  drawScreen();
  drawMenu();
}


function boardClick(event){
  let clickHex = Hex.getUnitHexFromXY(getRealXYfromScreenXY(new Vec(event.offsetX,  event.offsetY)).
    scale(1/hexSize))
  onHexClicked(clickHex);
  drawScreen();
}


function touchstart(event){
    let {pageX,pageY} = event.touches[0];
  mouseDownLocation = new Vec( pageX, pageY) ;
//console.log("touchstart");
  document.getElementById("board").addEventListener("touchmove", touchdrag);
  document.getElementById("board").addEventListener("touchend", removeTouchmove);
}

function removeTouchmove(event){
//  console.log("removeTouchmove");
  fingerDistance = null;
  document.getElementById("board").removeEventListener("touchmove", touchdrag);
  document.getElementById("board").removeEventListener("touchend", removeTouchmove);
}

function touchdrag(event){
  currentShip = null; selected = {hex:null, state:0} ;
  possibleMoves = []; possibleAttacks = []; menu = [];

  event.preventDefault();
  event.stopPropagation();
  var c = document.getElementById("board").getContext("2d");
  let {pageX,pageY} = event.touches[0];
  if(event.touches[1]){
    let {pageX:x2,pageY:y2} = event.touches[1];
  //  console.log(pageX , x2 , pageY , y2)
    let fingerDistanceNew = Math.sqrt( (pageX - x2)*(pageX - x2) + (pageY - y2)*(pageY - y2))
  //  console.log(fingerDistanceNew + "fingerDistanceNew");
    if (fingerDistance){
      scaleContext(fingerDistanceNew/fingerDistance)
    }
    fingerDistance = fingerDistanceNew
  }
  else fingerDistance = null;
  let dif = mouseDownLocation.scale(-1).add(new Vec(pageX, pageY)).scale(-1/(scale));
  translateContext(dif)
  mouseDownLocation =  new Vec( pageX, pageY) ;
  drawScreen();
}
