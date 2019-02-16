"use strict"

/*global Vec,  */

/* eslint-disable no-unused-vars */


const simpleShapes = {
  hexVert : [new Vec(1,0), new Vec((1/2), Math.sqrt(3)/2), new Vec((-1/2), Math.sqrt(3)/2),
    new Vec(-1,0), new Vec((-1/2), -Math.sqrt(3)/2), new Vec((1/2), -Math.sqrt(3)/2)
  ],
  triangleVert : [new Vec(1,0), new Vec(-1,0), new Vec(0,-1)],
  triangleVert2 : [new Vec(1,0), new Vec(-1,0), new Vec(0,-1)],
  triangleVert3 : [new Vec(1,0), new Vec(0,0.3), new Vec(0,-0.3)],
  triangleVert4 : [new Vec(2,0), new Vec(0,1), new Vec(0,-1)],
  triangleVert5 : [new Vec(1,0), new Vec(-1,0), new Vec(1,-1)],
  triangleVert6 : [new Vec(2,0), new Vec(-1,1), new Vec(0,-1)],
  cross: [new Vec(1,1), new Vec(-1,-1), new Vec(0,0), new Vec(-1,1), new Vec(1,-1), new Vec(0,0),],
  squareVert : [new Vec(1,1), new Vec(-1,1), new Vec(-1,-1), new Vec(1,-1)],
}

const baseShapes = {"asteroidMining":simpleShapes["triangleVert"],  "inhabitedPlanet":simpleShapes["hexVert"],
"navBeacon":simpleShapes["squareVert"], "basicShip":simpleShapes["triangleVert2"],
"assaultShip":simpleShapes["triangleVert4"],"mineShip":simpleShapes["triangleVert5"],
"missileShip":simpleShapes["triangleVert6"], "scoutShip":simpleShapes["triangleVert3"],
destroy:simpleShapes["cross"],
}

const asteroidMining = [["of",-55,-50],
["sv"],["sv"],["bp"],["mt",32.6,25.9],["lt",27.5,27.3],["lt",25.9,33.4],["lt",30.8,37.4],["lt",36.4,37.4],["lt",36.4,31.6],["lt",32.6,25.9],["cp"],["fs","rgb(130, 6, 20)"],["fl"],["bp"],["mt",97.5,53.9],["lt",93.2,58.4],["lt",95.3,61.2],["lt",98.9,62.9],["lt",104.1,59.8],["lt",101.8,55.1],["lt",97.5,53.9],["cp"],["fl"],["bp"],["mt",91.5,74.4],["lt",87,77.8],["lt",88.4,80.8],["lt",91.5,80.8],["lt",96.1,77.8],["lt",91.5,74.4],["cp"],["fl"],["bp"],["mt",57.1,94.5],["lt",55.4,100.1],["lt",57.1,103.9],["lt",62.4,103.9],["lt",65.5,99.2],["lt",62.4,96.2],["lt",57.1,94.5],["cp"],["fl"],["bp"],["mt",53.8,75.8],["lt",55.4,80.8],["lt",57.1,82.8],["lt",62.4,83.8],["lt",67.1,82.8],["lt",67.1,77.8],["lt",62.4,77.6],["lt",57.1,74.4],["lt",53.8,75.8],["cp"],["fl"],["bp"],["mt",93.2,11.8],["lt",96.1,9.9],["lt",98.9,11.8],["lt",98.7,18.1],["lt",93.2,18.1],["lt",91.6,15.9],["lt",93.2,11.8],["cp"],["fl"],["bp"],["mt",71.9,28.3],["lt",75.4,28.3],["lt",75.4,30.2],["lt",73.6,34.8],["lt",70.1,33.1],["lt",67.6,30.2],["lt",71.9,28.3],["cp"],["fl"],["bp"],["mt",4.8,62.9],["lt",8.1,62.9],["lt",8.1,65.4],["lt",3.5,67.7],["ct",3.5,67.7,-1,65,0.2,65.4],["ct",1.5,65.8,1.5,62.9,1.5,62.9],["lt",4.8,62.9],["cp"],["fl"],["re"],["sv"],["bp"],["mt",31.1,41.3],["lt",28.2,46.4],["lt",29.7,49.3],["lt",32.6,49.3],["lt",36.4,47.8],["lt",36.4,44],["lt",33.9,41.3],["lt",31.1,41.3],["cp"],["fs","rgb(215, 35, 53)"],["fl"],["bp"],["mt",98.7,69.5],["lt",95.3,71.9],["lt",95.3,74.4],["lt",96.1,77.8],["lt",98.9,77.8],["lt",101.5,74.4],["lt",100.2,71.9],["lt",98.7,69.5],["cp"],["fl"],["bp"],["mt",45.2,73.6],["lt",42,74.4],["lt",42,79.1],["lt",43.6,80.8],["lt",48.7,80.8],["lt",50.6,77.6],["lt",45.2,73.6],["cp"],["fl"],["bp"],["mt",71.5,0],["lt",67.6,1.6],["lt",67.6,4.8],["lt",69.6,6],["lt",73,6],["lt",74.2,3],["lt",71.5,0],["cp"],["fl"],["bp"],["mt",24.9,94.5],["lt",22.7,98],["lt",24.9,98],["lt",28.2,96.4],["lt",27.2,94.5],["lt",24.9,94.5],["cp"],["fl"],["re"],["re"]
]
const asteroids = [ ["of",-75,-70],
["sv"],["sv"],["sv"],["bp"],["mt",35.5,55.9],["lt",46.8,38.6],["lt",59.5,41.9],["lt",59.5,51.9],["lt",68.8,55.9],["lt",68.8,65.3],["lt",62.8,71.3],["lt",41.5,73.9],["lt",35.5,64.6],["lt",35.5,55.9],["cp"],["fs","rgb(36, 33, 72)"],["fl"],["bp"],["mt",73.6,19.4],["lt",86.1,12.2],["lt",96.1,15.8],["lt",98.1,22.8],["lt",96.1,28.8],["lt",84.1,28.8],["lt",79.6,24.8],["lt",73.6,24.3],["lt",73.6,19.4],["cp"],["fl"],["bp"],["mt",80.6,40.8],["lt",83.6,56.3],["lt",98.1,56.3],["lt",106.6,50.8],["lt",103.1,40.8],["lt",90.1,34.8],["lt",80.6,40.8],["cp"],["fl"],["bp"],["mt",44.1,15.7],["lt",46.1,20.5],["lt",52.1,20.5],["lt",57.6,15.7],["lt",52.1,12.2],["lt",44.1,15.7],["cp"],["fl"],["bp"],["mt",103.8,65.3],["lt",121.8,65.3],["lt",126.8,73.3],["lt",123.8,86.8],["lt",126.8,92.3],["lt",121.8,103.8],["lt",108.3,107.8],["lt",100.3,98.8],["lt",103.8,90.3],["lt",100.3,82.3],["lt",96.1,75.3],["lt",103.8,65.3],["cp"],["fl"],["bp"],["mt",33.1,77.8],["lt",36.8,84],["lt",30.6,90.8],["lt",16.6,88.3],["lt",12.1,77.8],["lt",20.1,72.8],["lt",33.1,77.8],["cp"],["fl"],["bp"],["mt",73.6,86.5],["lt",87.6,90.8],["lt",93.6,102.8],["lt",96.1,111.3],["lt",93.6,120.3],["lt",80.6,126.3],["lt",68.8,123.3],["lt",68.8,115.3],["lt",73.6,107.8],["lt",68.8,104.3],["lt",54.6,101.3],["lt",54.6,90.8],["lt",60.6,86.5],["lt",73.6,86.5],["cp"],["fl"],["bp"],["mt",39.1,107.8],["lt",35.5,114.3],["lt",36.8,119.8],["lt",44.1,122.8],["lt",50.9,117.8],["lt",48.1,110.8],["lt",39.1,107.8],["cp"],["fl"],["bp"],["mt",80.6,77.8],["lt",85.9,81.8],["lt",90.1,77.3],["lt",90.1,69.8],["lt",82.6,72.8],["lt",80.6,77.8],["cp"],["fl"],["bp"],["mt",27.6,52.3],["lt",20.6,56.3],["lt",18.5,52.3],["lt",20,47.1],["lt",24.5,41.8],["lt",27.6,47],["lt",27.6,52.3],["cp"],["fl"],["bp"],["mt",113.7,20.5],["lt",105.2,27.7],["lt",105.2,35.7],["lt",111.4,40.4],["lt",123.9,47.2],["lt",129.1,44.2],["lt",129.1,38.6],["lt",124.6,28.8],["lt",118.1,21.9],["lt",113.7,20.5],["cp"],["fl"],["re"],["re"],["re"]
]
const gasGiant =[ ["of",-55,-45],
["sv"],["sv"],["bp"],["mt",86.2,14.2],["ct",99.7,30.8,97.2,55.1,80.6,68.6],["ct",64.1,82.1,39.8,79.6,26.3,63],["ct",12.8,46.5,15.3,22.2,31.8,8.7],["ct",48.4,-4.8,72.7,-2.3,86.2,14.2],["cp"],["sv"],["xrg",43.89969999999994,36.73219999999992,0,43.89969999999994,36.73219999999992,45.1],["xcs",0.28,"rgb(26, 60, 87)"],["xcs",0.58,"rgb(35, 50, 85)"],["xcs",0.9,"rgb(44, 41, 83)"],["fs"],["fl"],["re"],["bp"],["mt",108.3,15.2],["ct",105.4,8.8,95.1,6.6,81.3,8.3],["ct",83.2,9.9,84.9,11.7,86.5,13.7],["ct",93,13.2,97.4,14.3,98.7,17.1],["ct",99.9,19.8,97.9,23.6,93.7,28],["ct",87.1,34.7,74.8,42.7,59.9,49.4],["ct",46.2,55.5,33.2,59.2,23.8,60.2],["ct",16.4,60.9,11.3,59.9,9.9,56.9],["ct",8.5,53.7,11.4,49,17.3,43.7],["ct",17,41.8,16.9,39.9,16.9,38],["ct",16.9,37.3,16.9,36.6,16.9,35.9],["ct",4.6,45.9,-1.8,56.1,1.3,63.1],["ct",4.4,70.2,16.7,72.1,32.7,69.4],["ct",42.2,67.7,52.9,64.4,63.9,59.5],["ct",76.3,53.9,87,47.2,94.9,40.4],["ct",105.7,31.1,111.2,21.7,108.3,15.2],["cp"],["xlg",0.5,39.1,109,39.1],["xcs",0,"rgb(26, 60, 87)"],["xcs",0.14,"rgb(35, 50, 85)"],["xcs",0.41,"rgb(44, 41, 83)"],["xcs",0.89,"rgb(35, 50, 85)"],["xcs",1,"rgb(26, 60, 87)"],["fs"],["fl"],["ss","rgb(18, 14, 34)"],["st"],["re"],["re"]
];
const planet = [ ["of",-40,-40],
["sv"],["bp"],["mt",45.8,0.6],["ct",43.6,0.2,41.3,0,39.1,0],["ct",17.5,0,0,17.5,0,39.1],["ct",0,40.1,0.1,41.1,0.1,42.1],["ct",0.7,49.8,3.6,56.9,8,62.7],["ct",15.1,72.1,26.4,78.1,39.1,78.1],["ct",51.5,78.1,62.6,72.3,69.8,63.2],["ct",75,56.5,78.1,48.2,78.1,39.1],["ct",78.1,19.8,64.1,3.8,45.8,0.6],["cp"],["fs","rgb(68, 63, 95)"],["fl"],["bp"],["mt",63.5,48.9],["ct",58.3,44.3,53.1,45.9,51.5,42],["ct",49.8,37.8,55.3,35,55.1,27.4],["ct",55,22.2,52.2,16.3,48.5,15.5],["ct",45.3,14.8,43.5,18.5,40.5,17.7],["ct",36.9,16.8,34.1,10.1,35.9,6],["ct",37.2,2.9,41.2,1.2,45.8,0.6],["ct",43.6,0.2,41.3,0,39.1,0],["ct",17.5,0,0,17.5,0,39.1],["ct",0,40.1,0.1,41.1,0.1,42.1],["ct",1.6,41.5,3.1,40.8,4.5,38.9],["ct",7.9,34,5.3,28.6,7.3,25.9],["ct",10.4,21.4,26.9,20.6,28.9,25.4],["ct",30,28.1,25.8,30.1,24.3,37.1],["ct",22.5,45,25.6,53.4,28.1,53.6],["ct",31.1,53.8,31.6,42.5,35.9,42],["ct",40.7,41.4,50.2,54.7,45.5,64],["ct",42.7,69.5,35.4,72.7,29.5,71.5],["ct",20.7,69.7,18.1,58.6,12.1,59.5],["ct",10.1,59.8,9,61.3,8,62.7],["ct",15.1,72.1,26.4,78.1,39.1,78.1],["ct",51.5,78.1,62.6,72.3,69.8,63.2],["ct",68.9,59.8,68.7,53.4,63.5,48.9],["cp"],["fs","rgb(36, 33, 72)"],["fl"],["bp"],["mt",0,38.8],["ct",0,16.8,17.5,0,39.1,0],["ct",60.6,0,78.1,16.8,78.1,38.8],["ct",78.1,60.9,60.6,78.1,39.1,78.1],["ct",17.5,78.1,0,60.9,0,38.8],["cp"],["sv"],["xrg",47,50.332800000000006,0,47,50.332800000000006,45.2],["xcs",0.22,"rgba(22, 55, 81, 0.65)"],["xcs",0.9,"rgba(36, 33, 72, 0.65)"],["fs"],["fl"],["re"],["re"]
];
const planetRing = [ ["of",-50,-55],
["sv"],["bp"],["mt",29.9,19.7],["lt",23.1,5.1],["lt",34,0],["lt",40.8,14.6],["lt",29.9,19.7],["cp"],["fs","rgb(215, 35, 53)"],["fl"],["bp"],["mt",15.1,37.5],["lt",0,25.6],["lt",8.4,14.9],["lt",23.5,26.8],["lt",15.1,37.5],["cp"],["fl"],["bp"],["mt",88.2,53.3],["ct",88.2,74.5,71,91.7,49.8,91.7],["ct",28.7,91.7,11.5,74.5,11.5,53.3],["ct",11.5,32.2,28.7,15,49.8,15],["ct",71,15,88.2,32.2,88.2,53.3],["cp"],["lw",3],["ss","rgb(215, 35, 53)"],["st"],["re"]
];
const nebula = [["of",-55,-50],
["sv"],["sv"],["bp"],["mt",32.6,25.9],["lt",27.5,27.3],["lt",25.9,33.4],["lt",30.8,37.4],["lt",36.4,37.4],["lt",36.4,31.6],["lt",32.6,25.9],["cp"],["fs","rgb(130, 130, 120)"],["fl"], ["bp"],["mt",97.5,53.9],["lt",93.2,58.4],["lt",95.3,61.2],["lt",98.9,62.9],["lt",104.1,59.8],["lt",101.8,55.1],["lt",97.5,53.9],["cp"],["fl"],["bp"],["mt",91.5,74.4],["lt",87,77.8],["lt",88.4,80.8],["lt",91.5,80.8],["lt",96.1,77.8],["lt",91.5,74.4],["cp"],["fl"],["bp"],["mt",57.1,94.5],["lt",55.4,100.1],["lt",57.1,103.9],["lt",62.4,103.9],["lt",65.5,99.2],["lt",62.4,96.2],["lt",57.1,94.5],["cp"],["fl"],["bp"],["mt",53.8,75.8],["lt",55.4,80.8],["lt",57.1,82.8],["lt",62.4,83.8],["lt",67.1,82.8],["lt",67.1,77.8],["lt",62.4,77.6],["lt",57.1,74.4],["lt",53.8,75.8],["cp"],["fl"],["bp"],["mt",93.2,11.8],["lt",96.1,9.9],["lt",98.9,11.8],["lt",98.7,18.1],["lt",93.2,18.1],["lt",91.6,15.9],["lt",93.2,11.8],["cp"],["fl"],["bp"],["mt",71.9,28.3],["lt",75.4,28.3],["lt",75.4,30.2],["lt",73.6,34.8],["lt",70.1,33.1],["lt",67.6,30.2],["lt",71.9,28.3],["cp"],["fl"],["bp"],["mt",4.8,62.9],["lt",8.1,62.9],["lt",8.1,65.4],["lt",3.5,67.7],["ct",3.5,67.7,-1,65,0.2,65.4],["ct",1.5,65.8,1.5,62.9,1.5,62.9],["lt",4.8,62.9],["cp"],["fl"],["re"],["sv"],["bp"],["mt",31.1,41.3],["lt",28.2,46.4],["lt",29.7,49.3],["lt",32.6,49.3],["lt",36.4,47.8],["lt",36.4,44],["lt",33.9,41.3],["lt",31.1,41.3],["cp"],
["fs","rgb(100, 100, 90)"],["fl"],["bp"],["mt",98.7,69.5],["lt",95.3,71.9],["lt",95.3,74.4],["lt",96.1,77.8],
["lt",98.9,77.8],["lt",101.5,74.4],["lt",100.2,71.9],["lt",98.7,69.5],["cp"],["fl"],["bp"],["mt",45.2,73.6],["lt",42,74.4],["lt",42,79.1],["lt",43.6,80.8],["lt",48.7,80.8],["lt",50.6,77.6],["lt",45.2,73.6],["cp"],["fl"],["bp"],["mt",71.5,0],["lt",67.6,1.6],["lt",67.6,4.8],["lt",69.6,6],["lt",73,6],["lt",74.2,3],["lt",71.5,0],["cp"],["fl"],["bp"],["mt",24.9,94.5],["lt",22.7,98],["lt",24.9,98],["lt",28.2,96.4],["lt",27.2,94.5],["lt",24.9,94.5],["cp"],["fl"],["re"],["re"]
];

const laserShip = [ ["of",-20,-35],
["sv"],["sv"],["bp"],["mt",55.6,23.9],["lt",32.2,19.6],["lt",32.2,4.5],["ct",32.2,4.4,32.2,4.3,32.2,4.2],["lt",37.2,0.1],["lt",28.3,0.1],["lt",28.4,0.1],["ct",28.1,0,27.9,0,27.7,0],["lt",15,0],["ct",12.5,0,10.5,2,10.5,4.5],["lt",10.5,50.5],["ct",10.5,53,12.5,55,15,55],["lt",27.7,55],["ct",27.9,55,28.1,55,28.4,54.9],["lt",28.3,55],["lt",37.4,55],["lt",32.1,51],["ct",32.2,50.8,32.2,50.7,32.2,50.5],["lt",32.2,34.4],["lt",55.7,28.8],["ct",56.4,28.6,56.8,28,56.8,27.3],["lt",56.8,25.4],["ct",56.8,24.7,56.3,24.1,55.6,23.9],["cp"],["fs","rgb(215, 35, 53)"],["fl"],["bp"],["mt",1.3,16.4],["lt",12.3,16.4],["ct",13,16.4,13.5,15.9,13.5,15.2],["lt",13.5,11.9],["ct",13.5,11.2,13,10.6,12.3,10.6],["lt",1.2,10.6],["ct",0.6,10.6,0,11.2,0,11.9],["lt",0,15.2],["ct",0,15.9,0.6,16.4,1.3,16.4],["cp"],["sv"],["xlg",12.876199999999983,10.287499999999909,0.6555999999999926,16.82409999999993],["xcs",0,"rgb(130, 6, 20)"],["xcs",1,"rgba(215, 35, 53, 0.00)"],["fs"],["fl"],["re"],["bp"],["mt",1.3,45.7],["lt",12.3,45.7],["ct",13,45.7,13.5,45.1,13.5,44.4],["lt",13.5,41.1],["ct",13.5,40.4,13,39.9,12.3,39.9],["lt",1.2,39.9],["ct",0.6,39.9,0,40.4,0,41.1],["lt",0,44.4],["ct",0,45.1,0.6,45.7,1.3,45.7],["cp"],["sv"],["xlg",12.795000000000016,39.519499999999994,0.6990999999999872,45.98939999999993],["xcs",0,"rgb(130, 6, 20)"],["xcs",1,"rgba(215, 35, 53, 0.00)"],["fs"],["fl"],["re"],["bp"],["mt",44.5,25.9],["lt",32.5,23.2],["ct",32.2,23.1,31.8,23.3,31.8,23.7],["lt",31.8,30],["ct",31.8,30.4,32.2,30.6,32.6,30.5],["lt",44.5,26.9],["ct",45.1,26.8,45.1,26,44.5,25.9],["cp"],["xlg",41.1,22.3,32.5,30.9],["xcs",0,"rgb(130, 6, 20)"],["xcs",1,"rgba(215, 35, 53, 0.00)"],["fs"],["fl"],["re"],["re"]
];
const shieldShip  = [ ["of",-20,-20],
["sv"],["sv"],["bp"],["mt",21.3,30.3],["lt",33.7,30.1],["ct",35.2,30.1,36.7,29.3,37.4,27.9],["lt",43.5,17.1],["ct",44.2,15.7,44.2,14.1,43.4,12.8],["lt",37.1,2.1],["ct",36.3,0.8,34.9,0,33.3,0],["lt",20.9,0.2],["ct",19.4,0.2,18,1,17.2,2.4],["lt",11.1,13.2],["ct",10.4,14.5,10.4,16.2,11.2,17.5],["lt",17.5,28.2],["ct",18.3,29.5,19.8,30.3,21.3,30.3],["cp"],["fs","rgb(215, 35, 53)"],["fl"],["bp"],["mt",1.3,18],["lt",12.3,18],["ct",13,18,13.5,17.5,13.5,16.8],["lt",13.5,13.5],["ct",13.5,12.8,13,12.2,12.3,12.2],["lt",1.2,12.2],["ct",0.6,12.2,0,12.8,0,13.5],["lt",0,16.8],["ct",0,17.5,0.6,18,1.3,18],["cp"],["sv"],["xlg",12.824600000000032,11.872900000000072,0.6330000000000382,18.3137999999999],["xcs",0,"rgb(130, 6, 20)"],["xcs",1,"rgba(215, 35, 53, 0.00)"],["fs"],["fl"],["re"],["re"],["re"]
];
const scoutShip  = [ ["of",-25,-17],
["sv"],["sv"],["sv"],["bp"],["mt",12.4,0],["lt",70,0],["ct",73.4,0,74.5,4.6,71.5,6.2],["lt",23.3,30.4],["ct",21.5,31.2,19.5,30.4,18.8,28.6],["lt",9.4,4.4],["ct",8.5,2.3,10.1,0,12.4,0],["cp"],["fs","rgb(215, 35, 53)"],["fl"],["bp"],["mt",2.6,11.6],["lt",13.1,8.4],["ct",13.8,8.2,14.2,7.5,14,6.9],["lt",13,3.7],["ct",12.8,3,12.1,2.7,11.4,2.9],["lt",0.9,6.1],["ct",0.2,6.3,-0.1,7,0.1,7.6],["lt",1,10.8],["ct",1.2,11.4,1.9,11.8,2.6,11.6],["cp"],["xlg",11.9,2.4,2.1,12.1],["xcs",0,"rgb(130, 6, 20)"],["xcs",1,"rgba(215, 35, 53, 0.00)"],["fs"],["fl"],["bp"],["mt",9.5,31.6],["lt",20,28.4],["ct",20.7,28.2,21,27.5,20.8,26.8],["lt",19.9,23.7],["ct",19.7,23,19,22.6,18.3,22.8],["lt",7.8,26],["ct",7.1,26.2,6.8,26.9,7,27.6],["lt",7.9,30.7],["ct",8.1,31.4,8.8,31.8,9.5,31.6],["cp"],["xlg",18.8,22.3,9,32.1],["xcs",0,"rgb(130, 6, 20)"],["xcs",1,"rgba(215, 35, 53, 0.00)"],["fs"],["fl"],["bp"],["mt",6.1,21.6],["lt",16.6,18.4],["ct",17.3,18.2,17.7,17.5,17.5,16.9],["lt",16.5,13.7],["ct",16.3,13.1,15.6,12.7,14.9,12.9],["lt",4.4,16.1],["ct",3.7,16.3,3.4,17,3.6,17.7],["lt",4.5,20.8],["ct",4.7,21.5,5.4,21.8,6.1,21.6],["cp"],["xlg",15.4,12.4,5.6,22.1],["xcs",0,"rgb(130, 6, 20)"],["xcs",1,"rgba(215, 35, 53, 0.00)"],["fs"],["fl"],["bp"],["mt",42.1,13.4],["lt",36.8,12.5],["ct",35.6,12.3,34.9,10.9,35.6,9.8],["lt",38.5,5],["ct",38.9,4.3,39.7,4,40.5,4.2],["lt",45.7,5.4],["ct",46.9,5.7,47.5,7.1,46.8,8.2],["lt",43.9,12.6],["ct",43.5,13.2,42.8,13.5,42.1,13.4],["cp"],["fs","rgb(130, 6, 20)"],["fl"],["re"],["re"]
];
const mineShip = [ ["of",-20,-20],
["sv"],["sv"],["bp"],["mt",33.9,33.6],["lt",38.6,37.4],["lt",37.6,31.4],["lt",37.6,31.4],["lt",43.6,20.6],["lt",49,18.2],["lt",43.6,16.3],["lt",37.5,6.1],["lt",38.4,0],["lt",33.5,3.5],["lt",20.6,3.7],["lt",16,0.2],["lt",17.2,6.3],["lt",11.3,16.7],["lt",11.4,21],["lt",17.6,31.6],["lt",16.3,37.1],["lt",21.3,33.8],["lt",33.9,33.6],["lt",33.9,33.6],["cp"],["fs","rgb(215, 35, 53)"],["fl"],["bp"],["mt",1.3,21.6],["lt",12.3,21.6],["ct",13,21.6,13.5,21.1,13.5,20.4],["lt",13.5,17.1],["ct",13.5,16.4,13,15.8,12.3,15.8],["lt",1.2,15.8],["ct",0.6,15.8,0,16.4,0,17.1],["lt",0,20.4],["ct",0,21.1,0.6,21.6,1.3,21.6],["cp"],["sv"],["xlg",12.771000000000043,15.535099999999943,0.6751000000000431,22.004999999999995],["xcs",0,"rgb(130, 6, 20)"],["xcs",1,"rgba(215, 35, 53, 0.00)"],["fs"],["fl"],["re"],["re"],["re"]
];
const missileShip = [ ["of",-20,-20],
["sv"],["sv"],["bp"],["mt",48.5,33.6],["lt",28.3,29],["lt",28.3,12.3],["lt",47.9,7.8],["ct",49,7.5,49,6,47.9,5.7],["lt",26.2,0.4],["ct",25.7,0.2,25.1,0,24.5,0],["lt",15,0],["ct",13,0,11.3,1.7,11.3,3.8],["lt",11.3,37.5],["ct",11.3,39.6,13,41.3,15,41.3],["lt",24.5,41.3],["ct",25.1,41.3,25.7,41.1,26.2,40.8],["lt",48.5,35.4],["ct",49.5,35.2,49.4,33.8,48.5,33.6],["cp"],["fs","rgb(215, 35, 53)"],["fl"],["bp"],["mt",1.3,15.6],["lt",12.3,15.6],["ct",13,15.6,13.5,15.1,13.5,14.4],["lt",13.5,11.1],["ct",13.5,10.4,13,9.8,12.3,9.8],["lt",1.2,9.8],["ct",0.6,9.8,0,10.4,0,11.1],["lt",0,14.4],["ct",0,15.1,0.6,15.6,1.3,15.6],["cp"],["sv"],["xlg",12.843500000000006,9.479199999999992,0.6519000000000688,15.920099999999934],["xcs",0,"rgb(130, 6, 20)"],["xcs",1,"rgba(215, 35, 53, 0.00)"],["fs"],["fl"],["re"],["bp"],["mt",28.5,9.9],["lt",40.5,7.2],["ct",41.1,7.1,41.1,6.2,40.5,6.1],["lt",28.3,3.1],["ct",27.9,3,27.6,3.3,27.6,3.7],["lt",27.8,9.4],["ct",27.8,9.8,28.2,10,28.5,9.9],["cp"],["fs","rgb(157, 19, 33)"],["fl"],["bp"],["mt",28.5,31.3],["lt",40.5,34],["ct",41.1,34.2,41.1,35,40.5,35.2],["lt",28.3,38.1],["ct",27.9,38.2,27.6,37.9,27.6,37.6],["lt",27.8,31.9],["ct",27.8,31.5,28.2,31.2,28.5,31.3],["cp"],["fl"],["bp"],["mt",1.3,31.4],["lt",12.3,31.4],["ct",13,31.4,13.5,30.8,13.5,30.1],["lt",13.5,26.8],["ct",13.5,26.1,13,25.6,12.3,25.6],["lt",1.2,25.6],["ct",0.6,25.6,0,26.1,0,26.8],["lt",0,30.1],["ct",0,30.8,0.6,31.4,1.3,31.4],["cp"],["sv"],
["xlg",12.8,25.1,0.67,31.7],["xcs",0,"rgb(130, 6, 20)"],["xcs",1,"rgba(215, 35, 53, 0.00)"],["fs"],["fl"],["re"],["re"],["re"]
];
const devourer = [ ["of",-25,-25],
["sv"],["sv"],["bp"],["mt",38.2,27.3],["lt",54.2,0.4],["lt",22.8,0],["lt",6.8,26.9],["lt",22.2,54.3],["lt",53.5,54.7],["lt",69.5,27.7],["lt",38.2,27.3],["cp"],["fs","rgb(215, 35, 53)"],["fl"],["bp"],["mt",3.5,40.3],["lt",13.1,34.8],["ct",13.7,34.4,13.9,33.6,13.5,33],["lt",11.9,30.2],["ct",11.5,29.6,10.8,29.4,10.2,29.7],["lt",0.6,35.2],["ct",0,35.6,-0.2,36.4,0.2,37],["lt",1.8,39.8],["ct",2.2,40.4,2.9,40.6,3.5,40.3],["cp"],["sv"],["xlg",10.889499999999998,29.3839999999999,3.546199999999999,41.05640000000005],["xcs",0,"rgb(130, 6, 20)"],["xcs",1,"rgba(215, 35, 53, 0.00)"],["fs"],["fl"],["re"],["bp"],["mt",8,48],["lt",17.6,42.5],["ct",18.2,42.2,18.4,41.4,18,40.8],["lt",16.4,38],["ct",16,37.4,15.3,37.2,14.7,37.5],["lt",5.1,43],["ct",4.5,43.4,4.3,44.1,4.7,44.7],["lt",6.3,47.6],["ct",6.6,48.2,7.4,48.4,8,48],["cp"],["sv"],["xlg",15.374099999999885,37.17020000000002,8.030799999999886,48.84259999999995],["xcs",0,"rgb(130, 6, 20)"],["xcs",1,"rgba(215, 35, 53, 0.00)"],["fs"],["fl"],["re"],["bp"],["mt",12.4,55.7],["lt",22,50.2],["ct",22.6,49.9,22.8,49.1,22.4,48.5],["lt",20.8,45.6],["ct",20.5,45,19.7,44.8,19.1,45.2],["lt",9.5,50.7],["ct",8.9,51,8.7,51.8,9.1,52.4],["lt",10.7,55.3],["ct",11.1,55.9,11.8,56.1,12.4,55.7],["cp"],["sv"],["xlg",19.73860000000002,44.88170000000002,12.4926999999999,56.53139999999996],["xcs",0,"rgb(130, 6, 20)"],["xcs",1,"rgba(215, 35, 53, 0.00)"],["fs"],["fl"],["re"],["bp"],["mt",25.5,5.3],["lt",34.5,22.5],["lt",47.8,3.7],["lt",25.5,5.3],["cp"],["xlg",44,-0.1,27.9,16],["xcs",0,"rgb(130, 6, 20)"],["xcs",1,"rgba(215, 35, 53, 0.00)"],["fs"],["fl"],["bp"],["mt",63,31.6],["lt",40.7,33.3],["lt",49.7,50.4],["lt",63,31.6],["cp"],["xlg",59.2,27.8,43.1,43.9],["xcs",0,"rgb(130, 6, 20)"],["xcs",1,"rgba(215, 35, 53, 0.00)"],["fs"],["fl"],["re"],["re"]
]
const repairShip = [ ["of",0,0],
["sv"],["sv"],["bp"],["mt",11,18.2],["ct",11,28.2,18,36.3,32.3,36.3],["ct",46.7,36.3,62.8,28.2,62.8,18.2],["ct",62.8,8.1,47.4,0,33.1,0],["ct",18.8,0,11,8.1,11,18.2],["cp"],["fs","rgb(215, 35, 53)"],["fl"],["bp"],["mt",1.3,21.1],["lt",12.3,21.1],["ct",13,21.1,13.5,20.5,13.5,19.8],["lt",13.5,16.5],["ct",13.5,15.8,13,15.3,12.3,15.3],["lt",1.2,15.3],["ct",0.6,15.3,0,15.8,0,16.5],["lt",0,19.8],["ct",0,20.5,0.6,21.1,1.3,21.1],["cp"],["sv"],["xlg",12.83639999999997,14.861400000000003,0.7115000000000009,21.42700000000002],["xcs",0,"rgb(130, 6, 20)"],["xcs",1,"rgba(215, 35, 53, 0.00)"],["fs"],["fl"],["re"],["re"],["re"]
];




const curves = {
  scoutShip:scoutShip, basicShip:laserShip, missileShip:missileShip,
  shieldShip:shieldShip, mineShip:mineShip, assaultShip:devourer,

  asteroids:asteroids, planet:planet, gasGiant:gasGiant, nebula:nebula,
  asteroidMining:asteroidMining, planetRing:planetRing,
}
