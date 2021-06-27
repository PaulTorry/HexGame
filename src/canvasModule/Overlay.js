'use strict'

/* eslint-disable no-unused-vars, object-property-newline */

/* global
Vec
*/

class Overlay {
  constructor (
    clickFunction = console.log,
    drawFunction = console.log,
    center = new Vec(400, 400),
    screenCenter = new Vec(400, 400)
  ) {
    this.center = center
    this.screenCenter = screenCenter
    this.offset = new Vec(0, 0)
    this.zoom = 1
    this.clickFunction = clickFunction
    this.drawFunction = drawFunction
    this.buffer = document.createElement('canvas')
    this.changes = { moved: true, redrawn: true }
  }

  reCenterScreen (screenCenter) {
    this.screenCenter = screenCenter
    this.center = screenCenter
  }

  getViewXYfromScreenXY (pt) {
    return pt.add(this.center.scale(1))
  }

  drawBuffer (drawfunc = this.drawFunction) {
    const c = this.buffer.getContext('2d')
    this.buffer.height = this.center.y * 2
    this.buffer.width = this.center.x * 2
    c.translate(...this.screenCenter)
    drawfunc(this)
    c.translate(...this.screenCenter.scale(-1))
  }

  transmitClick (location) {
    return this.clickFunction(this.getViewXYfromScreenXY(location))
  }
}
