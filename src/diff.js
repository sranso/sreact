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
  } else if (oldTree instanceof VirtualText && newTree instanceof VirtualText) {
    if (oldTree.text !== newTree.text) {
      // REPL
      // a. is text node with diff values
      newTree.$el = createElement(newTree);
      recursivelyAssignEls(newTree.$el, newTree);
      return [new VirtualPatch(newTree, parentNode, 'REPL', oldTree)];
    } else {
      return;
    }
  } else {
    if ( oldTree.elType !== newTree.elType ||
         !attsAreSame(oldTree.attributes, newTree.attributes) ) {
      // REPL
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

const attsAreSame = (oldTreeAtts, newTreeAtts) => {
  if (!oldTreeAtts || !newTreeAtts) return true;

  const oldTreeAttsKeys = Object.keys(oldTreeAtts);
  const newTreeAttsKeys = Object.keys(newTreeAtts);

  if (oldTreeAttsKeys.length !== newTreeAttsKeys.length) {
    return false;
  }

  for (let i = 0; i < oldTreeAttsKeys.length; i++) {
    const key = oldTreeAttsKeys[i];
    if (oldTreeAtts.hasOwnProperty(key) && newTreeAtts.hasOwnProperty(key)) {
      if (key === 'style') {
        if (!attsAreSame(oldTreeAtts[key], newTreeAtts[key])) {
          return false;
        }
      } else if (/^on\w*/.test(key)) {
        if (newTreeAtts[key].toString() !== oldTreeAtts[key].toString()) {
          return false;
        }
      } else {
        if (oldTreeAtts[key] !== newTreeAtts[key]) {
          return false;
        }
      }
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
