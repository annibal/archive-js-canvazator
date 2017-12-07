
// i take care of starting the stuff!

class Canvazator {
  constructor(config) {

    
    // default configuration and some reference comments about stuff
    
    var defaultConfig = {
      canvas: {
        // null or undefined: creates a canvas element
        // string: tries to find by that id
        // object: if a DOMElement, uses it as canvas
        element:null,
    
        // true: in case element (id or DOM) fails, throws fatal error and stops
        // false: creates element if element (id returns null, DOM is not a canvas) goes wrong, throws warning thought
        strict:false,
    
        // fill-screen:             canvas width and height equals 100% of visible area
        // fill-element:            canvas width and height equals 100% of parent element
        // maintain-ratio-screen:   maintains current w/h ratio based on screen
        // maintain-ratio-element:  maintains current w/h ratio based on parent element
        // fixed-size:              forces fixed size
        // ignore:                  does not set size, obtains and updates on resize
        adjustmentType:"fill-screen",
    
        // width and height percentage based on screen or parent element
        adjustmentRatio:{
          width:100,
          height:100
        },
    
        // parent, in case adjustmentType is set relative to parent
        containerElement:null,
    
        // fixed size to be forced
        fixedSize:{
          width:640,
          height:480
        },
    
        // wether updates when screen or parent element resize
        // fixed-size ignores this
        updateOnResize:true,
    
        // true: obtains a new ratio after initializing
        // false: does not calculate automatically the ratio
        calculateRatio:true,
      },
      assets: {
        items:[
          /*
            type
              data
                - fetchs the asset and creates a variable with the contents as a string
              json
                - fetchs the asset and creates a variable with the object data on it
              image
              video
              audio
              file
              html
                - loads the image/video/audio/file/html into the DOM in a correspondent element
                id
                classes[]
                attributes[{name, value}]
          */
        ]
      },
      input: {
        // type:key
        // whenever one of the keys[] is down, the value is TRUE
        // if all are up, value is FALSE
        // modificators are optional, the value is conditional to any of the keys AND all the modificators
        // value is dinamically set, so unnecessary in the declaration
        "left":{
          keys:[37,"A","a"],
          modificators:[],
          type:"key",
          value:false
        },
        "up":{
          keys:[38,"W","w"],
          type:"key",
        },
        "right":{
          keys:[39,"D","d"],
          type:"key",
        },
        "down":{
          keys:[40,"S","s"],
          type:"key",
        },
        // things may also register to listen to KEYDOWN and KEYUP events
        "space":{
          keys:32, // doesnt has to be array
          type:"key",
        },
        // type:axis
        // POSITIVEKEYS increase VALUE by SPEED up to MAXVALUE
        // NEGATIVEKEYS decreasae VALUE by SPEED down to MAXVALUE*-1
        // if no POSITIVEKEYS nor NEGATIVEKEYS are down, value returns to zero, but jumps if distance is smaller than CUTOFFVALUE
        // if value is POSITIVE and a NEGATIVE key is detected, value will jump to ZERO before decreasing if INVERSIONCUTOFF is true
        // decimal value trimmed to QUALITY number of decimals
        // movement:linear means VALUE + SPEED or VALUE - SPEED
        // movement:exponencial means VALUE * SPEED or VALUE * 1/SPEED
        "verticalAxis":{
          positiveKeys:[40,"S","s"],
          negativeKeys:[38,"W","w"],
          maxValue:1,
          cutoffValue:0.01,
          speed:0.05,
          inversionCutoff:true,
          quality:4,
          type:"axis",
          movement:"linear"
        },
        "horizontalAxis":{
          positiveKeys:[39,"D","d"],
          negativeKeys:[37,"A","a"],
          maxValue:1,
          cutoffValue:0.01,
          speed:0.05,
          inversionCutoff:true,
          quality:4,
          type:"axis",
          movement:"linear"
        }
      }
    }
    
    Object.assign(defaultConfig, config);
    this.config = defaultConfig;

    // initialize Substract
    this._substract = new Canvazator.Substract(this.config.canvas);
    this._substract.updateGlobals(this);

    // call loader to load stuff
    this._loader = new Canvazator.Loader(this.config.assets);

    // initialize input to listen for events
    this._input = new Canvazator.Input(this.config.input);

    // start the engines
    this._engine = new Canvazator.Engine();

    Object.assign(this, Canvazator);
  }
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
    this.create();
  }
  create() {
    // call loop events

  }
}


// i handle the input!

Canvazator.Input = class Input {
  constructor(_inputs) {
    this.create(_inputs);
  }
  create(_inputs) {
    // binds events to feed this list

  }
}


// i load stuff!

Canvazator.Loader = class Loader {
  constructor(_assets) {
    this.create(_assets);
  }
  create(_assets) {
    // cache and load each one of them
    // call the events for such, provide info about loading

  }
}


// i'm in charge of making a solid ground!

Canvazator.Substract = class Substract {
  constructor(_canvas) {
    this.create(_canvas);
  }
  create(_canvas) {
    // check if parameter _canvas is a DOM element, a id, or null
    // create or find the canvas
    // bind the resize events
    // obtain context
    // obtain width/height

  }
  updateGlobals(obj) {
    
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

