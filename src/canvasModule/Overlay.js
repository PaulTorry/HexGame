'use strict'

/* eslint-disable no-unused-vars, object-property-newline */

/* global
Vec
*/

class Overlay {
  constructor (
    clickFunction = console.log,
    drawFunctions = [console.log],
    center = new Vec(400, 400),
    screenCenter = new Vec(400, 400)
  ) {
    this.center = center
    this.screenCenter = screenCenter
    this.offset = new Vec(0, 0)
    this.zoom = 1
    this.clickFunction = clickFunction
    this.drawFunctions = drawFunctions
    this.buffers = drawFunctions.map(x => document.createElement('canvas'))
    this.changes = { moved: true, redrawn: true }
  }

  reCenterScreen (screenCenter) {
    this.screenCenter = screenCenter
    this.center = screenCenter
    this.buffers.forEach(b => { b.height = this.center.y * 2 })
    this.buffers.forEach(b => { b.width = this.center.x * 2 })
    // this.buffers[b].height = this.center.y * 2
    // this.buffers[b].width = this.center.x * 2
  }

  getViewXYfromScreenXY (pt) {
    return pt.add(this.center.scale(1))
  }

  drawBuffer (drawfunc = this.drawFunctions[0], b = 0) {
    const c = this.buffers[b].getContext('2d')
    // this.buffers[b].height = this.center.y * 2
    // this.buffers[b].width = this.center.x * 2
    c.translate(...this.screenCenter)
    drawfunc(this)
    c.translate(...this.screenCenter.scale(-1))
  }

  drawBuffers (drawFuncs = this.drawFunctions) {
    drawFuncs.forEach((v, i, a) => this.drawBuffer(v, i))
  }

  transmitClick (location) {
    return this.clickFunction(this.getViewXYfromScreenXY(location))
  }
}
