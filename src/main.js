
// i take care of starting the stuff!

class Canvazator {
  constructor(config) {

    //=require defaultconfig.js;
    Object.assign(defaultConfig, config);
    this.config = defaultConfig;

    // initialize Substract
    this.substract = Canvazator.Substract(config.canvas);
    this.substract.updateGlobals(this);

    // call loader to load stuff
    this.loader = Canvazator.Loader(config.assets);

    // initialize input to listen for events
    this.input = Canvazator.Input(config.input);

    // start the engines
    this.engine = Canvazator.Engine();
  }
}

//=require thing.js
//=require core/engine.js
//=require core/input.js
//=require core/loader.js
//=require core/substract.js
//=require helpers/math.js
//=require helpers/mesh.js
//=require helpers/particles.js
//=require helpers/random.js
