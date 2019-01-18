"use strict"


function mousedown(event){
  mouseDownLocation = new Vec( event.offsetX, event.offsetY) ;
  document.body.querySelector("#board").addEventListener("mousemove", drag);
  document.body.querySelector("#board").addEventListener("mouseup", e => {
    document.body.querySelector("#board").removeEventListener("mousemove", drag);
  });
}

function scaleContext(s){
  var c = document.getElementById("board").getContext("2d");
  scale *= s;
  c.scale(s,s)
  screenOffset = screenOffset.scale(1/s);
}

function translateContext(dif){
  var c = document.getElementById("board").getContext("2d");
  screenOffset = screenOffset.add(dif)
  c.translate(-dif.x,-dif.y)
}

function mouseWheel(event){
  event.preventDefault();
  if (event.deltaY>0){    scaleContext(1.1);  }
  if (event.deltaY<0){    scaleContext(1/1.1);  }
  drawScreen();
}

function drag(event){
  var c = document.getElementById("board").getContext("2d");
  let dif = mouseDownLocation.scale(-1).add(new Vec(event.offsetX,  event.offsetY)).scale(-1/(scale));
  screenOffset = screenOffset.add(dif)
  c.translate(-dif.x,-dif.y)
  mouseDownLocation =  new Vec( event.offsetX, event.offsetY) ;
  drawScreen();
}

function menuClick(event){
  console.log("click" + selected.state);

  if(event.offsetY > 50){nextTurn()};
  if(event.offsetY < 50 && event.offsetY > 10){
    let num = Math.round((event.offsetX+10)/40);
    if (num && menu[num -1]){
      onMenuItemClicked(menu[num -1]);
    }
  }
  drawScreen();
}

function getRealXYfromScreenXY(a){return a.scale(1/scale).add(screenOffset)}

function boardClick(event){
  let clickHex = Hex.getUnitHexFromXY(getRealXYfromScreenXY(new Vec(event.offsetX,  event.offsetY)).scale(1/hexSize))
  onHexClicked(clickHex);
  drawScreen();
}
