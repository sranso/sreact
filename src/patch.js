import VirtualPatch from './constructors/VirtualPatch';
import { VirtualText } from './constructors/VirtualNode';
import createElement from './createElement';

/*
 * apply patches to root tree
 *
 * apply patches to domNode and return updated domNode
 */
const patch = (domNode, patches) => {
  const patchIndices = Object.keys(patches).filter((key) => {
    return patches.hasOwnProperty(key) && key !== 'left';
  });
  const applyPatchesFunc = applyPatches(patchIndices, patches);

  walkDOM(domNode, applyPatchesFunc);

  return domNode;
};

const walkDOM = (node, func) => {
  func(node);
  node = node.firstChild;
  while (node) {
    walkDOM(node, func);
    node = node.nextSibling;
  }
};

const applyPatches = (indices, patches) => {
  return (node) => {
    if (node.nodeType !== 3) {
      const nodeId = node.dataset.id;
      if (indices.includes(nodeId)) {
        return applyPatch(node, patches[nodeId]);
      }
    }
  };
};

const findChild = ($parentNode, target) => {
  for (var child of $parentNode.childNodes) {
    if (Number(child.dataset.id) == target.id) {
      return child;
    }
  }
};

const applyPatch = ($targetNode, patch) => {
  const { patch: patchNode, type, target } = patch;
  let el;
  if (type === 'DEL') {
    $targetNode.removeChild(
      findChild($targetNode, target)
    )
  } else if (type === 'ADD') {
    el = createElement(patchNode);
    $targetNode.appendChild(el);
  } else if (type === 'REPL') {
    el = createElement(patchNode);
    $targetNode.replaceChild(
      el,
      findChild($targetNode, target)
    );
  }
};


export default patch;
export {
  applyPatches,
  applyPatch,
  walkDOM
};
