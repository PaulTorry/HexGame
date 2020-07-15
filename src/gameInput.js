'use strict'

/* global
Vec, Hex, sel:true, menuData,
getXYfromHex,
drawViewfromBuffer,
state, debug, loggedInPlayer
views,
drawScreen, drawMenu, screenSettings, interactiveConsole
nextTurn,  onTopPanelItemClicked,  onTechHexClicked, onMenuHexClicked, onSpaceHexClicked,
preturn:true,
*/

/* eslint-disable no-unused-vars, one-var, */

let mouseDownLocation = new Vec()
let mouseDownLocationABS = new Vec()
let fingerDistance = null

function getViewXYfromScreenXY (pt, view = views.spaceView) {
  return pt.subtract(screenSettings.screenCenter).scale(view.zoom).add(view.offset)
}

function scaleView (sc, view = views[screenSettings.currentCanvas]) {
  const newZoom = view.zoom * sc
  view.zoom = Math.max(0.2, Math.min(5, newZoom))
  translateView(Vec.zero, view)
}

function translateView (dif, view = views[screenSettings.currentCanvas]) { // views.spaceView) {
  const newOffset = view.offset.add(dif.scale(view.zoom))
  view.offset = newOffset.bounds(view.center.subtract(screenSettings.screenCenter.scale(view.zoom)))
}

function translateViewTo (loc, view = views.spaceView) {
  const newOffset = loc
  view.offset = newOffset.bounds(view.center)
}

function mousedown (event) {
  mouseDownLocationABS = new Vec(event.offsetX, event.offsetY)
  mouseDownLocation = new Vec(event.offsetX, event.offsetY)
  document.getElementById('board').addEventListener('mousemove', drag)
  document.getElementById('board').addEventListener('mouseup', removeMousemove)
}

function removeMousemove (event) {
  document.getElementById('board').removeEventListener('mousemove', drag)
  document.getElementById('board').removeEventListener('mouseup', removeMousemove)
}

function mouseWheel (event) {
  event.preventDefault()
  if (event.deltaY < 0) { scaleView(1 / 1.1) }
  if (event.deltaY > 0) { scaleView(1.1) }
  drawViewfromBuffer()
}

function drag (e, view = views.spaceView) {
  const offset = new Vec(e.offsetX, e.offsetY)
  const dif = mouseDownLocation.subtract(offset)
  if (mouseDownLocationABS.subtract(offset).mag > 20) {
    sel = { state: 0, actions: { attacks: [], menu: [] }, moves: [] }
  }
  e.preventDefault()
  e.stopPropagation()
  translateView(dif)
  mouseDownLocation = offset
  drawViewfromBuffer()
}

function topPanelClick (event) {
  event.preventDefault()
  if (event.offsetX < 90 && event.offsetY < 100) {
    nextTurn()
  } else if (event.offsetY < 90 && event.offsetX > 710) {
    if (!preturn) toggleTechTree()
  } else if (event.offsetX > 655 && event.offsetX < 700 && event.offsetY > 5 && event.offsetY < 50) {
    if (screenSettings.currentCanvas === 'menuView') {
      if (preturn) changeCanvas('nextTurnView')
      else changeCanvas('spaceView')
    } else changeCanvas('menuView')
    menuData.Screen = 'MainMenu'
  } else if (event.offsetY < 90 && event.offsetY > 10 && screenSettings.currentCanvas === 'spaceView') {
    const num = Math.ceil((event.offsetX - 110) / 70)
    if (num && sel.menu[num - 1]) {
      onTopPanelItemClicked(sel.menu[num - 1])
    }
  }
  drawScreen()
}

function toggleTechTree (newState) {
  if (newState === undefined) newState = !screenSettings.openTechTree
  screenSettings.openTechTree = newState
  if (newState) changeCanvas('techTreeView')
  else { changeCanvas('spaceView') }
}

// function nextTurnScreenClick (event) {
//   console.log('nextTurnScreenClick')
//   if (!state.meta.online || debug || checkPlayerTurn()) {
//     translateViewTo(getXYfromHex(state.playerData[state.playerTurn].capital))
//     changeCanvas('spaceView')
//     preturn = false
//   }
//   drawScreen()
// }

function boardClick (event, view = views.spaceView) {
  const offset = new Vec(event.offsetX, event.offsetY)
  const getHex = (o, v) => Hex.getUnitHexFromXY(getViewXYfromScreenXY(o, v).scale(1 / v.hexSize))

  if (screenSettings.currentCanvas === 'nextTurnView') {
    console.log('nextTurnScreenClick')
    if (!state.meta.online || debug || checkPlayerTurn()) {
      translateViewTo(getXYfromHex(state.playerData[state.playerTurn].capital))
      changeCanvas('spaceView')
      preturn = false
    }
  } else if (screenSettings.currentCanvas === 'spaceView') {
    onSpaceHexClicked(getHex(offset, views.spaceView))
  } else if (screenSettings.currentCanvas === 'techTreeView') {
    onTechHexClicked(getHex(offset, views.techTreeView))
  } else if (screenSettings.currentCanvas === 'menuView') {
    onMenuHexClicked(getHex(offset, views.menuView))
  }

  drawScreen()
}

// function techTreeClick (event) {
//   if (event.offsetX > 720 && event.offsetY > 720) interactiveConsole()
//   const offset = new Vec(event.offsetX, event.offsetY)
//   const clickHex = Hex.getUnitHexFromXY((offset.add(screenSettings.techTreeOffset.invert())).scale(1 / 35))
//   onTechHexClicked(clickHex)
//   drawScreen()
// }


// function mainMenuClick (event) {
//   console.log('mainMenuClick')
//   const clickHex = Hex.getUnitHexFromXY((new Vec(event.offsetX, event.offsetY).add(screenSettings.techTreeOffset.invert())).scale(1 / 45))
//   onMenuHexClicked(clickHex)
//   drawScreen()
// }

// function loadGameMenuClick (event) {
//   console.log('loadGameMenuClick')
// }

function checkPlayerTurn () {
  const playerNum = state.meta.playergrid.filter((x) => x[1] === loggedInPlayer.handle)[0][0]
  return playerNum === state.playerTurn
}

function changeCanvas (canvas) { screenSettings.currentCanvas = canvas }

function touchstart (event) {
  const { pageX, pageY } = event.touches[0]
  mouseDownLocation = new Vec(pageX, pageY)
  document.getElementById('board').addEventListener('touchmove', touchdrag)
  document.getElementById('board').addEventListener('touchend', removeTouchmove)
}

function removeTouchmove (event) {
  fingerDistance = null
  document.getElementById('board').removeEventListener('touchmove', touchdrag)
  document.getElementById('board').removeEventListener('touchend', removeTouchmove)
}

function touchdrag (event, view = views.spaceView) {
  sel = { state: 0, actions: { attacks: [], menu: [] }, moves: [] }

  event.preventDefault()
  event.stopPropagation()
  var c = document.getElementById('board').getContext('2d')
  const { pageX, pageY } = event.touches[0]
  const t = event.touches.map(({ pageX, pageY }) => new Vec(pageX, pageY))
  console.log(t)
  if (event.touches[1]) {
    const { pageX: x2, pageY: y2 } = event.touches[1]
    const fingerDistanceNew = Math.sqrt((pageX - x2) * (pageX - x2) + (pageY - y2) * (pageY - y2))
    if (fingerDistance) {
      scaleView(fingerDistance / fingerDistanceNew)
    }
    fingerDistance = fingerDistanceNew
  } else fingerDistance = null
  const dif = mouseDownLocation.subtract(new Vec(pageX, pageY))

  translateView(dif)
  mouseDownLocation = new Vec(pageX, pageY)
  drawViewfromBuffer()
}

function keyHandle (e) {
  if (e.code === 'Tab') interactiveConsole()
  if (Number(e.key)) interactiveConsole(Number(e.key))
  // if (e.key === 'ArrowRight') theta += 0.1
  // if (e.key === 'ArrowLeft') theta -= 0.1
  drawScreen()
}
