const Board = require('./board');

class View {
  constructor(el) {
    this.$el = el;
    this.board = new Board(20);
    this.setupGrid();

    this.intervalId = window.setInterval(
     this.step.bind(this),
     View.STEP_MILLIS
  );

    $l('window').on("keydown", this.handleKeyEvent.bind(this));
  }

  handleKeyEvent(event) {
    if (View.KEYS[event.keyCode]) {
      this.board.snake.turn(View.KEYS[event.keyCode]);
    }
  }

  render() {
    this.updateClasses(this.board.snake.position, "snake");
  }

  updateClasses(position, className) {
    this.$li.filter(`.${className}`).removeClass();
    position.forEach( pos => {
      const posi = (pos.x * this.board.dim) + pos.y;
      this.$li.eq(posi).addClass(className);
    });
  }

  setupGrid() {
    let html = "";

    for (let i = 0; i < this.board.dim; i++) {
      html += "<ul>";
      for (let j = 0; j < this.board.dim; j++) {
        html += "<li></li>";
      }
      html += "</ul>";
    }

    this.$el.html(html);
    this.$el = this.$el.find("li");
  }

  step() {
    if (this.board.snake.position.length > 0) {
      this.render();
    }
  }
}

View.KEYS = {
  38: "U",
  39: "R",
  40: "D",
  37: "L"
};

View.STEP_MILLIS = 1000;

module.exports = View;
