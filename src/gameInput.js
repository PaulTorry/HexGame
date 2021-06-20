'use strict'

/* global
Board,
views, screenSettings,
Vec, Hex, sel:true, menuData,
getXYfromHex,
state, debug, loggedInPlayer
data,
drawScreen, interactiveConsole
nextTurn,  onTopPanelItemClicked,  onTechHexClicked, onMenuHexClicked, onSpaceHexClicked,
preturn:true,
*/

/* eslint-disable no-unused-vars, one-var, */

const board = new Board(document.getElementById('board'), views.spaceView, {
  drawScreen: drawScreen,
  deSelect: function () { sel = { state: 0, actions: { attacks: [], menu: [] }, moves: [] } },
  boardClick: boardClick
})

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

function boardClick (offset, view = views.spaceView) {
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
      return Hex.getXYfromUnitHex(hex, true).scale(ml.hexsize).add(ml.offset)// .add(ss.screenCenter.scaleXY(-1, -1))
    }

    menuItem = sel.menu.map((v, i) => [v, i]).find((v, i) => offset.distance(posFunc(i)) < ml.hexsize)

    // const details = data.thingList.find(t => t.thing === v)
    // if (details.sprite && details.sprite[0][0]) {
    //   drawMenuItem(c, details, posFunc(i))
    // } else (console.log('problem', details))
  }

  if (buttonPressed) {
    buttonFunctions[buttonPressed.name]()
  } else if (menuItem && menuItem[0] && ss.currentCanvas === 'spaceView') {
    console.log(menuItem)
    onTopPanelItemClicked(menuItem[0])
  } else if (ss.currentCanvas === 'nextTurnView') {
    console.log('nextTurnScreenClick')
    if (!state.meta.online || debug || checkPlayerTurn()) {
      view.translateViewTo(getXYfromHex(state.playerData[state.playerTurn].capital))
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

function keyHandle (e) {
  if (e.code === 'Tab') interactiveConsole()
  if (Number(e.key)) interactiveConsole(Number(e.key))
  // if (e.key === 'ArrowRight') theta += 0.1
  // if (e.key === 'ArrowLeft') theta -= 0.1
  drawScreen()
}

function changeCanvas (canvas) {
  screenSettings.currentCanvas = canvas
}
