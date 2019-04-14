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

// layer1/Group/Path
ctx.save();
ctx.beginPath();
ctx.moveTo(71.4, 106.2);
ctx.lineTo(45.6, 106.2);
ctx.bezierCurveTo(27.7, 106.7, 24.8, 100.4, 19.5, 91.0);
ctx.lineTo(6.6, 68.6);
ctx.bezierCurveTo(-2.5, 55.4, 1.2, 47.8, 6.6, 38.4);
ctx.lineTo(19.6, 16.1);
ctx.bezierCurveTo(27.6, 1.2, 35.0, 1.0, 45.8, 1.0);
ctx.lineTo(71.6, 1.0);
ctx.bezierCurveTo(88.6, 0.5, 92.4, 6.8, 97.8, 16.2);
ctx.lineTo(110.6, 38.6);
ctx.bezierCurveTo(119.3, 51.4, 116.0, 59.5, 110.6, 68.8);
ctx.lineTo(97.6, 91.2);
ctx.bezierCurveTo(91.7, 105.1, 82.2, 106.2, 71.4, 106.2);
ctx.closePath();
ctx.save();
ctx.transform(1.000, -0.010, -0.010, -1.000, 20.7, 51.9);
ctx.createRadialGradient(37.8, -2.1, 0.0, 37.8, -2.1, 55.1);
ctx.addColorStop(0.57, "rgba(159, 215, 205, 0.00)");
ctx.addColorStop(0.85, "rgba(159, 215, 205, 0.33)");
ctx.addColorStop(1.00, "rgba(159, 215, 205, 0.65)");
ctx.fillStyle ();
ctx.fill();

// layer1/Group/Compound Path
ctx.restore();
ctx.beginPath();

// layer1/Group/Compound Path/Path
ctx.moveTo(77.6, 107.2);
ctx.bezierCurveTo(77.5, 107.2, 77.4, 107.2, 77.3, 107.2);
ctx.lineTo(77.3, 107.2);
ctx.lineTo(39.7, 107.2);
ctx.bezierCurveTo(32.2, 107.2, 25.3, 103.1, 21.5, 96.6);
ctx.lineTo(2.8, 64.1);
ctx.bezierCurveTo(-0.9, 57.6, -0.9, 49.5, 2.8, 43.0);
ctx.lineTo(21.7, 10.5);
ctx.bezierCurveTo(25.4, 4.1, 32.3, 0.1, 39.7, 0.0);
ctx.bezierCurveTo(39.7, 0.0, 39.8, -0.0, 39.9, 0.0);
ctx.lineTo(77.5, 0.1);
ctx.bezierCurveTo(85.0, 0.1, 92.0, 4.1, 95.7, 10.6);
ctx.lineTo(114.4, 43.2);
ctx.bezierCurveTo(118.2, 49.7, 118.2, 57.7, 114.4, 64.2);
ctx.lineTo(95.6, 96.7);
ctx.bezierCurveTo(91.8, 103.2, 85.0, 107.2, 77.6, 107.2);
ctx.closePath();

// layer1/Group/Compound Path/Path
ctx.moveTo(77.3, 105.2);
ctx.bezierCurveTo(77.4, 105.2, 77.5, 105.2, 77.5, 105.2);
ctx.bezierCurveTo(84.2, 105.2, 90.5, 101.5, 93.8, 95.7);
ctx.lineTo(112.7, 63.2);
ctx.bezierCurveTo(116.1, 57.4, 116.1, 50.1, 112.7, 44.2);
ctx.lineTo(94.0, 11.6);
ctx.bezierCurveTo(90.6, 5.7, 84.3, 2.1, 77.5, 2.1);
ctx.lineTo(39.9, 2.0);
ctx.bezierCurveTo(33.1, 2.0, 26.8, 5.6, 23.4, 11.5);
ctx.lineTo(4.6, 44.0);
ctx.bezierCurveTo(1.1, 49.9, 1.1, 57.2, 4.5, 63.1);
ctx.lineTo(23.3, 95.6);
ctx.bezierCurveTo(26.6, 101.5, 33.0, 105.2, 39.7, 105.2);
ctx.lineTo(77.3, 105.2);
ctx.lineTo(77.3, 105.2);
ctx.closePath();
ctx.fillStyle ("rgb(159, 215, 205)");
ctx.fill();
ctx.restore();
ctx.restore();

/// PASTE ABOVE  THIS LINE  ////////////////////////////////////////////////////////////////////////

  return ctx.data;
}
