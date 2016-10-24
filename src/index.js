import createNode from './createNode';
import { VirtualNode } from './constructors/VirtualNode';
import createElement from './createElement';
import diff from './diff';
import patch from './patch';
import render from './render';


let count = 0;

let tree = createNode('div', {}, [count], true);

// Add everything to initial tree
let initialPatch = diff(new VirtualNode('', {}, []), tree)
let rootNode = patch(document.getElementById('app'), initialPatch)

render(tree, rootNode);

setInterval(() => {
  count += 1;
  // params -> VirtualNode
  let newTree = createNode('div', {}, [count]);
  // (VirtualNode, VirtualNode) -> { patches }
  let patches = diff(tree, newTree);
  // (DOM, patches) -> DOM
  rootNode = patch(rootNode, patches);
  tree = newTree;
}, 1000);
