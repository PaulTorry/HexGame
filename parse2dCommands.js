"use strict"


const asteroidBase = [
  ["sv"],["sv"],["bp"],["mt",32.6,25.9],["lt",27.5,27.3],["lt",25.9,33.4],["lt",30.8,37.4],["lt",36.4,37.4],["lt",36.4,31.6],["lt",32.6,25.9],["cp"],["fs","rgb(130, 6, 20)"],["fl"],["bp"],["mt",97.5,53.9],["lt",93.2,58.4],["lt",95.3,61.2],["lt",98.9,62.9],["lt",104.1,59.8],["lt",101.8,55.1],["lt",97.5,53.9],["cp"],["fl"],["bp"],["mt",91.5,74.4],["lt",87,77.8],["lt",88.4,80.8],["lt",91.5,80.8],["lt",96.1,77.8],["lt",91.5,74.4],["cp"],["fl"],["bp"],["mt",57.1,94.5],["lt",55.4,100.1],["lt",57.1,103.9],["lt",62.4,103.9],["lt",65.5,99.2],["lt",62.4,96.2],["lt",57.1,94.5],["cp"],["fl"],["bp"],["mt",53.8,75.8],["lt",55.4,80.8],["lt",57.1,82.8],["lt",62.4,83.8],["lt",67.1,82.8],["lt",67.1,77.8],["lt",62.4,77.6],["lt",57.1,74.4],["lt",53.8,75.8],["cp"],["fl"],["bp"],["mt",93.2,11.8],["lt",96.1,9.9],["lt",98.9,11.8],["lt",98.7,18.1],["lt",93.2,18.1],["lt",91.6,15.9],["lt",93.2,11.8],["cp"],["fl"],["bp"],["mt",71.9,28.3],["lt",75.4,28.3],["lt",75.4,30.2],["lt",73.6,34.8],["lt",70.1,33.1],["lt",67.6,30.2],["lt",71.9,28.3],["cp"],["fl"],["bp"],["mt",4.8,62.9],["lt",8.1,62.9],["lt",8.1,65.4],["lt",3.5,67.7],["ct",3.5,67.7,-1,65,0.2,65.4],["ct",1.5,65.8,1.5,62.9,1.5,62.9],["lt",4.8,62.9],["cp"],["fl"],["re"],["sv"],["bp"],["mt",31.1,41.3],["lt",28.2,46.4],["lt",29.7,49.3],["lt",32.6,49.3],["lt",36.4,47.8],["lt",36.4,44],["lt",33.9,41.3],["lt",31.1,41.3],["cp"],["fs","rgb(215, 35, 53)"],["fl"],["bp"],["mt",98.7,69.5],["lt",95.3,71.9],["lt",95.3,74.4],["lt",96.1,77.8],["lt",98.9,77.8],["lt",101.5,74.4],["lt",100.2,71.9],["lt",98.7,69.5],["cp"],["fl"],["bp"],["mt",45.2,73.6],["lt",42,74.4],["lt",42,79.1],["lt",43.6,80.8],["lt",48.7,80.8],["lt",50.6,77.6],["lt",45.2,73.6],["cp"],["fl"],["bp"],["mt",71.5,0],["lt",67.6,1.6],["lt",67.6,4.8],["lt",69.6,6],["lt",73,6],["lt",74.2,3],["lt",71.5,0],["cp"],["fl"],["bp"],["mt",24.9,94.5],["lt",22.7,98],["lt",24.9,98],["lt",28.2,96.4],["lt",27.2,94.5],["lt",24.9,94.5],["cp"],["fl"],["re"],["re"]
]

const asteroids = [
  ["sv"],["sv"],["sv"],["bp"],["mt",35.5,55.9],["lt",46.8,38.6],["lt",59.5,41.9],["lt",59.5,51.9],["lt",68.8,55.9],["lt",68.8,65.3],["lt",62.8,71.3],["lt",41.5,73.9],["lt",35.5,64.6],["lt",35.5,55.9],["cp"],["fs","rgb(36, 33, 72)"],["fl"],["bp"],["mt",73.6,19.4],["lt",86.1,12.2],["lt",96.1,15.8],["lt",98.1,22.8],["lt",96.1,28.8],["lt",84.1,28.8],["lt",79.6,24.8],["lt",73.6,24.3],["lt",73.6,19.4],["cp"],["fl"],["bp"],["mt",80.6,40.8],["lt",83.6,56.3],["lt",98.1,56.3],["lt",106.6,50.8],["lt",103.1,40.8],["lt",90.1,34.8],["lt",80.6,40.8],["cp"],["fl"],["bp"],["mt",44.1,15.7],["lt",46.1,20.5],["lt",52.1,20.5],["lt",57.6,15.7],["lt",52.1,12.2],["lt",44.1,15.7],["cp"],["fl"],["bp"],["mt",103.8,65.3],["lt",121.8,65.3],["lt",126.8,73.3],["lt",123.8,86.8],["lt",126.8,92.3],["lt",121.8,103.8],["lt",108.3,107.8],["lt",100.3,98.8],["lt",103.8,90.3],["lt",100.3,82.3],["lt",96.1,75.3],["lt",103.8,65.3],["cp"],["fl"],["bp"],["mt",33.1,77.8],["lt",36.8,84],["lt",30.6,90.8],["lt",16.6,88.3],["lt",12.1,77.8],["lt",20.1,72.8],["lt",33.1,77.8],["cp"],["fl"],["bp"],["mt",73.6,86.5],["lt",87.6,90.8],["lt",93.6,102.8],["lt",96.1,111.3],["lt",93.6,120.3],["lt",80.6,126.3],["lt",68.8,123.3],["lt",68.8,115.3],["lt",73.6,107.8],["lt",68.8,104.3],["lt",54.6,101.3],["lt",54.6,90.8],["lt",60.6,86.5],["lt",73.6,86.5],["cp"],["fl"],["bp"],["mt",39.1,107.8],["lt",35.5,114.3],["lt",36.8,119.8],["lt",44.1,122.8],["lt",50.9,117.8],["lt",48.1,110.8],["lt",39.1,107.8],["cp"],["fl"],["bp"],["mt",80.6,77.8],["lt",85.9,81.8],["lt",90.1,77.3],["lt",90.1,69.8],["lt",82.6,72.8],["lt",80.6,77.8],["cp"],["fl"],["bp"],["mt",27.6,52.3],["lt",20.6,56.3],["lt",18.5,52.3],["lt",20,47.1],["lt",24.5,41.8],["lt",27.6,47],["lt",27.6,52.3],["cp"],["fl"],["bp"],["mt",113.7,20.5],["lt",105.2,27.7],["lt",105.2,35.7],["lt",111.4,40.4],["lt",123.9,47.2],["lt",129.1,44.2],["lt",129.1,38.6],["lt",124.6,28.8],["lt",118.1,21.9],["lt",113.7,20.5],["cp"],["fl"],["re"],["re"],["re"]
]

const laserShip = [
  ["sv"],["sv"],["bp"],["mt",55.6,23.9],["lt",32.2,19.6],["lt",32.2,4.5],["ct",32.2,4.4,32.2,4.3,32.2,4.2],["lt",37.2,0.1],["lt",28.3,0.1],["lt",28.4,0.1],["ct",28.1,0,27.9,0,27.7,0],["lt",15,0],["ct",12.5,0,10.5,2,10.5,4.5],["lt",10.5,50.5],["ct",10.5,53,12.5,55,15,55],["lt",27.7,55],["ct",27.9,55,28.1,55,28.4,54.9],["lt",28.3,55],["lt",37.4,55],["lt",32.1,51],["ct",32.2,50.8,32.2,50.7,32.2,50.5],["lt",32.2,34.4],["lt",55.7,28.8],["ct",56.4,28.6,56.8,28,56.8,27.3],["lt",56.8,25.4],["ct",56.8,24.7,56.3,24.1,55.6,23.9],["cp"],["fs","rgb(215, 35, 53)"],["fl"],["bp"],["mt",1.3,16.4],["lt",12.3,16.4],["ct",13,16.4,13.5,15.9,13.5,15.2],["lt",13.5,11.9],["ct",13.5,11.2,13,10.6,12.3,10.6],["lt",1.2,10.6],["ct",0.6,10.6,0,11.2,0,11.9],["lt",0,15.2],["ct",0,15.9,0.6,16.4,1.3,16.4],["cp"],["sv"],["xlg",12.876199999999983,10.287499999999909,0.6555999999999926,16.82409999999993],["xcs",0,"rgb(130, 6, 20)"],["xcs",1,"rgba(215, 35, 53, 0.00)"],["fs"],["fl"],["re"],["bp"],["mt",1.3,45.7],["lt",12.3,45.7],["ct",13,45.7,13.5,45.1,13.5,44.4],["lt",13.5,41.1],["ct",13.5,40.4,13,39.9,12.3,39.9],["lt",1.2,39.9],["ct",0.6,39.9,0,40.4,0,41.1],["lt",0,44.4],["ct",0,45.1,0.6,45.7,1.3,45.7],["cp"],["sv"],["xlg",12.795000000000016,39.519499999999994,0.6990999999999872,45.98939999999993],["xcs",0,"rgb(130, 6, 20)"],["xcs",1,"rgba(215, 35, 53, 0.00)"],["fs"],["fl"],["re"],["bp"],["mt",44.5,25.9],["lt",32.5,23.2],["ct",32.2,23.1,31.8,23.3,31.8,23.7],["lt",31.8,30],["ct",31.8,30.4,32.2,30.6,32.6,30.5],["lt",44.5,26.9],["ct",45.1,26.8,45.1,26,44.5,25.9],["cp"],["xlg",41.1,22.3,32.5,30.9],["xcs",0,"rgb(130, 6, 20)"],["xcs",1,"rgba(215, 35, 53, 0.00)"],["fs"],["fl"],["re"],["re"]
];

const shieldShip  = [
  ["sv"],["sv"],["bp"],["mt",21.3,30.3],["lt",33.7,30.1],["ct",35.2,30.1,36.7,29.3,37.4,27.9],["lt",43.5,17.1],["ct",44.2,15.7,44.2,14.1,43.4,12.8],["lt",37.1,2.1],["ct",36.3,0.8,34.9,0,33.3,0],["lt",20.9,0.2],["ct",19.4,0.2,18,1,17.2,2.4],["lt",11.1,13.2],["ct",10.4,14.5,10.4,16.2,11.2,17.5],["lt",17.5,28.2],["ct",18.3,29.5,19.8,30.3,21.3,30.3],["cp"],["fs","rgb(215, 35, 53)"],["fl"],["bp"],["mt",1.3,18],["lt",12.3,18],["ct",13,18,13.5,17.5,13.5,16.8],["lt",13.5,13.5],["ct",13.5,12.8,13,12.2,12.3,12.2],["lt",1.2,12.2],["ct",0.6,12.2,0,12.8,0,13.5],["lt",0,16.8],["ct",0,17.5,0.6,18,1.3,18],["cp"],["sv"],["xlg",12.824600000000032,11.872900000000072,0.6330000000000382,18.3137999999999],["xcs",0,"rgb(130, 6, 20)"],["xcs",1,"rgba(215, 35, 53, 0.00)"],["fs"],["fl"],["re"],["re"],["re"]
];

const scoutShip  = [
  ["sv"],["sv"],["sv"],["bp"],["mt",12.4,0],["lt",70,0],["ct",73.4,0,74.5,4.6,71.5,6.2],["lt",23.3,30.4],["ct",21.5,31.2,19.5,30.4,18.8,28.6],["lt",9.4,4.4],["ct",8.5,2.3,10.1,0,12.4,0],["cp"],["fs","rgb(215, 35, 53)"],["fl"],["bp"],["mt",2.6,11.6],["lt",13.1,8.4],["ct",13.8,8.2,14.2,7.5,14,6.9],["lt",13,3.7],["ct",12.8,3,12.1,2.7,11.4,2.9],["lt",0.9,6.1],["ct",0.2,6.3,-0.1,7,0.1,7.6],["lt",1,10.8],["ct",1.2,11.4,1.9,11.8,2.6,11.6],["cp"],["xlg",11.9,2.4,2.1,12.1],["xcs",0,"rgb(130, 6, 20)"],["xcs",1,"rgba(215, 35, 53, 0.00)"],["fs"],["fl"],["bp"],["mt",9.5,31.6],["lt",20,28.4],["ct",20.7,28.2,21,27.5,20.8,26.8],["lt",19.9,23.7],["ct",19.7,23,19,22.6,18.3,22.8],["lt",7.8,26],["ct",7.1,26.2,6.8,26.9,7,27.6],["lt",7.9,30.7],["ct",8.1,31.4,8.8,31.8,9.5,31.6],["cp"],["xlg",18.8,22.3,9,32.1],["xcs",0,"rgb(130, 6, 20)"],["xcs",1,"rgba(215, 35, 53, 0.00)"],["fs"],["fl"],["bp"],["mt",6.1,21.6],["lt",16.6,18.4],["ct",17.3,18.2,17.7,17.5,17.5,16.9],["lt",16.5,13.7],["ct",16.3,13.1,15.6,12.7,14.9,12.9],["lt",4.4,16.1],["ct",3.7,16.3,3.4,17,3.6,17.7],["lt",4.5,20.8],["ct",4.7,21.5,5.4,21.8,6.1,21.6],["cp"],["xlg",15.4,12.4,5.6,22.1],["xcs",0,"rgb(130, 6, 20)"],["xcs",1,"rgba(215, 35, 53, 0.00)"],["fs"],["fl"],["bp"],["mt",42.1,13.4],["lt",36.8,12.5],["ct",35.6,12.3,34.9,10.9,35.6,9.8],["lt",38.5,5],["ct",38.9,4.3,39.7,4,40.5,4.2],["lt",45.7,5.4],["ct",46.9,5.7,47.5,7.1,46.8,8.2],["lt",43.9,12.6],["ct",43.5,13.2,42.8,13.5,42.1,13.4],["cp"],["fs","rgb(130, 6, 20)"],["fl"],["re"],["re"]
];

const mineShip = [
  ["sv"],["sv"],["bp"],["mt",33.9,33.6],["lt",38.6,37.4],["lt",37.6,31.4],["lt",37.6,31.4],["lt",43.6,20.6],["lt",49,18.2],["lt",43.6,16.3],["lt",37.5,6.1],["lt",38.4,0],["lt",33.5,3.5],["lt",20.6,3.7],["lt",16,0.2],["lt",17.2,6.3],["lt",11.3,16.7],["lt",11.4,21],["lt",17.6,31.6],["lt",16.3,37.1],["lt",21.3,33.8],["lt",33.9,33.6],["lt",33.9,33.6],["cp"],["fs","rgb(215, 35, 53)"],["fl"],["bp"],["mt",1.3,21.6],["lt",12.3,21.6],["ct",13,21.6,13.5,21.1,13.5,20.4],["lt",13.5,17.1],["ct",13.5,16.4,13,15.8,12.3,15.8],["lt",1.2,15.8],["ct",0.6,15.8,0,16.4,0,17.1],["lt",0,20.4],["ct",0,21.1,0.6,21.6,1.3,21.6],["cp"],["sv"],["xlg",12.771000000000043,15.535099999999943,0.6751000000000431,22.004999999999995],["xcs",0,"rgb(130, 6, 20)"],["xcs",1,"rgba(215, 35, 53, 0.00)"],["fs"],["fl"],["re"],["re"],["re"]
];

const missileShip = [
  ["sv"],["sv"],["bp"],["mt",48.5,33.6],["lt",28.3,29],["lt",28.3,12.3],["lt",47.9,7.8],["ct",49,7.5,49,6,47.9,5.7],["lt",26.2,0.4],["ct",25.7,0.2,25.1,0,24.5,0],["lt",15,0],["ct",13,0,11.3,1.7,11.3,3.8],["lt",11.3,37.5],["ct",11.3,39.6,13,41.3,15,41.3],["lt",24.5,41.3],["ct",25.1,41.3,25.7,41.1,26.2,40.8],["lt",48.5,35.4],["ct",49.5,35.2,49.4,33.8,48.5,33.6],["cp"],["fs","rgb(215, 35, 53)"],["fl"],["bp"],["mt",1.3,15.6],["lt",12.3,15.6],["ct",13,15.6,13.5,15.1,13.5,14.4],["lt",13.5,11.1],["ct",13.5,10.4,13,9.8,12.3,9.8],["lt",1.2,9.8],["ct",0.6,9.8,0,10.4,0,11.1],["lt",0,14.4],["ct",0,15.1,0.6,15.6,1.3,15.6],["cp"],["sv"],["xlg",12.843500000000006,9.479199999999992,0.6519000000000688,15.920099999999934],["xcs",0,"rgb(130, 6, 20)"],["xcs",1,"rgba(215, 35, 53, 0.00)"],["fs"],["fl"],["re"],["bp"],["mt",28.5,9.9],["lt",40.5,7.2],["ct",41.1,7.1,41.1,6.2,40.5,6.1],["lt",28.3,3.1],["ct",27.9,3,27.6,3.3,27.6,3.7],["lt",27.8,9.4],["ct",27.8,9.8,28.2,10,28.5,9.9],["cp"],["fs","rgb(157, 19, 33)"],["fl"],["bp"],["mt",28.5,31.3],["lt",40.5,34],["ct",41.1,34.2,41.1,35,40.5,35.2],["lt",28.3,38.1],["ct",27.9,38.2,27.6,37.9,27.6,37.6],["lt",27.8,31.9],["ct",27.8,31.5,28.2,31.2,28.5,31.3],["cp"],["fl"],["bp"],["mt",1.3,31.4],["lt",12.3,31.4],["ct",13,31.4,13.5,30.8,13.5,30.1],["lt",13.5,26.8],["ct",13.5,26.1,13,25.6,12.3,25.6],["lt",1.2,25.6],["ct",0.6,25.6,0,26.1,0,26.8],["lt",0,30.1],["ct",0,30.8,0.6,31.4,1.3,31.4],["cp"],["sv"],["xlg",12.800000000000011,25.13919999999996,0.6751000000000431,31.704799999999864],["xcs",0,"rgb(130, 6, 20)"],["xcs",1,"rgba(215, 35, 53, 0.00)"],["fs"],["fl"],["re"],["re"],["re"]
];

const repairShip = [
  ["sv"],["sv"],["bp"],["mt",11,18.2],["ct",11,28.2,18,36.3,32.3,36.3],["ct",46.7,36.3,62.8,28.2,62.8,18.2],["ct",62.8,8.1,47.4,0,33.1,0],["ct",18.8,0,11,8.1,11,18.2],["cp"],["fs","rgb(215, 35, 53)"],["fl"],["bp"],["mt",1.3,21.1],["lt",12.3,21.1],["ct",13,21.1,13.5,20.5,13.5,19.8],["lt",13.5,16.5],["ct",13.5,15.8,13,15.3,12.3,15.3],["lt",1.2,15.3],["ct",0.6,15.3,0,15.8,0,16.5],["lt",0,19.8],["ct",0,20.5,0.6,21.1,1.3,21.1],["cp"],["sv"],["xlg",12.83639999999997,14.861400000000003,0.7115000000000009,21.42700000000002],["xcs",0,"rgb(130, 6, 20)"],["xcs",1,"rgba(215, 35, 53, 0.00)"],["fs"],["fl"],["re"],["re"],["re"]
];

const gasGiant =[
  ["sv"],["sv"],["bp"],["mt",86.2,14.2],["ct",99.7,30.8,97.2,55.1,80.6,68.6],["ct",64.1,82.1,39.8,79.6,26.3,63],["ct",12.8,46.5,15.3,22.2,31.8,8.7],["ct",48.4,-4.8,72.7,-2.3,86.2,14.2],["cp"],["sv"],["xrg",5522.1,-1135.4,0,5522.1,-1135.4,45.1],["xcs",0.28,"rgb(26, 60, 87)"],["xcs",0.58,"rgb(35, 50, 85)"],["xcs",0.9,"rgb(44, 41, 83)"],["fs"],["fl"],["re"],["bp"],["mt",108.3,15.2],["ct",105.4,8.8,95.1,6.6,81.3,8.3],["ct",83.2,9.9,84.9,11.7,86.5,13.7],["ct",93,13.2,97.4,14.3,98.7,17.1],["ct",99.9,19.8,97.9,23.6,93.7,28],["ct",87.1,34.7,74.8,42.7,59.9,49.4],["ct",46.2,55.5,33.2,59.2,23.8,60.2],["ct",16.4,60.9,11.3,59.9,9.9,56.9],["ct",8.5,53.7,11.4,49,17.3,43.7],["ct",17,41.8,16.9,39.9,16.9,38],["ct",16.9,37.3,16.9,36.6,16.9,35.9],["ct",4.6,45.9,-1.8,56.1,1.3,63.1],["ct",4.4,70.2,16.7,72.1,32.7,69.4],["ct",42.2,67.7,52.9,64.4,63.9,59.5],["ct",76.3,53.9,87,47.2,94.9,40.4],["ct",105.7,31.1,111.2,21.7,108.3,15.2],["cp"],["xlg",0.5,39.1,109,39.1],["xcs",0,"rgb(26, 60, 87)"],["xcs",0.14,"rgb(35, 50, 85)"],["xcs",0.41,"rgb(44, 41, 83)"],["xcs",0.89,"rgb(35, 50, 85)"],["xcs",1,"rgb(26, 60, 87)"],["fs"],["fl"],["ss","rgb(18, 14, 34)"],["st"],["re"],["re"],["sv"],["sv"],["bp"],["mt",86.2,14.2],["ct",99.7,30.8,97.2,55.1,80.6,68.6],["ct",64.1,82.1,39.8,79.6,26.3,63],["ct",12.8,46.5,15.3,22.2,31.8,8.7],["ct",48.4,-4.8,72.7,-2.3,86.2,14.2],["cp"],["sv"],["xrg",5522.1,-1135.4,0,5522.1,-1135.4,45.1],["xcs",0.28,"rgb(26, 60, 87)"],["xcs",0.58,"rgb(35, 50, 85)"],["xcs",0.9,"rgb(44, 41, 83)"],["fs"],["fl"],["re"],["bp"],["mt",108.3,15.2],["ct",105.4,8.8,95.1,6.6,81.3,8.3],["ct",83.2,9.9,84.9,11.7,86.5,13.7],["ct",93,13.2,97.4,14.3,98.7,17.1],["ct",99.9,19.8,97.9,23.6,93.7,28],["ct",87.1,34.7,74.8,42.7,59.9,49.4],["ct",46.2,55.5,33.2,59.2,23.8,60.2],["ct",16.4,60.9,11.3,59.9,9.9,56.9],["ct",8.5,53.7,11.4,49,17.3,43.7],["ct",17,41.8,16.9,39.9,16.9,38],["ct",16.9,37.3,16.9,36.6,16.9,35.9],["ct",4.6,45.9,-1.8,56.1,1.3,63.1],["ct",4.4,70.2,16.7,72.1,32.7,69.4],["ct",42.2,67.7,52.9,64.4,63.9,59.5],["ct",76.3,53.9,87,47.2,94.9,40.4],["ct",105.7,31.1,111.2,21.7,108.3,15.2],["cp"],["xlg",0.5,39.1,109,39.1],["xcs",0,"rgb(26, 60, 87)"],["xcs",0.14,"rgb(35, 50, 85)"],["xcs",0.41,"rgb(44, 41, 83)"],["xcs",0.89,"rgb(35, 50, 85)"],["xcs",1,"rgb(26, 60, 87)"],["fs"],["fl"],["ss","rgb(18, 14, 34)"],["st"],["re"],["re"]]

const planet = [];

function transform([a,b,c,d,e,f], x, y){
  var wX = x * a + y * c + e;
  var wY = x * b + y * d + f;
  return [wX,wY];
}
function invert(a,b,c,d,e,f){
  let [[aa,cc,ee],[bb,dd,ff],[y,u,i]] = math.inv([[a,c,e],[b,d,f],[0,0,1]]);
  return [aa,bb,cc,dd,ee,ff];
}
function json(a){return JSON.stringify(a)}

function getParseCTX(){
  let ctx = {}
  let transformMatrix = [1,0,0,1,0,0];

  ctx.data = []

  ctx.save = x => {ctx.data.push(["sv"])}
  ctx.beginPath = x => {ctx.data.push(["bp"])}
  ctx.moveTo = (a,b) => {ctx.data.push(["mt",a,b])}
  ctx.lineTo = (a,b) => {ctx.data.push(["lt",a,b])}
  ctx.closePath = x => {ctx.data.push(["cp"])}
  ctx.fillStyle  = a => {ctx.data.push( a ? ["fs", a] : ["fs"])}
  ctx.strokeStyle  = a => {ctx.data.push(["ss", a])}
  ctx.fill = x => {ctx.data.push(["fl"])}
  ctx.bezierCurveTo = (a,b,c,d,e,f,) => {ctx.data.push(["ct",a,b,c,d,e,f])}
  ctx.restore = x => {
    ctx.data.push(["re"]);
    transformMatrix = [1,0,0,1,0,0];
  }
  ctx.stroke = x => {ctx.data.push(["st"])}

  ctx.transform = (a,b,c,d,e,f) => {
  //  ctx.data.push(["tr",a,b,c,d,e,f]);
    transformMatrix = [a,b,c,d,e,f];
  }

  ctx.createRadialGradient = (a,b,c,d,e,f) => {
    console.log(transformMatrix);
    let [dd,ee] = transform(transformMatrix, d, e)
    let [aa,bb] = transform(transformMatrix, a, b)
    // ctx.data.push(["xrg",a,b,c,d,e,f])
    ctx.data.push(["xrg",aa,bb,c,dd,ee,f])
  }
  ctx.createLinearGradient = (a,b,c,d,) => {
    let [cc,dd] = transform(transformMatrix, c, d)
    let [aa,bb] = transform(transformMatrix, a, b)
    // ctx.data.push(["xlg",a,b,c,d])
    ctx.data.push(["xlg",aa,bb,cc,dd])
  }
  ctx.addColorStop = (a,b) => {ctx.data.push(["xcs",a,b])}
  return ctx
}

function drawFromData(c, data, x=0, y=0){
  let add = (a, x, y) => a.map((v,i) => i%2 ? v+y  : v+x)
  let gradient;

  data.forEach(([t, ...v]) => {
    if(t == "sv") c.save();
    else if(t == "bp") c.beginPath();
    else if(t == "mt") c.moveTo(...add(v,x,y));
    else if(t == "lt") c.lineTo(...add(v,x,y));
    else if(t == "cp") c.closePath();
    else if(t == "fs"){
      if (v && v[0] ){ c.fillStyle = v[0]; }
      else if (gradient) {c.fillStyle = gradient};
    }
    else if(t == "ss"){ if (v){ c.strokeStyle = v[0];}}
    else if(t == "fl") c.fill();
    else if(t == "ct") c.bezierCurveTo(...add(v,x,y));
    else if(t == "re") c.restore();
    else if(t == "st") c.stroke()

    else if(t == "tr") c.transform(...v)

    else if(t == "xrg"){gradient = c.createRadialGradient(v[0]+x,v[1]+y,v[2],v[3]+x,v[4]+y,v[5])    }
    else if(t == "xlg"){gradient = c.createLinearGradient(...add(v,x,y))
    }
    else if(t == "xcs"){ gradient.addColorStop(...v) }

  })
  if (c.data) return c.data;
}


function raw2(ctx){

  ctx.save();

  // layer1/devourer/Path
  ctx.save();
  ctx.beginPath();
  ctx.moveTo(38.2, 27.3);
  ctx.lineTo(54.2, 0.4);
  ctx.lineTo(22.8, 0.0);
  ctx.lineTo(6.8, 26.9);
  ctx.lineTo(22.2, 54.3);
  ctx.lineTo(53.5, 54.7);
  ctx.lineTo(69.5, 27.7);
  ctx.lineTo(38.2, 27.3);
  ctx.closePath();
  ctx.fillStyle ( "rgb(215, 35, 53)");
  ctx.fill();

  // layer1/devourer/Rectangle
  ctx.beginPath();
  ctx.moveTo(3.5, 40.3);
  ctx.lineTo(13.1, 34.8);
  ctx.bezierCurveTo(13.7, 34.4, 13.9, 33.6, 13.5, 33.0);
  ctx.lineTo(11.9, 30.2);
  ctx.bezierCurveTo(11.5, 29.6, 10.8, 29.4, 10.2, 29.7);
  ctx.lineTo(0.6, 35.2);
  ctx.bezierCurveTo(0.0, 35.6, -0.2, 36.4, 0.2, 37.0);
  ctx.lineTo(1.8, 39.8);
  ctx.bezierCurveTo(2.2, 40.4, 2.9, 40.6, 3.5, 40.3);
  ctx.closePath();
  ctx.save();
  ctx.transform(0.974, -0.227, -0.227, -0.974, -682.6, 759.4);
   ctx.createLinearGradient(841.0, 553.5, 831.2, 543.8);
  ctx.addColorStop(0.00, "rgb(130, 6, 20)");
  ctx.addColorStop(1.00, "rgba(215, 35, 53, 0.00)");
  ctx.fillStyle()// = gradient;
  ctx.fill();

  // layer1/devourer/Rectangle
  ctx.restore();
  ctx.beginPath();
  ctx.moveTo(8.0, 48.0);
  ctx.lineTo(17.6, 42.5);
  ctx.bezierCurveTo(18.2, 42.2, 18.4, 41.4, 18.0, 40.8);
  ctx.lineTo(16.4, 38.0);
  ctx.bezierCurveTo(16.0, 37.4, 15.3, 37.2, 14.7, 37.5);
  ctx.lineTo(5.1, 43.0);
  ctx.bezierCurveTo(4.5, 43.4, 4.3, 44.1, 4.7, 44.7);
  ctx.lineTo(6.3, 47.6);
  ctx.bezierCurveTo(6.6, 48.2, 7.4, 48.4, 8.0, 48.0);
  ctx.closePath();
  ctx.save();
  ctx.transform(0.974, -0.227, -0.227, -0.974, -682.6, 759.4);
  ctx.createLinearGradient(843.6, 544.9, 833.8, 535.2);
  ctx.addColorStop(0.00, "rgb(130, 6, 20)");
  ctx.addColorStop(1.00, "rgba(215, 35, 53, 0.00)");
  ctx.fillStyle()//= gradient;
  ctx.fill();

  // layer1/devourer/Rectangle
  ctx.restore();
  ctx.beginPath();
  ctx.moveTo(12.4, 55.7);
  ctx.lineTo(22.0, 50.2);
  ctx.bezierCurveTo(22.6, 49.9, 22.8, 49.1, 22.4, 48.5);
  ctx.lineTo(20.8, 45.6);
  ctx.bezierCurveTo(20.5, 45.0, 19.7, 44.8, 19.1, 45.2);
  ctx.lineTo(9.5, 50.7);
  ctx.bezierCurveTo(8.9, 51.0, 8.7, 51.8, 9.1, 52.4);
  ctx.lineTo(10.7, 55.3);
  ctx.bezierCurveTo(11.1, 55.9, 11.8, 56.1, 12.4, 55.7);
  ctx.closePath();
  ctx.save();
  ctx.transform(0.974, -0.227, -0.227, -0.974, -682.6, 759.4);
 ctx.createLinearGradient(846.1, 536.4, 836.4, 526.7);
  ctx.addColorStop(0.00, "rgb(130, 6, 20)");
  ctx.addColorStop(1.00, "rgba(215, 35, 53, 0.00)");
  ctx.fillStyle()// = gradient;
  ctx.fill();

  // layer1/devourer/Path
  ctx.restore();
  ctx.beginPath();
  ctx.moveTo(25.5, 5.3);
  ctx.lineTo(34.5, 22.5);
  ctx.lineTo(47.8, 3.7);
  ctx.lineTo(25.5, 5.3);
  ctx.closePath();
  ctx.createLinearGradient(44.0, -0.1, 27.9, 16.0);
  ctx.addColorStop(0.00, "rgb(130, 6, 20)");
  ctx.addColorStop(1.00, "rgba(215, 35, 53, 0.00)");
  ctx.fillStyle()// = gradient;
  ctx.fill();

  // layer1/devourer/Path
  ctx.beginPath();
  ctx.moveTo(63.0, 31.6);
  ctx.lineTo(40.7, 33.3);
  ctx.lineTo(49.7, 50.4);
  ctx.lineTo(63.0, 31.6);
  ctx.closePath();
 ctx.createLinearGradient(59.2, 27.8, 43.1, 43.9);
  ctx.addColorStop(0.00, "rgb(130, 6, 20)");
  ctx.addColorStop(1.00, "rgba(215, 35, 53, 0.00)");
  ctx.fillStyle();// = gradient;
  ctx.fill();
  ctx.restore();
  ctx.restore();

  return ctx.data;
}
