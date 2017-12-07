
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
