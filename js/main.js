const DomNodeCollection = require("./dom_node_collection.js");

const queue = [];
let loaded = false;

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
      break;
    case "function":
      queuedCallback(arg);
  }
};

$l.extend = (base, ...objs) => {
  objs.forEach((obj) => {
    for (const prop in obj) {
      base[prop] = obj[prop];
    }
  });
  return base;
};

$l.ajax = (optionsObj) => {
  return new Promise((resolve, reject) => {
    const defaults = {
      contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
      method: 'GET',
      url: '',
      data: {},
    };
    const xhr = new XMLHttpRequest();
    request = $l.extend(defaults, optionsObj);

    xhr.open(request.method, request.url, true);
    xhr.onload = function(e) {
      if (this.status === 200) {
        resolve(JSON.parse(xhr.response));
      } else {
        reject(JSON.parse(xhr.response));
      }
    };

    xhr.send(JSON.stringify(request.data));
  });
};

queuedCallback = func => {
  if (!loaded) {
    queue.push(func);
  } else {
    func();
  }
};

document.addEventListener('DOMContentLoaded', () => {
  loaded = true;
  queue.forEach(func => func());
});

module.exports = $l;
