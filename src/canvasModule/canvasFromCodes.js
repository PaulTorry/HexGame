
/* global

*/

/* eslint-disable no-unused-vars,  indent */

function drawArrow (c, start, end, width = 3, color = 'white') {
  const midpoint = start.add(end).scale(0.5)
  c.strokeStyle = color // keep col form last func
  c.lineWidth = width
  c.beginPath()
  c.moveTo(start.x, start.y)
  c.lineTo(end.x, end.y)
  c.stroke()
  c.closePath()
}

function drawFromCode (c, data, xx = 0, yy = 0, colourMap = x => x, scaleFactor = 1, rotation = 0, reverse = false) {
  // console.log(rotation, reverse);
  // const scale = scaleFactor * screenSettings.resolutionLevel
//   const data = gameSprites[sprite] // || []
  const startTime = new Date()

  const pack2 = (ac, cv, ix, arr) => ix % 2 ? ac.concat([[arr[ix - 1], arr[ix]]]) : ac
  const rotateMath = (x, y, th) => [x * Math.cos(th) + y * Math.sin(th), x * -Math.sin(th) + y * Math.cos(th)]
  const rotate = (a, th) => a.reduce(pack2, []).map((a) => rotateMath(...a, th)).flat()

  const add = (a, x, y, s = 1, r = 1) => a.map((v, i) => i % 2 ? v * s + y : v * s * r + x)

  const transform = (a, x, y, t, r = reverse ? -1 : 1) => {
    if (t) return add(rotate(add(a, x, y), t), xx, yy, scaleFactor, r)
    else return add(add(a, x, y), xx, yy, scaleFactor, r)
  }

  let gradient
  let x = 0
  let y = 0
  const th = rotation * 2 * 3.1425

  const ds = () => {
    c.save()
    c.shadowColor = 'rgba(0, 0, 0, 0.35)'
    c.shadowOffsetX = 3.0; c.shadowOffsetY = 3.0; c.shadowBlur = 10.0
  }

  data.forEach(([t, ...v]) => {
    if (t === 'sv') c.save()
    else if (t === 'ds') ds()
    else if (t === 'sc') scaleFactor *= v[0]
    else if (t === 'of') {
      x = v[0]; y = v[1]// x = v[0] * scale; y = v[1] * scale
    } else if (t === 'bp') c.beginPath()
    else if (t === 'mt') c.moveTo(...transform(v, x, y, th))
    else if (t === 'lt') c.lineTo(...transform(v, x, y, th))
    else if (t === 'lw') c.lineWidth = v[0]
    else if (t === 'cp') c.closePath()
    else if (t === 'fs') {
      if (v && v[0]) { c.fillStyle = colourMap(v[0]) } else if (gradient) { c.fillStyle = gradient }
    } else if (t === 'ss') {
      if (v) c.strokeStyle = colourMap(v[0])
    } else if (t === 'fl') c.fill()
    else if (t === 'ct') c.bezierCurveTo(...transform(v, x, y, th))
    else if (t === 're') c.restore()
    else if (t === 'st') c.stroke()
    else if (t === 'tr') c.transform(...v)
    else if (t === 'xrg') {
      gradient = c.createRadialGradient(...transform([v[0], v[1]], x, y, th), v[2] * scaleFactor, ...transform([v[3], v[4]], x, y, th), v[5] * scaleFactor)
      // gradient = c.createRadialGradient(v[0] * scale + x + xx, v[1] * scale + y + yy, v[2] * scale, v[3] * scale + x + xx, v[4] * scale + y + yy, v[5] * scale)
    } else if (t === 'xlg') {
      gradient = c.createLinearGradient(...transform(v, x, y, th))
    } else if (t === 'xcs') { gradient.addColorStop(v[0], colourMap(v[1])) }
  })
  c.shadowOffsetX = 0; c.shadowOffsetY = 0; c.shadowBlur = 0.0
  c.restore(); c.beginPath(); c.closePath() // Hack to stop drawing after clear

  //  if(new Date() - startTime >=1) console.log("Draw > 2", getNameFromData(data));

  if (c.data) return c.data
}

function drawText (c, text, x = 0, y = 0, size = 28, color = 'blue', font = 'Helvetica') {
  c.font = `${size}px ${font}`
  c.fillStyle = color
  c.fillText(text, x, y)
  //  c.stroke();
}
