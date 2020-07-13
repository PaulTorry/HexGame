'use strict'

/* global
Vec, Hex, sel:true, menuData
getXYfromHex,
drawViewfromBuffer,
state, debug, loggedInPlayer
views,
drawScreen, drawMenu, screenSettings, interactiveConsole
nextTurn,  onTopPanelItemClicked,  onTechHexClicked, onMenuHexClicked, onHexClicked,
preturn:true,
*/

/* eslint-disable no-unused-vars, one-var, */

let mouseDownLocation = new Vec()
let mouseDownLocationABS = new Vec()
let fingerDistance = null

function scaleView (sc, view = views.space) {
  const newZoom = view.zoom * sc
  view.zoom = Math.max(0.2, Math.min(5, newZoom))
}

function translateView (dif, view = views.space) {
  const newOffset = view.offset.add(dif.scale(view.zoom))
  view.offset = newOffset.bounds(view.center)
  // console.log(view.offset)
}

function translateViewTo (loc, view = views.space) {
  view.offset = loc
  // @TODO bounds method on Vec
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
  // console.log(event);
  event.preventDefault()
  if (event.deltaY < 0) { scaleView(1 / 1.1) }
  if (event.deltaY > 0) { scaleView(1.1) }
  drawViewfromBuffer()
}

function drag (e, view = views.space) {
  const offset = new Vec(e.offsetX, e.offsetY)
  if (mouseDownLocationABS.scale(-1).add(offset).scale(-1 / (view.zoom)).mag > 20) {
    sel = { state: 0, actions: { attacks: [], menu: [] }, moves: [] }
  //  drawScreen()
  }
  e.preventDefault()
  e.stopPropagation()
  const dif = mouseDownLocation.subtract(offset)
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
    if (screenSettings.currentCanvas === 'mainMenu') {
      if (preturn) changeCanvas('nextTurnScreen')
      else changeCanvas('board')
    } else changeCanvas('mainMenu')
    menuData.Screen = 'MainMenu'
    // interactiveConsole();
  } else if (event.offsetY < 90 && event.offsetY > 10 && !screenSettings.openTechTree) {
    // console.log(event.offsetX)
    // console.log((event.offsetX - 110), (event.offsetX - 110) / 70)
    const num = Math.ceil((event.offsetX - 110) / 70)
    // console.log(num)
    if (num && sel.menu[num - 1]) {
      // console.log(sel, sel.menu, sel.menu[num - 1])
      onTopPanelItemClicked(sel.menu[num - 1])
    }
  }

  drawScreen()
  //drawMenu()
}

function toggleTechTree (newState) {
  if (newState === undefined) newState = !screenSettings.openTechTree
  screenSettings.openTechTree = newState
  if (newState) changeCanvas('techTree')
  else { changeCanvas('board') }
}

function techTreeClick (event) {
  if (event.offsetX > 720 && event.offsetY > 720) interactiveConsole()
  const offset = new Vec(event.offsetX, event.offsetY)
  const clickHex = Hex.getUnitHexFromXY((offset.add(screenSettings.techTreeOffset.invert())).scale(1 / 35))
  onTechHexClicked(clickHex)
  drawScreen()
}

function getBufferXYfromViewXY (pt, view = views.space) {
  return pt.subtract(screenSettings.screenCenter).scale(view.zoom).add(view.offset)
}

function nextTurnScreenClick (event) {
  console.log('nextTurnScreenClick')
  if (!state.meta.online || debug || checkPlayerTurn()) {
    translateViewTo(getXYfromHex(state.playerData[state.playerTurn].capital))
    changeCanvas('board')
    preturn = false
  }
  drawScreen()
}

function boardClick (event) {
  if (screenSettings.currentCanvas === 'nextTurnScreen') {
    console.log('nextTurnScreenClick')
    if (!state.meta.online || debug || checkPlayerTurn()) {
      translateViewTo(getXYfromHex(state.playerData[state.playerTurn].capital))
      changeCanvas('board')
      preturn = false
    }
    drawScreen()
  } else {
    const offset = new Vec(event.offsetX, event.offsetY)
    const bxy = getBufferXYfromViewXY(offset)
    const uxy = bxy.scale(1 / views.space.hexSize)
    const hex = Hex.getUnitHexFromXY(uxy)
    console.log(offset, bxy, uxy, hex)
    onHexClicked(hex)
    drawScreen()
  }
}

function mainMenuClick (event) {
  console.log('mainMenuClick')
  const clickHex = Hex.getUnitHexFromXY((new Vec(event.offsetX, event.offsetY).add(screenSettings.techTreeOffset.invert())).scale(1 / 45))
  onMenuHexClicked(clickHex)

  drawScreen()
}

function loadGameMenuClick (event) {
  console.log('loadGameMenuClick')
}

function checkPlayerTurn () {
  const playerNum = state.meta.playergrid.filter((x) => x[1] === loggedInPlayer.handle)[0][0]
  return playerNum === state.playerTurn
}

function changeCanvas (canvas) {
  screenSettings.currentCanvas = canvas

  //document.body.querySelector('#board').style.display = 'none'
  // document.body.querySelector('#techTree').style.display = 'none'
  // document.body.querySelector('#mainMenu').style.display = 'none'
  // document.body.querySelector('#newGameMenu').style.display = 'none'
  // document.body.querySelector('#loadGameMenu').style.display = 'none'
  // document.body.querySelector('#nextTurnScreen').style.display = 'none'
  // if (canvas === 'board' && preturn) console.log('Ooops skipping nextTurnScreen')
  //document.body.querySelector(`#${canvas}`).style.display = 'block'
 // screenSettings.currentCanvas = canvas
}

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

function touchdrag (event, view = views.space) {
  sel = { state: 0, actions: { attacks: [], menu: [] }, moves: [] }

  event.preventDefault()
  event.stopPropagation()
  var c = document.getElementById('board').getContext('2d')
  const { pageX, pageY } = event.touches[0]
  if (event.touches[1]) {
    const { pageX: x2, pageY: y2 } = event.touches[1]
    //  console.log(pageX , x2 , pageY , y2)
    const fingerDistanceNew = Math.sqrt((pageX - x2) * (pageX - x2) + (pageY - y2) * (pageY - y2))
    //  console.log(fingerDistanceNew + "fingerDistanceNew");
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
  if (e.key === 'ArrowRight') theta += 0.1
  if (e.key === 'ArrowLeft') theta -= 0.1

  drawScreen()
}
