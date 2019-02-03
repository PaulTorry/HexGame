"use strict";

let mouseDownLocation = new Vec(0,0);
let mouseDownLocationABS = new Vec(0,0);
let fingerDistance = null;

/*global
Vec, Hex,
scale:true, screenOffset:true, screenCenter, hexSize, sel:true
mouseDownLocationABS:true, mouseDownLocation:true, fingerDistance:true,



drawScreen, drawMenu,

nextTurn,  onMenuItemClicked, techTreeOffset,
openTechTree:true,  onTechHexClicked,
onHexClicked,
*/

/* eslint-disable no-unused-vars */

function getRealXYfromScreenXY(a) {return a.scale(1 / scale).add(screenOffset); }

function scaleContext(s){
  var c = document.getElementById("board").getContext("2d");
  scale *= s;
  c.scale(s,s);
  let off = screenOffset.scale(1/s)
  let dif = screenOffset.subtract(off)
  
  screenOffset = off;
  translateContext(dif);
}

function translateContext(dif, ctx = "board") {
  var c = document.getElementById(ctx).getContext("2d");
  screenOffset = screenOffset.add(dif)
  c.translate(-dif.x,-dif.y)
}

function translateContextTo(loc, ctx = "board"){
  // console.log(loc);
  var c = document.getElementById(ctx).getContext("2d");
  let dif = loc.subtract(screenOffset).subtract(screenCenter);
  screenOffset = screenOffset.add(dif)
  c.translate(-dif.x,-dif.y)
}


function mousedown(event){
  mouseDownLocationABS = new Vec( event.offsetX, event.offsetY) ;
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
  //console.log(mouseDownLocationABS.scale(-1).add(new Vec(event.offsetX,  event.offsetY)).scale(-1/(scale)).mag);
  if (mouseDownLocationABS.scale(-1).add(new Vec(event.offsetX,  event.offsetY)).scale(-1/(scale)).mag > 20){
    sel = {state:0, attacks:[], menu:[], moves:[]}
  }
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
    openTechTree = !openTechTree;
    document.getElementById("menu").height = 100 + 300 * openTechTree;
  }
  else if(event.offsetY < 50 && event.offsetY > 10){
    let num = Math.round((event.offsetX+10)/60);
    if (num && sel.menu[num -1]){
      console.log(sel, sel.menu, sel.menu[num -1]);
      onMenuItemClicked(sel.menu[num -1]);
    }
  }
  else{
    let clickHex = Hex.getUnitHexFromXY((new Vec(event.offsetX,  event.offsetY).add(techTreeOffset.invert())).scale(1/50))
    onTechHexClicked(clickHex);
  }
  drawScreen();
  drawMenu();
}


function boardClick(event){
  let clickHex = Hex.getUnitHexFromXY(getRealXYfromScreenXY(new Vec(event.offsetX,  event.offsetY)). scale(1/hexSize))
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

  sel = {state:0, attacks:[], menu:[], moves:[]}

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
