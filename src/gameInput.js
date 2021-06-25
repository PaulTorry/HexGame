'use strict'

/* global
Board, View, Overlay
screenSettings, data,
Vec, Hex, sel:true, menuData,
getXYfromHex,
state, debug, loggedInPlayer
drawScreen, interactiveConsole
nextTurn,  onTopPanelItemClicked,  onTechHexClicked, onMenuHexClicked, onSpaceHexClicked,
preturn:true,
*/

/* eslint-disable no-unused-vars, one-var, */

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
    if (screenSettings.currentCanvas === 'spaceView') changeCanvas('techTreeView')
    else { changeCanvas('spaceView') }
  }
}

function buttonCLick (offset, view = views.spaceView) {
  const buttonPressed = data.floatingButtons.find((b) => {
    const pos = b.dimensionMultiplier.add(new Vec(1, 1)).scaleByVec(board.screenCenter).add(b.offset)
    // console.log(offset, pos)
    return offset.distance(pos) < b.size
  })
  if (buttonPressed) {
    buttonFunctions[buttonPressed.name]()
  }
  drawScreen()
  return buttonPressed
}

function overlayClick (offset, view = views.spaceView) {
  const ss = screenSettings
  const getHex = (o, v) => Hex.getUnitHexFromXY(view.getViewXYfromScreenXY(o, v).scale(1 / v.hexSize))
  let menuItem = []

  if (sel.menu && sel.menu.length > 0 && ss.currentCanvas === 'spaceView') {
    const ml = ss.thingMenuLocation
    const posFunc = (i) => {
      const hex = Hex.nToHex(i, Math.floor((board.screenCenter.x - ml.offset.x / 2) / (ml.hexsize)), true)
      return Hex.getXYfromUnitHex(hex, true).scale(ml.hexsize).add(ml.offset) // .add(ss.screenCenter.scaleXY(-1, -1))
    }

    menuItem = sel.menu.map((v, i) => [v, i]).find((v, i) => offset.distance(posFunc(i)) < ml.hexsize)
  }

  if (menuItem && menuItem[0]) {
    // console.log(menuItem)
    onTopPanelItemClicked(menuItem[0])
  }
  drawScreen()
  // console.log('button', buttonPressed)
  return menuItem && menuItem[0]
}

function nextTurnScreenClick () {
  console.log('nextTurnScreenClick')
  if (!state.meta.online || debug || checkPlayerTurn()) {
    // console.log('nextTurnScreenClick')
    board.currentView.translateViewTo(getXYfromHex(state.playerData[state.playerTurn].capital))
    changeCanvas('spaceView')
    preturn = false
  }
  drawScreen()
}

function checkPlayerTurn () {
  const playerNum = state.meta.playergrid.filter((x) => x[1] === loggedInPlayer.handle)[0][0]
  return playerNum === state.playerTurn
}

function keyHandle (e) {
  if (e.code === 'Tab') interactiveConsole()
  if (Number(e.key)) interactiveConsole(Number(e.key))
  // if (e.key === 'ArrowRight') theta += 0.1
  // if (e.key === 'ArrowLeft') theta -= 0.1
  drawScreen()
}

const board = new Board(document.getElementById('board'), undefined, undefined, undefined, {
  drawScreen: drawScreen,
  deSelect: function () { sel = { state: 0, actions: { attacks: [], menu: [] }, moves: [] } },
  boardClick: overlayClick
}, new Vec(400, 400)
)

// const viewSize = new Vec(400, 400)

const inputFunctions = {
  spaceView: (l) => onSpaceHexClicked(Hex.getUnitHexFromXY(l.scale(1 / 75))),
  techTreeView: (l) => onTechHexClicked(Hex.getUnitHexFromXY(l.scale(1 / 35))),
  menuView: (l) => onMenuHexClicked(Hex.getUnitHexFromXY(l.scale(1 / 45)))
}

const views = {
  spaceView: new View(inputFunctions.spaceView, new Vec(1600, 1600)),
  techTreeView: new View(inputFunctions.techTreeView),
  menuView: new View(inputFunctions.menuView),

  nextTurnView: new View(nextTurnScreenClick),
  buttons: new Overlay(overlayClick),
  floatingButtons: new Overlay(buttonCLick)
}

board.views = views
board.currentView = views.spaceView
board.overlays = [views.buttons, views.floatingButtons]

console.log(board)

function changeCanvas (canvas) {
  screenSettings.currentCanvas = canvas
  board.currentView = views[canvas]
}
