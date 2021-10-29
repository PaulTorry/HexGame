'use strict'

/* eslint-disable no-unused-vars, object-property-newline */

class Vec {
  constructor (x = 0, y = 0) { this.x = x; this.y = y }

  * [Symbol.iterator] () {
    yield this.x
    yield this.y
  }

  add (b) { return new Vec(this.x + b.x, this.y + b.y) }
  addXY (x, y) { return new Vec(this.x + x, this.y + y) }
  subtract (b) { return new Vec(this.x - b.x, this.y - b.y) }
  scaleByVec (a) { return new Vec(this.x * a.x, this.y * a.y) }
  scaleXY (x, y) { return new Vec(this.x * x, this.y * y) }
  scale (m) { return new Vec(this.x * m, this.y * m) }

  dot (b) { return this.x * b.x + this.y * b.y }
  invert () { return this.scale(-1) }
  distance (a) {
    // console.log(this.subtract(a),this.subtract(a).mag )
    return this.subtract(a).mag
  }

  bounds (b1, b2 = b1.invert()) {
    const x2 = Math.min(b2.x, b1.x); const x1 = Math.max(b2.x, b1.x)
    const y2 = Math.min(b2.y, b1.y); const y1 = Math.max(b2.y, b1.y)
    const x = Math.max(x2, Math.min(x1, this.x))
    const y = Math.max(y2, Math.min(y1, this.y))
    // const x = Math.max(b2.x, Math.min(b1.x, this.x))
    // const y = Math.max(b2.y, Math.min(b1.y, this.y))
    // console.log(b1,b2,x2,x1,y2,y1,x,y);
    return new Vec(x, y)
  }

  get mag () { return Math.sqrt((this.x * this.x) + (this.y * this.y)) }

  static fromID (id) {
    const vals = id.split(',')
    return new Vec(...(id.split(',')).map(parseFloat))
  }

  static fromXY (xy) {
    return new Vec(xy.x, xy.y)
  }

  static fromIdArray (idArray) {
    return idArray.map(Vec.fromID)
  }

  // static zero = new Vec(0, 0)
  // static unit = new Vec(1, 1)
  // static getArray (input, Vecs) {
  //   const [xx, yy, ...rest] = input
  //   if (xx === null || yy === null) { return Vecs } else { return Vec.getArray(rest, Vecs.concat(new Vec(xx, yy))) }
  // }
}
