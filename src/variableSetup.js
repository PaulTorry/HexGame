"use strict"

/* global Hex, Vec,       */
/* eslint-disable no-unused-vars */

const data = {

  techs : [
    //centre
    {name:'antimatter extraction', tech:'titanTech', colour:[50,47,73], requires:['battleshipTech', 'missileDestroyerTech', 'defShieldTech'], hex:new Hex(0,0), cost:10, },
    //1st ring, clockwise from top
    {name:'planet defence shield', tech:'defShieldTech', colour:[50,47,73], requires:['armouredDestroyerTech'], hex:new Hex(0,-2), cost:8, },
    {name:'gas refinery', tech:'missileDestroyerTech', colour:[50,47,73], requires:['harvestGasGiant'], hex:new Hex(2,-2), cost:8, },
    {name:'devourer', tech:'devourerTech', colour:[51,49,50], requires:['dismantle'], hex:new Hex(2,0), cost:99999, },
    {name:'ore refinery', tech:'battleshipTech', colour:[50,47,73], requires:['asteroidMining'], hex:new Hex(0,2), cost:8, },
    {name:'space stations', tech:'spaceStationTech', colour:[51,49,50], requires:['navBeacon'], hex:new Hex(-2,2), cost:99999, },
    {name:'nebula destroyer', tech:'nebulaDestroyerTech', colour:[51,49,50], requires:['nebulaFrigateTech'], hex:new Hex(-2,0), cost:99999, },
    //2nd ring, clockwise from top
    {name:'universities', tech:'universities', colour:[51,49,50], requires:['navigation', 'sewerTech'], hex:new Hex(1,-4), cost:99999, },
    {name:'gas extraction', tech:'harvestGasGiant', colour:[50,47,73], requires:['missileFrigateTech'], hex:new Hex(3,-4), cost:6, },
    {name:'planetary missile defence', tech:'planetMissileDefTech', colour:[51,49,50], requires:['guidedMissilesTech'], hex:new Hex(4,-3), cost:99999, },
    {name:'dismantle units', tech:'dismantle', colour:[51,49,50], requires:['mediShipTech'], hex:new Hex(4,-1), cost:99999, },
    {name:'advanced field repair', tech:'regeneration', colour:[51,49,50], requires:['factoryTech'],  hex:new Hex(3,1), cost:99999, },
    {name:'asteroid mining', tech:'asteroidMining', colour:[50,47,73], requires:['fastFrigateTech'], hex:new Hex(1,3), cost:6, },
    {name:'asteroid navigation', tech:'navAsteroid', colour:[50,47,73], requires:['asteroidMove', 'navBeacon'], hex:new Hex(-1,4), cost:6, },
    {name:'navigation beacons', tech:'navBeacon', colour:[50,47,73], requires:['scoutShipTech'], hex:new Hex(-3,4), cost:6, },
    {name:'nebula navigation', tech:'navNebula', colour:[50,47,73], requires:['nebulaResearchPostTech', 'navBeacon'], hex:new Hex(-4,3), cost:6, },
    {name:'nebula frigate', tech:'nebulaFrigateTech', colour:[51,49,50], requires:['nebulaVision'], hex:new Hex(-4,1), cost:99999, },
    {name:'harvest protostar', tech:'harvestProtostar', colour:[50,47,73], requires:['harvestHydrogen'], hex:new Hex(-3,-1), cost:6, },
    {name:'radiation shield', tech:'armouredDestroyerTech', colour:[50,47,73], requires:['asteroidIceMining'], hex:new Hex(-1,-3), cost:6, },
    //3rd ring, clockwise from top
    {name:'black hole navigation', tech:'navigation', colour:[51,49,50], requires:['asteroidIceMining'], hex:new Hex(1,-6), cost:99999, },
    {name:'sewer systems', tech:'sewerTech', colour:[51,49,50], requires:['missileFrigateTech'], hex:new Hex(3,-6), cost:99999, },
    {name:'missile frigate', tech:'missileFrigateTech', colour:[50,47,73], hex:new Hex(5,-6), cost:4, },
    {name:'guided missiles', tech:'guidedMissilesTech', colour:[51,49,50], requires:['missileFrigateTech', 'controlEnemyShip'], hex:new Hex(6,-5), cost:99999, },
    {name:'assimilation', tech:'controlEnemyShip', colour:[51,49,50], requires:['mediShipTech'], hex:new Hex(6,-3), cost:99999, },
    {name:'nano bots', tech:'mediShipTech', colour:[51,49,50], hex:new Hex(6,-1), cost:99999, },
    {name:'advanced manufacturing', tech:'factoryTech', colour:[51,49,50], requires:['mediShipTech'], hex:new Hex(5,1), cost:99999, },
    {name:'recycling plant', tech:'recyclingTech', colour:[51,49,50], requires:['asteroidMining'], hex:new Hex(3,3), cost:99999, },
    {name:'fast frigate', tech:'fastFrigateTech', colour:[50,47,73], hex:new Hex(1,5), cost:4, },
    {name:'asteroid movement', tech:'asteroidMove', colour:[50,47,73], requires:['fastFrigateTech'], hex:new Hex(-1,6), cost:4, },
    {name:'hydroponics', tech:'hydroponicsTech', colour:[51,49,50], requires:['navBeacon'], hex:new Hex(-3,6), cost:99999, },
    {name:'scouting', tech:'scoutShipTech', colour:[50,47,73], hex:new Hex(-5,6), cost:4, },
    {name:'spy ships', tech:'spyShipTech', colour:[51,49,50], requires:['scoutShipTech'], hex:new Hex(-6,5), cost:99999, },
    {name:'nebula research post', tech:'nebulaResearchPostTech', colour:[50,47,73], requires:['nebulaVision'], hex:new Hex(-6,3), cost:4, },
    {name:'advanced sensors', tech:'nebulaVision', colour:[50,47,73], hex:new Hex(-6,1), cost:4, },
    {name:'harvest hydrogen', tech:'harvestHydrogen', colour:[50,47,73], requires:['nebulaVision'], hex:new Hex(-5,-1), cost:4, },
    {name:'electro-magnetic pulse', tech:'EMPshipTech', colour:[51,49,50], requires:['asteroidIceMining'], hex:new Hex(-3,-3), cost:99999, },
    {name:'asteroid ice mining', tech:'asteroidIceMining', colour:[50,47,73], hex:new Hex(-1,-5), cost:4, }
  ],


  shipHulls : {
    scoutShip:{type:'scoutShip',  hull:2, shield:3, maxMove:4, attack:1, retaliate:0, range:1, defence:0, view:2},
    basicFrigate:{type:'basicFrigate',  hull:3, shield:7, maxMove:1, attack:5, retaliate:3, range:1, defence:2, view:1},
    battleship:{type:'battleship',  hull:5, shield:10, maxMove:1, attack:8, retaliate:5, range:1, defence:2, view:1},
    armouredDestroyer:{type:'armouredDestroyer',  hull:5, shield:10, maxMove:1, attack:1, retaliate:10, range:1, defence:3, view:1},
    titanShip:{type:'titanShip',  hull:15, shield:25, maxMove:1, attack:10, retaliate:10, range:1, defence:3, view:1},
    fastFrigate:{type:'fastFrigate',  hull:3, shield:7, maxMove:2, attack:8, retaliate:3, range:1, defence:1, view:1},
    devourer:{type:'devourer',  hull:5, shield:10, maxMove:3, attack:10, retaliate:1, range:1, defence:1, view:1},
    missileFrigate:{type:'missileFrigate',  hull:3, shield:7, maxMove:1, attack:5, retaliate:3, range:2, defence:1, view:1},
    missileDestroyer:{type:'missileDestroyer',  hull:2, shield:3, maxMove:1, attack:10, retaliate:0, range:3, defence:0, view:1},
  },

  thingList : [

    {thing: 'navBeacon', type:"nav", price: 2, territoryState: 1,  shipState: 'ownPresent', tech: 'navBeacon',  terrain: ['space', ] } ,
    {thing: 'navAsteroid', type:"nav", price: 2, territoryState: 1,  shipState: 'ownPresent', tech: 'navAsteroid',  terrain: ['asteroids', ] } ,
    {thing: 'navNebula',  type:"nav", price: 2, territoryState: 1,  shipState: 'ownPresent', tech: 'navNebula',  terrain: [ 'nebula', ] } ,


    {thing: 'asteroidMining', type:"industry", price: 2, territoryState: 2,  shipState: 'noEnemy', tech: 'asteroidMining',  terrain: ['asteroids', ] } ,
    {thing: 'harvestGasGiant', type:"industry", price: 2, territoryState: 2,  shipState: 'noEnemy', tech: 'harvestGasGiant',  terrain: ['gasGiant', ] } ,
    {thing: 'harvestProtostar', type:"industry", price: 2, territoryState: 2,  shipState: 'noEnemy', tech: 'harvestProtostar',  terrain: ['protostar', ] } ,

    {thing: 'inhabitedPlanet', price: 0,   shipState: 'ownPresent',   terrain: ['planet', ] } ,

    {thing: 'scoutShip', type:"ship", price: 2, territoryState: 2, inhabitedPlanet: true, shipState: 'noShip', tech: 'scoutShipTech',  terrain: [] } ,
    {thing: 'basicFrigate', type:"ship", price: 2, territoryState: 2, inhabitedPlanet: true, shipState: 'noShip',   terrain: [] } ,
    {thing: 'battleship', type:"ship", price: 5, territoryState: 2, inhabitedPlanet: true, shipState: 'noShip', tech: 'battleshipTech',  terrain: [] } ,
    {thing: 'armouredDestroyer', type:"ship",  price: 3, territoryState: 2, inhabitedPlanet: true, shipState: 'noShip', tech: 'armouredDestroyerTech',  terrain: [] } ,
    {thing: 'titanShip', type:"ship", price: 30, territoryState: 2, inhabitedPlanet: true, shipState: 'noShip',  tech: 'titanTech', terrain: [] } ,
    {thing: 'fastFrigate', type:"ship", price: 3, territoryState: 2, inhabitedPlanet: true, shipState: 'noShip',  tech: 'fastFrigateTech', terrain: [] } ,
    {thing: 'devourer', type:"ship", price: 8, territoryState: 2, inhabitedPlanet: true, shipState: 'noShip',  tech: 'devourerTech', terrain: [] } ,
    {thing: 'missileFrigate', type:"ship", price: 3, territoryState: 2, inhabitedPlanet: true, shipState: 'noShip', tech: 'missileFrigateTech',  terrain: [] } ,
    {thing: 'missileDestroyer', type:"ship", price: 8, territoryState: 2, inhabitedPlanet: true, shipState: 'noShip', tech: 'missileDestroyerTech',  terrain: [] } ,

  //  {thing: 'solar sails', price: 2, territoryState: 2,  shipState: 'noEnemy',   terrain: ['adjacent to star', ] } ,
  ],

  terrainInfo : {

    space: { moveCost:1,},
    asteroids: { moveCost:2, hullDamage:1, damTech:'asteroidMove', defenceTech:'asteroidMining',},
    nebula: { moveCost:2, viewTech:'nebulaVision',defenceTech:'nebulaResearchPostTech',},
    gasGiant: { moveCost:1, moveTech:'gasGiantMove',},
    planet: { moveCost:1, defenceTech:'defShieldTech',},
    protostar: { moveCost:5,},
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
