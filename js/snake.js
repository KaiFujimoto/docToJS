const Coordinate = require('./coordinates');

class Snake {
  constructor(dim) {
    this.snake = snake;
    this.direction = "U";
    this.position = new Coordinate(Math.floor(dim/2), Math.floor(dim/2));
    this.turning = false;
  }

  currentPosition() {
    this.position.slice(-1);
  }

  move(direction) {
    this.position.push(currentPosition.shift(
      Snake.TURNS[direction])
    );

    this.turning = false;
  }

  turn(coordinate) {
    if (!(coordinate.sameDirection(this.position))) {
      this.turning = true;
    }
  }

}

Snake.DIRECTIONS = ["U", "D", "L", "R"];

Snake.TURNS = {
  "U": new Coordinate(0, 1),
  "D": new Coordinate(0, -1),
  "L": new Coordinate(-1, 0),
  "R": new Coordinate(1, 0)
};

Snake.LABEL = 's';

module.exports = Snake;
