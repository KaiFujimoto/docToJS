const DomNodeCollection = require("./dom_node_collection.js");

$l = function(arg) {
  let elementList;
  switch (typeof arg) {
    case "string":
      elementList = document.querySelectorAll(arg);
      nodes = Array.from(elementList);
      return new DomNodeCollection(nodes);
    case "object":
      if (arg instanceof HTMLElement) {
        return new DomNodeCollection([arg]);
      }
  }
};
