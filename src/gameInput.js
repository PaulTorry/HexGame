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
  e.preventDefault(); e.stopPropagation()
  translateView(dif)
  mouseDownLocation = offset
  drawViewfromBuffer()
}

function topPanelClick (event) {
  event.preventDefault()
  // if (event.offsetX < 90 && event.offsetY < 100) {
  //   nextTurn()
  //   buttonFunctions['nextTurnButton']()
  // } else if (event.offsetY < 90 && event.offsetX > 710) {
  //   // if (!preturn) toggleTechTree()
  //   buttonFunctions['techTreeButton']()
  // } else if (event.offsetX > 655 && event.offsetX < 700 && event.offsetY > 5 && event.offsetY < 50) {
  //   // toggleMenu()
  //   buttonFunctions['menuButton']()
  // } else
  if (event.offsetY < 90 && event.offsetY > 10 && screenSettings.currentCanvas === 'spaceView') {
    const num = Math.ceil((event.offsetX - 110) / 70)
    if (num && sel.menu[num - 1]) {
      onTopPanelItemClicked(sel.menu[num - 1])
    }
  }
  drawScreen()
}

const buttonFunctions = {
  menuButton: toggleMenu,
  techTreeButton: toggleTechTree,
  nextTurnButton: nextTurn
}

function toggleMenu () {
  if (screenSettings.currentCanvas === 'menuView') {
    if (preturn) changeCanvas('nextTurnView')
    else changeCanvas('spaceView')
  } else changeCanvas('menuView')
  menuData.Screen = 'MainMenu'
}

function toggleTechTree (newState) {
  if (!preturn) {
    // if (newState === undefined) newState = !screenSettings.openTechTree
    // screenSettings.openTechTree = newState
    if (screenSettings.currentCanvas === 'spaceView') changeCanvas('techTreeView')
    else { changeCanvas('spaceView') }
  }
}

function boardClick (event, view = views.spaceView) {
  const ss = screenSettings
  const offset = new Vec(event.offsetX, event.offsetY)
  const getHex = (o, v) => Hex.getUnitHexFromXY(getViewXYfromScreenXY(o, v).scale(1 / v.hexSize))

  const buttonPressed = data.floatingButtons.find((b) => {
    const pos = b.dimensionMultiplier.add(Vec.unit).scale2d(ss.screenCenter).add(b.offset)
    //console.log(offset, pos, b.size, offset.distance(pos) < b.size * 0.65)
    return offset.distance(pos) < b.size
  })

  if (buttonPressed) {
    buttonFunctions[buttonPressed.name]()
  } else if (ss.currentCanvas === 'nextTurnView') {
    console.log('nextTurnScreenClick')
    if (!state.meta.online || debug || checkPlayerTurn()) {
      translateViewTo(getXYfromHex(state.playerData[state.playerTurn].capital))
      changeCanvas('spaceView')
      preturn = false
    }
  } else if (ss.currentCanvas === 'spaceView') {
    onSpaceHexClicked(getHex(offset, views.spaceView))
  } else if (ss.currentCanvas === 'techTreeView') {
    onTechHexClicked(getHex(offset, views.techTreeView))
  } else if (ss.currentCanvas === 'menuView') {
    onMenuHexClicked(getHex(offset, views.menuView))
  }

  drawScreen()
}

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
  // sel = { state: 0, actions: { attacks: [], menu: [] }, moves: [] }
  event.preventDefault(); event.stopPropagation()

  const t1 = new Vec(event.touches[0].pageX, event.touches[0].pageY)
  if (event.touches[1]) {
    const t2 = new Vec(event.touches[1].pageX, event.touches[1].pageY)
    const fingerDistanceNew = t1.distance(t2)
    if (fingerDistance) {
      scaleView(fingerDistance / fingerDistanceNew)
    }
    fingerDistance = fingerDistanceNew
  } else fingerDistance = null

  translateView(mouseDownLocation.subtract(t1))
  mouseDownLocation = t1
  drawViewfromBuffer()
}

function keyHandle (e) {
  if (e.code === 'Tab') interactiveConsole()
  if (Number(e.key)) interactiveConsole(Number(e.key))
  // if (e.key === 'ArrowRight') theta += 0.1
  // if (e.key === 'ArrowLeft') theta -= 0.1
  drawScreen()
}

function resizeScreen (event) {
  console.log(window.innerHeight, window.innerWidth)
}
