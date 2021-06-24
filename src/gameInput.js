'use strict'

/* global
Board, View
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

function overlayClick (offset, view = views.spaceView) {
  const ss = screenSettings
  const getHex = (o, v) => Hex.getUnitHexFromXY(view.getViewXYfromScreenXY(o, v).scale(1 / v.hexSize))
  let menuItem = []

  const buttonPressed = data.floatingButtons.find((b) => {
    const pos = b.dimensionMultiplier.add(new Vec(1, 1)).scaleByVec(ss.screenCenter).add(b.offset)
    return offset.distance(pos) < b.size
  })

  if (sel.menu && sel.menu.length > 0 && ss.currentCanvas === 'spaceView') {
    const ml = ss.thingMenuLocation
    const posFunc = (i) => {
      const hex = Hex.nToHex(i, Math.floor((ss.screenCenter.x - ml.offset.x / 2) / (ml.hexsize)), true)
      return Hex.getXYfromUnitHex(hex, true).scale(ml.hexsize).add(ml.offset) // .add(ss.screenCenter.scaleXY(-1, -1))
    }

    menuItem = sel.menu.map((v, i) => [v, i]).find((v, i) => offset.distance(posFunc(i)) < ml.hexsize)

    const details = data.thingList.find(t => t.thing === v)
    if (details.sprite && details.sprite[0][0]) {
      console.log('problem', details) // drawMenuItem(c, details, posFunc(i))  
    } else (console.log('problem', details))
  }

  if (buttonPressed) {
    buttonFunctions[buttonPressed.name]()
  } else if (menuItem && menuItem[0] && ss.currentCanvas === 'spaceView') {
    console.log(menuItem)
    onTopPanelItemClicked(menuItem[0])
  }
  drawScreen()
}

function nextTurnScreenClick () {
  console.log('nextTurnScreenClick')
  if (!state.meta.online || debug || checkPlayerTurn()) {
    console.log('nextTurnScreenClick')
    board.view.translateViewTo(getXYfromHex(state.playerData[state.playerTurn].capital))
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

const views = {
  spaceView: new View('spaceView', 75, (l) => onSpaceHexClicked(Hex.getUnitHexFromXY(l.scale(1 / 75))), new Vec(1600, 1600)),
  techTreeView: new View('techTreeView', 35, (l) => onTechHexClicked(Hex.getUnitHexFromXY(l.scale(1 / 35))), new Vec(400, 400)),
  menuView: new View('menuView', 45, (l) => onMenuHexClicked(Hex.getUnitHexFromXY(l.scale(1 / 45))), new Vec(400, 400)),
  nextTurnView: new View('nextTurnView', 75, nextTurnScreenClick, new Vec(400, 400)),
  buttons: new View('buttons', 35, () => null, new Vec(400, 400))
}

const board = new Board(document.getElementById('board'), views.nextTurnView, views.buttons, {
  drawScreen: drawScreen,
  deSelect: function () { sel = { state: 0, actions: { attacks: [], menu: [] }, moves: [] } },
  boardClick: overlayClick
}, new Vec(300, 300)
)

function changeCanvas (canvas) {
  screenSettings.currentCanvas = canvas
  board.view = views[canvas]
}
