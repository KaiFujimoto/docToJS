const Coordinate = require('./coordinates');

class Mouse {
  constructor(board) {
    this.board = board;
    this.position = null;
    this.replace();
  }

  replace() {
  let x = Math.floor(Math.random() * this.board.dim);
  let y = Math.floor(Math.random() * this.board.dim);

  while (this.board.snake.isAt([x, y])) {
    x = Math.floor(Math.random() * this.board.dim);
    y = Math.floor(Math.random() * this.board.dim);
  }

    this.position = [new Coordinate(x, y)];
  }
}

module.exports = Mouse;
