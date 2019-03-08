"use strict"

/* global Hex, Vec,       */
/* eslint-disable no-unused-vars */

const data = {

  techs : [
    //centre
    {tech:'antimatter extraction', colour:[235,78,152], requires:['ore refinery', 'gas refinery', 'defence shield'], hex:new Hex(0,0), cost:10,}, //titan ships
    //1st ring, clockwise from top
    {tech:'defence shield', colour:[105,152,208], requires:['radiation shield'], hex:new Hex(0,-2), cost:8,}, //planetary defence shields
    {tech:'regen', colour:[103,105,116], hex:new Hex(2,-2), cost:99999, }, //regenerate hull damage in the field  **not availiable yet**
    {tech:'gas refinery', colour:[105,152,208], requires:['gas extraction'], hex:new Hex(2,0), cost:8, }, //missile destroyer
    {tech:'ore refinery', colour:[105,152,208], requires:['mining'], hex:new Hex(0,2), cost:8, }, //battleship
    {tech:'trade network', colour:[105,152,208], requires:['nav beacons'], hex:new Hex(-2,2), cost:8, },  //cruiser
    {tech:'space stations', colour:[103,105,116], hex:new Hex(-2,0), cost:99999, },  //**not availiable yet**
    //2nd ring, clockwise from top
    {tech:'emp blast', colour:[103,105,116], hex:new Hex(1,-4), cost:99999, }, //aoe stun ship  **not availiable yet**
    {tech:'missile def', colour:[103,105,116], hex:new Hex(3,-4), cost:99999, }, //planetary missile defence system  **not availiable yet**
    {tech:'shield regen', colour:[103,105,116], hex:new Hex(4,-3), cost:99999, }, //better shield regeneration in field  **not availiable yet**
    {tech:'upgrade', colour:[103,105,116], hex:new Hex(4,-1), cost:99999, }, //upgrade units in field  **not availiable yet**
    {tech:'gas extraction', colour:[105,152,208], requires:['gas giants'],  hex:new Hex(3,1), cost:6, }, //harvest gas giants
    {tech:'mining', colour:[105,152,208], requires:['asteroid belt'], hex:new Hex(1,3), cost:6, }, //asteroid mining
    {tech:'nav asteroids', colour:[105,152,208], requires:['nav beacons', 'asteroid move'], hex:new Hex(-1,4), cost:6, }, //nav beacons for asteroids
    {tech:'nav beacons', colour:[105,152,208], requires:['trade & economy'], hex:new Hex(-3,4), cost:6, }, //roads
    {tech:'nav nebula', colour:[105,152,208], requires:['nav beacons', 'nebula'], hex:new Hex(-4,3), cost:6, },  //nav beacons in nebula
    {tech:'neb battleship', colour:[103,105,116], hex:new Hex(-4,1), cost:99999, },  //**not availiable yet**
    {tech:'harvest dwarves', colour:[105,152,208], requires:['hydrogen'], hex:new Hex(-3,-1), cost:6, },  //harvest white dwarves
    {tech:'radiation shield', colour:[105,152,208], requires:['black holes'], hex:new Hex(-1,-3), cost:6, },  //armoured destroyer
    //3rd ring, clockwise from top
    {tech:'navigation', colour:[105,152,208], requires:['black holes'], hex:new Hex(1,-6), cost:4, }, //black hole navigation
    {tech:'guided missiles', colour:[103,105,116], hex:new Hex(3,-6), cost:99999, }, //**not availiable yet**
    {tech:'nano bots', colour:[103,105,116], hex:new Hex(5,-6), cost:99999, }, //**not availiable yet**
    {tech:'medi-ship', colour:[103,105,116], hex:new Hex(6,-5), cost:99999, }, //**not availiable yet**
    {tech:'control ships', colour:[103,105,116], hex:new Hex(6,-3), cost:99999, }, //**not availiable yet**
    {tech:'gas giants', colour:[0,166,156], hex:new Hex(6,-1), cost:4, }, //missile frigate
    {tech:'research post', colour:[103,105,116], hex:new Hex(5,1), cost:99999, }, //**not availiable yet**
    {tech:'research cost', colour:[103,105,116], hex:new Hex(3,3), cost:99999, }, //reduce research costs **not availiable yet**
    {tech:'asteroid belt', colour:[0,166,156], requires:['asteroid move'], hex:new Hex(1,5), cost:4, },  //fast frigate
    {tech:'asteroid move', colour:[105,152,208], hex:new Hex(-1,6), cost:4, },  //move through asteroids without taking damage
    {tech:'research post', colour:[103,105,116], hex:new Hex(-3,6), cost:99999, },  //asteroid research post, extra def in asteroids**not availiable yet**
    {tech:'trade & economy', colour:[0,166,156], hex:new Hex(-5,6), cost:4, },  //scout ships
    {tech:'spy ships', colour:[103,105,116], hex:new Hex(-6,5), cost:99999, }, //**not availiable yet**
    {tech:'nebula missile', colour:[103,105,116], hex:new Hex(-6,3), cost:99999, }, //nebula missile ship **not availiable yet**
    {tech:'nebula', colour:[0,166,156], hex:new Hex(-6,1), cost:4, },  //extra vision in nebulas
    {tech:'hydrogen', colour:[105,152,208], requires:['nebula'], hex:new Hex(-5,-1), cost:4, },  //harvest hydrogen
    {tech:'research post', colour:[103,105,116], hex:new Hex(-3,-3), cost:99999, },  //nebula research post, extra defence in nebulas**not availiable yet**
    {tech:'black holes', colour:[0,166,156], hex:new Hex(-1,-5), cost:4, }, //can detect black holes (distance 2 hexes?)
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
    {thing: 'navBeacon', price: 2, territoryState: 1,  shipState: 'noEnemy', tech: 'nav beacons',  terrain: ['space', 'asteroids', 'nebula', ] } ,
    {thing: 'asteroidMining', price: 2, territoryState: 2,  shipState: 'noEnemy', tech: 'mining',  terrain: ['asteroids', ] } ,
    {thing: 'inhabitedPlanet', price: 0,   shipState: 'ownPresent',   terrain: ['planet', ] } ,
    {thing: 'scoutShip', price: 2, territoryState: 2, inhabitedPlanet: true, shipState: 'noShip', tech: 'trade & economy',  terrain: [] } ,
    {thing: 'basicFrigate', price: 2, territoryState: 2, inhabitedPlanet: true, shipState: 'noShip',   terrain: [] } ,
    {thing: 'battleship', price: 5, territoryState: 2, inhabitedPlanet: true, shipState: 'noShip', tech: 'ore refinery',  terrain: [] } ,
    {thing: 'armouredDestroyer', price: 3, territoryState: 2, inhabitedPlanet: true, shipState: 'noShip', tech: 'radiation shield',  terrain: [] } ,
    {thing: 'titanShip', price: 30, territoryState: 2, inhabitedPlanet: true, shipState: 'noShip',  tech: 'antimatter extraction', terrain: [] } ,
    {thing: 'fastFrigate', price: 3, territoryState: 2, inhabitedPlanet: true, shipState: 'noShip',  tech: 'asteroid belt', terrain: [] } ,
    {thing: 'cruiser', price: 8, territoryState: 2, inhabitedPlanet: true, shipState: 'noShip', tech: 'trade network',  terrain: [] } ,
    {thing: 'missileFrigate', price: 3, territoryState: 2, inhabitedPlanet: true, shipState: 'noShip', tech: 'gas giants',  terrain: [] } ,
    {thing: 'missileDestroyer', price: 8, territoryState: 2, inhabitedPlanet: true, shipState: 'noShip', tech: 'gas refinery',  terrain: [] } ,
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
  techTreeOffset : new Vec(400,400),
  hexSize : 75,
  scale : 1,
}
