const Snake = require('./snake');
const Coordinate = require('./coordinates');

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
    return (this.snake.position[0].x >= 0) && (this.snake.position[0].y < this.dim) && (this.snake.position[0].x < this.dim) && (this.snake.position[0].y >= 0);
  }

  render() {
    let grid = Board.newBoard();

    this.snake.position.forEach(position => {
      grid[position.x][position.y] = Snake.LABEL;
    });

  }
}

module.exports = Board;
