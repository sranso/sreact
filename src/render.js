import createElement from './createElement';
import createNode from './createNode';
import { VirtualNode } from './constructors/VirtualNode';
import diff from './diff';
import patch from './patch';


let tree = new VirtualNode('', {}, []);

const render = (vRoot, domRoot) => {
  if (!tree.$el) {
    tree.$el = domRoot;
  }
  let patches = diff(tree, vRoot)
  patch(domRoot, patches)
  let newTree = new VirtualNode('', {}, [vRoot]);
  newTree.$el = domRoot;
  tree = newTree;

  return tree;
}



export default render;
