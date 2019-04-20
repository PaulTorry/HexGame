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

// layer1/tech tree/Path
ctx.save();
ctx.beginPath();
ctx.moveTo(671.6, 281.3);
ctx.lineTo(517.5, 15.1);
ctx.bezierCurveTo(512.1, 5.7, 502.1, -0.0, 491.3, 0.0);
ctx.lineTo(183.7, 0.3);
ctx.bezierCurveTo(172.9, 0.3, 162.9, 6.1, 157.6, 15.5);
ctx.lineTo(4.0, 282.0);
ctx.bezierCurveTo(-1.4, 291.4, -1.3, 302.9, 4.1, 312.3);
ctx.lineTo(158.2, 578.5);
ctx.bezierCurveTo(163.6, 587.8, 173.5, 593.6, 184.3, 593.6);
ctx.lineTo(492.0, 593.2);
ctx.bezierCurveTo(502.8, 593.2, 512.7, 587.5, 518.1, 578.1);
ctx.lineTo(671.6, 311.5);
ctx.bezierCurveTo(677.0, 302.2, 677.0, 290.7, 671.6, 281.3);
ctx.closePath();
ctx.createLinearGradient(106.3, 65.3, 569.4, 528.3);
ctx.addColorStop(0.01, "rgb(0, 79, 78)");
ctx.addColorStop(0.22, "rgb(12, 61, 82)");
ctx.addColorStop(0.41, "rgb(25, 43, 85)");
ctx.addColorStop(0.78, "rgb(35, 27, 81)");
ctx.fillStyle ();
ctx.fill();

// layer1/tech tree/Group

// layer1/tech tree/Group/Compound Path
ctx.save();
ctx.beginPath();

// layer1/tech tree/Group/Compound Path/Path
ctx.moveTo(198.1, 399.7);
ctx.lineTo(198.1, 325.6);
ctx.lineTo(177.1, 325.6);
ctx.lineTo(169.7, 307.1);
ctx.lineTo(246.3, 307.1);
ctx.lineTo(238.9, 325.6);
ctx.lineTo(217.9, 325.6);
ctx.lineTo(217.9, 399.7);
ctx.lineTo(198.1, 399.7);
ctx.closePath();
ctx.fillStyle ("rgb(208, 210, 211)");
ctx.fill();

// layer1/tech tree/Group/Compound Path
ctx.beginPath();

// layer1/tech tree/Group/Compound Path/Path
ctx.moveTo(256.1, 307.1);
ctx.lineTo(330.2, 307.1);
ctx.lineTo(320.3, 325.6);
ctx.lineTo(275.9, 325.6);
ctx.lineTo(275.9, 344.2);
ctx.lineTo(317.9, 344.2);
ctx.lineTo(317.9, 362.7);
ctx.lineTo(275.9, 362.7);
ctx.lineTo(275.9, 381.2);
ctx.lineTo(322.8, 381.2);
ctx.lineTo(330.2, 399.7);
ctx.lineTo(256.1, 399.7);
ctx.lineTo(256.1, 307.1);
ctx.closePath();
ctx.fill();

// layer1/tech tree/Group/Compound Path
ctx.beginPath();

// layer1/tech tree/Group/Compound Path/Path
ctx.moveTo(405.5, 307.1);
ctx.lineTo(398.1, 325.6);
ctx.lineTo(359.8, 325.6);
ctx.lineTo(359.8, 370.1);
ctx.lineTo(370.9, 381.2);
ctx.lineTo(400.6, 381.2);
ctx.lineTo(408.0, 399.7);
ctx.lineTo(359.8, 399.7);
ctx.lineTo(340.1, 379.9);
ctx.lineTo(340.1, 307.1);
ctx.lineTo(405.5, 307.1);
ctx.closePath();
ctx.fill();

// layer1/tech tree/Group/Compound Path
ctx.beginPath();

// layer1/tech tree/Group/Compound Path/Path
ctx.moveTo(423.4, 399.7);
ctx.lineTo(423.4, 307.1);
ctx.lineTo(443.1, 307.1);
ctx.lineTo(443.1, 343.5);
ctx.lineTo(477.7, 343.5);
ctx.lineTo(477.7, 307.1);
ctx.lineTo(497.4, 307.1);
ctx.lineTo(497.4, 399.7);
ctx.lineTo(477.7, 399.7);
ctx.lineTo(477.7, 364.5);
ctx.lineTo(443.1, 364.5);
ctx.lineTo(443.1, 399.7);
ctx.lineTo(423.4, 399.7);
ctx.closePath();
ctx.fill();

// layer1/tech tree/Group/Compound Path
ctx.beginPath();

// layer1/tech tree/Group/Compound Path/Path
ctx.moveTo(200.9, 547.8);
ctx.lineTo(200.9, 473.8);
ctx.lineTo(179.9, 473.8);
ctx.lineTo(172.5, 455.2);
ctx.lineTo(249.0, 455.2);
ctx.lineTo(241.6, 473.8);
ctx.lineTo(220.6, 473.8);
ctx.lineTo(220.6, 547.8);
ctx.lineTo(200.9, 547.8);
ctx.closePath();
ctx.fill();

// layer1/tech tree/Group/Compound Path
ctx.beginPath();

// layer1/tech tree/Group/Compound Path/Path
ctx.moveTo(258.9, 455.2);
ctx.lineTo(310.8, 455.2);
ctx.lineTo(330.5, 475.0);
ctx.lineTo(330.5, 517.0);
ctx.lineTo(310.8, 517.0);
ctx.lineTo(335.4, 547.8);
ctx.lineTo(308.3, 547.8);
ctx.lineTo(283.6, 517.0);
ctx.lineTo(278.7, 517.0);
ctx.lineTo(278.7, 547.8);
ctx.lineTo(258.9, 547.8);
ctx.lineTo(258.9, 455.2);
ctx.closePath();

// layer1/tech tree/Group/Compound Path/Path
ctx.moveTo(278.7, 498.4);
ctx.lineTo(310.8, 498.4);
ctx.lineTo(310.8, 483.6);
ctx.lineTo(300.9, 473.8);
ctx.lineTo(278.7, 473.8);
ctx.lineTo(278.7, 498.4);
ctx.closePath();
ctx.fill();

// layer1/tech tree/Group/Compound Path
ctx.beginPath();

// layer1/tech tree/Group/Compound Path/Path
ctx.moveTo(345.3, 455.2);
ctx.lineTo(419.4, 455.2);
ctx.lineTo(409.5, 473.8);
ctx.lineTo(365.1, 473.8);
ctx.lineTo(365.1, 492.3);
ctx.lineTo(407.0, 492.3);
ctx.lineTo(407.0, 510.8);
ctx.lineTo(365.1, 510.8);
ctx.lineTo(365.1, 529.3);
ctx.lineTo(412.0, 529.3);
ctx.lineTo(419.4, 547.8);
ctx.lineTo(345.3, 547.8);
ctx.lineTo(345.3, 455.2);
ctx.closePath();
ctx.fill();

// layer1/tech tree/Group/Compound Path
ctx.beginPath();

// layer1/tech tree/Group/Compound Path/Path
ctx.moveTo(429.3, 455.2);
ctx.lineTo(503.3, 455.2);
ctx.lineTo(493.4, 473.8);
ctx.lineTo(449.0, 473.8);
ctx.lineTo(449.0, 492.3);
ctx.lineTo(491.0, 492.3);
ctx.lineTo(491.0, 510.8);
ctx.lineTo(449.0, 510.8);
ctx.lineTo(449.0, 529.3);
ctx.lineTo(495.9, 529.3);
ctx.lineTo(503.3, 547.8);
ctx.lineTo(429.3, 547.8);
ctx.lineTo(429.3, 455.2);
ctx.closePath();
ctx.fill();

// layer1/tech tree/Group
ctx.restore();

// layer1/tech tree/Group/Compound Path
ctx.save();
ctx.beginPath();

// layer1/tech tree/Group/Compound Path/Path
ctx.moveTo(193.2, 132.0);
ctx.bezierCurveTo(195.7, 128.1, 198.1, 124.0, 200.9, 120.2);
ctx.bezierCurveTo(203.2, 117.0, 206.0, 114.1, 208.7, 111.2);
ctx.bezierCurveTo(209.0, 110.9, 210.3, 111.0, 210.8, 111.3);
ctx.bezierCurveTo(216.6, 114.7, 222.3, 118.2, 228.0, 121.6);
ctx.bezierCurveTo(228.9, 122.2, 229.7, 122.7, 230.7, 123.3);
ctx.bezierCurveTo(236.2, 118.3, 242.8, 114.9, 249.4, 111.8);
ctx.bezierCurveTo(249.9, 111.6, 250.2, 110.6, 250.2, 109.9);
ctx.bezierCurveTo(249.9, 102.9, 249.5, 95.9, 249.0, 88.9);
ctx.bezierCurveTo(248.9, 87.4, 249.3, 86.8, 250.7, 86.3);
ctx.bezierCurveTo(258.8, 83.8, 267.1, 82.8, 275.6, 82.6);
ctx.bezierCurveTo(277.0, 82.5, 277.5, 83.0, 277.8, 84.4);
ctx.bezierCurveTo(279.6, 91.9, 281.6, 99.3, 283.4, 106.4);
ctx.bezierCurveTo(288.4, 107.5, 293.3, 108.5, 298.1, 109.6);
ctx.bezierCurveTo(300.3, 110.2, 302.5, 111.1, 304.6, 111.9);
ctx.bezierCurveTo(305.8, 112.4, 306.5, 112.2, 307.3, 111.3);
ctx.bezierCurveTo(312.0, 105.9, 316.7, 100.7, 321.4, 95.4);
ctx.bezierCurveTo(322.3, 94.4, 322.9, 94.2, 324.1, 94.9);
ctx.bezierCurveTo(331.3, 99.3, 338.1, 104.1, 344.2, 110.0);
ctx.bezierCurveTo(345.3, 111.1, 345.3, 111.8, 344.6, 113.1);
ctx.bezierCurveTo(341.0, 119.1, 337.5, 125.2, 333.8, 131.2);
ctx.bezierCurveTo(333.1, 132.3, 333.0, 133.1, 333.9, 134.3);
ctx.bezierCurveTo(337.7, 139.4, 341.2, 144.7, 343.5, 150.7);
ctx.bezierCurveTo(343.9, 152.0, 344.8, 151.8, 345.7, 151.7);
ctx.bezierCurveTo(352.7, 151.3, 359.8, 151.0, 366.8, 150.6);
ctx.bezierCurveTo(368.2, 150.5, 368.7, 150.9, 369.1, 152.2);
ctx.bezierCurveTo(371.7, 160.8, 373.1, 169.6, 373.1, 178.8);
ctx.bezierCurveTo(365.6, 180.8, 358.3, 182.7, 350.9, 184.5);
ctx.bezierCurveTo(349.2, 184.9, 348.7, 185.7, 348.5, 187.3);
ctx.bezierCurveTo(347.8, 193.5, 346.5, 199.6, 343.9, 205.4);
ctx.bezierCurveTo(343.4, 206.5, 343.6, 207.2, 344.5, 208.1);
ctx.bezierCurveTo(349.8, 212.8, 355.0, 217.6, 360.3, 222.3);
ctx.bezierCurveTo(361.4, 223.3, 361.5, 224.0, 360.8, 225.3);
ctx.bezierCurveTo(356.4, 233.2, 350.8, 240.2, 344.5, 246.8);
ctx.bezierCurveTo(340.9, 244.7, 337.3, 242.5, 333.6, 240.3);
ctx.bezierCurveTo(330.6, 238.5, 327.5, 236.7, 324.5, 234.8);
ctx.bezierCurveTo(323.4, 234.1, 322.6, 234.2, 321.7, 235.0);
ctx.bezierCurveTo(317.0, 239.1, 311.7, 242.2, 306.0, 244.7);
ctx.bezierCurveTo(304.8, 245.2, 304.7, 245.8, 304.7, 246.9);
ctx.bezierCurveTo(305.1, 253.8, 305.5, 260.7, 305.8, 267.6);
ctx.bezierCurveTo(305.8, 268.4, 305.8, 269.2, 305.9, 270.1);
ctx.bezierCurveTo(296.7, 273.3, 287.2, 274.6, 277.4, 274.7);
ctx.bezierCurveTo(277.1, 273.6, 276.8, 272.5, 276.6, 271.3);
ctx.bezierCurveTo(275.0, 264.9, 273.4, 258.5, 271.8, 252.0);
ctx.bezierCurveTo(271.6, 250.8, 271.0, 250.3, 269.7, 250.2);
ctx.bezierCurveTo(263.1, 249.9, 256.7, 248.3, 250.7, 245.6);
ctx.bezierCurveTo(249.5, 245.1, 248.9, 245.4, 248.0, 246.3);
ctx.bezierCurveTo(242.8, 252.1, 237.5, 257.8, 232.2, 263.6);
ctx.bezierCurveTo(231.8, 263.5, 231.5, 263.3, 231.1, 263.2);
ctx.bezierCurveTo(230.7, 262.8, 230.3, 262.5, 229.9, 262.2);
ctx.bezierCurveTo(223.0, 258.0, 216.3, 253.4, 210.5, 247.8);
ctx.bezierCurveTo(209.7, 247.1, 209.3, 246.5, 209.9, 245.4);
ctx.bezierCurveTo(213.6, 239.4, 217.1, 233.2, 220.8, 227.2);
ctx.bezierCurveTo(221.6, 225.9, 221.8, 224.9, 220.7, 223.7);
ctx.bezierCurveTo(216.6, 218.8, 213.2, 213.4, 210.8, 207.4);
ctx.bezierCurveTo(210.3, 206.2, 209.5, 206.2, 208.5, 206.3);
ctx.bezierCurveTo(201.4, 206.7, 194.3, 207.0, 187.2, 207.4);
ctx.bezierCurveTo(186.6, 207.4, 186.1, 207.4, 185.5, 207.4);
ctx.bezierCurveTo(183.3, 201.5, 180.9, 186.5, 181.1, 180.3);
ctx.bezierCurveTo(181.1, 179.1, 181.8, 179.0, 182.7, 178.7);
ctx.bezierCurveTo(189.6, 177.0, 196.6, 175.3, 203.5, 173.4);
ctx.bezierCurveTo(204.1, 173.3, 205.0, 172.5, 205.1, 171.9);
ctx.bezierCurveTo(205.8, 164.9, 207.3, 158.1, 210.1, 151.5);
ctx.bezierCurveTo(210.3, 151.0, 210.1, 150.0, 209.7, 149.7);
ctx.bezierCurveTo(204.0, 144.4, 198.2, 139.1, 192.5, 133.9);
ctx.bezierCurveTo(192.7, 133.2, 193.0, 132.6, 193.2, 132.0);
ctx.closePath();

// layer1/tech tree/Group/Compound Path/Path
ctx.moveTo(244.7, 165.8);
ctx.bezierCurveTo(237.6, 183.2, 246.8, 204.0, 264.7, 211.3);
ctx.bezierCurveTo(282.4, 218.5, 303.1, 209.6, 310.5, 191.4);
ctx.bezierCurveTo(316.1, 177.5, 312.8, 155.3, 291.0, 146.1);
ctx.bezierCurveTo(272.9, 138.4, 252.3, 147.3, 244.7, 165.8);
ctx.closePath();
ctx.fillStyle ("rgb(255, 255, 255)");
ctx.fill();

// layer1/tech tree/Group/Compound Path
ctx.beginPath();

// layer1/tech tree/Group/Compound Path/Path
ctx.moveTo(479.8, 138.7);
ctx.bezierCurveTo(478.8, 140.5, 477.7, 142.2, 476.6, 144.1);
ctx.bezierCurveTo(472.2, 142.8, 467.7, 141.5, 463.3, 140.2);
ctx.bezierCurveTo(461.7, 139.8, 459.9, 138.7, 458.5, 139.1);
ctx.bezierCurveTo(457.2, 139.4, 456.4, 141.4, 455.3, 142.6);
ctx.bezierCurveTo(452.6, 145.4, 449.8, 148.1, 446.9, 151.1);
ctx.bezierCurveTo(448.8, 156.9, 450.8, 163.0, 452.9, 169.2);
ctx.bezierCurveTo(446.3, 172.8, 439.9, 176.4, 432.5, 178.2);
ctx.bezierCurveTo(429.3, 172.5, 426.2, 166.9, 423.0, 161.2);
ctx.bezierCurveTo(417.6, 162.4, 412.2, 162.4, 406.8, 161.9);
ctx.bezierCurveTo(406.2, 161.8, 405.2, 162.5, 404.9, 163.0);
ctx.bezierCurveTo(402.4, 167.8, 400.0, 172.6, 397.6, 177.4);
ctx.bezierCurveTo(397.1, 178.5, 396.5, 179.0, 395.3, 178.5);
ctx.bezierCurveTo(389.3, 176.2, 383.2, 173.9, 377.2, 171.5);
ctx.bezierCurveTo(376.0, 171.1, 376.0, 170.3, 376.3, 169.3);
ctx.bezierCurveTo(377.8, 164.3, 379.1, 159.2, 380.6, 154.2);
ctx.bezierCurveTo(381.0, 152.9, 380.9, 152.2, 379.8, 151.3);
ctx.bezierCurveTo(376.3, 148.0, 372.8, 144.7, 369.4, 141.3);
ctx.bezierCurveTo(368.6, 140.5, 368.0, 140.5, 367.2, 140.8);
ctx.bezierCurveTo(361.6, 142.7, 356.1, 144.5, 350.5, 146.4);
ctx.bezierCurveTo(346.4, 140.0, 343.5, 133.3, 341.6, 125.9);
ctx.bezierCurveTo(347.2, 122.8, 352.6, 119.8, 358.2, 116.7);
ctx.bezierCurveTo(356.7, 111.0, 357.1, 105.2, 357.6, 99.4);
ctx.bezierCurveTo(357.6, 98.9, 356.9, 98.1, 356.3, 97.8);
ctx.bezierCurveTo(351.3, 95.2, 346.3, 92.7, 341.0, 89.9);
ctx.bezierCurveTo(341.6, 87.4, 342.1, 84.8, 343.1, 82.4);
ctx.bezierCurveTo(344.6, 78.4, 346.4, 74.6, 348.1, 70.7);
ctx.bezierCurveTo(348.6, 69.5, 349.4, 69.5, 350.5, 69.8);
ctx.bezierCurveTo(355.6, 71.2, 360.6, 72.6, 365.6, 74.1);
ctx.bezierCurveTo(366.8, 74.4, 367.4, 74.2, 368.3, 73.2);
ctx.bezierCurveTo(371.6, 69.7, 375.0, 66.3, 378.5, 63.0);
ctx.bezierCurveTo(379.3, 62.2, 379.6, 61.6, 379.2, 60.5);
ctx.bezierCurveTo(377.4, 55.0, 375.6, 49.4, 373.8, 43.8);
ctx.bezierCurveTo(380.1, 39.8, 386.6, 36.8, 393.9, 34.8);
ctx.bezierCurveTo(397.0, 40.5, 400.1, 46.1, 403.1, 51.4);
ctx.bezierCurveTo(409.3, 51.2, 415.3, 51.1, 421.5, 51.0);
ctx.bezierCurveTo(423.9, 46.4, 426.6, 41.4, 429.1, 36.3);
ctx.bezierCurveTo(429.8, 34.9, 430.5, 34.6, 431.9, 35.0);
ctx.bezierCurveTo(433.2, 35.4, 434.5, 35.6, 435.7, 35.9);
ctx.bezierCurveTo(438.8, 37.2, 441.9, 38.4, 445.0, 39.6);
ctx.bezierCurveTo(445.7, 40.0, 446.4, 40.5, 447.2, 40.9);
ctx.bezierCurveTo(451.4, 43.1, 450.7, 42.2, 449.6, 46.3);
ctx.bezierCurveTo(448.3, 51.4, 446.8, 56.4, 445.5, 61.0);
ctx.bezierCurveTo(448.6, 64.0, 451.4, 66.8, 454.2, 69.6);
ctx.bezierCurveTo(455.3, 70.7, 456.2, 72.6, 457.4, 72.9);
ctx.bezierCurveTo(458.8, 73.3, 460.5, 72.2, 462.1, 71.7);
ctx.bezierCurveTo(466.6, 70.2, 471.1, 68.8, 475.7, 67.4);
ctx.bezierCurveTo(479.6, 74.0, 482.7, 80.6, 484.6, 87.8);
ctx.bezierCurveTo(479.4, 90.6, 474.4, 93.5, 469.3, 96.2);
ctx.bezierCurveTo(468.2, 96.8, 467.9, 97.5, 468.0, 98.7);
ctx.bezierCurveTo(468.1, 103.5, 468.0, 108.3, 468.1, 113.1);
ctx.bezierCurveTo(468.1, 113.8, 468.6, 114.7, 469.2, 115.1);
ctx.bezierCurveTo(470.8, 116.0, 472.5, 116.8, 474.1, 117.6);
ctx.bezierCurveTo(477.7, 119.4, 481.3, 121.3, 485.0, 123.1);
ctx.bezierCurveTo(484.5, 125.2, 484.0, 127.2, 483.6, 129.1);
ctx.bezierCurveTo(482.3, 132.3, 481.0, 135.5, 479.8, 138.7);
ctx.closePath();

// layer1/tech tree/Group/Compound Path/Path
ctx.moveTo(438.6, 116.6);
ctx.bezierCurveTo(444.1, 103.0, 437.5, 87.4, 424.5, 81.6);
ctx.bezierCurveTo(409.2, 74.7, 393.0, 83.9, 388.2, 96.0);
ctx.bezierCurveTo(382.7, 110.3, 389.1, 126.1, 403.0, 131.7);
ctx.bezierCurveTo(417.2, 137.4, 432.8, 130.7, 438.6, 116.6);
ctx.closePath();
ctx.fill();

// layer1/tech tree/nebula
ctx.restore();

// layer1/tech tree/nebula/Group
ctx.save();

// layer1/tech tree/nebula/Group/Path
ctx.save();
ctx.beginPath();
ctx.moveTo(71.5, 351.5);
ctx.bezierCurveTo(78.3, 351.3, 85.0, 349.7, 91.1, 346.6);
ctx.bezierCurveTo(121.6, 331.1, 145.4, 341.6, 151.6, 298.4);
ctx.bezierCurveTo(157.8, 254.6, 261.9, 302.4, 276.2, 279.1);
ctx.bezierCurveTo(298.9, 241.8, 316.6, 241.4, 398.2, 195.2);
ctx.bezierCurveTo(437.0, 173.1, 425.7, 137.7, 455.1, 132.4);
ctx.bezierCurveTo(489.7, 126.1, 467.8, 139.4, 528.7, 139.1);
ctx.bezierCurveTo(559.4, 138.9, 563.7, 102.7, 553.8, 77.8);
ctx.lineTo(517.5, 15.1);
ctx.bezierCurveTo(512.1, 5.7, 502.1, -0.0, 491.3, 0.0);
ctx.lineTo(394.8, 0.1);
ctx.lineTo(176.2, 0.6);
ctx.bezierCurveTo(173.9, 1.5, 162.4, 5.9, 157.6, 15.5);
ctx.lineTo(3.5, 283.9);
ctx.bezierCurveTo(-0.9, 289.3, -0.0, 301.4, 1.3, 305.7);
ctx.lineTo(29.4, 353.0);
ctx.lineTo(71.5, 351.5);
ctx.closePath();
ctx.createLinearGradient(319.6, 264.6, 169.1, 4.0);
ctx.addColorStop(0.00, "rgba(39, 168, 224, 0.20)");
ctx.addColorStop(0.18, "rgba(39, 168, 224, 0.10)");
ctx.addColorStop(1.00, "rgba(39, 168, 224, 0.00)");
ctx.fillStyle ();
ctx.fill();

// layer1/tech tree/nebula/Group/Path
ctx.beginPath();
ctx.moveTo(518.1, 578.1);
ctx.lineTo(671.6, 311.5);
ctx.bezierCurveTo(677.0, 302.2, 677.0, 290.7, 671.6, 281.3);
ctx.lineTo(648.0, 240.6);
ctx.lineTo(607.1, 242.2);
ctx.bezierCurveTo(600.3, 242.5, 593.5, 244.1, 587.5, 247.3);
ctx.bezierCurveTo(557.0, 262.9, 533.3, 252.5, 527.3, 295.7);
ctx.bezierCurveTo(521.2, 339.6, 416.9, 292.3, 402.8, 315.8);
ctx.bezierCurveTo(380.3, 353.1, 362.5, 353.7, 281.2, 400.3);
ctx.bezierCurveTo(242.5, 422.5, 254.0, 457.9, 224.6, 463.4);
ctx.bezierCurveTo(190.1, 469.8, 211.9, 456.5, 151.0, 457.1);
ctx.bezierCurveTo(117.0, 457.4, 115.6, 501.8, 130.0, 526.1);
ctx.lineTo(165.0, 586.6);
ctx.bezierCurveTo(170.3, 591.0, 177.0, 593.5, 184.0, 593.6);
ctx.lineTo(501.0, 591.8);
ctx.bezierCurveTo(508.1, 589.6, 514.3, 584.8, 518.1, 578.1);
ctx.closePath();
ctx.createLinearGradient(359.4, 332.0, 507.7, 588.8);
ctx.addColorStop(0.00, "rgba(39, 168, 224, 0.20)");
ctx.addColorStop(0.18, "rgba(39, 168, 224, 0.10)");
ctx.addColorStop(1.00, "rgba(39, 168, 224, 0.00)");
ctx.fillStyle ();
ctx.fill();

// layer1/tech tree/nebula/Group
ctx.restore();

// layer1/tech tree/nebula/Group/Path
ctx.save();
ctx.beginPath();
ctx.moveTo(455.6, 515.9);
ctx.bezierCurveTo(517.3, 407.7, 479.6, 270.0, 371.4, 208.3);
ctx.bezierCurveTo(263.3, 146.7, 125.6, 184.4, 63.9, 292.5);
ctx.bezierCurveTo(50.0, 317.0, 41.1, 342.9, 37.0, 369.1);
ctx.lineTo(158.2, 578.5);
ctx.bezierCurveTo(163.6, 587.8, 173.5, 593.6, 184.3, 593.6);
ctx.lineTo(382.6, 593.4);
ctx.bezierCurveTo(411.8, 574.4, 437.1, 548.3, 455.6, 515.9);
ctx.closePath();
ctx.createRadialGradient(261.1, 386.1, 0.0, 261.1, 386.1, 215.9);
ctx.addColorStop(0.29, "rgba(7, 121, 169, 0.20)");
ctx.addColorStop(0.69, "rgba(7, 121, 169, 0.10)");
ctx.addColorStop(1.00, "rgba(7, 121, 169, 0.00)");
ctx.fillStyle ();
ctx.fill();

// layer1/tech tree/nebula/Group/Path
ctx.beginPath();
ctx.moveTo(671.6, 281.3);
ctx.lineTo(536.8, 48.4);
ctx.bezierCurveTo(447.1, 24.3, 349.1, 62.4, 300.9, 146.8);
ctx.bezierCurveTo(243.7, 247.2, 276.4, 375.1, 379.0, 432.1);
ctx.bezierCurveTo(446.5, 469.6, 549.5, 457.2, 617.2, 406.1);
ctx.lineTo(671.6, 311.5);
ctx.bezierCurveTo(677.0, 302.2, 677.0, 290.7, 671.6, 281.3);
ctx.closePath();
ctx.createRadialGradient(474.3, 247.5, 0.0, 474.3, 247.5, 203.8);
ctx.addColorStop(0.29, "rgba(78, 127, 113, 0.20)");
ctx.addColorStop(0.69, "rgba(78, 127, 113, 0.10)");
ctx.addColorStop(1.00, "rgba(78, 127, 113, 0.00)");
ctx.fillStyle ();
ctx.fill();

// layer1/tech tree/nebula/Group/Path
ctx.beginPath();
ctx.moveTo(138.2, 329.1);
ctx.bezierCurveTo(233.4, 383.4, 354.6, 350.2, 408.9, 255.0);
ctx.bezierCurveTo(458.4, 168.2, 435.2, 59.7, 358.5, 0.1);
ctx.lineTo(183.7, 0.3);
ctx.bezierCurveTo(172.9, 0.3, 162.9, 6.1, 157.6, 15.5);
ctx.lineTo(45.4, 210.2);
ctx.bezierCurveTo(59.0, 258.7, 91.0, 302.1, 138.2, 329.1);
ctx.closePath();
ctx.createRadialGradient(240.2, 177.7, 0.0, 240.2, 177.7, 186.4);
ctx.addColorStop(0.29, "rgba(0, 166, 110, 0.10)");
ctx.addColorStop(0.69, "rgba(0, 166, 110, 0.05)");
ctx.addColorStop(1.00, "rgba(0, 166, 110, 0.00)");
ctx.fillStyle ();
ctx.fill();

// layer1/tech tree/nebula/Group
ctx.restore();

// layer1/tech tree/nebula/Group/Path
ctx.save();
ctx.beginPath();
ctx.moveTo(128.4, 216.3);
ctx.bezierCurveTo(116.6, 209.6, 101.6, 213.7, 94.9, 225.5);
ctx.bezierCurveTo(88.2, 237.2, 92.3, 252.2, 104.1, 258.9);
ctx.bezierCurveTo(115.8, 265.7, 130.8, 261.6, 137.5, 249.8);
ctx.bezierCurveTo(144.3, 238.0, 140.2, 223.0, 128.4, 216.3);
ctx.closePath();
ctx.createRadialGradient(116.2, 237.6, 0.0, 116.2, 237.6, 24.5);
ctx.addColorStop(0.29, "rgba(7, 121, 169, 0.50)");
ctx.addColorStop(0.69, "rgba(7, 121, 169, 0.25)");
ctx.addColorStop(1.00, "rgba(7, 121, 169, 0.00)");
ctx.fillStyle ();
ctx.fill();

// layer1/tech tree/nebula/Group/Path
ctx.beginPath();
ctx.moveTo(329.5, 30.8);
ctx.bezierCurveTo(303.0, 15.7, 269.3, 24.9, 254.2, 51.4);
ctx.bezierCurveTo(239.1, 77.9, 248.3, 111.6, 274.8, 126.8);
ctx.bezierCurveTo(301.3, 141.9, 335.0, 132.6, 350.1, 106.1);
ctx.bezierCurveTo(365.2, 79.6, 356.0, 45.9, 329.5, 30.8);
ctx.closePath();
ctx.createRadialGradient(302.1, 78.8, 0.0, 302.1, 78.8, 55.2);
ctx.addColorStop(0.29, "rgba(0, 78, 124, 0.50)");
ctx.addColorStop(0.69, "rgba(0, 78, 124, 0.25)");
ctx.addColorStop(1.00, "rgba(0, 78, 124, 0.00)");
ctx.fillStyle ();
ctx.fill();

// layer1/tech tree/nebula/Group/Path
ctx.beginPath();
ctx.moveTo(481.3, 398.2);
ctx.bezierCurveTo(466.2, 389.6, 446.9, 394.9, 438.3, 410.0);
ctx.bezierCurveTo(429.7, 425.1, 435.0, 444.3, 450.1, 452.9);
ctx.bezierCurveTo(465.2, 461.5, 484.4, 456.3, 493.0, 441.2);
ctx.bezierCurveTo(501.6, 426.1, 496.4, 406.8, 481.3, 398.2);
ctx.closePath();
ctx.createRadialGradient(465.7, 425.6, 0.0, 465.7, 425.6, 31.5);
ctx.addColorStop(0.00, "rgba(39, 168, 224, 0.50)");
ctx.addColorStop(0.56, "rgba(39, 168, 224, 0.25)");
ctx.addColorStop(1.00, "rgba(39, 168, 224, 0.00)");
ctx.fillStyle ();
ctx.fill();
ctx.restore();
ctx.restore();
ctx.restore();
ctx.restore();


/// PASTE ABOVE  THIS LINE  ////////////////////////////////////////////////////////////////////////

  return ctx.data;
}
