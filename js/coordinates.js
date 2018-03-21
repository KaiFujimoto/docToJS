class Coordinate {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  shift(newPosition) {
    this.x = this.x + newPosition[0];
    this.y = this.y + newPosition[1];
  }

  shiftCheck(newPosition) {
    return !((newPosition[0] === this.x) && (newPosition[1] === this.y));
  }

  sameDirection(newPosition) {
    return ((newPosition[0] === this.x) || (newPosition[1] === this.y));
  }
}

module.exports = Coordinate;
