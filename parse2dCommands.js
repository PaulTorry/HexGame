"use strict"

const laserShip = [{"t":"sv"},{"t":"sv"},{"t":"bp"},{"t":"mt","v":[55.6,23.9]},{"t":"lt","v":[32.2,19.6]},
{"t":"lt","v":[32.2,4.5]},{"t":"ct","v":[32.2,4.4,32.2,4.3,32.2,4.2]},{"t":"lt","v":[37.2,0.1]},
{"t":"lt","v":[28.3,0.1]},{"t":"lt","v":[28.4,0.1]},{"t":"ct","v":[28.1,0,27.9,0,27.7,0]},
{"t":"lt","v":[15,0]},{"t":"ct","v":[12.5,0,10.5,2,10.5,4.5]},{"t":"lt","v":[10.5,50.5]},
{"t":"ct","v":[10.5,53,12.5,55,15,55]},{"t":"lt","v":[27.7,55]},{"t":"ct","v":[27.9,55,28.1,55,28.4,54.9]},
{"t":"lt","v":[28.3,55]},{"t":"lt","v":[37.4,55]},{"t":"lt","v":[32.1,51]},
{"t":"ct","v":[32.2,50.8,32.2,50.7,32.2,50.5]},{"t":"lt","v":[32.2,34.4]},{"t":"lt","v":[55.7,28.8]},
{"t":"ct","v":[56.4,28.6,56.8,28,56.8,27.3]},{"t":"lt","v":[56.8,25.4]},{"t":"ct","v":[56.8,24.7,56.3,24.1,55.6,23.9]},{"t":"cp"},{"t":"fs","v":"rgb(215, 35, 53)"},{"t":"fl"},{"t":"bp"},{"t":"mt","v":[1.3,16.4]},{"t":"lt","v":[12.3,16.4]},
{"t":"ct","v":[13,16.4,13.5,15.9,13.5,15.2]},{"t":"lt","v":[13.5,11.9]},
{"t":"ct","v":[13.5,11.2,13,10.6,12.3,10.6]},{"t":"lt","v":[1.2,10.6]},
{"t":"ct","v":[0.6,10.6,0,11.2,0,11.9]},{"t":"lt","v":[0,15.2]},
{"t":"ct","v":[0,15.9,0.6,16.4,1.3,16.4]},{"t":"cp"},{"t":"sv"},
{"t":"tr","v":[0.957,0.29,0.29,-0.957,315.7,-718.7]},
{"t":"xrg","v":[-78.4,-785.5,-88.2,-795.3]},
{"t":"xcs","v":[0,"rgb(130, 6, 20)"]},{"t":"xcs","v":[1,"rgba(215, 35, 53, 0.00)"]},
{"t":"fs"},{"t":"fl"},{"t":"re"},{"t":"bp"},{"t":"mt","v":[1.3,45.7]},
{"t":"lt","v":[12.3,45.7]},{"t":"ct","v":[13,45.7,13.5,45.1,13.5,44.4]},
{"t":"lt","v":[13.5,41.1]},{"t":"ct","v":[13.5,40.4,13,39.9,12.3,39.9]},
{"t":"lt","v":[1.2,39.9]},{"t":"ct","v":[0.6,39.9,0,40.4,0,41.1]},
{"t":"lt","v":[0,44.4]},{"t":"ct","v":[0,45.1,0.6,45.7,1.3,45.7]},
{"t":"cp"},{"t":"sv"},{"t":"tr","v":[0.957,0.29,0.29,-0.957,315.7,-718.7]},
{"t":"xrg","v":[-70,-813.5,-79.7,-823.2]},{"t":"xcs","v":[0,"rgb(130, 6, 20)"]},
{"t":"xcs","v":[1,"rgba(215, 35, 53, 0.00)"]},{"t":"fs"},{"t":"fl"},{"t":"re"},{"t":"bp"},
{"t":"mt","v":[44.5,25.9]},{"t":"lt","v":[32.5,23.2]},{"t":"ct","v":[32.2,23.1,31.8,23.3,31.8,23.7]},
{"t":"lt","v":[31.8,30]},{"t":"ct","v":[31.8,30.4,32.2,30.6,32.6,30.5]},{"t":"lt","v":[44.5,26.9]},
{"t":"ct","v":[45.1,26.8,45.1,26,44.5,25.9]},{"t":"cp"},{"t":"xrg","v":[41.1,22.3,32.5,30.9]},
{"t":"xcs","v":[0,"rgb(130, 6, 20)"]},{"t":"xcs","v":[1,"rgba(215, 35, 53,0.00)"]},
{"t":"fs"},{"t":"fl"},{"t":"re"},{"t":"re"},{"t":"sv"},{"t":"sv"},{"t":"bp"},{"t":"mt","v":[55.6,23.9]},
{"t":"lt","v":[32.2,19.6]},{"t":"lt","v":[32.2,4.5]},{"t":"ct","v":[32.2,4.4,32.2,4.3,32.2,4.2]},
{"t":"lt","v":[37.2,0.1]},{"t":"lt","v":[28.3,0.1]},{"t":"lt","v":[28.4,0.1]},
{"t":"ct","v":[28.1,0,27.9,0,27.7,0]},{"t":"lt","v":[15,0]},{"t":"ct","v":[12.5,0,10.5,2,10.5,4.5]},
{"t":"lt","v":[10.5,50.5]},{"t":"ct","v":[10.5,53,12.5,55,15,55]},{"t":"lt","v":[27.7,55]},
{"t":"ct","v":[27.9,55,28.1,55,28.4,54.9]},{"t":"lt","v":[28.3,55]},{"t":"lt","v":[37.4,55]},
{"t":"lt","v":[32.1,51]},{"t":"ct","v":[32.2,50.8,32.2,50.7,32.2,50.5]},{"t":"lt","v":[32.2,34.4]},
{"t":"lt","v":[55.7,28.8]},{"t":"ct","v":[56.4,28.6,56.8,28,56.8,27.3]},
{"t":"lt","v":[56.8,25.4]},{"t":"ct","v":[56.8,24.7,56.3,24.1,55.6,23.9]},{"t":"cp"},
{"t":"fs","v":"rgb(215, 35, 53)"},{"t":"fl"},{"t":"bp"},{"t":"mt","v":[1.3,16.4]},
{"t":"lt","v":[12.3,16.4]},{"t":"ct","v":[13,16.4,13.5,15.9,13.5,15.2]},{"t":"lt","v":[13.5,11.9]},
{"t":"ct","v":[13.5,11.2,13,10.6,12.3,10.6]},{"t":"lt","v":[1.2,10.6]},{"t":"ct","v":[0.6,10.6,0,11.2,0,11.9]},
{"t":"lt","v":[0,15.2]},{"t":"ct","v":[0,15.9,0.6,16.4,1.3,16.4]},{"t":"cp"},{"t":"sv"},
{"t":"tr","v":[0.957,0.29,0.29,-0.957,315.7,-718.7]},{"t":"xrg","v":[-78.4,-785.5,-88.2,-795.3]},
{"t":"xcs","v":[0,"rgb(130, 6, 20)"]},{"t":"xcs","v":[1,"rgba(215, 35, 53, 0.00)"]},{"t":"fs"},
{"t":"fl"},{"t":"re"},{"t":"bp"},{"t":"mt","v":[1.3,45.7]},{"t":"lt","v":[12.3,45.7]},
{"t":"ct","v":[13,45.7,13.5,45.1,13.5,44.4]},{"t":"lt","v":[13.5,41.1]},
{"t":"ct","v":[13.5,40.4,13,39.9,12.3,39.9]},{"t":"lt","v":[1.2,39.9]},
{"t":"ct","v":[0.6,39.9,0,40.4,0,41.1]},{"t":"lt","v":[0,44.4]},{"t":"ct","v":[0,45.1,0.6,45.7,1.3,45.7]},
{"t":"cp"},{"t":"sv"},{"t":"tr","v":[0.957,0.29,0.29,-0.957,315.7,-718.7]},
{"t":"xrg","v":[-70,-813.5,-79.7,-823.2]},{"t":"xcs","v":[0,"rgb(130, 6, 20)"]},
{"t":"xcs","v":[1,"rgba(215, 35, 53, 0.00)"]},{"t":"fs"},{"t":"fl"},{"t":"re"},{"t":"bp"},
{"t":"mt","v":[44.5,25.9]},{"t":"lt","v":[32.5,23.2]},{"t":"ct","v":[32.2,23.1,31.8,23.3,31.8,23.7]},
{"t":"lt","v":[31.8,30]},{"t":"ct","v":[31.8,30.4,32.2,30.6,32.6,30.5]},{"t":"lt","v":[44.5,26.9]},
{"t":"ct","v":[45.1,26.8,45.1,26,44.5,25.9]},{"t":"cp"},{"t":"xrg","v":[41.1,22.3,32.5,30.9]},
{"t":"xcs","v":[0,"rgb(130, 6, 20)"]},{"t":"xcs","v":[1,"rgba(215, 35, 53, 0.00)"]},{"t":"fs"},
{"t":"fl"},{"t":"re"},{"t":"re"}
];


function json(a){return JSON.stringify(a)}


let ctx = {}
ctx.data = []

ctx.save = x => {ctx.data.push({t:"sv"})}
ctx.beginPath = x => {ctx.data.push({t:"bp"})}
ctx.moveTo = (a,b) => {ctx.data.push({t:"mt", v:[a,b]})}
ctx.lineTo = (a,b) => {ctx.data.push({t:"lt", v:[a,b]})}
ctx.closePath = x => {ctx.data.push({t:"cp"})}
ctx.fillStyle  = a => {ctx.data.push({t:"fs", v:a})}
ctx.fill = x => {ctx.data.push({t:"fl"})}
ctx.bezierCurveTo = (a,b,c,d,e,f,) => {ctx.data.push({t:"ct", v:[a,b,c,d,e,f,]})}
ctx.restore = x => {ctx.data.push({t:"re"})}
ctx.stroke = x => {ctx.data.push({t:"st"})}

ctx.transform = (a,b,c,d,e,f) => {ctx.data.push({t:"tr", v:[a,b,c,d,e,f,]})}

ctx.createRadialGradient = (a,b,c,d,e,f) => {ctx.data.push({t:"xrg", v:[a,b,c,d,e,f,]})}
ctx.createLinearGradient = (a,b,c,d,) => {ctx.data.push({t:"xrg", v:[a,b,c,d]})}
ctx.addColorStop = (a,b) => {ctx.data.push({t:"xcs", v:[a,b]})}

function raw(){


        // layer1/laser ship
        ctx.save();

        // layer1/laser ship/Path
        ctx.save();
        ctx.beginPath();
        ctx.moveTo(55.6, 23.9);
        ctx.lineTo(32.2, 19.6);
        ctx.lineTo(32.2, 4.5);
        ctx.bezierCurveTo(32.2, 4.4, 32.2, 4.3, 32.2, 4.2);
        ctx.lineTo(37.2, 0.1);
        ctx.lineTo(28.3, 0.1);
        ctx.lineTo(28.4, 0.1);
        ctx.bezierCurveTo(28.1, 0.0, 27.9, 0.0, 27.7, 0.0);
        ctx.lineTo(15.0, 0.0);
        ctx.bezierCurveTo(12.5, 0.0, 10.5, 2.0, 10.5, 4.5);
        ctx.lineTo(10.5, 50.5);
        ctx.bezierCurveTo(10.5, 53.0, 12.5, 55.0, 15.0, 55.0);
        ctx.lineTo(27.7, 55.0);
        ctx.bezierCurveTo(27.9, 55.0, 28.1, 55.0, 28.4, 54.9);
        ctx.lineTo(28.3, 55.0);
        ctx.lineTo(37.4, 55.0);
        ctx.lineTo(32.1, 51.0);
        ctx.bezierCurveTo(32.2, 50.8, 32.2, 50.7, 32.2, 50.5);
        ctx.lineTo(32.2, 34.4);
        ctx.lineTo(55.7, 28.8);
        ctx.bezierCurveTo(56.4, 28.6, 56.8, 28.0, 56.8, 27.3);
        ctx.lineTo(56.8, 25.4);
        ctx.bezierCurveTo(56.8, 24.7, 56.3, 24.1, 55.6, 23.9);
        ctx.closePath();
        ctx.fillStyle ( "rgb(215, 35, 53)");
        ctx.fill();

        // layer1/laser ship/Rectangle
        ctx.beginPath();
        ctx.moveTo(1.3, 16.4);
        ctx.lineTo(12.3, 16.4);
        ctx.bezierCurveTo(13.0, 16.4, 13.5, 15.9, 13.5, 15.2);
        ctx.lineTo(13.5, 11.9);
        ctx.bezierCurveTo(13.5, 11.2, 13.0, 10.6, 12.3, 10.6);
        ctx.lineTo(1.2, 10.6);
        ctx.bezierCurveTo(0.6, 10.6, -0.0, 11.2, 0.0, 11.9);
        ctx.lineTo(0.0, 15.2);
        ctx.bezierCurveTo(0.0, 15.9, 0.6, 16.4, 1.3, 16.4);
        ctx.closePath();
        ctx.save();
        ctx.transform(0.957, 0.290, 0.290, -0.957, 315.7, -718.7);
        ctx.createLinearGradient(-78.4, -785.5, -88.2, -795.3);
        ctx.addColorStop(0.00, "rgb(130, 6, 20)");
        ctx.addColorStop(1.00, "rgba(215, 35, 53, 0.00)");
        ctx.fillStyle();
        ctx.fill();

        // layer1/laser ship/Rectangle
        ctx.restore();
        ctx.beginPath();
        ctx.moveTo(1.3, 45.7);
        ctx.lineTo(12.3, 45.7);
        ctx.bezierCurveTo(13.0, 45.7, 13.5, 45.1, 13.5, 44.4);
        ctx.lineTo(13.5, 41.1);
        ctx.bezierCurveTo(13.5, 40.4, 13.0, 39.9, 12.3, 39.9);
        ctx.lineTo(1.2, 39.9);
        ctx.bezierCurveTo(0.6, 39.9, -0.0, 40.4, 0.0, 41.1);
        ctx.lineTo(0.0, 44.4);
        ctx.bezierCurveTo(0.0, 45.1, 0.6, 45.7, 1.3, 45.7);
        ctx.closePath();
        ctx.save();
        ctx.transform(0.957, 0.290, 0.290, -0.957, 315.7, -718.7);
        ctx.createLinearGradient(-70.0, -813.5, -79.7, -823.2);
        ctx.addColorStop(0.00, "rgb(130, 6, 20)");
        ctx.addColorStop(1.00, "rgba(215, 35, 53, 0.00)");
        ctx.fillStyle();
        ctx.fill();

        // layer1/laser ship/Path
        ctx.restore();
        ctx.beginPath();
        ctx.moveTo(44.5, 25.9);
        ctx.lineTo(32.5, 23.2);
        ctx.bezierCurveTo(32.2, 23.1, 31.8, 23.3, 31.8, 23.7);
        ctx.lineTo(31.8, 30.0);
        ctx.bezierCurveTo(31.8, 30.4, 32.2, 30.6, 32.6, 30.5);
        ctx.lineTo(44.5, 26.9);
        ctx.bezierCurveTo(45.1, 26.8, 45.1, 26.0, 44.5, 25.9);
        ctx.closePath();
        ctx.createLinearGradient(41.1, 22.3, 32.5, 30.9);
        ctx.addColorStop(0.00, "rgb(130, 6, 20)");
        ctx.addColorStop(1.00, "rgba(215, 35, 53, 0.00)");
        ctx.fillStyle();
        ctx.fill();
        ctx.restore();
        ctx.restore();


  return ctx.data;
}

function rawOLD(c){
  c.save();
  c.beginPath();
  c.moveTo(32.6, 25.9);
  c.lineTo(27.5, 27.3);
  c.closePath();
  c.fillStyle = "rgb(0, 90, 112)";
  c.fill();
  c.bezierCurveTo(3.5, 67.7, -1.0, 65.0, 0.2, 65.4);
  c.restore();
  c.stroke()
  return c.data;
}


// function add(a, x, y){
//   return a.map((v,i) => {
//     if(i%2)return v + y;
//     else return v + x;
//   })
// }

function drawFromData(c, data, x=0, y=0){
  let add = (a, x, y) => a.map((v,i) => i%2 ? v+y  : v+x)

  data.forEach(({t,v}) => {
    if(t == "sv") c.save();
    else if(t == "bp") c.beginPath();
    else if(t == "mt") c.moveTo(...add(v,x,y));
    else if(t == "lt") c.lineTo(...add(v,x,y));
    else if(t == "cp") c.closePath();
    else if(t == "fs"){ if (v){ c.fillStyle = v;}}
    else if(t == "fl") c.fill();
    else if(t == "ct") c.bezierCurveTo(...add(v,x,y));
    else if(t == "re") c.restore();
    else if(t == "st") c.stroke()
  })
  if (c.data) return c.data;
}




//
// ------
// ctx.shadowColor = "rgba(169, 154, 202, 0.75)";
// ctx.shadowOffsetX = 3.0;
// ctx.shadowOffsetY = 3.0;
// ctx.shadowBlur = 10.0;
// -------
// var alpha = ctx.globalAlpha;
// ctx.globalAlpha = alpha * 0.82;
// --------------------
//
// ctx.transform(1.000, -0.019, -0.019, -1.000, 17.3, 85.0);
//
// gradient = ctx.createRadialGradient(46.7, 28.6, 0.0, 46.7, 28.6, 59.3);
// gradient.addColorStop(0.57, "rgba(0, 0, 0, 0.00)");
// gradient.addColorStop(0.81, "rgba(19, 84, 112, 0.33)");
// gradient.addColorStop(1.00, "rgba(39, 169, 225, 0.65)");
// ctx.fillStyle = gradient;
// ctx.fill();
// ctx.strokeStyle = "rgb(39, 169, 225)";
