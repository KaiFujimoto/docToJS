const $l = require('./main');
const View = require('./snake_view');

$l(function () {
  const rootEl = $l('.snake-game');
  new View(rootEl);
});
