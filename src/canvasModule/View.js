'use strict'

/* eslint-disable no-unused-vars, object-property-newline */

// function json (a) { return JSON.stringify(a) }

/* global
Vec, drawScreen
*/

class View {
  constructor (
    clickFunction = console.log,
    center = new Vec(400, 400),
    screenCenter = new Vec(400, 400),
    zoom = 1, offset = new Vec(0, 0)
  ) {
    this.zoom = zoom
    this.offset = offset
    this.center = center
    this.screenCenter = screenCenter
    this.clickFunction = clickFunction
    this.buffer = document.createElement('canvas')
    this.changes = { moved: true, redrawn: true }
  }

  reCenterScreen (screenCenter) {
    this.screenCenter = screenCenter
  }

  getViewXYfromScreenXY (pt) {
    return pt.subtract(this.screenCenter).scale(this.zoom).add(this.offset)
  }

  scaleView (sc) {
    const newZoom = this.zoom * sc
    this.zoom = Math.max(0.2, Math.min(5, newZoom))
    this.translateView(new Vec(0, 0))
  }

  translateView (dif) {
    const newOffset = this.offset.add(dif.scale(this.zoom))
    this.offset = newOffset.bounds(this.center.subtract(this.screenCenter.scale(this.zoom)))
  }

  translateViewTo (loc) {
    const newOffset = loc
    this.offset = newOffset.bounds(this.center)
  }

  drawBuffer (drawfunc = (b) => b.getContext('2d').fillRect(0, 0, 999, 999)) {
    const c = this.buffer.getContext('2d')
    this.buffer.height = this.center.y * 2
    this.buffer.width = this.center.x * 2
    c.translate(...this.center)
    drawfunc(this)
    c.translate(...this.center.scale(-1))
  }

  transmitClick (location) {
    // console.log('tr click', this)
    this.clickFunction(location.scale(this.zoom).add(this.offset))
    drawScreen()
  }
}
