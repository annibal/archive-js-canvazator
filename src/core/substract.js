
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
