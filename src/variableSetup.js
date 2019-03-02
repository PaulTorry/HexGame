"use strict"

/* global Hex, Vec,       */
/* eslint-disable no-unused-vars */

const data = {

  techs : [
    {tech:'gasGiantMove', hex:new Hex(0,1), cost:2,},
    {tech:'navBeacons', hex:new Hex(-1,0), cost:2, },
    {tech:'missiles', hex:new Hex(0,-1), cost:2, },
    {tech:'heavyWeapons', hex:new Hex(1,-1), cost:2, },
    {tech:'mines', hex:new Hex(1,0), cost:2, },
    {tech:'asteroidMining', hex:new Hex(-1,1), cost:2, }
  ],


  shipHulls : {
    scoutShip:{type:'scoutShip',  hull:2, shield:3, maxMove:4, attack:1, retaliate:0, range:1, defence:0, view:2},
    basicFrigate:{type:'basicFrigate',  hull:3, shield:7, maxMove:1, attack:5, retaliate:3, range:1, defence:2, view:1},
    battleship:{type:'battleship',  hull:5, shield:10, maxMove:1, attack:8, retaliate:5, range:1, defence:2, view:1}, 
    armouredDestroyer:{type:'armouredDestroyer',  hull:5, shield:10, maxMove:1, attack:1, retaliate:10, range:1, defence:3, view:1},
    titanShip:{type:'titanShip',  hull:15, shield:25, maxMove:1, attack:10, retaliate:10, range:1, defence:3, view:1},
    fastFrigate:{type:'fastFrigate',  hull:3, shield:7, maxMove:2, attack:8, retaliate:3, range:1, defence:1, view:1},
    cruiser:{type:'cruiser',  hull:5, shield:10, maxMove:3, attack:10, retaliate:1, range:1, defence:1, view:1},
    missileFrigate:{type:'missileFrigate',  hull:3, shield:7, maxMove:1, attack:5, retaliate:3, range:2, defence:1, view:1},
    missileDestroyer:{type:'missileDestroyer',  hull:2, shield:3, maxMove:1, attack:10, retaliate:0, range:3, defence:0, view:1},
  },

  thingList : [
    {thing: 'navBeacon', price: 2, territoryState: 1,  shipState: 'noEnemy',   terrain: ['space', 'asteroids', 'nebula', ] } ,
    {thing: 'asteroidMining', price: 2, territoryState: 2,  shipState: 'noEnemy',   terrain: ['asteroids', ] } ,
    {thing: 'inhabitedPlanet', price: 0,   shipState: 'ownPresent',   terrain: ['planet', ] } ,
    {thing: 'scoutShip', price: 2, territoryState: 2, inhabitedPlanet: true, shipState: 'noShip',   terrain: [] } ,
    {thing: 'basicFrigate', price: 2, territoryState: 2, inhabitedPlanet: true, shipState: 'noShip',   terrain: [] } ,
    {thing: 'battleship', price: 5, territoryState: 2, inhabitedPlanet: true, shipState: 'noShip',   terrain: [] } ,
    {thing: 'armouredDestroyer', price: 3, territoryState: 2, inhabitedPlanet: true, shipState: 'noShip',   terrain: [] } ,
    {thing: 'titanShip', price: 30, territoryState: 2, inhabitedPlanet: true, shipState: 'noShip',   terrain: [] } ,
    {thing: 'fastFrigate', price: 3, territoryState: 2, inhabitedPlanet: true, shipState: 'noShip',   terrain: [] } ,
    {thing: 'cruiser', price: 8, territoryState: 2, inhabitedPlanet: true, shipState: 'noShip',   terrain: [] } ,
    {thing: 'missileFrigate', price: 3, territoryState: 2, inhabitedPlanet: true, shipState: 'noShip',   terrain: [] } ,
    {thing: 'missileDestroyer', price: 8, territoryState: 2, inhabitedPlanet: true, shipState: 'noShip',   terrain: [] } ,
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

let debug = false;

let screenSettings = {
  openTechTree : false,
  screenSize : 800,
  screenCenter : new Vec(400,400),
  screenOffset : new Vec(0,0),
  techTreeOffset : new Vec(400,250),
  hexSize : 75,
  scale : 1,
}
