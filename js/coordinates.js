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
