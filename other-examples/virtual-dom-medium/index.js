/** @jsx h */

/* returns virtual DOM node */
function h(type, props, ...children) {
  return { type, props, children };
}

/*
 * takes a virtual DOM node
 * returns a real DOM node
 */
function createElement(node) {
  if (typeof node === 'string' ||
      typeof node === 'number') {
    return document.createTextNode(node);
  }
  const $el = document.createElement(node.type);
  node.children
    .map(createElement)
    .forEach($el.appendChild.bind($el));
  return $el;
}

function changed(node1, node2) {
  return typeof node1 !== typeof node2 ||
         (typeof node1 === 'string' ||
         typeof node1 === 'number') &&
         node1 !== node2 ||
         node1.type !== node2.type
}

function updateElement($parent, newNode, oldNode, index = 0) {
  if (!oldNode) {
    $parent.appendChild(
      createElement(newNode)
    );
  } else if (!newNode) {
    $parent.removeChild(
      $parent.childNodes[index]
    );
  } else if (changed(newNode, oldNode)) {
    $parent.replaceChild(
      createElement(newNode),
      $parent.childNodes[index]
    );
  } else if (newNode.type) {
    const newLength = newNode.children.length;
    const oldLength = oldNode.children.length;
    for (let i = 0; i < newLength || i < oldLength; i++) {
      updateElement(
        $parent.childNodes[index],
        newNode.children[i],
        oldNode.children[i],
        i
      );
    }
  }
}

// ---------------------------------------------------------------------

/*
 * use jsx to write DOM tree.
 * this will be transpiled by babel to something more like h('ul', {...}, [..])
 * returns plan JS objects, our virtual DOM representation
 */



let count = 0;
const rootTree = (
  <ul className="list">
    <li>item 1</li>
    <li>{count}</li>
  </ul>
);
const $root = document.getElementById('root');
updateElement($root, rootTree);

setInterval(() => {
  count += 1;
  let newTree = (
    <ul className="list">
      <li>item 1</li>
      <li>{count}</li>
    </ul>
  );
  updateElement($root, newTree, rootTree);
}, 1000);
