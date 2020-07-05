'use strict'

/* global
Vec, Hex, sel:true, menuData
getXYfromHex,    graphics

state, debug, loggedInPlayer

drawScreen, drawMenu, screenSettings, interactiveConsole
nextTurn,  onTopPanelItemClicked,  onTechHexClicked, onMenuHexClicked, onHexClicked,
preturn:true,
*/

/* eslint-disable no-unused-vars, one-var, */

let mouseDownLocation = new Vec()
let mouseDownLocationABS = new Vec()
let fingerDistance = null

function scaleSpaceContainer (factor) {
  graphics.space.scale.set(factor * graphics.space.scale.x) 
}



function moveSpaceContainer (a) {
 // console.log(a)
  graphics.space.pivot.x += a.x
  graphics.space.pivot.y += a.y
}

function mousedown (event) {
  mouseDownLocationABS = new Vec(event.offsetX, event.offsetY)
  mouseDownLocation = new Vec(event.offsetX, event.offsetY)
  document.getElementById('wrap').addEventListener('mousemove', drag)
  document.getElementById('wrap').addEventListener('mouseup', removeMousemove)
  document.getElementById('wrap').addEventListener('mouseout', removeMousemove)
}

function removeMousemove (event) {
  document.getElementById('wrap').removeEventListener('mousemove', drag)
  document.getElementById('wrap').removeEventListener('mouseup', removeMousemove)
}

function mouseWheel (event) {
  // console.log(event);
  event.preventDefault()
  if (event.deltaY > 0) { scaleSpaceContainer(1.1) }
  if (event.deltaY < 0) { scaleSpaceContainer(1 / 1.1) }
}


function drag (event) {
  if (mouseDownLocationABS.scale(-1).add(new Vec(event.offsetX, event.offsetY)).scale(-1 / (screenSettings.scale)).mag > 20) {
    sel = { state: 0, actions: { attacks: [], menu: [] }, moves: [] }
  }
  event.preventDefault()
  event.stopPropagation()
  const dif = mouseDownLocation.scale(-1).add(new Vec(event.offsetX, event.offsetY)).scale(-1)
  moveSpaceContainer(dif.scale(1/graphics.space.scale.x))
  mouseDownLocation = new Vec(event.offsetX, event.offsetY)
}

function touchstart (event) {
  const { pageX, pageY } = event.touches[0]
  mouseDownLocation = new Vec(pageX, pageY)
  document.getElementById('wrap').addEventListener('touchmove', touchdrag)
  document.getElementById('wrap').addEventListener('touchend', removeTouchmove)
}

function removeTouchmove (event) {
  fingerDistance = null
  document.getElementById('wrap').removeEventListener('touchmove', touchdrag)
  document.getElementById('wrap').removeEventListener('touchend', removeTouchmove)
}

function touchdrag (event) {
  sel = { state: 0, actions: { attacks: [], menu: [] }, moves: [] }

  event.preventDefault()
  event.stopPropagation()
  var c = document.getElementById('wrap').getContext('2d')
  const { pageX, pageY } = event.touches[0]
  if (event.touches[1]) {
    const { pageX: x2, pageY: y2 } = event.touches[1]
    //  console.log(pageX , x2 , pageY , y2)
    const fingerDistanceNew = Math.sqrt((pageX - x2) * (pageX - x2) + (pageY - y2) * (pageY - y2))
    //  console.log(fingerDistanceNew + "fingerDistanceNew");
    if (fingerDistance) {
      scaleContext(fingerDistanceNew / fingerDistance)
    }
    fingerDistance = fingerDistanceNew
  } else fingerDistance = null
  const dif = mouseDownLocation.scale(-1).add(new Vec(pageX, pageY)).scale(-1 / (screenSettings.scale))
  translateContext(dif)
  mouseDownLocation = new Vec(pageX, pageY)
  //drawScreen()
}

function keyHandle (e) {
//  console.log(e); 
  if (e.code === 'Tab') interactiveConsole()
  if (Number(e.key)) interactiveConsole(Number(e.key))
  if (e.key === 'ArrowRight') theta += 0.1
  if (e.key === 'ArrowLeft') theta -= 0.1

  //drawScreen()
}
