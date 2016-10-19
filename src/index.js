import createNode from './createNode';
import createElement from './createElement';
import diff from './diff';
import patch from './patch';
import render from './render';


let count = 0;

let rootTree = createNode('div', {}, [count]);
const domNode = document.getElementById('app');
render(rootTree, domNode);

setInterval(() => {
  count += 1;
  let newTree = createNode('div', {}, [count])
  let patches = diff(rootTree, newTree);
  let result = patch(domNode, patches);
  /*
   * this works, but only because we're modifying the
   * original DOM each time. we're not keeping track
   * of the latest virtual DOM anymore.
   * so, that's a TODO, hah.
   */
  // rootTree = result;
  // render(newTree, domNode);
}, 1000);
