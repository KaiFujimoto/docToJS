const Snake = require('./snake');
const Coordinate = require('./coordinates');
const Mouse = require('./mouse');

class Board {
  constructor(dim) {
    this.dim = dim;
    this.snake = new Snake(this);
    this.mouse = new Mouse(this);
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

  validMove(snake) {
    return (snake[0].x >= 0) && (snake[0].y < this.dim) && (snake[0].x < this.dim) && (snake[0].y >= 0);
  }

  render() {
    let grid = Board.newBoard();

    this.snake.position.forEach(position => {
      grid[position.x][position.y] = Snake.LABEL;
    });

    this.mouse.replace();

  }
}

module.exports = Board;
