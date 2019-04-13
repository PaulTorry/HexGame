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

// layer1/icy asteroids/base colour
ctx.save();

// layer1/icy asteroids/base colour/Path
ctx.save();
ctx.beginPath();
ctx.moveTo(32.8, 3.9);
ctx.lineTo(34.8, 8.6);
ctx.lineTo(40.8, 8.6);
ctx.lineTo(46.3, 3.9);
ctx.lineTo(40.8, 0.4);
ctx.lineTo(32.8, 3.9);
ctx.closePath();
ctx.fillStyle ("rgb(0, 173, 239)");
ctx.fill();

// layer1/icy asteroids/base colour/Path
ctx.beginPath();
ctx.moveTo(92.5, 53.4);
ctx.lineTo(110.5, 53.4);
ctx.lineTo(115.5, 61.4);
ctx.lineTo(112.5, 74.9);
ctx.lineTo(115.5, 80.4);
ctx.lineTo(110.5, 91.9);
ctx.lineTo(97.0, 95.9);
ctx.lineTo(89.0, 86.9);
ctx.lineTo(92.5, 78.4);
ctx.lineTo(89.0, 70.4);
ctx.lineTo(84.7, 63.4);
ctx.lineTo(92.5, 53.4);
ctx.closePath();
ctx.fill();

// layer1/icy asteroids/base colour/Path
ctx.beginPath();
ctx.moveTo(21.8, 65.9);
ctx.lineTo(25.5, 72.2);
ctx.lineTo(19.3, 78.9);
ctx.lineTo(5.3, 76.4);
ctx.lineTo(0.8, 65.9);
ctx.lineTo(8.8, 60.9);
ctx.lineTo(21.8, 65.9);
ctx.closePath();
ctx.fill();

// layer1/icy asteroids/base colour/Path
ctx.beginPath();
ctx.moveTo(62.3, 74.7);
ctx.lineTo(76.3, 78.9);
ctx.lineTo(82.3, 90.9);
ctx.lineTo(84.7, 99.4);
ctx.lineTo(82.3, 108.4);
ctx.lineTo(69.3, 114.4);
ctx.lineTo(57.5, 111.4);
ctx.lineTo(57.5, 103.4);
ctx.lineTo(62.3, 95.9);
ctx.lineTo(57.5, 92.4);
ctx.lineTo(43.3, 89.4);
ctx.lineTo(43.3, 78.9);
ctx.lineTo(49.3, 74.7);
ctx.lineTo(62.3, 74.7);
ctx.closePath();
ctx.fill();

// layer1/icy asteroids/base colour/Path
ctx.beginPath();
ctx.moveTo(27.8, 95.9);
ctx.lineTo(24.1, 102.4);
ctx.lineTo(25.5, 107.9);
ctx.lineTo(32.8, 110.9);
ctx.lineTo(39.5, 105.9);
ctx.lineTo(36.8, 98.9);
ctx.lineTo(27.8, 95.9);
ctx.closePath();
ctx.fill();

// layer1/icy asteroids/base colour/Path
ctx.beginPath();
ctx.moveTo(69.3, 65.9);
ctx.lineTo(74.5, 69.9);
ctx.lineTo(78.8, 65.4);
ctx.lineTo(78.8, 57.9);
ctx.lineTo(71.3, 60.9);
ctx.lineTo(69.3, 65.9);
ctx.closePath();
ctx.fill();

// layer1/icy asteroids/base colour/Path
ctx.beginPath();
ctx.moveTo(16.3, 40.4);
ctx.lineTo(9.3, 44.4);
ctx.lineTo(7.1, 40.4);
ctx.lineTo(8.7, 35.2);
ctx.lineTo(13.1, 29.9);
ctx.lineTo(16.3, 35.2);
ctx.lineTo(16.3, 40.4);
ctx.closePath();
ctx.fill();

// layer1/icy asteroids/base colour/Path
ctx.beginPath();
ctx.moveTo(102.4, 8.6);
ctx.lineTo(93.9, 15.8);
ctx.lineTo(93.9, 23.8);
ctx.lineTo(100.1, 28.5);
ctx.lineTo(112.5, 35.3);
ctx.lineTo(117.8, 32.3);
ctx.lineTo(117.8, 26.8);
ctx.lineTo(113.3, 16.9);
ctx.lineTo(106.8, 10.0);
ctx.lineTo(102.4, 8.6);
ctx.closePath();
ctx.fill();

// layer1/icy asteroids/base colour/Path
ctx.beginPath();
ctx.moveTo(24.1, 44.1);
ctx.lineTo(35.5, 26.8);
ctx.lineTo(48.1, 30.1);
ctx.lineTo(48.1, 40.1);
ctx.lineTo(57.5, 44.1);
ctx.lineTo(57.5, 53.4);
ctx.lineTo(51.5, 59.4);
ctx.lineTo(30.1, 62.1);
ctx.lineTo(24.1, 52.8);
ctx.lineTo(24.1, 44.1);
ctx.closePath();
ctx.fill();

// layer1/icy asteroids/base colour/Path
ctx.beginPath();
ctx.moveTo(62.3, 7.5);
ctx.lineTo(74.8, 0.4);
ctx.lineTo(84.7, 3.9);
ctx.lineTo(86.8, 10.9);
ctx.lineTo(84.7, 16.9);
ctx.lineTo(72.8, 16.9);
ctx.lineTo(68.3, 12.9);
ctx.lineTo(62.3, 12.4);
ctx.lineTo(62.3, 7.5);
ctx.closePath();
ctx.fill();

// layer1/icy asteroids/base colour/Path
ctx.beginPath();
ctx.moveTo(69.3, 28.9);
ctx.lineTo(72.3, 44.4);
ctx.lineTo(86.8, 44.4);
ctx.lineTo(95.3, 38.9);
ctx.lineTo(91.8, 28.9);
ctx.lineTo(78.8, 22.9);
ctx.lineTo(69.3, 28.9);
ctx.closePath();
ctx.fill();

// layer1/icy asteroids/gradients
ctx.restore();

// layer1/icy asteroids/gradients/Path
ctx.save();
ctx.beginPath();
ctx.moveTo(32.2, 3.8);
ctx.lineTo(34.4, 9.0);
ctx.lineTo(40.9, 9.0);
ctx.lineTo(46.9, 3.8);
ctx.lineTo(40.9, 0.0);
ctx.lineTo(32.2, 3.8);
ctx.closePath();
ctx.createRadialGradient(39.6, 4.5, 0.0, 39.6, 4.5, 6.1);
ctx.addColorStop(0.23, "rgba(21, 55, 81, 0.80)");
ctx.addColorStop(0.90, "rgba(36, 34, 73, 0.80)");
ctx.fillStyle ();
ctx.fill();

// layer1/icy asteroids/gradients/Path
ctx.beginPath();
ctx.moveTo(92.4, 52.8);
ctx.lineTo(110.8, 52.8);
ctx.lineTo(116.0, 60.9);
ctx.lineTo(112.9, 74.8);
ctx.lineTo(116.0, 80.4);
ctx.lineTo(110.8, 92.2);
ctx.lineTo(96.8, 96.4);
ctx.lineTo(88.6, 86.9);
ctx.lineTo(92.0, 78.4);
ctx.lineTo(88.5, 70.3);
ctx.lineTo(84.3, 63.4);
ctx.lineTo(92.4, 52.8);
ctx.closePath();
ctx.createRadialGradient(100.2, 74.6, 0.0, 100.2, 74.6, 19.0);
ctx.addColorStop(0.23, "rgba(21, 55, 81, 0.80)");
ctx.addColorStop(0.90, "rgba(36, 34, 73, 0.80)");
ctx.fillStyle ();
ctx.fill();

// layer1/icy asteroids/gradients/Path
ctx.beginPath();
ctx.moveTo(22.2, 65.7);
ctx.lineTo(26.1, 72.4);
ctx.lineTo(19.6, 79.5);
ctx.lineTo(4.8, 76.9);
ctx.lineTo(0.0, 65.7);
ctx.lineTo(8.5, 60.4);
ctx.lineTo(22.2, 65.7);
ctx.closePath();
ctx.createRadialGradient(13.1, 70.0, 0.0, 13.1, 70.0, 11.4);
ctx.addColorStop(0.23, "rgba(21, 55, 81, 0.80)");
ctx.addColorStop(0.90, "rgba(36, 34, 73, 0.80)");
ctx.fillStyle ();
ctx.fill();

// layer1/icy asteroids/gradients/Path
ctx.beginPath();
ctx.moveTo(62.4, 74.2);
ctx.lineTo(76.5, 78.2);
ctx.lineTo(82.8, 90.7);
ctx.lineTo(85.4, 99.7);
ctx.lineTo(82.6, 109.0);
ctx.lineTo(69.3, 115.0);
ctx.lineTo(56.8, 111.9);
ctx.lineTo(57.1, 103.4);
ctx.lineTo(61.6, 96.0);
ctx.lineTo(56.7, 92.6);
ctx.lineTo(42.6, 89.9);
ctx.lineTo(42.7, 78.9);
ctx.lineTo(49.0, 74.3);
ctx.lineTo(62.4, 74.2);
ctx.closePath();
ctx.createRadialGradient(64.0, 94.6, 0.0, 64.0, 94.6, 20.9);
ctx.addColorStop(0.23, "rgba(21, 55, 81, 0.80)");
ctx.addColorStop(0.90, "rgba(36, 34, 73, 0.80)");
ctx.fillStyle ();
ctx.fill();

// layer1/icy asteroids/gradients/Path
ctx.beginPath();
ctx.moveTo(27.5, 95.4);
ctx.lineTo(23.5, 102.4);
ctx.lineTo(25.0, 108.3);
ctx.lineTo(32.9, 111.5);
ctx.lineTo(40.1, 106.1);
ctx.lineTo(37.2, 98.6);
ctx.lineTo(27.5, 95.4);
ctx.closePath();
ctx.createRadialGradient(31.8, 103.4, 0.0, 31.8, 103.4, 8.2);
ctx.addColorStop(0.23, "rgba(21, 55, 81, 0.80)");
ctx.addColorStop(0.90, "rgba(36, 34, 73, 0.80)");
ctx.fillStyle ();
ctx.fill();

// layer1/icy asteroids/gradients/Path
ctx.beginPath();
ctx.moveTo(68.8, 66.1);
ctx.lineTo(74.6, 70.5);
ctx.lineTo(79.3, 65.6);
ctx.lineTo(79.3, 57.3);
ctx.lineTo(71.0, 60.6);
ctx.lineTo(68.8, 66.1);
ctx.closePath();
ctx.createRadialGradient(74.0, 63.9, 0.0, 74.0, 63.9, 5.9);
ctx.addColorStop(0.23, "rgba(21, 55, 81, 0.80)");
ctx.addColorStop(0.90, "rgba(36, 34, 73, 0.80)");
ctx.fillStyle ();
ctx.fill();

// layer1/icy asteroids/gradients/Path
ctx.beginPath();
ctx.moveTo(16.6, 40.6);
ctx.lineTo(9.1, 44.9);
ctx.lineTo(6.7, 40.4);
ctx.lineTo(8.3, 35.2);
ctx.lineTo(13.2, 29.5);
ctx.lineTo(16.6, 35.0);
ctx.lineTo(16.6, 40.6);
ctx.closePath();
ctx.createRadialGradient(11.7, 37.2, 0.0, 11.7, 37.2, 6.5);
ctx.addColorStop(0.23, "rgba(21, 55, 81, 0.80)");
ctx.addColorStop(0.90, "rgba(36, 34, 73, 0.80)");
ctx.fillStyle ();
ctx.fill();

// layer1/icy asteroids/gradients/Path
ctx.beginPath();
ctx.moveTo(102.3, 8.3);
ctx.lineTo(93.6, 15.6);
ctx.lineTo(93.6, 23.8);
ctx.lineTo(99.9, 28.9);
ctx.lineTo(112.5, 35.8);
ctx.lineTo(118.1, 32.6);
ctx.lineTo(118.1, 26.9);
ctx.lineTo(113.8, 16.8);
ctx.lineTo(106.8, 9.7);
ctx.lineTo(102.3, 8.3);
ctx.closePath();
ctx.createRadialGradient(105.9, 22.0, 0.0, 105.9, 22.0, 13.1);
ctx.addColorStop(0.23, "rgba(21, 55, 81, 0.80)");
ctx.addColorStop(0.90, "rgba(36, 34, 73, 0.80)");
ctx.fillStyle ();
ctx.fill();

// layer1/icy asteroids/gradients/Path
ctx.beginPath();
ctx.moveTo(62.0, 7.3);
ctx.lineTo(74.8, 0.0);
ctx.lineTo(85.2, 3.7);
ctx.lineTo(87.3, 11.0);
ctx.lineTo(85.2, 17.3);
ctx.lineTo(72.7, 17.3);
ctx.lineTo(68.2, 13.3);
ctx.lineTo(61.9, 12.8);
ctx.lineTo(62.0, 7.3);
ctx.closePath();
ctx.createRadialGradient(74.6, 8.6, 0.0, 74.6, 8.6, 10.9);
ctx.addColorStop(0.23, "rgba(21, 55, 81, 0.80)");
ctx.addColorStop(0.90, "rgba(36, 34, 73, 0.80)");
ctx.fillStyle ();
ctx.fill();

// layer1/icy asteroids/gradients/Path
ctx.beginPath();
ctx.moveTo(68.8, 28.8);
ctx.lineTo(71.9, 44.8);
ctx.lineTo(87.0, 44.8);
ctx.lineTo(95.8, 39.1);
ctx.lineTo(92.1, 28.8);
ctx.lineTo(78.7, 22.5);
ctx.lineTo(68.8, 28.8);
ctx.closePath();
ctx.createRadialGradient(82.3, 33.7, 0.0, 82.3, 33.7, 12.3);
ctx.addColorStop(0.23, "rgba(21, 55, 81, 0.80)");
ctx.addColorStop(0.90, "rgba(36, 34, 73, 0.80)");
ctx.fillStyle ();
ctx.fill();

// layer1/icy asteroids/gradients/Path
ctx.beginPath();
ctx.moveTo(23.7, 44.1);
ctx.lineTo(35.3, 26.3);
ctx.lineTo(48.5, 29.9);
ctx.lineTo(48.5, 39.9);
ctx.lineTo(57.9, 43.9);
ctx.lineTo(57.9, 53.6);
ctx.lineTo(51.7, 59.8);
ctx.lineTo(29.9, 62.5);
ctx.lineTo(23.7, 53.0);
ctx.lineTo(23.7, 44.1);
ctx.closePath();
ctx.createRadialGradient(40.8, 44.4, 0.0, 40.8, 44.4, 17.6);
ctx.addColorStop(0.23, "rgba(21, 55, 81, 0.80)");
ctx.addColorStop(0.90, "rgba(36, 34, 73, 0.80)");
ctx.fillStyle ();
ctx.fill();
ctx.restore();
ctx.restore();
ctx.restore();

/// PASTE ABOVE  THIS LINE  ////////////////////////////////////////////////////////////////////////

  return ctx.data;
}
