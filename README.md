# docToJS

docToJS is a small JavaScript library that helps client-side scripting of HTML.

[Basic Snake Game Implementation of docToJS](http://kai-james-chen.com/docToJS/)

Highlights:
-------------------------------------------
Ability to append multiple *unique* class names to an HTML element.
```
addClass(className) {
  this.each(e => {
    let classNames = e.className.split(" ");
    if (!classNames.includes(className)) {
      e.className = (`${e.className} ${className}`).trim();
    }
  });

  return this.nodes;
}
```

Add Event Listeners to HTML Objects.
```
on(eventName, callback) {
  this.each((node) => {
    node.addEventListener(eventName, callback);
    const eventKey = `jqliteEvents-${eventName}`;
    if (typeof node[eventKey] === "undefined") {
      node[eventKey] = [];
    }
    node[eventKey].push(callback);
  });
}
```
Example of it's use in code:
```
$l("html").on("mousedown", this.removeInstructions.bind(this));
```
