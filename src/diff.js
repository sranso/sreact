import VirtualPatch from './constructors/VirtualPatch';
import { VirtualText } from './constructors/VirtualNode';
import createElement from './createElement';


/*
 * diff two trees
 *
 * return array of patches
 */
const diff = (oldTree, newTree) => {
  // this grabs the first child from the #root element,
  // which we don't want to modify
  const oldNode = oldTree.children[0];
  return walk(oldNode, newTree, oldTree);
};

const walk = (oldNode, newNode, oldParentNode) => {
  if (oldNode === newNode) {
    return;
  }

  if (!oldNode) {
    // ADD
    recursivelyAssignEls(createElement(newNode), newNode);
    return [new VirtualPatch(newNode, oldParentNode, 'ADD')];
  } else if (!newNode) {
    // DEL
    return [new VirtualPatch(oldNode, oldParentNode, 'DEL')];
  } else if (oldNode instanceof VirtualText && newNode instanceof VirtualText) {
    if (oldNode.text !== newNode.text) {
      // REPL
      // a. is text node with different values
      recursivelyAssignEls(createElement(newNode), newNode);
      return [new VirtualPatch(newNode, oldParentNode, 'REPL', oldNode)];
    }
    // b. no difference
    return;
  } else {
    if ( oldNode.elType !== newNode.elType ||
         !attsAreSame(oldNode.attributes, newNode.attributes) ) {
      // REPL
      // c. are different types
      // d. have different attributes
      // TODO: only change the atts, not entire node
      recursivelyAssignEls(createElement(newNode), newNode);
      return [new VirtualPatch(newNode, oldParentNode, 'REPL', oldNode)];
    } else {
      // check children
      // TODO: allow for individual children to change, rather than modifying
      // all children after a changed node

      newNode.$el = oldNode.$el;

      const maxChildren = Math.max(oldNode.children.length, newNode.children.length);
      let childPatchesArray = [];

      for (let i = 0; i <= maxChildren; i++) {
        const oldNodeChild = oldNode.children[i];
        const newNodeChild = newNode.children[i];
        const childPatch = walk(oldNodeChild, newNodeChild, oldNode);
        if (childPatch) {
          childPatchesArray = childPatchesArray.concat(childPatch);
        }
      }
      return childPatchesArray;
    }
  }

};

const recursivelyAssignEls = ($node, newNode) => {
  newNode.$el = $node;
  if ($node.hasChildNodes() && $node.nodeType !== 3) {
    for (let i = 0; i < $node.childNodes.length; i++) {
      recursivelyAssignEls($node.childNodes[i], newNode.children[i]);
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
