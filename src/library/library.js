'use strict'

/* eslint-disable no-unused-vars, object-property-newline */

function cloneFunc (ob) {
  var newObj = (ob instanceof Array) ? [] : {}
  for (var i in ob) {
    if (ob[i] && typeof ob[i] === 'object') {
      newObj[i] = cloneFunc(ob[i])
    } else {
      newObj[i] = ob[i]
    }
  }
  return newObj
}
