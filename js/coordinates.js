class Coordinate {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  plus(newPosition) {
    return new Coordinate(this.x + newPosition.x, this.y + newPosition.y);
  }

  equals(newPosition) {
    return (newPosition.x === this.x) && (newPosition.y === this.y);
  }

  isOpposite(newPosition) {
    return ((newPosition.x === (-1 * this.x)) || (newPosition.y === (-1 * this.y)));
  }
}

module.exports = Coordinate;
