'use strict'

// @ts-check

/* global
state, territoryState, shipState, getShipOnHex, data
*/

/* eslint-disable no-unused-vars */

function makeBuildBar (hex) {
  const base = state.baseArray.find(b => b.hex.compare(hex))
  const tile = state.tiles.get(hex.id)
  const ship = getShipOnHex(hex)
  const checks = [
    (a) => a.price > state.playerData[state.playerTurn].money,
    (a) => a.terrain.length !== 0 && !a.terrain.find(e => e === tile.terrain),
    // (a) => a.base && !(state.baseArray.filter(b => { return b.hex.compare(hex) && (b.owner === state.playerTurn) })[0]),
    (a) => a.territoryState && a.territoryState > territoryState(hex),
    (a) => a.resource && (a.resource !== tile.resource),
    (a) => a.inhabitedPlanet && !base,
    (a) => a.shipState === 'noShip' && ship,
    (a) => a.shipState === 'ownPresent' && (!ship || ship.owner !== state.playerTurn),
    (a) => a.shipState === 'ownPresentUnmoved' && (!ship || ship.owner !== state.playerTurn || ship.moved === true),
    (a) => a.shipState === 'noEnemy' && getShipOnHex(hex) && shipState(hex) < 1,
    (a) => a.tech && !state.playerData[state.playerTurn].tech[a.tech],
    // (a) => a.thingPresent && a.thingPresent.find(t => t === 'navBeacon') && !tile.navBeacon,
    (a) => a.nextTo && !hex.neighbours.filter(x => x.mag < state.boardSize).find((x) => state.tiles.get(x.id).terrain === a.nextTo),
    (a) => a.thing === 'navBeacon' && tile.navBeacon && tile.navBeacon.owner === state.playerTurn,
    (a) => a.thing === 'navAsteroid' && tile.navBeacon && tile.navBeacon.owner === state.playerTurn,
    (a) => a.thing === 'navNebula' && tile.navBeacon && tile.navBeacon.owner === state.playerTurn,
    (a) => a.type === 'industry' && tile.station,
    (a) => a.thing === 'inhabitedPlanet' && base && base.owner === state.playerTurn
  ]

  return data.thingList.filter(pos => {
    const checklist = checks.map(check => check(pos))
    const result = checklist.reduce((p, c, i, a) => p || c, false)
    console.log(pos.name, checklist, result)
    return !result
  }).map(pos => pos.thing)
}
