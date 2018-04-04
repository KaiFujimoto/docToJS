const Board = require('./board');

class View {
  constructor(el) {
    this.$el = el;
    this.$li = null;
    this.board = new Board(30);
    this.setupGrid();
    this.gameOver = true;
    this.pause = false;

    $l("html").on("keydown", this.handleKeyEvent.bind(this));

    $l("button.presstopause").on("mousedown", this.handleMousePause.bind(this));

    $l("button.presstoplay").on("mousedown", this.handleMousePlay.bind(this));
  }

  handleMousePlay() {
    if ($l('div').nodes[0].className === "paused") {
      return;
    } else if (!this.gameOver) {
      this.board = new Board(30);
      this.setupGrid();
      window.clearInterval(this.interval);
      this.gameOver = true;
      this.pause = false;
      this.speed = 500;
      this.play();
    } else {
      this.board = new Board(30);
      window.clearInterval(this.interval);
      this.gameOver = false;
      this.pause = false;
      this.speed = 500;
      this.play();
    }
  }

  handleMousePause () {
    if (!this.gameOver) {
      if ($l('div').nodes[0].className === "unpaused") {
        $l('div').nodes[0].className = "paused";
        this.pause = true;
      } else {
        $l('div').nodes[0].className = "unpaused";
        this.pause = false;
        this.play();
      }
    }
  }

  handleKeyEvent(event) {
    switch (event.keyCode) {
      case 38:
        this.board.snake.turn("U");
        break;
      case 39:
        this.board.snake.turn("R");
        break;
      case 40:
        this.board.snake.turn("D");
        break;
      case 37:
        this.board.snake.turn("L");
        break;

    }
  }

  render() {
      this.updateClasses(this.board.snake.position, "snake");
      this.updateClasses(this.board.mouse.position, "mouse");
  }

  updateClasses(position, className) {
    this.$li.forEach((li) => {
      if (li.className.includes(className)) {
        $l(li).removeClass(className);
      }
    });

    position.forEach( pos => {
      const posi = (pos.x * this.board.dim) + pos.y;
      if ($l(this.$li[posi]) === undefined) {
        this.gameOver = true;
        return;
      } else {
        $l(this.$li[posi]).addClass(className);
      }
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
    this.$li = this.$el.find("li");
  }

  play() {
    if (this.gameOver) {
      return;
    } else if (this.paused) {
      return;
    } else {
      this.interval = window.setInterval(
        this.step.bind(this),
        this.speed
      );
    }
  }


  step() {
    if (this.board.snake.position.length > 0 && !this.pause) {
      this.board.snake.move();
      this.render();
    } else if (this.pause) {
      window.clearInterval(this.interval);
    } else {
      window.clearInterval(this.interval);
    }
  }
}


module.exports = View;
