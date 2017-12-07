
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
    }
    if (_canvas.element.constructor == null || _canvas.element.constructor.name != "HTMLCanvasElement") {
      if (_canvas.strict) {
        throw new Error("strict: Element set to use as canvas is invalid");
        return;
      } else {
        console.warn("Element set to use as canvas is invalid, a new element will be assigned");
      }
      _canvas.element = document.createElement("canvas");
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
    var windowSize = {width:window.innerWidth, height:window.innerHeight;}
    var containerSize = {width:_canvas.containerElement.clientWidth, height:_canvas.containerElement.clientHeight;}
    var canvasSize = {width:_canvas.element.clientWidth, height:_canvas.element.clientHeight;}


    // bind the resize events
    // obtain context
    // obtain width/height

  }
  updateGlobals(obj) {

  }

}
