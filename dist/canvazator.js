
// i take care of starting the stuff!

function Canvazator(config) {
  // initialize Substract
  // call loader to load stuff
  // initialize input to listen for events
  // start the engines
  return Canvazator;
}


// i am the base class of everything!

Canvazator.Thing = class Thing {
  constructor(config) {
    // bind to global list of stuff
    // listen to default events
  }
  update() {

  }
  draw() {

  }
}


// i take care of the loop!

Canvazator.Engine = class Engine {
  constructor() {
    // call loop events
  }
}


// i handle the input!

Canvazator.Input = class Input {
  constructor(_custom) {
    // extends a default list of inputs
    // binds events to feed this list
  }
}


// i load stuff!

Canvazator.Loader = class Loader {
  constructor(_assets) {
    // define an asset structure
    // cache and load each one of them
    // call the events for such, provide info about loading
  }
}


// i'm in charge of making a solid ground!

Canvazator.Substract = class Substract {
  constructor(_canvas) {
    // check if parameter _canvas is a DOM element, a id, or null
    // create or find the canvas
    // bind the resize events
    // obtain context
    // obtain width/height

  }
}


// i take care of optimal math operations!

Canvazator.Math = {
  sin:function(degrees,useRad) {

  },
  cos:function(degrees,useRad) {

  },
  tan:function(degrees,useRad) {

  },
  pointAngle:function(x1,y1,x2,y2,useRad) {

  },
  pointDistance:function(x1,y1,x2,y2) {

  },
  cache:{}
}


// when you need relative svg for drawing or collision, i am the guy!

Canvazator.Mesh = class Mesh {
  // vish
}


// i make awesome particles!

Canvazator.Particles = class Particles {
  // dunno
}


// i'll provide incredible random functions!

Canvazator.Random = {
  range:function(min, max) {

  }
}

