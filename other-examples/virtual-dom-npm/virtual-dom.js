var h = require('virtual-dom/h');
var diff = require('virtual-dom/diff');
var patch = require('virtual-dom/patch');
var createElement = require('virtual-dom/create-element');

// 1: Create a function that declares what the DOM should look like
function render(count, newEl)  {
    var children = [String(count)];
    if (newEl) {
      children.push(newEl);
    }
    var el = 'div';
    if (Math.random() > 0.5) {
      el = 'p';
    }
    return h(el, {
        style: {
            textAlign: 'center',
            lineHeight: (100 + count) + 'px', 
            border: '1px solid red',
            width: (100 + count) + 'px',
            height: (100 + count) + 'px'
        }
    }, children);
}

// 2: Initialise the document
var count = 0;      // We need some app data. Here we just store a count.

var tree = render(count);               // We need an initial tree
var rootNode = createElement(tree);     // Create an initial root DOM node ...
document.body.appendChild(rootNode);    // ... and it should be in the document

// 3: Wire up the update logic
setInterval(function () {
      count++;
      
      // if (Math.random() > 0.5) {
      //   var p = h('p', {}, ['sup bruh']);
      // }
      var newTree = render(count);
      var patches = diff(tree, newTree); // find differences
      rootNode = patch(rootNode, patches); // apply differences
      tree = newTree;
}, 1000);
