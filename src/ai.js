'use strict'

/* global
Hex, state, getShipOnHex, getUpdatedViewMask, data,
findPossibleMoves, findPossibleAttacks, applyDamage,
makeBuildBar, onTopPanelItemClicked,
getTerrainDefVal, subTurn,
applyTerrainDamage, getTerrainDamage
*/

/* eslint-disable no-unused-vars */

function takeAIturn () {
  const ships = state.shipArray.filter(s => s.owner === state.playerTurn)
  const viewHexes = Object.entries(getUpdatedViewMask(state)).filter(([k, v]) => v > 1).map(([k, v]) => Hex.getFromID(k))

  ships.forEach(ship => {
    const possibleMoves = findPossibleMoves(ship.hex, ship.hulltype.maxMove)
    const possibleAttacks = findPossibleAttacks(ship.hex, ship.hulltype.range)

    if (possibleAttacks.length && Math.random() > 0.5) { // CHANGE TO 0.5
      const attack = possibleAttacks[Math.floor(Math.random() * possibleAttacks.length)]
      applyDamage(ship, getShipOnHex(attack), true, getTerrainDefVal(getShipOnHex(attack), attack))
      state.history[subTurn()].push({ type: 'attack', rand: Math.random(), path: [attack, ship.hex] })
    } else if (possibleMoves.length && Math.random() > 0.5) {
      const [move, ...hist] = possibleMoves[Math.floor(Math.random() * possibleMoves.length)]
      if (!getTerrainDamage(ship, move) || Math.random() > 0.5) {
        ship.hex = move
        applyTerrainDamage(ship, getTerrainDamage(ship, move))
        state.history[subTurn()].push({ type: 'move', rand: Math.random(), path: [move, ...hist] })
      }
    }
  })

  const tech = data.techs[Math.floor(Math.random() * data.techs.length)]
  const player = state.playerData[state.playerTurn]

  if (!player.tech[tech.tech] && player.money >= tech.cost && Math.random() > 0.5) {
    player.tech[tech.tech] = true
    player.money -= tech.cost
  }

  viewHexes.forEach(hex => {
    const menu = makeBuildBar(hex)
    if (menu.length && Math.random() > 0.5) {
      const choice = menu[Math.floor(Math.random() * menu.length)]
      onTopPanelItemClicked(choice, hex)
    }
  })
}
