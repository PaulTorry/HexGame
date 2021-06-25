'use strict'

/* eslint-disable no-unused-vars, object-property-newline */

// function json (a) { return JSON.stringify(a) }

/* global
drawScreen, Vec
*/

class Overlay {
  constructor (
    clickFunction = console.log,
    center = new Vec(400, 400),
    screenCenter = new Vec(400, 400)
  ) {
    this.center = center
    this.screenCenter = screenCenter
    this.offset = new Vec(0, 0)
    this.zoom = 1
    this.clickFunction = clickFunction
    this.buffer = document.createElement('canvas')
    this.changes = { moved: true, redrawn: true }
  }

  reCenterScreen (screenCenter) {
    this.screenCenter = screenCenter
    this.center = screenCenter
  }

  getViewXYfromScreenXY (pt) {
    return pt
  }

  drawBuffer (drawfunc = (b) => b.getContext('2d').fillRect(0, 0, 999, 999)) {
    console.log(this.center, this.screenCenter, drawfunc)
    const c = this.buffer.getContext('2d')
    this.buffer.height = this.center.y * 2
    this.buffer.width = this.center.x * 2
    c.translate(...this.screenCenter)
    drawfunc(this)
    c.translate(...this.screenCenter.scale(-1))
  }

  transmitClick (location) {
    // console.log('tr click', this)
    return this.clickFunction(location)
    // drawScreen()
  }
}
