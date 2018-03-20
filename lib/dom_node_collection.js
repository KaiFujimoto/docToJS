class DomNodeCollection {
  constructor(nodes) {
    this.nodes = nodes;

  }

 //  on(eventName, selector, callback) {
 //    if (selector) {
 //      const matches = document.querySelectorAll(selector);
 //      matches.forEach(match => {
 //        if (selector.includes(node.localName)) {
 //          match.addEventListener(eventName, callback);
 //          const eventKey = `jqliteEvents-${eventName}`;
 //          if (typeof match[eventKey] === "undefined") {
 //            match[eventKey] = [];
 //          }
 //          match[eventKey].push(callback);
 //        }
 //      });
 //    } else {
 //      this.each((node) => {
 //        node.addEventListener(eventName, callback);
 //        const eventKey = `jqliteEvents-${eventName}`;
 //        if (typeof node[eventKey] === "undefined") {
 //          node[eventKey] = [];
 //        }
 //        node[eventKey].push(callback);
 //      });
 //    }
 //  }
 //
 //  off(eventName) {
 //   this.each((node) => {
 //     const eventKey = `jqliteEvents-${eventName}`;
 //     if (node[eventKey]) {
 //       node[eventKey].forEach((callback) => {
 //         node.removeEventListener(eventName, callback);
 //       });
 //     }
 //     node[eventKey] = [];
 //   });
 // }

  each(callback) {
    this.nodes.forEach(callback);
  }

  html(html) {
    if (typeof html === 'string') {
      this.each(e => {
        e.innerHTML = html;
      });
    } else if (this.nodes.length > 0) {
      return this.nodes[0].innerHTML;
    }
  }

  empty() {
    this.each(e => e.innerHTML = '');
  }

  childAppender(children) {
    this.nodes.forEach( node => {
      children.each(childNode => {
        node.appendChild(childNode.cloneNode(true));
      });
    });
  }

  append(children) {
    if (this.nodes.length === 0) return;
    switch (typeof children) {
      case ("object"):
        if (children instanceof DomNodeCollection) {
          this.childAppender(children);
        } else {
          children = $l(children);
          this.childAppender(children);
        }
        break;
      case ("string"):
        this.each((node) => {
          node.innerHTML += children;
        });
    }
  }

  attr(attributeName, value) {
    if (typeof value === 'string') {
      return this.nodes.map ( node => {
        node.setAttribute(attributeName, value);
        return node;
      });
    } else {
      return this.nodes[0].getAttribute(attributeName);
    }
  }

  addClass(className) {
    this.each(e => {
      let classNames = e.className.split(" ");
      if (!classNames.includes(className)) {
        e.className = (`${e.className} ${className}`).trim();      }
    });

    return this.nodes;
  }

  removeClass(oldClass) {
    this.each( node => node.classList.remove(oldClass));
    return this.nodes;
  }

  children() {
    let children = [];
      this.each( node => {
        let childrenArray = Array.from(node.children);
        children = children.concat(childrenArray);
      });

    const newDom = new DomNodeCollection(children);
    return newDom.nodes;
  }

  parent() {
    let parents = [];

    this.each( node => {
      if (!(parents.includes(node.parentNode))) {
        parents.push(node.parentNode);
      }
    });

    const newDom = new DomNodeCollection(parents);
    return newDom.nodes;
  }

  find(selector) {
    let searchResults = [];
    this.each( node => {
      const matches = node.querySelectorAll(selector);
      searchResults = searchResults.concat(Array.from(matches));
    });

    const newDom = new DomNodeCollection(searchResults);
    return newDom.nodes;
  }

  remove(selector) {
    if (selector) {
      this.each( node => {
        const matches = document.querySelectorAll(selector);
        matches.forEach(match => {
          if (selector.includes(node.localName)) {
            match.parentNode.removeChild(match);
          }
        });
      });
      return this.nodes;
    } else {
      this.each(node => node.parentNode.removeChild(node));
      return this.nodes;
    }
  }
}

module.exports = DomNodeCollection;
