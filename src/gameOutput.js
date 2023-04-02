'use strict'

/* global
screenSettings, Vec, Hex,
sel, state,
getUpdatedViewMask, board,
getTerrainDamage,
 preturn, menuData,
gameSprites, debug, territoryState,  whichPlanetsTerritory,
data, subTurn,
localGameInfo, loggedInPlayer,
cacheGameList, drawArrow, drawFromCode, drawText
*/

/* eslint-disable no-unused-vars, dot-notation */

function drawFromData (c, sprite, xx = 0, yy = 0, colourMap = x => x, scaleFactor = 1, rotation = 0, reverse = false) {
  drawFromCode(c, gameSprites[sprite], xx, yy, colourMap, scaleFactor, rotation, reverse)
}

function getPlayerColour (player = state.playerTurn, opacity = 1, mid = 0, dark = false) {
  // if (mid || dark) console.log('md', mid, dark);
  //  const playerColours = ['green', 'red', 'lightblue', 'orange', 'purple', 'brown']
  const playerColours = [
    [[33, 163, 79], [216, 36, 53], [124, 0, 255], [0, 131, 219], [177, 0, 95], [158, 170, 30], [216, 130, 25]],
    [[3, 124, 52], [158, 28, 35], [95, 0, 186], [0, 107, 188], [139, 0, 73], [126, 137, 20], [172, 104, 14]],
    [[0, 110, 43], [130, 6, 20], [58, 5, 161], [0, 74, 156], [122, 0, 62], [101, 112, 8], [142, 85, 1]]
  ]

  const [r, g, b] = playerColours[mid][player]
  return `rgba(${r},${g},${b},${opacity})`
}

function getColMap (player, transparency = 1) {
  return (string) => {
    if (string === 'rgb(130, 6, 20)') return getPlayerColour(player, transparency, 1) // MAYBE 0,1)
    else if (string === 'rgb(158, 28, 35)') return getPlayerColour(player, transparency, 1)
    else if (string === 'rgb(215, 35, 53)') return getPlayerColour(player, transparency)
    else if (string === 'rgba(215, 35, 53, 0.00)') return getPlayerColour(player, 0)
    else if (string === 'rgba(215, 35, 53, 0.40)') return getPlayerColour(player, 0.4)
    else return string
  }
}

//  const selectedColour = ['white', 'purple', 'blue', 'orange']

function getXYfromHex (hexCoord, size = 75) { return Hex.getXYfromUnitHex(hexCoord).scale(size) }

function drawScreen (fullUpdate = true) { board.drawScreen(fullUpdate) }

function drawNextTurnView (v) {
  const ss = screenSettings
  const c = v.buffers[0].getContext('2d')
  clear(c)
  const logoSize = 0.3
  drawFromData(c, 'logo', -300 * logoSize, -150 - 300 * logoSize, (x) => x, logoSize)
  drawText(c, `Player ${state.playerTurn} . ${localGameInfo.player}`, -80, 10, 50, getPlayerColour(state.playerTurn))
  drawText(c, 'Click to Start', -80, 50, 30, 'white')
}

function drawSpaceView (v, i = 0) {
  if (!stale.terrain){console.log("stale terrain");  return}
  stale.terrain = false
  const ss = screenSettings
  const c = v.buffers[i].getContext('2d')
  clear(c)
  // const c = b.getContext('2d')
  const viewMask = getUpdatedViewMask(state)

  for (const [id, tile] of state.tiles) {
    const { x, y } = getXYfromHex(tile.hex)
    if (viewMask[id] || debug) {
      

      drawFromData(c, 'fillHexVert', x, y, () => 'rgb(18,15,34)')

      if (gameSprites[tile.terrain]) {
        drawFromData(c, tile.terrain, x, y, undefined, undefined, ...randomiseTextureRotation(tile))
      }
      if (gameSprites[tile.resource]) {
        drawFromData(c, tile.resource, x, y, undefined, undefined, ...randomiseTextureRotation(tile))
      }

      if (tile.station) {
        drawFromData(c, tile.station.type, x, y, getColMap(tile.station.owner), undefined, ...randomiseTextureRotation(tile))
      }
      if (tile.navBeacon) {
        const nt = tile.hex.neighbours.map((v, i) => [state.tiles.get(v.id) && state.tiles.get(v.id).navBeacon, i]).filter(([t, i]) => t)
        if (nt.length) nt.forEach(([v, i]) => drawFromData(c, 'navBeacon', x, y, getColMap(tile.navBeacon.owner), undefined, -i / 6))
        else drawFromData(c, 'navBeaconCross', x, y, getColMap(tile.navBeacon.owner))
      }

      const base = state.baseArray.find(b => b.hex.compare(tile.hex))
      if (base) {
        drawFromData(c, 'planetRing', x, y, getColMap(base.owner))
      }
      if (viewMask[id] === 1) {
        drawFromData(c, 'hexVert', ...getXYfromHex(tile.hex), () => 'rgba(200,200,200,0.1)')
      }
    } else {
      drawFromData(c, 'fillHexVert', x, y, () => 'rgb(18,15,34)')
    }
    drawFromData(c, 'hexVert', ...getXYfromHex(tile.hex), () => 'rgb(37,32,45)')
  }

  for (const [id, tile] of state.tiles) {
    const { x, y } = getXYfromHex(tile.hex)
    if (tile.terrain === 'blackHole' && (viewMask[id] || debug)) {
      drawFromData(c, 'blackHole', x, y, x => x, 1, 0, true)
      //  if (gameSprites[tile.terrain]) { drawFromData(c, gameSprites[tile.terrain], x, y, x => x, 1, 0, true) }
    }
  }
  // drawAssetsAndChangeables(v)
  // drawSelectedHexes(v)
  // clear(c)
}

function drawAssetsAndChangeables (v, i = 1) {
  if (!stale.assets){console.log("stale assets"); return}
  stale.assets = false
  const ss = screenSettings
  const c = v.buffers[i].getContext('2d')
  clear(c)
  const viewMask = getUpdatedViewMask(state)

  for (const [id, tile] of state.tiles) {
    if (viewMask[id] || debug) {
      const planet = whichPlanetsTerritory(tile.hex)
      if (planet) drawFromData(c, 'hexVert', ...getXYfromHex(tile.hex), () => getPlayerColour(planet.owner, 0.5))
      if (debug) drawText(c, `${territoryState(tile.hex)}`, ...getXYfromHex(tile.hex).add(new Vec(-30, -30)), 14)
      if (debug) drawText(c, `${tile.hex.id}`, ...getXYfromHex(tile.hex).addXY(-40, +40), 14, 'grey')
    }
  }

  if (screenSettings.showTrails) {
    for (let h = subTurn(); h >= Math.max(subTurn() - state.numPlayers + 1, 0); h--) {
      for (const { type, rand, path } of state.history[h]) {
        const randomOffset = new Vec(((rand * 123432 % 1) - 0.5) * 25, ((rand * 1232632 % 1) - 0.5) * 25)
        if (type === 'move') {
          for (let i = 0; i < path.length - 1; i++) {
            if (path[i] && path[i + 1] && (debug || viewMask[path[1].id] > 1 || viewMask[path[1].id] > 1)) {
              drawArrow(c, getXYfromHex(path[i]).add(randomOffset), getXYfromHex(path[i + 1]).add(randomOffset), 6, 'rgba(255,255,255,0.3)')
            }
          }
        }
        if (type === 'attack' && (debug || viewMask[path[0].id] > 1 | 5 | viewMask[path[1].id] > 1)) {
          drawArrow(c, getXYfromHex(path[0]), getXYfromHex(path[1]), 2, 'rgba(255,0,0,0.8)')
        }
      }
    }
  }

  for (const ship of state.shipArray) {
    if (viewMask[ship.hex.id] === 2 || debug) {
      let borderColour = 'black'
      if (ship.owner === state.playerTurn && (!ship.moved || !ship.attacked)) { borderColour = 'white' }

      if (gameSprites[ship.type]) {
        const { x, y } = getXYfromHex(ship.hex)
        let transparency = 1
        if (ship.owner !== state.playerTurn || (ship.moved && ship.attacked)) { transparency = 0.4 }
        drawFromData(c, ship.type, x, y, getColMap(ship.owner, transparency))
      }

      drawText(c, `${Math.round(ship.shield + ship.hull)}`, ...getXYfromHex(ship.hex).add(new Vec(-20, 45)), 20, 'white')
      drawText(c, `(${Math.round(ship.hull)})`, ...getXYfromHex(ship.hex).add(new Vec(10, 45)), 15, 'orange')

      let actionIconColour = 'blue'
      for (const a in ship.hulltype.actionList) {
        if (Number(a) + ship.actionsRemaining.length >= ship.hulltype.actionList.length) actionIconColour = 'white'
        const { x, y } = getXYfromHex(ship.hex)
        drawFromData(c, ship.hulltype.actionList[a], x - 40 + 20 * a, y - 25, () => actionIconColour)
      }
    }
  }
}

function randomiseTextureRotation (tile) {
  let angle = 0
  switch (tile.terrain) {
    case 'planet':
    case 'asteroids':
      angle = tile.variant
      break
    case 'gasGiant':
      angle = -tile.variant / 6
  }
  const reverse = Math.abs(Math.floor(angle * 10000)) % 2 === 0
  // console.log(reverse, angle);
  return [angle, reverse]
}

function drawSelectedHexes (v, i) {
  if (!stale.selection){ console.log("stale selection"); return }
  stale.selection = false
  const c = v.buffers[i].getContext('2d') // @TODO
  clear(c)
  if (sel.hex) {
    for (const [move, ...hist] of sel.actions.moves) {
      const { x, y } = getXYfromHex(move)
      if (getTerrainDamage(sel.ship, move)[0] > 0 && !getTerrainDamage(sel.ship, move)[1]) {
        drawFromData(c, 'warningIconOrange', x, y)
      } else if (getTerrainDamage(sel.ship, move)[1]) {
        drawFromData(c, 'warningIconGreen', x, y)
      }
      drawFromData(c, 'hexVert', ...getXYfromHex(move), () => 'rgb(166,191,187)', 0.90)
    } for (const attack of sel.actions.attacks) {
      drawFromData(c, 'hexVert', ...getXYfromHex(attack), () => 'red', 0.90)
    }
    drawFromData(c, 'hexVert', ...getXYfromHex(sel.hex), () => data.colour.highlightSelection[sel.state], 0.90)
  }
}

function drawlog () {
  const log = document.getElementById('log')
  let current = ''
  for (let l = Math.max(state.log.length - 10, 0); l < state.log.length; l++) {
    current = current + '<p>' + state.log[l] + '</p>'
  }
  log.innerHTML = current
}

function drawButtons (v) {
  drawOverlayText(v)
  const c = v.buffers[0].getContext('2d')
  clear(c)
  const buttons = data.floatingButtons
  buttons.forEach((b) => {
    const pos = b.dimensionMultiplier.scaleByVec(v.screenCenter).add(b.offset)
    drawFromData(c, b.sprite, ...pos, getColMap(state.playerTurn, 1), b.size / 100, 0)
  })

  function drawOverlayText (v) {
    const c = v.buffers[0].getContext('2d')
    const { x, y } = v.center.scaleXY(0, -1)
    const player = state.playerTurn
    const pdata = state.playerData[player]
    drawText(c, 'Player', x - 200, y + 20, 15, 'white')
    drawText(c, player, x - 180, y + 40, 15, 'white')
    drawText(c, 'Turn', x - 150, y + 20, 15, 'white')
    drawText(c, state.turnNumber, x - 125, y + 40, 15, 'white')
    if (!preturn) {
      drawText(c, 'Money', x - 105, y + 20, 15, 'white')
      drawText(c, `${pdata.money}  ( ${pdata.income} )`, x - 105, y + 40, 15, 'white')
    }
    if (state.meta.online && state.playerData[state.playerTurn].type === 'Human') {
      drawText(c, `Handle: ${state.meta.playergrid.find(x => x[0] === state.playerTurn)[1]}`, x - 300, y + 35, 15, 'white')
    }
    drawText(c, `Game: ${state.gameName}`, x + 20, y + 40, 15, 'white')
    if (loggedInPlayer) drawText(c, `Logged in Player: ${loggedInPlayer.handle}`, x + 20, y + 60, 15, 'white')
  }
}

function drawFloatingButtons (v) {
  const ss = screenSettings
  const c = v.buffers[0].getContext('2d')
  clear(c)

  document.getElementById('board').style.borderColor = getPlayerColour(state.playerTurn)

  if (sel.menu && sel.menu.length > 0 && ss.currentCanvas === 'spaceView') {
    const ml = ss.thingMenuLocation
    const posFunc = (i) => {
      const hex = Hex.nToHex(i, Math.floor((board.screenCenter.x - ml.offset.x / 2) / (ml.hexsize)), true)
      return Hex.getXYfromUnitHex(hex, true).scale(ml.hexsize).add(ml.offset).add(board.screenCenter.scaleXY(-1, -1))
    }
    sel.menu.forEach((v, i) => {
      const details = data.thingList.find(t => t.thing === v)
      if (details.sprite && details.sprite[0][0]) {
        drawFloatingButton(c, details, posFunc(i))
      } else (console.log('problem', details))
    })
  }

  function drawFloatingButton (c, details, pos) {
    drawFromData(c, 'roundedHex', ...pos, getColMap(state.playerTurn, 1), 0.35, 1 / 12)
    drawFromData(c, 'roundedHexOutline', ...pos, x => 'rgb(136,134,173)', 0.35, 1 / 12)
    details.sprite.forEach(x => {
      drawFromData(c, x[0], ...pos.addXY(x[1], x[2]), getColMap(state.playerTurn, 1), 0.5 * x[3])
    })
    drawText(c, `${details.price}`, ...pos.addXY(-15, -20), 10, 'white')
    drawText(c, `${details.name}`, ...pos.addXY(-25, 25), 10, 'white')
  }
}

function drawMenu (v) {
  const ss = screenSettings
  const c = v.buffers[0].getContext('2d')
  clear(c)
  const xy = (h) => getXYfromHex(h, 45)
  // c.clearRect(0, 0, 800, 800)

  for (const a of Hex.findWithin(Math.floor(v.center.x / v.hexSize))) {
    drawFromData(c, 'hexVert', ...xy(a), () => 'rgba(137,132,145, 0.3)', 0.5)
  }

  if (menuData.Screen === 'MainMenu') {
    data.mainMenu.forEach((t) => {
      const { x, y } = xy(t.hex)
      drawFromData(c, 'roundedHex', x, y, x => 'rgb(30,30,30)', 0.65, 0)
      drawText(c, `${t.name}`, x - 30, y + 25, 12, 'rgb(159,216,206)')
    })
  }

  if (menuData.Screen === 'loadGameMenu') {
    data.loadGameMenu.forEach((t) => {
      const { x, y } = xy(t.hex)
      drawFromData(c, 'roundedHex', x, y, x => 'rgb(30,30,30)', 0.65, 0)

      let valueToOutput = menuData.LoadGameOptions[t.name] || ''
      if (t.num || t.num === 0) {
        const numm = t.num + (menuData.LoadGameOptions.PageSize * (menuData.LoadGameOptions.Page - 1))
        if (cacheGameList[numm]) {
          valueToOutput = cacheGameList[numm][1].name
        }
      }
      drawText(c, `     ${valueToOutput}`, x - 40, y + 5, 14, 'rgb(159,216,206)')
      drawText(c, `${t.name} ${[t.num] || '1'}`, x - 30, y + 25, 12, 'rgb(159,216,206)')
    })
  }

  if (menuData.Screen === 'NewGame') {
    data.newGameMenu.forEach((t) => {
      const { x, y } = xy(t.hex)
      drawFromData(c, 'roundedHex', x, y, x => 'rgb(30,30,30)', 0.65, 0)

      let valueToOutput = menuData.NewGameData[t.name] || ''
      if (t.num || t.num === 0) {
        if (menuData.NewGameData.Online) valueToOutput = menuData.OnlinePlayers[t.num][t.name]
        else valueToOutput = menuData.OfflinePlayers[t.num][t.name]
      }
      drawText(c, `${valueToOutput}`, x - 30, y + 5, 14, 'rgb(159,216,206)')
      drawText(c, `${t.name} ${[t.num] || '1'}`, x - 30, y + 25, 12, 'rgb(159,216,206)')
    })
  }
}

function drawTechTree (v) {
  const c = v.buffers[0].getContext('2d')
  clear(c)
  // const view = views.techTree
  console.log(v.hexsize, v)
  const xy = (h) => getXYfromHex(h, 35)// v.hexSize)

  const arrows = []
  data.techs.forEach((t) => {
    if (t.requires) {
      t.requires.forEach(r => {
        arrows.push([t.hex, data.techs.filter(tt => tt.tech === r)[0].hex])
      })
    }
  })
  arrows.forEach(a => { drawArrow(c, xy(a[1]), xy(a[0])) })

  data.techs.forEach((t) => {
    // const center = getXYfromHex(t.hex, 35).add(ss.techTreeOffset)
    const { x, y } = xy(new Hex(...t.hex))// .addXY(-48, -43)
    const draw = t.cost < 99
    // let col = `rgb(${t.colour[0]},${t.colour[1]},${t.colour[2]})`

    if (t.cost > 99) {
      drawFromData(c, 'roundedHex', x, y, x => 'rgb(30,30,30)', 0.55, 0)
    } else if (state.playerData[state.playerTurn].tech[t.tech]) {
      drawFromData(c, 'roundedHex', x, y, x => 'rgb(18,15,34)', 0.55, 0)
      drawFromData(c, 'roundedHexOutline', x, y, getColMap(state.playerTurn, 1), 0.55, 0)
    } else if (t.cost > 99 || (t.requires &&
      t.requires.find(r => !state.playerData[state.playerTurn].tech[r])
    )) {
      drawFromData(c, 'roundedHex', x, y, x => 'rgb(18,15,34)', 0.55, 0)
      drawFromData(c, 'roundedHexOutline', x, y, x => 'rgb(36,34,73)', 0.55, 0)
    } else { // if (draw){
      drawFromData(c, 'roundedHex', x, y, x => 'rgb(18,15,34)', 0.55, 0)
      drawFromData(c, 'roundedHexOutline', x, y, x => 'rgb(159,216,206)', 0.55, 0)
    }

    if ((draw || debug) && t.sprite) {
      t.sprite.forEach(s => {
        drawFromData(c, s[0], x + s[1], y + s[2], getColMap(state.playerTurn, 1), 0.55 * s[3])
      })
    }
    if (draw || debug) drawText(c, `${t.name}`, x - 30, y + 25, 12, 'rgb(159,216,206)')
    if (draw || debug) drawText(c, `${t.cost}`, x - 40, y + 6, 12, 'rgb(159,216,206)')
  })
}

function clear (c) { c.clearRect(-9999, -9999, 19999, 19999) }
