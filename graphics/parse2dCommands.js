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

/*
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

// layer1/missile ship/Path
ctx.save();
ctx.beginPath();
ctx.moveTo(48.5, 33.6);
ctx.lineTo(28.3, 29.0);
ctx.lineTo(28.3, 12.3);
ctx.lineTo(47.9, 7.8);
ctx.bezierCurveTo(49.0, 7.5, 49.0, 6.0, 47.9, 5.7);
ctx.lineTo(26.2, 0.4);
ctx.bezierCurveTo(25.7, 0.2, 25.1, 0.0, 24.5, 0.0);
ctx.lineTo(15.0, 0.0);
ctx.bezierCurveTo(13.0, 0.0, 11.3, 1.7, 11.3, 3.8);
ctx.lineTo(11.3, 37.5);
ctx.bezierCurveTo(11.3, 39.6, 13.0, 41.3, 15.0, 41.3);
ctx.lineTo(24.5, 41.3);
ctx.bezierCurveTo(25.1, 41.3, 25.7, 41.1, 26.2, 40.8);
ctx.lineTo(48.5, 35.4);
ctx.bezierCurveTo(49.5, 35.2, 49.4, 33.8, 48.5, 33.6);
ctx.closePath();
ctx.fillStyle ("rgb(215, 35, 53)");
ctx.fill();

// layer1/missile ship/Rectangle
ctx.beginPath();
ctx.moveTo(1.3, 15.6);
ctx.lineTo(12.3, 15.6);
ctx.bezierCurveTo(13.0, 15.6, 13.5, 15.1, 13.5, 14.4);
ctx.lineTo(13.5, 11.1);
ctx.bezierCurveTo(13.5, 10.4, 13.0, 9.8, 12.3, 9.8);
ctx.lineTo(1.2, 9.8);
ctx.bezierCurveTo(0.6, 9.8, -0.0, 10.4, 0.0, 11.1);
ctx.lineTo(0.0, 14.4);
ctx.bezierCurveTo(0.0, 15.1, 0.6, 15.6, 1.3, 15.6);
ctx.closePath();
ctx.save();
ctx.transform(0.957, 0.290, 0.290, -0.957, 311.5, -726.1);
ctx.createLinearGradient(-72.5, -790.6, -82.3, -800.3);
ctx.addColorStop(0.00, "rgb(130, 6, 20)");
ctx.addColorStop(1.00, "rgba(215, 35, 53, 0.00)");
ctx.fillStyle ();
ctx.fill();

// layer1/missile ship/Path
ctx.restore();
ctx.beginPath();
ctx.moveTo(28.5, 9.9);
ctx.lineTo(40.5, 7.2);
ctx.bezierCurveTo(41.1, 7.1, 41.1, 6.2, 40.5, 6.1);
ctx.lineTo(28.3, 3.1);
ctx.bezierCurveTo(27.9, 3.0, 27.6, 3.3, 27.6, 3.7);
ctx.lineTo(27.8, 9.4);
ctx.bezierCurveTo(27.8, 9.8, 28.2, 10.0, 28.5, 9.9);
ctx.closePath();
ctx.fillStyle ( "rgb(157, 19, 33)");
ctx.fill();

// layer1/missile ship/Path
ctx.beginPath();
ctx.moveTo(28.5, 31.3);
ctx.lineTo(40.5, 34.0);
ctx.bezierCurveTo(41.1, 34.2, 41.1, 35.0, 40.5, 35.2);
ctx.lineTo(28.3, 38.1);
ctx.bezierCurveTo(27.9, 38.2, 27.6, 37.9, 27.6, 37.6);
ctx.lineTo(27.8, 31.9);
ctx.bezierCurveTo(27.8, 31.5, 28.2, 31.2, 28.5, 31.3);
ctx.closePath();
ctx.fill();

// layer1/missile ship/Rectangle
ctx.beginPath();
ctx.moveTo(1.3, 31.4);
ctx.lineTo(12.3, 31.4);
ctx.bezierCurveTo(13.0, 31.4, 13.5, 30.8, 13.5, 30.1);
ctx.lineTo(13.5, 26.8);
ctx.bezierCurveTo(13.5, 26.1, 13.0, 25.6, 12.3, 25.6);
ctx.lineTo(1.2, 25.6);
ctx.bezierCurveTo(0.6, 25.6, -0.0, 26.1, 0.0, 26.8);
ctx.lineTo(0.0, 30.1);
ctx.bezierCurveTo(0.0, 30.8, 0.6, 31.4, 1.3, 31.4);
ctx.closePath();
ctx.save();
ctx.transform(0.957, 0.290, 0.290, -0.957, 311.5, -726.1);
ctx.createLinearGradient(-68.0, -805.6, -77.7, -815.4);
ctx.addColorStop(0.00, "rgb(130, 6, 20)");
ctx.addColorStop(1.00, "rgba(215, 35, 53, 0.00)");
ctx.fillStyle ();
ctx.fill();
ctx.restore();
ctx.restore();
ctx.restore();


/// PASTE ABOVE  THIS LINE  ////////////////////////////////////////////////////////////////////////

  return ctx.data;
}
