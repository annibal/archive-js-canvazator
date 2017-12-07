
// i'm in charge of making a solid ground!

Canvazator.Substract = class Substract {
  constructor(_canvas) {
    this.create(_canvas);
  }
  create(_canvas) {
    if (typeof _canvas !== "object") {
      throw new Error("No config.canvas found on substracting");
    }
    if (_canvas.element == null) {
      _canvas.element = document.createElement("canvas");
      if (_canvas.strict && _canvas.containerElement == null) {
        throw new Error("strict: No container element to insert a canvas");
      }
    }
    if ( ((_canvas.element||{}).constructor||{}).name == "HTMLCanvasElement" && (_canvas.element||{}).parentElement != null ) {

    }
    // check if parameter _canvas is a DOM element, a id, or null
    // create or find the canvas
    // bind the resize events
    // obtain context
    // obtain width/height

  }
  updateGlobals(obj) {

  }
  
}
