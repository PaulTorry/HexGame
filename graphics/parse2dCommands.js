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
ctx.beginPath();

// layer1/solar sail/Path
ctx.moveTo(50.8, 1.7);
ctx.bezierCurveTo(50.8, 1.7, 38.3, 9.8, 26.1, 9.8);
ctx.bezierCurveTo(13.7, 9.8, 1.4, 1.7, 1.4, 1.7);
ctx.bezierCurveTo(1.4, 1.7, 8.3, 14.6, 8.3, 26.3);
ctx.bezierCurveTo(8.3, 39.2, 1.4, 51.0, 1.4, 51.0);
ctx.bezierCurveTo(1.4, 51.0, 14.8, 44.0, 26.1, 43.8);
ctx.bezierCurveTo(36.9, 43.6, 50.8, 51.0, 50.8, 51.0);
ctx.bezierCurveTo(50.8, 51.0, 42.3, 37.2, 42.3, 27.0);
ctx.bezierCurveTo(42.3, 15.2, 50.8, 1.7, 50.8, 1.7);
ctx.closePath();

// layer1/solar sail/Path
ctx.moveTo(30.5, 23.5);
ctx.bezierCurveTo(31.0, 24.3, 31.4, 25.3, 31.4, 26.3);
ctx.bezierCurveTo(31.4, 27.4, 31.1, 28.3, 30.6, 29.1);
ctx.bezierCurveTo(30.9, 29.5, 32.3, 31.2, 39.5, 39.6);
ctx.lineTo(29.0, 30.7);
ctx.bezierCurveTo(28.2, 31.3, 27.2, 31.6, 26.1, 31.6);
ctx.bezierCurveTo(25.2, 31.6, 24.3, 31.4, 23.6, 31.0);
ctx.bezierCurveTo(23.3, 31.3, 21.9, 32.6, 13.5, 40.5);
ctx.lineTo(21.9, 29.6);
ctx.bezierCurveTo(21.2, 28.7, 20.8, 27.6, 20.8, 26.3);
ctx.bezierCurveTo(20.8, 25.4, 21.0, 24.4, 21.5, 23.6);
ctx.bezierCurveTo(21.2, 23.3, 19.7, 21.6, 12.2, 13.4);
ctx.lineTo(23.0, 22.0);
ctx.bezierCurveTo(23.9, 21.4, 24.9, 21.1, 26.1, 21.1);
ctx.bezierCurveTo(27.1, 21.1, 28.1, 21.4, 28.9, 21.9);
ctx.lineTo(28.9, 21.9);
ctx.lineTo(40.0, 13.4);
ctx.lineTo(30.5, 23.5);
ctx.closePath();
ctx.createRadialGradient(26.1, 26.3, 0.0, 26.1, 26.3, 24.7);
ctx.addColorStop(0.00, "rgb(254, 240, 173)");
ctx.addColorStop(0.37, "rgb(253, 215, 96)");
ctx.addColorStop(0.51, "rgb(252, 189, 20)");
ctx.addColorStop(0.75, "rgb(197, 138, 27)");
ctx.addColorStop(0.99, "rgb(141, 87, 35)");
ctx.fillStyle ();
ctx.fill();
ctx.strokeStyle ("rgb(215, 35, 53)");
ctx.stroke();
ctx.restore();
/// PASTE ABOVE  THIS LINE  ////////////////////////////////////////////////////////////////////////

  return ctx.data;
}
