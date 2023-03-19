'use strict'

/* eslint-disable no-unused-vars, object-property-newline */

/* global
Vec, views
*/

class Board {
  constructor (canvasElement, views, currentView, overlays, returnFunctions, screenCenter = new Vec(800, 800)) {
    this.canvasElement = canvasElement
    this.views = views
    this.context = canvasElement.getContext('2d')
    this.currentView = currentView
    this.overlays = overlays
    this.returnFunctions = returnFunctions
    this.screenCenter = screenCenter
    this.mouseDownLocation = new Vec()
    this.mouseDownLocationABS = new Vec()
    this.fingerDistance = null
    canvasElement.addEventListener('click', this.boardClick.bind(this))
    canvasElement.addEventListener('mousedown', this.mousedown.bind(this))
    canvasElement.addEventListener('wheel', this.mouseWheel.bind(this))
    canvasElement.addEventListener('touchstart', this.touchstart.bind(this))
    window.onresize = this.resizeScreen.bind(this)
    this.dra = this.drag.bind(this)
    this.rem = this.removeMousemove.bind(this)
  }

  mousedown (event) {
    this.mouseDownLocationABS = new Vec(event.offsetX, event.offsetY)
    this.mouseDownLocation = new Vec(event.offsetX, event.offsetY)
    this.canvasElement.addEventListener('mousemove', this.dra)
    this.canvasElement.addEventListener('mouseup', this.rem)
  }

  removeMousemove (event) {
    this.canvasElement.removeEventListener('mousemove', this.dra)
    this.canvasElement.removeEventListener('mouseup', this.rem)
  }

  mouseWheel (event) {
    event.preventDefault()
    if (event.deltaY < 0) { this.currentView.scaleView(1 / 1.1) }
    if (event.deltaY > 0) { this.currentView.scaleView(1.1) }
    this.returnFunctions.drawScreen(false)
  }

  drag (e) {
    const offset = new Vec(e.offsetX, e.offsetY)
    const dif = this.mouseDownLocation.subtract(offset)
    if (this.mouseDownLocationABS.subtract(offset).mag > 20) {
      this.returnFunctions.deSelect()
    }
    e.preventDefault(); e.stopPropagation()
    this.currentView.translateView(dif)
    this.mouseDownLocation = offset
    this.returnFunctions.drawScreen(false)
  }

  touchstart (event) {
    const { pageX, pageY } = event.touches[0]
    this.mouseDownLocation = new Vec(pageX, pageY)
    this.canvasElement.addEventListener('touchmove', this.touchdrag.bind(this))
    this.canvasElement.addEventListener('touchend', this.removeTouchmove.bind(this))
  }

  removeTouchmove (event) {
    this.fingerDistance = null
    this.canvasElement.removeEventListener('touchmove', this.touchdrag.bind(this))
    this.canvasElement.removeEventListener('touchend', this.removeTouchmove.bind(this))
  }

  touchdrag (event) {
    this.returnFunctions.deSelect()
    event.preventDefault(); event.stopPropagation()

    const t1 = new Vec(event.touches[0].pageX, event.touches[0].pageY)
    if (event.touches[1]) {
      const t2 = new Vec(event.touches[1].pageX, event.touches[1].pageY)
      const fingerDistanceNew = t1.distance(t2)
      if (this.fingerDistance) {
        this.currentView.scaleView(this.fingerDistance / fingerDistanceNew)
      }
      this.fingerDistance = fingerDistanceNew
    } else this.fingerDistance = null
    this.currentView.translateView(this.mouseDownLocation.subtract(t1))
    this.mouseDownLocation = t1
    this.returnFunctions.drawScreen(false)
  }

  resizeScreen (event) {
    const roundedHalfMin = (a) => Math.max(Math.floor(a / 2), 200)
    const center = new Vec(roundedHalfMin(window.innerWidth) - 3, roundedHalfMin(window.innerHeight) - 3)
    this.screenCenter = center
    this.canvasElement.width = center.x * 2
    this.canvasElement.height = center.y * 2
    this.returnFunctions.drawScreen()
    this.overlays.forEach(overlay => overlay.reCenterScreen(center))
    this.currentView.reCenterScreen(center)
    Object.values(this.views).forEach(view => view.reCenterScreen(center)) // @TODO
  }

  boardClick (event) {
    const offset = new Vec(event.offsetX, event.offsetY).subtract(this.screenCenter)
    const checklist = this.overlays.map(c => c.transmitClick(offset))
    // console.log(checklist)
    const result = checklist.reduce((p, c, i, a) => p || c, false)
    result || this.currentView.transmitClick(offset)
  }

  drawViewfromSingleBuffer (view = this.currentView, buffer = view.buffer) {
    this.context.drawImage(
      buffer,
      ...this.screenCenter.scale(-view.zoom).add(view.offset).add(view.center),
      ...this.screenCenter.scale(view.zoom * 2),
      ...new Vec(0, 0),
      ...this.screenCenter.scale(2)
    )
  }

  drawViewFromBuffers (view = this.currentView) {
    view.buffers.forEach(b => this.drawViewfromSingleBuffer(view, b))
  }

  drawViewfromBuffer (view = this.currentView) {
    this.drawViewfromSingleBuffer(view)
  }

  drawScreen (fullUpdate = true) {
    this.clear()
    if (fullUpdate) this.currentView.drawBuffer()
    this.drawViewfromBuffer(this.currentView)

    if (fullUpdate) this.overlays.forEach(o => o.drawBuffer())
    this.overlays.forEach(o => this.drawViewfromBuffer(o))
  }

  clear () { this.context.clearRect(-99999, -99999, 199999, 199999) }
}
