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

// layer1/titan/Path
ctx.save();
ctx.beginPath();
ctx.moveTo(65.9, 47.9);
ctx.bezierCurveTo(73.2, 37.7, 67.9, 23.5, 60.7, 14.3);
ctx.lineTo(60.7, 14.3);
ctx.bezierCurveTo(53.4, 5.1, 40.9, -3.3, 29.3, 1.3);
ctx.bezierCurveTo(20.9, 4.6, 5.6, 14.9, 1.3, 24.6);
ctx.bezierCurveTo(-2.6, 33.5, 25.0, 25.4, 32.8, 36.2);
ctx.bezierCurveTo(40.6, 47.0, 26.0, 70.5, 35.8, 69.0);
ctx.bezierCurveTo(45.5, 67.5, 60.7, 55.2, 65.9, 47.9);
ctx.closePath();
ctx.fillStyle ("rgb(215, 35, 53)");
ctx.fill();

// layer1/titan/Path
ctx.beginPath();
ctx.moveTo(38.1, 67.2);
ctx.bezierCurveTo(38.1, 67.2, 58.5, 53.0, 63.2, 46.4);
ctx.bezierCurveTo(68.4, 39.1, 66.9, 31.3, 63.6, 24.2);
ctx.bezierCurveTo(62.6, 21.9, 55.7, 21.0, 54.2, 19.1);
ctx.lineTo(54.2, 19.1);
ctx.bezierCurveTo(52.6, 17.1, 53.3, 10.1, 51.2, 8.4);
ctx.bezierCurveTo(46.3, 4.6, 37.8, 0.6, 29.8, 3.8);
ctx.bezierCurveTo(22.2, 6.8, 3.5, 23.2, 3.5, 23.2);
ctx.lineTo(38.1, 67.2);
ctx.closePath();
ctx.createLinearGradient(55.5, 12.8, 19.6, 48.7);
ctx.addColorStop(0.00, "rgb(129, 21, 24)");
ctx.addColorStop(0.31, "rgba(172, 28, 39, 0.50)");
ctx.addColorStop(1.00, "rgba(215, 35, 53, 0.00)");
ctx.fillStyle ();
ctx.fill();

// layer1/titan/Rectangle
ctx.beginPath();
ctx.moveTo(5.0, 39.2);
ctx.lineTo(17.1, 30.5);
ctx.bezierCurveTo(17.7, 30.1, 17.8, 29.3, 17.4, 28.8);
ctx.lineTo(14.3, 24.5);
ctx.bezierCurveTo(13.9, 23.9, 13.1, 23.8, 12.6, 24.2);
ctx.lineTo(0.5, 32.9);
ctx.bezierCurveTo(-0.0, 33.3, -0.2, 34.0, 0.2, 34.6);
ctx.lineTo(3.3, 38.9);
ctx.bezierCurveTo(3.7, 39.4, 4.5, 39.6, 5.0, 39.2);
ctx.closePath();
ctx.save();
ctx.transform(0.913, -0.298, -0.332, -0.939, -569.9, 1157.7);
ctx.createLinearGradient(965.6, 901.3, 952.4, 888.0);
ctx.addColorStop(0.00, "rgb(129, 21, 24)");
ctx.addColorStop(1.00, "rgba(215, 35, 53, 0.00)");
ctx.fillStyle ();
ctx.fill();

// layer1/titan/Rectangle
ctx.restore();
ctx.beginPath();
ctx.moveTo(28.2, 66.3);
ctx.lineTo(39.5, 57.4);
ctx.bezierCurveTo(40.1, 57.0, 40.2, 56.2, 39.8, 55.7);
ctx.lineTo(36.5, 51.5);
ctx.bezierCurveTo(36.1, 51.0, 35.3, 50.9, 34.8, 51.3);
ctx.lineTo(23.4, 60.2);
ctx.bezierCurveTo(22.8, 60.7, 22.7, 61.4, 23.2, 62.0);
ctx.lineTo(26.4, 66.1);
ctx.bezierCurveTo(26.8, 66.7, 27.6, 66.8, 28.2, 66.3);
ctx.closePath();
ctx.save();
ctx.transform(0.883, -0.324, -0.377, -0.921, -504.7, 1315.5);
ctx.createLinearGradient(1040.6, 1007.8, 1027.3, 994.5);
ctx.addColorStop(0.00, "rgb(129, 21, 24)");
ctx.addColorStop(1.00, "rgba(215, 35, 53, 0.00)");
ctx.fillStyle ();
ctx.fill();

// layer1/titan/Path
ctx.restore();
ctx.beginPath();
ctx.moveTo(34.4, 20.1);
ctx.lineTo(29.1, 18.8);
ctx.bezierCurveTo(27.8, 18.4, 27.2, 16.9, 28.0, 15.8);
ctx.lineTo(31.5, 11.2);
ctx.bezierCurveTo(32.0, 10.5, 32.8, 10.3, 33.6, 10.5);
ctx.lineTo(38.9, 12.3);
ctx.bezierCurveTo(40.1, 12.8, 40.5, 14.3, 39.7, 15.3);
ctx.lineTo(36.3, 19.5);
ctx.bezierCurveTo(35.8, 20.1, 35.1, 20.3, 34.4, 20.1);
ctx.closePath();
ctx.fillStyle ("rgb(158, 28, 35)");
ctx.fill();

// layer1/titan/Path
ctx.beginPath();
ctx.moveTo(56.6, 42.9);
ctx.lineTo(51.6, 45.1);
ctx.bezierCurveTo(50.3, 45.6, 49.0, 44.7, 48.9, 43.4);
ctx.lineTo(48.8, 37.6);
ctx.bezierCurveTo(48.8, 36.8, 49.3, 36.1, 50.1, 35.8);
ctx.lineTo(55.4, 34.0);
ctx.bezierCurveTo(56.6, 33.6, 57.9, 34.5, 57.8, 35.8);
ctx.lineTo(57.7, 41.2);
ctx.bezierCurveTo(57.7, 42.0, 57.3, 42.6, 56.6, 42.9);
ctx.closePath();
ctx.fill();
ctx.restore();
ctx.restore();

/// PASTE ABOVE  THIS LINE  ////////////////////////////////////////////////////////////////////////

  return ctx.data;
}
