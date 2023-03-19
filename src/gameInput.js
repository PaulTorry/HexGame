'use strict'

/* global
Board, View, Overlay
screenSettings, data,
Vec, Hex, sel:true, menuData,
getXYfromHex,
drawSpaceView, drawTechTree, drawMenu, drawNextTurnView, drawButtons, drawFloatingButtons,
state, debug, loggedInPlayer
drawScreen, interactiveConsole
nextTurn,  onTopPanelItemClicked,  onTechHexClicked, onMenuHexClicked, onSpaceHexClicked,
preturn:true,
*/

/* eslint-disable no-unused-vars, one-var, */

function buttonCLick (offset, view = views.spaceView) {
  const buttonFunctions = {
    menuButton: () => {
      if (board.currentView === board.views.menuView) {
        if (preturn) changeCanvas('nextTurnView')
        else changeCanvas('spaceView')
      } else changeCanvas('menuView')
      menuData.Screen = 'MainMenu'
    },
    techTreeButton: (newState) => {
      if (!preturn) {
        if (screenSettings.currentCanvas === 'spaceView') changeCanvas('techTreeView')
        else { changeCanvas('spaceView') }
      }
    },
    nextTurnButton: nextTurn
  }
  const buttonPressed = data.floatingButtons.find((b) => {
    const pos = b.dimensionMultiplier.add(new Vec(1, 1)).scaleByVec(board.screenCenter).add(b.offset)
    // console.log('buttonclick', offset, pos, offset.distance(pos), b.size, offset.distance(pos) < b.size)
    return offset.distance(pos) < b.size
  })
  // console.log(buttonPressed)
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
      return Hex.getXYfromUnitHex(hex, true).scale(ml.hexsize).add(ml.offset)
    }
    menuItem = sel.menu.map((v, i) => [v, i]).find((v, i) => offset.distance(posFunc(i)) < ml.hexsize)
  }

  if (menuItem && menuItem[0]) {
    onTopPanelItemClicked(menuItem[0])
  }
  drawScreen()
  return menuItem && menuItem[0]
}

function nextTurnScreenClick () {
  console.log('nextTurnScreenClick')
  if (!state.meta.online || debug || checkPlayerTurn()) {
    // board.currentView.translateViewTo(getXYfromHex(state.playerData[state.playerTurn].capital))
    changeCanvas('spaceView')
    board.currentView.translateViewTo(getXYfromHex(state.playerData[state.playerTurn].capital))
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

const inputFunctions = {
  spaceView: (l) => onSpaceHexClicked(Hex.getUnitHexFromXY(l.scale(1 / 75))),
  techTreeView: (l) => onTechHexClicked(Hex.getUnitHexFromXY(l.scale(1 / 35))),
  menuView: (l) => onMenuHexClicked(Hex.getUnitHexFromXY(l.scale(1 / 45)))
}

const views = {
  spaceView: new View(inputFunctions.spaceView, drawSpaceView, new Vec(1600, 1600)),
  techTreeView: new View(inputFunctions.techTreeView, drawTechTree),
  menuView: new View(inputFunctions.menuView, drawMenu),

  nextTurnView: new View(nextTurnScreenClick, drawNextTurnView),
  buttons: new Overlay(overlayClick, drawButtons),
  floatingButtons: new Overlay(buttonCLick, drawFloatingButtons)
}

const board = new Board(document.getElementById('board'), views, views.spaceView,
  [views.buttons, views.floatingButtons], {
    drawScreen: drawScreen,
    deSelect: function () { sel = { state: 0, actions: { attacks: [], menu: [] }, moves: [] } },
    boardClick: overlayClick
  }, new Vec(400, 400)
)

function changeCanvas (canvas) {
  screenSettings.currentCanvas = canvas
  board.currentView = views[canvas]
}
