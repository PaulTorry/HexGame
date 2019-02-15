"use strict"

/* global Hex, Vec,       */
/* eslint-disable no-unused-vars */

const data = {

  techs : [
    {tech:'gasGiantMove', location:new Hex(0,1), cost:2,},
    {tech:'navBeacons', location:new Hex(-1,0), cost:2, },
    {tech:'missiles', location:new Hex(0,-1), cost:2, },
    {tech:'heavyWeapons', location:new Hex(1,-1), cost:2, },
    {tech:'mines', location:new Hex(1,0), cost:2, },
    {tech:'asteroidMining', location:new Hex(-1,1), cost:2, }
  ],


  shipHulls : {
    scoutShip:{type:'scoutShip',  hull:1, shield:2, maxMove:3, attack:2, retaliate:1, range:1, view:2},
    basicShip:{type:'basicShip',  hull:2, shield:3, maxMove:2, attack:2, retaliate:2, range:1, view:1},
    assaultShip:{type:'assaultShip',  hull:4, shield:3, maxMove:2, attack:5, retaliate:3, range:1, view:1},
    mineShip:{type:'mineShip',  hull:4, shield:4, maxMove:1, attack:2, retaliate:5, range:1, view:1},
    missileShip:{type:'missileShip',  hull:2, shield:2, maxMove:3, attack:3, retaliate:2, range:3, view:1}
  },

  thingList : [
    {thing: 'navBeacon',tech:['navBeacons'], price: 2, territoryState: 1,  shipState: 'ownPresent',   terrain: ['space', 'asteroids', 'nebula', ] } ,
    {thing: 'asteroidMining',tech:['asteroidMining'], price: 2, territoryState: 2,  shipState: 'noEnemy',   terrain: ['asteroids', ] } ,
    {thing: 'inhabitedPlanet', price: 0,   shipState: 'ownPresentUnmoved',   terrain: ['planet', ] } ,
    {thing: 'scoutShip', price: 3, territoryState: 2, inhabitedPlanet: true, shipState: 'noShip',   terrain: [] } ,
    {thing: 'basicShip', price: 2, territoryState: 2, inhabitedPlanet: true, shipState: 'noShip',   terrain: [] } ,
    {thing: 'assaultShip', price: 5, territoryState: 2, inhabitedPlanet: true, shipState: 'noShip',   terrain: [], tech:['heavyWeapons'] } ,
    {thing: 'mineShip',tech:['mines'], price: 5, territoryState: 2, inhabitedPlanet: true, shipState: 'noShip',   terrain: [] },
    {thing: 'missileShip',tech:['missiles'], price: 5, territoryState: 2, inhabitedPlanet: true, shipState: 'noShip',   terrain: [] },
    {thing: 'destroy', price: 1, territoryState: 1, shipState: 'ownPresent', terrain: [], thingPresent: ["navBeacon"] },
  ],

  terrainCostNew : {
    space: { moveCost:1, },
    asteroids: { moveCost:3, },
    gasGiant: { moveCost:1, techNeeded: "gasGiantMove", },
    planet: { moveCost:1, },
    nebula: { moveCost:5, },
  },
}

const navBeaconCost = 0.25;

let debug = true;

let screenSettings = {
  openTechTree : false,
  screenSize : 800,
  screenCenter : new Vec(400,400),
  screenOffset : new Vec(0,0),
  techTreeOffset : new Vec(400,250),
  hexSize : 75,
  scale : 1,
}
