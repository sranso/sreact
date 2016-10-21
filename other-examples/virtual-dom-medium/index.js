/** @jsx h */

function h(type, props, ...children) {
  return { type, props, children };
}

function createElement(node) {
  if (typeof node === ('string' || 'number')) {
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
         typeof node1 === ('string' || 'number') && node1 !== node2 ||
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

const a = (
  <ul>
    <li>item 1</li>
    <li>item 2</li>
  </ul>
);

const b = (
  <ul>
    <li>item 1</li>
    <li>hello!</li>
  </ul>
);

const $root = document.getElementById('root');
const $reload = document.getElementById('reload');

updateElement($root, a);
$reload.addEventListener('click', () => {
  updateElement($root, b, a);
});



// /** @jsx h */

// /* returns virtual DOM node */
// function h(type, props, ...children) {
//   return { type, props, children };
// }

// /*
//  * takes a virtual DOM node
//  * returns a real DOM node
//  */
// function createElement(node) {
//   if (typeof node === 'string' || 'number') {
//     return document.createTextNode(node);
//   }
//   const $el = document.createElement(node.type);
//   node.children
//     .map(createElement)
//     .forEach($el.appendChild.bind($el));
//   return $el;
// }


// function updateElement($parent, newNode, oldNode, index = 0) {
//   if (!oldNode) {
//     $parent.appendChild(
//       createElement(newNode)
//     );
//   } else if (!newNode) {
//     $parent.removeChild(
//       $parent.childNodes[index]
//     );
//   } else if (changed(newNode, oldNode)) {
//     $parent.replaceChild(
//       createElement(newNode),
//       $parent.childNodes[index]
//     );
//   } else if (newNode.type) {
//     const maxLen = Math.max(newNode.children.length, oldNode.children.length);
//     for (let i = 0; i < maxLen; i++) {
//       console.log(
//         $parent.childNodes[index],
//         newNode.children[i],
//         oldNode.children[i],
//         i
//       );
//       updateElement(
//         $parent.childNodes[index],
//         newNode.children[i],
//         oldNode.children[i],
//         i
//       );
//     }
//   }
// }

// function changed(newNode, oldNode) {
//   return typeof newNode !== typeof oldNode ||
//          typeof newNode === ('string' || 'number') && newNode !== oldNode ||
//          newNode.type !== oldNode.type
// }

// /*
//  * use jsx to write DOM tree.
//  * this will be transpiled by babel to something more like h('ul', {...}, [..])
//  * returns plan JS objects, our virtual DOM representation
//  */
// let count = 0;
// const rootTree = (
//   <ul className="list">
//     <li>item 1</li>
//     <li>{count}</li>
//   </ul>
// );
// const $root = document.getElementById('root');
// updateElement($root, rootTree);
// const newTree = (
//   <ul className="list">
//     <li>item 1</li>
//     <li>hello</li>
//   </ul>
// );

// updateElement($root, newTree, rootTree);

// // setInterval(() => {
// //   count += 1;
// //   let newTree = (
// //     <ul className="list">
// //       <li>item 1</li>
// //       <li>{count}</li>
// //     </ul>
// //   );
// //   updateElement($root, newTree, tree);
// // }, 1000);
