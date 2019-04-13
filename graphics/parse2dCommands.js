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
ctx.moveTo(32.0, 3.5);
ctx.lineTo(34.0, 8.3);
ctx.lineTo(40.0, 8.3);
ctx.lineTo(45.5, 3.5);
ctx.lineTo(40.0, 0.0);
ctx.lineTo(32.0, 3.5);
ctx.closePath();
ctx.fillStyle ("rgb(165, 191, 187)");
ctx.fill();

// layer1/icy asteroids/base colour/Path
ctx.beginPath();
ctx.moveTo(91.7, 53.1);
ctx.lineTo(109.7, 53.1);
ctx.lineTo(114.7, 61.1);
ctx.lineTo(111.7, 74.6);
ctx.lineTo(114.7, 80.1);
ctx.lineTo(109.7, 91.6);
ctx.lineTo(96.2, 95.6);
ctx.lineTo(88.2, 86.6);
ctx.lineTo(91.7, 78.1);
ctx.lineTo(88.2, 70.1);
ctx.lineTo(83.9, 63.1);
ctx.lineTo(91.7, 53.1);
ctx.closePath();
ctx.fill();

// layer1/icy asteroids/base colour/Path
ctx.beginPath();
ctx.moveTo(21.0, 65.6);
ctx.lineTo(24.7, 71.8);
ctx.lineTo(18.5, 78.6);
ctx.lineTo(4.5, 76.1);
ctx.lineTo(0.0, 65.6);
ctx.lineTo(8.0, 60.6);
ctx.lineTo(21.0, 65.6);
ctx.closePath();
ctx.fill();

// layer1/icy asteroids/base colour/Path
ctx.beginPath();
ctx.moveTo(61.5, 74.3);
ctx.lineTo(75.5, 78.6);
ctx.lineTo(81.5, 90.6);
ctx.lineTo(83.9, 99.1);
ctx.lineTo(81.5, 108.1);
ctx.lineTo(68.5, 114.1);
ctx.lineTo(56.7, 111.1);
ctx.lineTo(56.7, 103.1);
ctx.lineTo(61.5, 95.6);
ctx.lineTo(56.7, 92.1);
ctx.lineTo(42.5, 89.1);
ctx.lineTo(42.5, 78.6);
ctx.lineTo(48.5, 74.3);
ctx.lineTo(61.5, 74.3);
ctx.closePath();
ctx.fill();

// layer1/icy asteroids/base colour/Path
ctx.beginPath();
ctx.moveTo(27.0, 95.6);
ctx.lineTo(23.3, 102.1);
ctx.lineTo(24.7, 107.6);
ctx.lineTo(32.0, 110.6);
ctx.lineTo(38.8, 105.6);
ctx.lineTo(36.0, 98.6);
ctx.lineTo(27.0, 95.6);
ctx.closePath();
ctx.fill();

// layer1/icy asteroids/base colour/Path
ctx.beginPath();
ctx.moveTo(68.5, 65.6);
ctx.lineTo(73.8, 69.6);
ctx.lineTo(78.0, 65.1);
ctx.lineTo(78.0, 57.6);
ctx.lineTo(70.5, 60.6);
ctx.lineTo(68.5, 65.6);
ctx.closePath();
ctx.fill();

// layer1/icy asteroids/base colour/Path
ctx.beginPath();
ctx.moveTo(15.5, 40.1);
ctx.lineTo(8.5, 44.1);
ctx.lineTo(6.3, 40.1);
ctx.lineTo(7.9, 34.9);
ctx.lineTo(12.3, 29.6);
ctx.lineTo(15.5, 34.8);
ctx.lineTo(15.5, 40.1);
ctx.closePath();
ctx.fill();

// layer1/icy asteroids/base colour/Path
ctx.beginPath();
ctx.moveTo(101.6, 8.3);
ctx.lineTo(93.1, 15.4);
ctx.lineTo(93.1, 23.4);
ctx.lineTo(99.3, 28.2);
ctx.lineTo(111.8, 34.9);
ctx.lineTo(117.0, 31.9);
ctx.lineTo(117.0, 26.4);
ctx.lineTo(112.5, 16.6);
ctx.lineTo(106.0, 9.7);
ctx.lineTo(101.6, 8.3);
ctx.closePath();
ctx.fill();

// layer1/icy asteroids/base colour/Path
ctx.beginPath();
ctx.moveTo(23.3, 43.7);
ctx.lineTo(34.7, 26.4);
ctx.lineTo(47.3, 29.7);
ctx.lineTo(47.3, 39.7);
ctx.lineTo(56.7, 43.7);
ctx.lineTo(56.7, 53.1);
ctx.lineTo(50.7, 59.1);
ctx.lineTo(29.3, 61.7);
ctx.lineTo(23.3, 52.4);
ctx.lineTo(23.3, 43.7);
ctx.closePath();
ctx.fill();

// layer1/icy asteroids/base colour/Path
ctx.beginPath();
ctx.moveTo(61.5, 7.2);
ctx.lineTo(74.0, 0.0);
ctx.lineTo(83.9, 3.6);
ctx.lineTo(86.0, 10.6);
ctx.lineTo(83.9, 16.6);
ctx.lineTo(72.0, 16.6);
ctx.lineTo(67.5, 12.6);
ctx.lineTo(61.5, 12.1);
ctx.lineTo(61.5, 7.2);
ctx.closePath();
ctx.fill();

// layer1/icy asteroids/base colour/Path
ctx.beginPath();
ctx.moveTo(68.5, 28.6);
ctx.lineTo(71.5, 44.1);
ctx.lineTo(86.0, 44.1);
ctx.lineTo(94.5, 38.6);
ctx.lineTo(91.0, 28.6);
ctx.lineTo(78.0, 22.6);
ctx.lineTo(68.5, 28.6);
ctx.closePath();
ctx.fill();

// layer1/icy asteroids/gradients
ctx.restore();

// layer1/icy asteroids/gradients/Path
ctx.save();
ctx.beginPath();
ctx.moveTo(32.0, 3.5);
ctx.lineTo(34.0, 8.3);
ctx.lineTo(40.0, 8.3);
ctx.lineTo(45.5, 3.5);
ctx.lineTo(40.0, 0.0);
ctx.lineTo(32.0, 3.5);
ctx.closePath();
ctx.createRadialGradient(38.8, 4.1, 0.0, 38.8, 4.1, 5.6);
ctx.addColorStop(0.23, "rgba(21, 55, 81, 0.80)");
ctx.addColorStop(0.90, "rgba(36, 34, 73, 0.80)");
ctx.fillStyle ();
ctx.fill();

// layer1/icy asteroids/gradients/Path
ctx.beginPath();
ctx.moveTo(91.7, 53.1);
ctx.lineTo(109.7, 53.1);
ctx.lineTo(114.7, 61.1);
ctx.lineTo(111.7, 74.6);
ctx.lineTo(114.7, 80.1);
ctx.lineTo(109.7, 91.6);
ctx.lineTo(96.2, 95.6);
ctx.lineTo(88.2, 86.6);
ctx.lineTo(91.7, 78.1);
ctx.lineTo(88.2, 70.1);
ctx.lineTo(83.9, 63.1);
ctx.lineTo(91.7, 53.1);
ctx.closePath();
ctx.createRadialGradient(99.3, 74.3, 0.0, 99.3, 74.3, 18.5);
ctx.addColorStop(0.23, "rgba(21, 55, 81, 0.80)");
ctx.addColorStop(0.90, "rgba(36, 34, 73, 0.80)");
ctx.fillStyle ();
ctx.fill();

// layer1/icy asteroids/gradients/Path
ctx.beginPath();
ctx.moveTo(21.0, 65.6);
ctx.lineTo(24.7, 71.8);
ctx.lineTo(18.5, 78.6);
ctx.lineTo(4.5, 76.1);
ctx.lineTo(0.0, 65.6);
ctx.lineTo(8.0, 60.6);
ctx.lineTo(21.0, 65.6);
ctx.closePath();
ctx.createRadialGradient(12.3, 69.6, 0.0, 12.3, 69.6, 10.8);
ctx.addColorStop(0.23, "rgba(21, 55, 81, 0.80)");
ctx.addColorStop(0.90, "rgba(36, 34, 73, 0.80)");
ctx.fillStyle ();
ctx.fill();

// layer1/icy asteroids/gradients/Path
ctx.beginPath();
ctx.moveTo(61.5, 74.3);
ctx.lineTo(75.5, 78.6);
ctx.lineTo(81.5, 90.6);
ctx.lineTo(83.9, 99.1);
ctx.lineTo(81.5, 108.1);
ctx.lineTo(68.5, 114.1);
ctx.lineTo(56.7, 111.1);
ctx.lineTo(56.7, 103.1);
ctx.lineTo(61.5, 95.6);
ctx.lineTo(56.7, 92.1);
ctx.lineTo(42.5, 89.1);
ctx.lineTo(42.5, 78.6);
ctx.lineTo(48.5, 74.3);
ctx.lineTo(61.5, 74.3);
ctx.closePath();
ctx.createRadialGradient(63.2, 94.2, 0.0, 63.2, 94.2, 20.3);
ctx.addColorStop(0.23, "rgba(21, 55, 81, 0.80)");
ctx.addColorStop(0.90, "rgba(36, 34, 73, 0.80)");
ctx.fillStyle ();
ctx.fill();

// layer1/icy asteroids/gradients/Path
ctx.beginPath();
ctx.moveTo(27.0, 95.6);
ctx.lineTo(23.3, 102.1);
ctx.lineTo(24.7, 107.6);
ctx.lineTo(32.0, 110.6);
ctx.lineTo(38.8, 105.6);
ctx.lineTo(36.0, 98.6);
ctx.lineTo(27.0, 95.6);
ctx.closePath();
ctx.createRadialGradient(31.0, 103.1, 0.0, 31.0, 103.1, 7.6);
ctx.addColorStop(0.23, "rgba(21, 55, 81, 0.80)");
ctx.addColorStop(0.90, "rgba(36, 34, 73, 0.80)");
ctx.fillStyle ();
ctx.fill();

// layer1/icy asteroids/gradients/Path
ctx.beginPath();
ctx.moveTo(68.5, 65.6);
ctx.lineTo(73.8, 69.6);
ctx.lineTo(78.0, 65.1);
ctx.lineTo(78.0, 57.6);
ctx.lineTo(70.5, 60.6);
ctx.lineTo(68.5, 65.6);
ctx.closePath();
ctx.createRadialGradient(73.3, 63.6, 0.0, 73.3, 63.6, 5.4);
ctx.addColorStop(0.23, "rgba(21, 55, 81, 0.80)");
ctx.addColorStop(0.90, "rgba(36, 34, 73, 0.80)");
ctx.fillStyle ();
ctx.fill();

// layer1/icy asteroids/gradients/Path
ctx.beginPath();
ctx.moveTo(15.5, 40.1);
ctx.lineTo(8.5, 44.1);
ctx.lineTo(6.3, 40.1);
ctx.lineTo(7.9, 34.9);
ctx.lineTo(12.3, 29.6);
ctx.lineTo(15.5, 34.8);
ctx.lineTo(15.5, 40.1);
ctx.closePath();
ctx.createRadialGradient(10.9, 36.8, 0.0, 10.9, 36.8, 6.1);
ctx.addColorStop(0.23, "rgba(21, 55, 81, 0.80)");
ctx.addColorStop(0.90, "rgba(36, 34, 73, 0.80)");
ctx.fillStyle ();
ctx.fill();

// layer1/icy asteroids/gradients/Path
ctx.beginPath();
ctx.moveTo(101.6, 8.3);
ctx.lineTo(93.1, 15.4);
ctx.lineTo(93.1, 23.4);
ctx.lineTo(99.3, 28.2);
ctx.lineTo(111.8, 34.9);
ctx.lineTo(117.0, 31.9);
ctx.lineTo(117.0, 26.4);
ctx.lineTo(112.5, 16.6);
ctx.lineTo(106.0, 9.7);
ctx.lineTo(101.6, 8.3);
ctx.closePath();
ctx.createRadialGradient(105.1, 21.6, 0.0, 105.1, 21.6, 12.7);
ctx.addColorStop(0.23, "rgba(21, 55, 81, 0.80)");
ctx.addColorStop(0.90, "rgba(36, 34, 73, 0.80)");
ctx.fillStyle ();
ctx.fill();

// layer1/icy asteroids/gradients/Path
ctx.beginPath();
ctx.moveTo(61.5, 7.2);
ctx.lineTo(74.0, 0.0);
ctx.lineTo(83.9, 3.6);
ctx.lineTo(86.0, 10.6);
ctx.lineTo(83.9, 16.6);
ctx.lineTo(72.0, 16.6);
ctx.lineTo(67.5, 12.6);
ctx.lineTo(61.5, 12.1);
ctx.lineTo(61.5, 7.2);
ctx.closePath();
ctx.createRadialGradient(73.8, 8.3, 0.0, 73.8, 8.3, 10.5);
ctx.addColorStop(0.23, "rgba(21, 55, 81, 0.80)");
ctx.addColorStop(0.90, "rgba(36, 34, 73, 0.80)");
ctx.fillStyle ();
ctx.fill();

// layer1/icy asteroids/gradients/Path
ctx.beginPath();
ctx.moveTo(68.5, 28.6);
ctx.lineTo(71.5, 44.1);
ctx.lineTo(86.0, 44.1);
ctx.lineTo(94.5, 38.6);
ctx.lineTo(91.0, 28.6);
ctx.lineTo(78.0, 22.6);
ctx.lineTo(68.5, 28.6);
ctx.closePath();
ctx.createRadialGradient(81.5, 33.3, 0.0, 81.5, 33.3, 11.9);
ctx.addColorStop(0.23, "rgba(21, 55, 81, 0.80)");
ctx.addColorStop(0.90, "rgba(36, 34, 73, 0.80)");
ctx.fillStyle ();
ctx.fill();

// layer1/icy asteroids/gradients/Path
ctx.beginPath();
ctx.moveTo(23.3, 43.7);
ctx.lineTo(34.7, 26.4);
ctx.lineTo(47.3, 29.7);
ctx.lineTo(47.3, 39.7);
ctx.lineTo(56.7, 43.7);
ctx.lineTo(56.7, 53.1);
ctx.lineTo(50.7, 59.1);
ctx.lineTo(29.3, 61.7);
ctx.lineTo(23.3, 52.4);
ctx.lineTo(23.3, 43.7);
ctx.closePath();
ctx.createRadialGradient(40.0, 44.1, 0.0, 40.0, 44.1, 17.2);
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
