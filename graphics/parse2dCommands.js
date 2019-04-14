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

// layer1/eye/Compound Path
ctx.save();
ctx.beginPath();

// layer1/eye/Compound Path/Path
ctx.moveTo(73.6, 23.4);
ctx.bezierCurveTo(73.4, 24.1, 73.0, 24.5, 72.5, 25.0);
ctx.bezierCurveTo(66.1, 32.3, 58.8, 38.6, 49.6, 42.4);
ctx.bezierCurveTo(38.8, 47.0, 28.5, 45.5, 18.6, 39.8);
ctx.bezierCurveTo(12.0, 36.0, 6.3, 31.0, 1.3, 25.3);
ctx.bezierCurveTo(0.8, 24.8, 0.3, 24.2, 0.1, 23.5);
ctx.bezierCurveTo(-0.1, 23.0, -0.0, 22.3, 0.1, 21.8);
ctx.bezierCurveTo(0.3, 21.2, 0.6, 20.7, 1.0, 20.2);
ctx.bezierCurveTo(7.4, 12.9, 14.6, 6.7, 23.7, 2.9);
ctx.bezierCurveTo(27.0, 1.6, 30.4, 0.6, 33.9, 0.2);
ctx.bezierCurveTo(35.7, -0.1, 37.5, -0.0, 39.3, 0.2);
ctx.bezierCurveTo(40.2, 0.2, 41.2, 0.3, 42.1, 0.5);
ctx.bezierCurveTo(51.0, 2.2, 58.4, 6.7, 65.0, 12.7);
ctx.bezierCurveTo(68.1, 15.4, 71.5, 17.9, 73.6, 21.8);
ctx.bezierCurveTo(73.8, 22.2, 73.7, 23.0, 73.6, 23.4);
ctx.closePath();

// layer1/eye/Compound Path/Path
ctx.moveTo(36.3, 6.0);
ctx.bezierCurveTo(35.7, 6.1, 34.4, 6.1, 33.2, 6.3);
ctx.bezierCurveTo(22.8, 8.2, 14.9, 14.4, 7.7, 21.7);
ctx.bezierCurveTo(7.5, 22.0, 7.5, 23.1, 7.8, 23.5);
ctx.bezierCurveTo(12.7, 28.6, 18.1, 33.0, 24.5, 36.1);
ctx.bezierCurveTo(30.6, 39.0, 37.0, 40.1, 43.7, 38.1);
ctx.bezierCurveTo(52.6, 35.5, 59.6, 29.9, 66.0, 23.4);
ctx.bezierCurveTo(66.8, 22.6, 66.2, 22.0, 65.6, 21.5);
ctx.bezierCurveTo(62.0, 18.4, 58.5, 15.0, 54.6, 12.2);
ctx.bezierCurveTo(49.4, 8.5, 43.5, 6.1, 36.3, 6.0);
ctx.closePath();
ctx.fillStyle ("rgb(159, 215, 205)");
ctx.fill();

// layer1/eye/Compound Path
ctx.beginPath();

// layer1/eye/Compound Path/Path
ctx.moveTo(36.8, 35.0);
ctx.bezierCurveTo(29.9, 35.0, 24.4, 29.4, 24.4, 22.5);
ctx.bezierCurveTo(24.4, 15.7, 30.0, 10.2, 36.8, 10.1);
ctx.bezierCurveTo(43.6, 10.1, 49.3, 15.7, 49.3, 22.6);
ctx.bezierCurveTo(49.3, 29.5, 43.7, 35.0, 36.8, 35.0);
ctx.closePath();

// layer1/eye/Compound Path/Path
ctx.moveTo(36.9, 18.8);
ctx.bezierCurveTo(36.8, 20.9, 38.5, 22.5, 40.6, 22.5);
ctx.bezierCurveTo(42.6, 22.5, 44.3, 20.8, 44.3, 18.8);
ctx.bezierCurveTo(44.3, 16.9, 42.5, 15.1, 40.6, 15.1);
ctx.bezierCurveTo(38.6, 15.0, 36.9, 16.8, 36.9, 18.8);
ctx.closePath();
ctx.fill();
ctx.restore();
ctx.restore();

/// PASTE ABOVE  THIS LINE  ////////////////////////////////////////////////////////////////////////

  return ctx.data;
}
