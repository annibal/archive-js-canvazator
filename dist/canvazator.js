
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
    
        // data to add to canvas element
        // id: adds 1, 2.. if id already exists
        // classes: adds all in the array, not necessary to be an array
        // attributes: and array of keys and values to add. e.g.: {"data-thing":"stuff"}
        htmlElementAttributes:{
          id:"canvazator",
          classes:[],
          attributes:[]
        },
    
        // if element is not null, should it add/replace the attributes defined above?
        extendExistingElementAttributes:true,
    
        // true: in case element (id or DOM) fails, throws fatal error and stops
        // false: creates element if element (id returns null, DOM is not a canvas) goes wrong, throws warning thought
        strict:false,
    
        // fill-screen:             canvas width and height equals 100% of visible area
        // fill-element:            canvas width and height equals 100% of parent element
        // maintain-ratio-screen:   maintains current w/h ratio based on screen
        // maintain-ratio-element:  maintains current w/h ratio based on parent element
        // fixed-size:              forces fixed size
        // ignore:                  does not set size, obtains and updates on resize
        // custom:                  uses customSize function, sending canvasElement, containerElement, windowElement and config as parameters, and expecting {width,height} as a return value
        adjustmentType:"fill-screen",
    
        // width and height percentage based on screen or parent element
        adjustmentRatio:{
          width:100,
          height:100
        },
    
        // parent, in case adjustmentType is set relative to parent, or to insert if element is null
        // if not strict and containerElement is null, adds to body
        containerElement:null,
    
        // fixed size to be forced
        size:{
          width:640,
          height:480
        },
    
        // needs to return object with width and height
        // used when adjustmentType == "custom"
        customSize:function(canvasElement,containerElement,windowElement,config){
          return {
            width:640,
            height:480
          }
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
                htmlElementAttributes:{
                  id:"canvazator",
                  classes:[],
                  attributes:{name:value}
                },
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
    
    console.log(defaultConfig.canvas.containerElement)
    this.config = Canvazator.ObjectMerger.merge(defaultConfig, config);
    console.log(defaultConfig.canvas.containerElement)
    console.log(config.canvas.containerElement)

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
    if (typeof _canvas !== "object") {
      throw new Error("No config.canvas found on substracting");
      return;
    }

    var createdCanvas = false;
    // creates? canvas
    if (typeof _canvas.element == "string") {
      _canvas.element = document.getElementById(_canvas.element);
      if (_canvas.element == null) {
        if (_canvas.strict) {
          throw new Error("strict: Canvas element with id "+_canvas.element+" not found");
          return;
        } else {
          console.warn("Canvas element with id "+_canvas.element+" was not found");
        }
      }
    }
    if (_canvas.element == null) {
      _canvas.extendExistingElementAttributes = true;
      _canvas.element = document.createElement("canvas");
      createdCanvas = true;
    }
    if (_canvas.element.constructor == null || _canvas.element.constructor.name != "HTMLCanvasElement") {
      if (_canvas.strict) {
        throw new Error("strict: Element set to use as canvas is invalid");
        return;
      } else {
        console.warn("Element set to use as canvas is invalid, a new element will be assigned");
      }
      _canvas.element = document.createElement("canvas");
      createdCanvas = true;
    }

    // appends canvas
    if (_canvas.element.parentElement == null) {
      if (typeof _canvas.containerElement == "string") {
        _canvas.containerElement = document.getElementById(_canvas.containerElement);
        if (_canvas.containerElement == null) {
          if (_canvas.strict) {
            throw new Error("strict: Container for canvas with id "+_canvas.containerElement+" was not found")
            return;
          } else {
            console.warn("Container for canvas with id "+_canvas.containerElement+" was not found");
          }
        }
      }
      if (_canvas.containerElement == null) {
        if (_canvas.strict) {
          throw new Error("strict: Canvas is not on DOM and no container is set to receive it")
          return;
        } else {
          console.warn("Canvas is not on DOM and no container is set to receive it, will use document.body");
        }
        _canvas.containerElement = document.body
      }
      _canvas.containerElement.appendChild(_canvas.element);
    }
    if (_canvas.extendExistingElementAttributes) {
      new Canvazator.HTMLAttributeHandler().handle(_canvas.element,_canvas.htmlElementAttributes);
    }

    // updates _canvas.size if needed
    if (!createdCanvas && _canvas.adjustmentType != 'fixed-size') {
      _canvas.size.width = _canvas.element.width;
      _canvas.size.height = _canvas.element.height;
    }

    // obtains window and parent size
    var windowSize = {width:window.innerWidth, height:window.innerHeight}
    var containerSize = {width:_canvas.containerElement.clientWidth, height:_canvas.containerElement.clientHeight}
    // then the ratio
    if (_canvas.adjustmentType == "fill-screen" || _canvas.adjustmentType == "fill-element") {
      _canvas.adjustmentRatio = {
        width:100,
        height:100
      }
    }
    if (_canvas.adjustmentType == "maintain-ratio-screen") {
      _canvas.adjustmentRatio = {
        width:_canvas.size.width / windowSize.width * 100,
        height:_canvas.size.height / windowSize.height * 100
      }
    }
    if (_canvas.adjustmentType == "maintain-ratio-element") {
      _canvas.adjustmentRatio = {
        width:_canvas.size.width / containerSize.width * 100,
        height:_canvas.size.height / containerSize.height * 100
      }
    }

    this.updateSize(_canvas)

  }

  updateSize(config) {
    var newSize;
    switch (config.adjustmentType) {
      case "fill-screen":
        newSize = {width:window.innerWidth, height:window.innerHeight};
        break;
      case "fill-element":
        newSize = {width:_canvas.containerElement.clientWidth, height:_canvas.containerElement.clientHeight};
        break;
      case "maintain-ratio-screen":
        newSize = {
          width:window.innerWidth * config.adjustmentRatio.width,
          height:window.innerHeight * config.adjustmentRatio.height
        };
        break;
      case "maintain-ratio-element":
        newSize = {
          width:config.containerElement.clientWidth * config.adjustmentRatio.width,
          height:config.containerElement.clientHeight * config.adjustmentRatio.height
        };
        break;
      case "fixed-size":
        newSize = {width:config.element.width, height:config.element.height}
        break;
      case "custom":
        newSize = config.customSize(config.element,config.containerElement,window,config);
        break;
      default:
        console.error("Unknown adjustmentType "+config.adjustmentType);
    }
    config.element.width = newSize.width;
    config.element.height = newSize.height;
  }

  updateGlobals(obj) {

  }

}


/*
  give me an element, like <div>;

  then i turn this

  htmlElementAttributes:{
    id:"canvazator",
    classes:["ball","reddish"],
    attributes{
      "data-thing":"stuff"
    }
  }

  into this

  <div id="canvazator2" class="ball reddish" data-thing="stuff"></div>
*/

Canvazator.HTMLAttributeHandler = class HTMLAttributeHandler {
  constructor(elm, data) {
    this.handle(elm, data)
  }

  handle(elm, data) {
    if (elm == null || data == null) return;
    if (data.id != null && data.id != undefined) {
      var existingElmWithThisId = document.getElementById(data.id)
      if (existingElmWithThisId != null && existingElmWithThisId != elm) {
        var idn = 2;
        existingElmWithThisId = document.getElementById(data.id+idn)
        while (existingElmWithThisId != null && existingElmWithThisId != elm && idn < 16384) {
          idn++;
          existingElmWithThisId = document.getElementById(data.id+idn)
        }
        data.id+=idn;
      }

      elm.id = data.id;
    }
    if (typeof data.classes == "string" ) {
      elm.classList.value = data.classes;
    }
    if (typeof data.classes == "object" && data.classes.length > 0) {
      elm.classList.value = data.classes.join(" ");
    }
    if (data.attributes) {
      Object.keys(data.attributes).forEach(key => {
        elm.setAttribute(key,data.attributes[key]);
      })
    }
  }
}

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

