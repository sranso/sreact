import { VirtualNode } from "./constructors/VirtualNode";
import diff from "./diff";
import patch from "./patch";

let tree = new VirtualNode("", {}, []);

const render = (vRoot, domRoot) => {
  if (!tree.$el) {
    tree.$el = domRoot;
  }
  const patches = diff(tree, vRoot);
  patch(domRoot, patches);
  const newTree = new VirtualNode("", {}, [vRoot]);
  newTree.$el = domRoot;
  tree = newTree;

  console.log("patchNode", patches[0].patchNode);
  console.log("vRoot", vRoot);

  return tree;
};

export default render;
