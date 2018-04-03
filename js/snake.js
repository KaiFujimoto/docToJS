const Coordinate = require('./coordinates');

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

    if (this.board.validMove(snake)) {
      return true;
    } else if ((this.crashedIntoSelf())) {
      return true;
    } else {
      return false;
    }

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

    if (!(this.checkMove())) {
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
