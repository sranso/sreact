import VirtualPatch from './constructors/VirtualPatch';
import { VirtualText } from './constructors/VirtualNode';
import createElement from './createElement';


/*
 * diff two trees
 *
 * return array of patches
 */
const diff = (oldTree, newTree) => {
  return walk(oldTree.children[0], newTree, oldTree);
};

const walk = (oldTree, newTree, parentNode) => {
  if (oldTree === newTree) {
    return;
  }

  if (!oldTree) {
    // ADD
    newTree.$el = createElement(newTree);
    recursivelyAssignEls(newTree.$el, newTree);
    return [new VirtualPatch(newTree, parentNode, 'ADD')];
  } else if (!newTree) {
    // DEL
    return [new VirtualPatch(oldTree, parentNode, 'DEL')];
  } else {
    if ( (oldTree instanceof VirtualText && newTree instanceof VirtualText &&
                oldTree.text !== newTree.text) ||
                oldTree.elType !== newTree.elType ||
                !attsAreSame(oldTree.attributes, newTree.attributes) ) {
      // REPL
      // a. is text node with diff values
      // b. are different types
      // c. have different attributes
      // TODO: only change the atts, not entire node
      newTree.$el = createElement(newTree);
      recursivelyAssignEls(newTree.$el, newTree);
      return [new VirtualPatch(newTree, parentNode, 'REPL', oldTree)];
    } else {
      // check children
      // TODO: allow for individual children to change, rather than modifying
      // all children after a changed node

      newTree.$el = oldTree.$el;

      const maxChildren = Math.max(oldTree.children.length, newTree.children.length);
      let childPatchesArray = [];

      for (let i = 0; i <= maxChildren; i++) {
        const oldTreeChild = oldTree.children[i];
        const newTreeChild = newTree.children[i];
        const childPatch = walk(oldTreeChild, newTreeChild, oldTree);
        if (childPatch) {
          childPatchesArray = childPatchesArray.concat(childPatch);
        }
      }
      return childPatchesArray;
    }
  }

};

const recursivelyAssignEls = (node, newTree) => {
  newTree.$el = node;
  if (node.childNodes && node.nodeType !== 3) {
    for (let i = 0; i < node.childNodes.length; i++) {
      recursivelyAssignEls(node.childNodes[i], newTree.children[i]);
    }
  }
};

const attsAreSame = (oldTree, newTree) => {
  const oldTreeKeys = Object.keys(oldTree);
  const newTreeKeys = Object.keys(newTree);

  if (oldTreeKeys.length !== newTreeKeys.length) {
    return false;
  }

  for (let i = 0; i < oldTreeKeys.length; i++) {
    const key = oldTreeKeys[i];
    if (oldTree.hasOwnProperty(key) && newTree.hasOwnProperty(key)) {
      if (key === 'style') {
        if (!attsAreSame(oldTree[key], newTree[key])) {
          return false;
        }
      } else {
        if (oldTree[key] !== newTree[key]) {
          return false;
        }
      }
    } else {
      return false;
    }
  }

  return true;
};


export default diff;
export {
  walk,
  attsAreSame,
  recursivelyAssignEls
};
