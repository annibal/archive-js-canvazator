/*

  if you have this
  a = {
    x:78,
    y:{
      start:0,
      end:120,
    },
    z:{
      things:[1,2,3]
    },
    border:{
      color:"red",
      style:"dashed",
      size:{
        value:15,
        attribute:"px"
      }
    }
  }

  and you want to merge with
  b = {
    x:6000,
    z:{
      things:[4],
      otherThings:[5,6,7,8]
    },
    border:{size:{value:32}}
  }

  who you gonna call?

  objectMerger.merge(a,b); // !

  also accepts:
  - objectMerger.merge(a,[b,c,d]);
  - objectMerger.merge(a,b,c,d,e);

  set concatArrays to false to replace arrays as any property
  set concatArrays to true to append merge arrays to receiver
  default true

  all the rest gets replaced

*/

Canvazator.ObjectMerger = class ObjectMerger {}
Canvazator.ObjectMerger.concatArrays = true;

Canvazator.ObjectMerger.merge = function(receiver, modifications) {
  if (receiver == null) {
    throw new Error("Can't modify a null receiver");
    return;
  }
  if (arguments[1] != undefined) {
    modifications = Array.from(arguments);
    modifications.shift();
  }
  if (modifications != undefined) {
    modifications.forEach(mod => {
      receiver = this.singleMerge(receiver, mod);
    })
  }
  return receiver;
}
Canvazator.ObjectMerger.singleMerge = function(base, mod) {
  if (mod == null) return base;
  Object.keys(base).forEach(function(prop) {

    if (mod[prop] == null) return; // break;

    if (this.hasDeeperLevels(base[prop])) {
      base[prop] = this.singleMerge(base[prop], mod[prop]);
    } else {
      if (Array.isArray(base[prop]) && this.concatArrays) {
        base[prop] = base[prop].concat(mod[prop]);
      } else {
        base[prop] = mod[prop];
      }
    }
  }.bind(this))
  Object.keys(mod).forEach(function(prop) {
    if (base[prop] == null) {
      base[prop] = mod[prop];
    }
  })

  return base;
}
/*
  1: false
  "a": false
  []: false
  {}: false
  {hue:5}: true
  {hue:"kek"}: true
  {hue:[]}: true
  {hue:{}}: true
*/
Canvazator.ObjectMerger.hasDeeperLevels = function(level) {
  return level != null && Object.keys(level).length > 0 && !Array.isArray(level) && typeof level == "object";
}
