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

// layer1/Group/Compound Path
ctx.save();
ctx.beginPath();

// layer1/Group/Compound Path/Path
ctx.moveTo(116.0, 162.2);
ctx.bezierCurveTo(115.9, 162.2, 115.8, 162.2, 115.7, 162.2);
ctx.lineTo(115.7, 162.2);
ctx.lineTo(59.0, 161.5);
ctx.bezierCurveTo(47.7, 161.4, 37.3, 155.2, 31.8, 145.3);
ctx.lineTo(4.0, 95.9);
ctx.bezierCurveTo(-1.5, 86.1, -1.3, 73.9, 4.4, 64.2);
ctx.lineTo(33.3, 15.5);
ctx.bezierCurveTo(39.0, 5.9, 49.5, 0.0, 60.6, 0.0);
ctx.bezierCurveTo(60.7, 0.0, 60.9, 0.0, 61.0, 0.0);
ctx.lineTo(117.6, 0.7);
ctx.bezierCurveTo(128.9, 0.8, 139.4, 7.0, 144.9, 16.9);
ctx.lineTo(172.6, 66.2);
ctx.bezierCurveTo(178.1, 76.1, 178.0, 88.2, 172.2, 98.0);
ctx.lineTo(143.3, 146.7);
ctx.bezierCurveTo(137.6, 156.3, 127.2, 162.2, 116.0, 162.2);
ctx.closePath();

// layer1/Group/Compound Path/Path
ctx.moveTo(115.7, 159.2);
ctx.bezierCurveTo(115.8, 159.2, 115.9, 159.2, 116.0, 159.2);
ctx.bezierCurveTo(126.1, 159.2, 135.6, 153.8, 140.7, 145.1);
ctx.lineTo(169.6, 96.4);
ctx.bezierCurveTo(174.9, 87.6, 175.0, 76.6, 170.0, 67.7);
ctx.lineTo(142.3, 18.3);
ctx.bezierCurveTo(137.3, 9.4, 127.8, 3.8, 117.6, 3.7);
ctx.lineTo(61.0, 3.0);
ctx.bezierCurveTo(50.7, 2.8, 41.1, 8.3, 35.9, 17.1);
ctx.lineTo(7.0, 65.8);
ctx.bezierCurveTo(1.8, 74.5, 1.7, 85.6, 6.7, 94.5);
ctx.lineTo(34.4, 143.8);
ctx.bezierCurveTo(39.4, 152.8, 48.9, 158.4, 59.1, 158.5);
ctx.lineTo(115.7, 159.2);
ctx.closePath();
ctx.fillStyle ("rgb(215, 35, 53)");
ctx.fill();
ctx.restore();
ctx.restore();

/// PASTE ABOVE  THIS LINE  ////////////////////////////////////////////////////////////////////////

  return ctx.data;
}
