"use strict"


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
  ctx.lineWidth = a => {ctx.data.push(["lw", a])}
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
    else if(t == "lw") c.lineWidth = v[0];
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


function pasteHere(ctx){

/* Instructions
    ctx.fillStyle = "rgb(215, 35, 53)";                                   remove =, put into brackets
      ===> ctx.fillStyle("rgb(215, 35, 53)")

    gradient = ctx.createLinearGradient(-68.0, -805.6, -77.7, -815.4);    remove: gradient =
        ctx.createLinearGradient(-68.0, -805.6, -77.7, -815.4);

    gradient.addColorStop(0.00, "rgb(130, 6, 20)");                       gradient ==> ctx
    ctx.addColorStop(0.00, "rgb(130, 6, 20)");

    ctx.fillStyle = gradient;                                             = gradient ==> ()
    ctx.fillStyle()
*/

/// PASTE BELLOW THIS LINE ////////////////////////////////////////////////////////////////////////


ctx.save();

// layer1/nebula/Group
ctx.save();

// layer1/nebula/Group/Path
ctx.save();
ctx.beginPath();
ctx.moveTo(17.1, 90.5);
ctx.bezierCurveTo(18.7, 90.4, 20.2, 90.1, 21.6, 89.4);
ctx.bezierCurveTo(28.7, 85.9, 34.2, 88.4, 35.8, 78.4);
ctx.bezierCurveTo(37.3, 68.3, 61.3, 79.7, 64.6, 74.3);
ctx.bezierCurveTo(70.0, 65.8, 74.1, 65.7, 93.1, 55.3);
ctx.bezierCurveTo(102.2, 50.3, 99.6, 42.1, 106.5, 41.0);
ctx.bezierCurveTo(114.5, 39.6, 109.4, 42.6, 123.5, 42.7);
ctx.bezierCurveTo(131.3, 42.8, 131.9, 32.5, 128.6, 26.9);
ctx.lineTo(119.4, 10.2);
ctx.lineTo(40.5, 10.0);
ctx.lineTo(0.0, 78.0);
ctx.lineTo(7.3, 90.7);
ctx.lineTo(17.1, 90.5);
ctx.closePath();
ctx.save();
ctx.transform(0.507, -0.862, 0.862, 0.507, 1188.9, 2192.0);
ctx.createLinearGradient(1264.0, -2034.7, 1299.2, -2095.6);
ctx.addColorStop(0.00, "rgba(39, 168, 224, 0.20)");
ctx.addColorStop(0.18, "rgba(39, 168, 224, 0.10)");
ctx.addColorStop(1.00, "rgba(39, 168, 224, 0.00)");
ctx.fillStyle ();
ctx.fill();

// layer1/nebula/Group/Path
ctx.restore();
ctx.beginPath();
ctx.moveTo(141.3, 66.8);
ctx.bezierCurveTo(139.7, 66.9, 138.1, 67.2, 136.7, 67.9);
ctx.bezierCurveTo(129.6, 71.4, 124.2, 69.0, 122.7, 79.0);
ctx.bezierCurveTo(121.1, 89.1, 97.2, 77.8, 93.8, 83.2);
ctx.bezierCurveTo(88.5, 91.8, 84.4, 91.9, 65.4, 102.4);
ctx.bezierCurveTo(56.4, 107.4, 59.0, 115.6, 52.2, 116.8);
ctx.bezierCurveTo(44.1, 118.2, 49.2, 115.2, 35.2, 115.1);
ctx.bezierCurveTo(27.3, 115.1, 26.8, 125.4, 30.1, 131.0);
ctx.lineTo(38.9, 146.8);
ctx.lineTo(118.3, 147.4);
ctx.lineTo(158.4, 79.2);
ctx.lineTo(151.0, 66.6);
ctx.lineTo(141.3, 66.8);
ctx.closePath();
ctx.save();
ctx.transform(-0.502, 0.865, -0.865, -0.502, 3573.1, -1946.6);
ctx.createLinearGradient(3510.1, 1997.5, 3545.3, 1936.6);
ctx.addColorStop(0.00, "rgba(39, 168, 224, 0.20)");
ctx.addColorStop(0.18, "rgba(39, 168, 224, 0.10)");
ctx.addColorStop(1.00, "rgba(39, 168, 224, 0.00)");
ctx.fillStyle ();
ctx.fill();

// layer1/nebula/Group
ctx.restore();
ctx.restore();

// layer1/nebula/Group/Ellipse
ctx.save();
ctx.beginPath();
ctx.moveTo(86.9, 58.3);
ctx.bezierCurveTo(62.1, 43.7, 30.1, 52.0, 15.5, 76.8);
ctx.bezierCurveTo(0.9, 101.6, 9.2, 133.6, 34.0, 148.2);
ctx.bezierCurveTo(58.9, 162.8, 90.8, 154.5, 105.4, 129.7);
ctx.bezierCurveTo(120.0, 104.8, 111.7, 72.9, 86.9, 58.3);
ctx.closePath();
ctx.save();
ctx.transform(0.507, -0.862, 0.862, 0.507, 1188.9, 2192.0);
ctx.createRadialGradient(1229.0, -2031.2, 0.0, 1229.0, -2031.2, 52.2);
ctx.addColorStop(0.29, "rgba(7, 121, 169, 0.20)");
ctx.addColorStop(0.69, "rgba(7, 121, 169, 0.10)");
ctx.addColorStop(1.00, "rgba(7, 121, 169, 0.00)");
ctx.fillStyle ();
ctx.fill();

// layer1/nebula/Group/Path
ctx.restore();
ctx.beginPath();
ctx.moveTo(137.0, 26.6);
ctx.bezierCurveTo(113.9, 13.1, 84.3, 20.8, 70.8, 43.8);
ctx.bezierCurveTo(57.2, 66.9, 64.4, 96.5, 88.0, 110.0);
ctx.bezierCurveTo(107.8, 121.4, 141.4, 114.0, 154.2, 92.8);
ctx.bezierCurveTo(168.7, 68.7, 160.0, 40.2, 137.0, 26.6);
ctx.closePath();
ctx.save();
ctx.transform(0.507, -0.862, 0.862, 0.507, 1188.9, 2192.0);
ctx.createRadialGradient(1285.5, -2004.0, 0.0, 1285.5, -2004.0, 48.4);
ctx.addColorStop(0.29, "rgba(78, 127, 113, 0.20)");
ctx.addColorStop(0.69, "rgba(78, 127, 113, 0.10)");
ctx.addColorStop(1.00, "rgba(78, 127, 113, 0.00)");
ctx.fillStyle ();
ctx.fill();

// layer1/nebula/Group/Ellipse
ctx.restore();
ctx.beginPath();
ctx.moveTo(79.1, 6.3);
ctx.bezierCurveTo(57.2, -6.5, 29.1, 0.8, 16.3, 22.7);
ctx.bezierCurveTo(3.4, 44.5, 10.7, 72.6, 32.6, 85.5);
ctx.bezierCurveTo(54.4, 98.3, 82.6, 91.0, 95.4, 69.2);
ctx.bezierCurveTo(108.3, 47.3, 101.0, 19.2, 79.1, 6.3);
ctx.closePath();
ctx.save();
ctx.transform(0.507, -0.862, 0.862, 0.507, 1188.9, 2192.0);
ctx.createRadialGradient(1276.1, -2064.2, 0.0, 1276.1, -2064.2, 45.9);
ctx.addColorStop(0.29, "rgba(0, 166, 110, 0.10)");
ctx.addColorStop(0.69, "rgba(0, 166, 110, 0.05)");
ctx.addColorStop(1.00, "rgba(0, 166, 110, 0.00)");
ctx.fillStyle ();
ctx.fill();

// layer1/nebula/Group
ctx.restore();
ctx.restore();

// layer1/nebula/Group/Ellipse
ctx.save();
ctx.beginPath();
ctx.moveTo(30.6, 59.4);
ctx.bezierCurveTo(27.9, 57.8, 24.5, 58.7, 22.9, 61.4);
ctx.bezierCurveTo(21.3, 64.1, 22.2, 67.6, 24.9, 69.2);
ctx.bezierCurveTo(27.6, 70.7, 31.1, 69.8, 32.7, 67.1);
ctx.bezierCurveTo(34.3, 64.4, 33.3, 61.0, 30.6, 59.4);
ctx.closePath();
ctx.save();
ctx.transform(0.507, -0.862, 0.862, 0.507, 1188.9, 2192.0);
ctx.createRadialGradient(1246.1, -2079.1, 0.0, 1246.1, -2079.1, 5.7);
ctx.addColorStop(0.29, "rgba(7, 121, 169, 0.50)");
ctx.addColorStop(0.69, "rgba(7, 121, 169, 0.25)");
ctx.addColorStop(1.00, "rgba(7, 121, 169, 0.00)");
ctx.fillStyle ();
ctx.fill();

// layer1/nebula/Group/Ellipse
ctx.restore();
ctx.beginPath();
ctx.moveTo(77.7, 17.1);
ctx.bezierCurveTo(71.6, 13.5, 63.8, 15.5, 60.2, 21.6);
ctx.bezierCurveTo(56.7, 27.7, 58.7, 35.5, 64.8, 39.1);
ctx.bezierCurveTo(70.9, 42.7, 78.7, 40.6, 82.3, 34.6);
ctx.bezierCurveTo(85.8, 28.5, 83.8, 20.7, 77.7, 17.1);
ctx.closePath();
ctx.save();
ctx.transform(0.507, -0.862, 0.862, 0.507, 1188.9, 2192.0);
ctx.createRadialGradient(1299.3, -2059.9, 0.0, 1299.3, -2059.9, 12.8);
ctx.addColorStop(0.29, "rgba(0, 78, 124, 0.50)");
ctx.addColorStop(0.69, "rgba(0, 78, 124, 0.25)");
ctx.addColorStop(1.00, "rgba(0, 78, 124, 0.00)");
ctx.fillStyle ();
ctx.fill();

// layer1/nebula/Group/Ellipse
ctx.restore();
ctx.beginPath();
ctx.moveTo(111.7, 102.5);
ctx.bezierCurveTo(108.2, 100.5, 103.8, 101.6, 101.7, 105.1);
ctx.bezierCurveTo(99.7, 108.6, 100.9, 113.0, 104.3, 115.1);
ctx.bezierCurveTo(107.8, 117.1, 112.3, 115.9, 114.3, 112.5);
ctx.bezierCurveTo(116.3, 109.0, 115.2, 104.6, 111.7, 102.5);
ctx.closePath();
ctx.save();
ctx.transform(0.507, -0.862, 0.862, 0.507, 1188.9, 2192.0);
ctx.createRadialGradient(1248.4, -1987.3, 0.0, 1248.4, -1987.3, 7.3);
ctx.addColorStop(0.00, "rgba(39, 168, 224, 0.50)");
ctx.addColorStop(0.56, "rgba(39, 168, 224, 0.25)");
ctx.addColorStop(1.00, "rgba(39, 168, 224, 0.00)");
ctx.fillStyle ();
ctx.fill();

// layer1/white dwarf
ctx.restore();
ctx.restore();
ctx.restore();

// layer1/white dwarf/Ellipse
ctx.save();
ctx.beginPath();
ctx.moveTo(115.3, 79.9);
ctx.bezierCurveTo(114.5, 99.6, 98.0, 114.9, 78.3, 114.1);
ctx.bezierCurveTo(58.7, 113.4, 43.4, 96.8, 44.1, 77.2);
ctx.bezierCurveTo(44.9, 57.5, 61.4, 42.2, 81.1, 42.9);
ctx.bezierCurveTo(100.7, 43.7, 116.1, 60.3, 115.3, 79.9);
ctx.closePath();
ctx.save();
ctx.transform(0.999, 0.039, 0.039, -0.999, 36.9, 85.3);
ctx.createRadialGradient(42.5, 8.4, 0.0, 42.5, 8.4, 35.6);
ctx.addColorStop(0.42, "rgb(41, 170, 226)");
ctx.addColorStop(0.65, "rgba(41, 170, 226, 0.50)");
ctx.addColorStop(1.00, "rgba(41, 170, 226, 0.00)");
ctx.fillStyle ();
ctx.fill();

// layer1/white dwarf/Ellipse
ctx.restore();
ctx.beginPath();
ctx.moveTo(105.3, 79.7);
ctx.bezierCurveTo(104.8, 93.8, 92.9, 104.8, 78.8, 104.3);
ctx.bezierCurveTo(64.7, 103.7, 53.7, 91.8, 54.3, 77.7);
ctx.bezierCurveTo(54.8, 63.6, 66.7, 52.7, 80.8, 53.2);
ctx.bezierCurveTo(94.9, 53.8, 105.9, 65.6, 105.3, 79.7);
ctx.closePath();
ctx.fillStyle ("rgb(41, 170, 226)");
ctx.fill();

// layer1/white dwarf/Ellipse
ctx.beginPath();
ctx.moveTo(105.3, 79.7);
ctx.bezierCurveTo(104.8, 93.8, 92.9, 104.8, 78.8, 104.3);
ctx.bezierCurveTo(64.7, 103.7, 53.7, 91.8, 54.3, 77.7);
ctx.bezierCurveTo(54.8, 63.6, 66.7, 52.7, 80.8, 53.2);
ctx.bezierCurveTo(94.9, 53.8, 105.9, 65.6, 105.3, 79.7);
ctx.closePath();
ctx.save();
ctx.transform(0.999, 0.039, 0.039, -0.999, 36.9, 85.3);
ctx.createRadialGradient(42.6, 8.2, 0.0, 42.6, 8.2, 25.5);
ctx.addColorStop(0.28, "rgba(255, 255, 255, 0.75)");
ctx.addColorStop(0.74, "rgba(197, 205, 207, 0.75)");
ctx.addColorStop(1.00, "rgba(139, 156, 160, 0.75)");
ctx.fillStyle ();
ctx.fill();
ctx.restore();
ctx.restore();
ctx.restore();

/// PASTE ABOVE  THIS LINE  ////////////////////////////////////////////////////////////////////////

  return ctx.data;
}
