const Coordinate = require('./coordinates');
const Mouse = require('./mouse');

class Snake {
  constructor(board) {
    this.direction = "U";
    this.position = [new Coordinate(Math.floor(board.dim/2), Math.floor(board.dim/2))];
    this.board = board;
    this.turning = false;
    this.growing = 0;
  }

  currentPosition() {
    return this.position.slice(this.position.length - 1);
  }

  checkMove() {
    const snake = this.currentPosition();
    if (this.board.validMove(snake) && !(this.crashedIntoSelf())) {
      return false;
    } else {
      return true;
    }

  }

  crashedIntoSelf() {
    let crashed = false;
    for (let i = 0; i < this.position.length - 1; i++) {
      if (this.position[i].equals(this.currentPosition()[0])) {
        crashed = true;
        return crashed;
      }
    }
    return crashed;
  }

  isAt(position) {
    let result = false;
    this.position.forEach(pos => {

      if (pos.x === position[0] && pos.y === position[1]) {
        result = true;
        return result;
      }
    });
    return result;
  }

  destroySnek() {
    this.position = [];
  }

  eatOrNotEatMouse() {
    if (this.currentPosition()[0].x === this.board.mouse.position[0].x && this.currentPosition()[0].y === this.board.mouse.position[0].y) {
      this.growing += 1;
      return true;
    }
    return false;
  }

  move() {
    this.position.push(this.currentPosition()[0].plus(
      Snake.TURNS[this.direction])
    );
    this.turning = false;

    if (this.eatOrNotEatMouse()) {
      this.board.mouse.replace();
    }

    if (this.growing > 0) {
      this.growing -= 1;
    } else {
      this.position.shift();
    }

    if ((this.checkMove())) {
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
