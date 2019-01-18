"use strict"
class Vec{
  constructor(x = 0, y = 0){    this.x = x;    this.y = y;  }

  add(b){    return new Vec (this.x + b.x, this.y + b.y)  }
  scale(m) { return new Vec(this.x * m, this.y * m) }
  dot(b){    return this.x * b.x + this.y * b.y; }

  static getArray(input, Vecs){
    let [xx, yy, ...rest] = input;
    if (xx == null || yy == null){return Vecs}
    else {  return Vec.getArray(rest,Vecs.concat(new Vec(xx,yy))) }
  }
}

class Hex{
  constructor(p=0,q=0,r=0){ this.p=p; this.q=q; this.r=r; }

  add(b){return new Hex(this.p+b.p, this.q+b.q, this.r+b.r)};
  compare(b){return this.p==b.p && this.q==b.q && this.r==b.r};
  distance(b){return (Math.abs(this.p - b.p) + Math.abs(this.q - b.q) + Math.abs(this.r - b.r)) / 2};
  get mag(){return (Math.abs(this.p) + Math.abs(this.q) + Math.abs(this.r)) / 2};
  get id () {return  `${this.p},${this.q}`}

  get neighbours() {return Hex.neighbours().map(n => n.add(this))}

  static getArray(input, Hexes){
    let [pp, qq, rr, ...rest] = input;
    if (pp == null || qq == null || rr == null){return Hexes}
    else {  return Hex.getArray(rest,Hexes.concat(new Hex(pp,qq,rr))) }
  }

  static findWithin(n){
    let list = []
    for(let i = -n; i<=n; i++){
      for(let j = Math.max(-n, -n-i); j <=Math.min(n, n-i); j++){
        list.push(new Hex(i, j, -i-j));
      }
    }
    return list;
  }

  static neighbours() {return [new Hex(1,0,-1), new Hex(0,-1,1), new Hex(-1,0,1), new Hex(-1,1,0), new Hex(0,1,-1), new Hex(1,-1,0)]}

  static getXYfromUnitHex(hexCoord){
    const hexVec = {p: new Vec(1,0),   q: new Vec((-1/2), Math.sqrt(3)/2),  r: new Vec((-1/2), -Math.sqrt(3)/2) }
    return hexVec.p.scale(hexCoord.p).add(hexVec.q.scale(hexCoord.q))
    .add(hexVec.r.scale(hexCoord.r))
  }

  static getUnitHexFromXY(xy){
    const invHexVec = {p: new Vec(2/(3),0),   q: new Vec((-2/6), Math.sqrt(3)/3),  r: new Vec((-2/6), -Math.sqrt(3)/3) }
    let {p, q, r} = invHexVec;
    //let xy = xyScaled.scale(1/hexSize);
    return Hex.hex_round(new Hex(xy.dot(p), xy.dot(q),xy.dot(r)))
  }

  static hex_round(h){
    let qi = Math.round(h.q);
    let ri = Math.round(h.r);
    let pi = Math.round(h.p);
    let q_diff = Math.abs(qi - h.q);
    let r_diff = Math.abs(ri - h.r);
    let p_diff = Math.abs(pi - h.p);
    if (q_diff > r_diff && q_diff > p_diff)    {           qi = -ri - pi;    }
    else  if (r_diff > p_diff)                 {           ri = -qi - pi;        }
    else                                    {            pi = -qi - ri;        }
    return new Hex(pi, qi, ri);
  }

}


function randomInt(num) {return Math.floor(Math.random() * num);}
