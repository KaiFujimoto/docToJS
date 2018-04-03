/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

class Coordinate {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  plus(newPosition) {
    return new Coordinate(this.x + newPosition.x, this.y + newPosition.y);
  }

  equals(newPosition) {
    return !((newPosition[0] === this.x) && (newPosition[1] === this.y));
  }

  isOpposite(newPosition) {
    return ((newPosition[0] === (-1 * this.x)) || (newPosition[1] === (-1 * this.y)));
  }
}

module.exports = Coordinate;


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

const $l = __webpack_require__(2);
const View = __webpack_require__(4);

$l(function () {
  const rootEl = $l('.snake-game');
  new View(rootEl);
});


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

const DomNodeCollection = __webpack_require__(3);

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


/***/ }),
/* 3 */
/***/ (function(module, exports) {

class DomNodeCollection {
  constructor(nodes) {
    this.nodes = nodes;

  }

  on(eventName, callback) {
    this.each((node) => {
      node.addEventListener(eventName, callback);
      const eventKey = `jqliteEvents-${eventName}`;
      if (typeof node[eventKey] === "undefined") {
        node[eventKey] = [];
      }
      node[eventKey].push(callback);
    });
  }

  off(eventName, selector) {
     this.each((node) => {
       const eventKey = `jqliteEvents-${eventName}`;
       if (node[eventKey]) {
         node[eventKey].forEach((callback) => {
           node.removeEventListener(eventName, callback);
         });
       }
       node[eventKey] = [];
     });
  }

  each(callback) {
    this.nodes.forEach(callback);
  }

  html(html) {
    if (typeof html === 'string') {
      this.each(e => {
        e.innerHTML = html;
      });
    } else if (this.nodes.length > 0) {
      return this.nodes[0].innerHTML;
    }
  }

  empty() {
    this.each(e => e.innerHTML = '');
  }

  childAppender(children) {
    this.nodes.forEach( node => {
      children.each(childNode => {
        node.appendChild(childNode.cloneNode(true));
      });
    });
  }

  append(children) {
    if (this.nodes.length === 0) return;
    switch (typeof children) {
      case ("object"):
        if (children instanceof DomNodeCollection) {
          this.childAppender(children);
        } else {
          children = $l(children);
          this.childAppender(children);
        }
        break;
      case ("string"):
        this.each((node) => {
          node.innerHTML += children;
        });
    }
  }

  attr(attributeName, value) {
    if (typeof value === 'string') {
      return this.nodes.map ( node => {
        node.setAttribute(attributeName, value);
        return node;
      });
    } else {
      return this.nodes[0].getAttribute(attributeName);
    }
  }

  addClass(className) {
    this.each(e => {
      let classNames = e.className.split(" ");
      if (!classNames.includes(className)) {
        e.className = (`${e.className} ${className}`).trim();      }
    });

    return this.nodes;
  }

  removeClass(oldClass) {
    this.each( node => node.classList.remove(oldClass));
    return this.nodes;
  }

  children() {
    let children = [];
      this.each( node => {
        let childrenArray = Array.from(node.children);
        children = children.concat(childrenArray);
      });

    const newDom = new DomNodeCollection(children);
    return newDom.nodes;
  }

  parent() {
    let parents = [];

    this.each( node => {
      if (!(parents.includes(node.parentNode))) {
        parents.push(node.parentNode);
      }
    });

    const newDom = new DomNodeCollection(parents);
    return newDom.nodes;
  }

  find(selector) {
    let searchResults = [];
    this.each( node => {
      const matches = node.querySelectorAll(selector);
      searchResults = searchResults.concat(Array.from(matches));
    });

    const newDom = new DomNodeCollection(searchResults);
    return newDom.nodes;
  }

  remove(selector) {
    if (selector) {
      this.each( node => {
        const matches = document.querySelectorAll(selector);
        matches.forEach(match => {
          if (selector.includes(node.localName)) {
            match.parentNode.removeChild(match);
          }
        });
      });
      return this.nodes;
    } else {
      this.each(node => node.parentNode.removeChild(node));
      return this.nodes;
    }
  }
}

module.exports = DomNodeCollection;


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

const Board = __webpack_require__(5);

class View {
  constructor(el) {
    this.$el = el;
    this.$li = null;
    this.board = new Board(20);
    this.setupGrid();
    this.gameOver = false;

    if (!this.gameOver) {
      this.intervalId = window.setInterval(
        this.step.bind(this),
        View.STEP_MILLIS
      );
    }

    $l("html").on("keydown", this.handleKeyEvent.bind(this));
  }

  handleKeyEvent(event) {
    if (View.KEYS[event.keyCode]) {
      this.board.snake.turn(View.KEYS[event.keyCode]);
    }
  }

  render() {
    debugger
    if (this.board.snake.checkMove()) {
      this.gameOver = true;
    } else {
      this.updateClasses(this.board.snake.position, "snake");
    }
  }

  updateClasses(position, className) {
    this.$li.forEach((li) => {
      if (li.className === className) {
        li.className = '';
      }
    });

    position.forEach( pos => {
      const posi = (pos.x * this.board.dim) + pos.y;
      $l(this.$li[posi]).addClass(className);
    });
  }

  setupGrid() {
    let html = "";

    for (let i = 0; i < this.board.dim; i++) {
      html += "<ul>";
      for (let j = 0; j < this.board.dim; j++) {
        html += "<li></li>";
      }
      html += "</ul>";
    }

    this.$el.html(html);
    this.$li = this.$el.find("li");
  }

  step() {
    if (this.board.snake.position.length > 0) {
      this.board.snake.move();
      this.render();
    }
  }
}

View.KEYS = {
  38: "U",
  39: "R",
  40: "D",
  37: "L"
};

View.STEP_MILLIS = 1000;

module.exports = View;


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

const Snake = __webpack_require__(6);
const Coordinate = __webpack_require__(0);

class Board {
  constructor(dim) {
    this.dim = dim;
    this.snake = new Snake(this);
  }

  static newBoard() {
    let grid = [];

    for (let i = 0; i < dim; i++) {
      let row = [];
      for (let j = 0; j < dim; j++) {
        row.push([i,j]);
      }
      grid.push(row);
    }

    return grid;
  }

  validMove() {

    return (this.snake.position.x >= 0) && (this.snake.position.y < this.dim) && (this.snake.position.x < this.dim) && (this.snake.position.y >= 0);
  }

  render() {
    let grid = Board.newBoard();

    this.snake.position.forEach(position => {
      grid[position.x][position.y] = Snake.LABEL;
    });

  }
}

module.exports = Board;


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

const Coordinate = __webpack_require__(0);

class Snake {
  constructor(board) {
    this.direction = "U";
    this.position = [new Coordinate(Math.floor(board.dim/2), Math.floor(board.dim/2))];
    this.board = board;
    this.turning = false;
  }

  currentPosition() {
    return this.position.slice(this.position.length - 1);
  }

  checkMove() {
    const snake = this.currentPosition();

    if (!this.board.validMove(snake)) {
      return false;
    }

    if (!(this.crashedIntoSelf())) {
      return false;
    }

    return true;
  }

  crashedIntoSelf() {
    for (let i = 0; i < this.position.length - 1; i++) {
      if (this.position[i].equals(this.currentPosition())) {
        return true;
      }
    }
    return false;
  }

  destroySnek() {
    this.position = [];
  }

  move() {
    this.position.push(this.currentPosition()[0].plus(
      Snake.TURNS[this.direction])
    );
    this.turning = false;

    this.position.shift();

    if (this.checkMove()) {
      this.destroySnek();
    }
  }

  turn(direction) {
    if ((Snake.TURNS[this.direction].isOpposite(Snake.TURNS[direction])) || this.turning) {
      return false;
    } else {
      this.turning = true;
      this.direction = direction;
    }

  }

}

Snake.DIRECTIONS = ["U", "D", "L", "R"];

Snake.TURNS = {
  "U": new Coordinate(-1, 0),
  "D": new Coordinate(1, 0),
  "L": new Coordinate(0, -1),
  "R": new Coordinate(0, 1)
};

Snake.LABEL = 's';

module.exports = Snake;


/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map