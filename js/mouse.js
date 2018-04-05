const Coordinate = require('./coordinates');

class Mouse {
  constructor(board) {
    this.board = board;
    this.position = null;
    this.class = "";
    this.replace();
  }

  replace() {
  let x = Math.floor(Math.random() * this.board.dim);
  let y = Math.floor(Math.random() * this.board.dim);
  let random = Math.round(Math.random() * 2);
  debugger
  while (this.board.snake.isAt([x, y])) {
    x = Math.floor(Math.random() * this.board.dim);
    y = Math.floor(Math.random() * this.board.dim);
  }
    this.class = POSSIBLE_CLASSES[random];
    this.position = [new Coordinate(x, y)];
  }
}

POSSIBLE_CLASSES = ["facebook", "google", "apple"];

module.exports = Mouse;
