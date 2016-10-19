import VirtualPatch from './createVirtualPatch';
import { VirtualText } from './createNode';


/*
 * diff two trees
 *
 * left = 'old' tree; right = 'new' tree
 * return left node, replace operation(s) for left node
 */
const diff = (left, right) => {
  return Object.assign({ left }, walk(left, right, left.id));
};

const walk = (left, right, leftParentId) => {
  if (left === right) {
    return;
  }

  /* check if there is an new node / node removed */
  if (typeof left !== typeof right) {
    if (!left) {
      /* add new node */
      return { [leftParentId]: new VirtualPatch(right, 'ADD', left) };
    } else {
      /* delete node */
      return { [leftParentId]: new VirtualPatch(left, 'DEL', left) };
    }
  }

  /* check if text node */
  if (left instanceof VirtualText && right instanceof VirtualText) {
    if (left.text !== right.text) {
      return { [leftParentId]: new VirtualPatch(right, 'REPL', left) };
    }
  }


  const { elType: leftElType,
          attributes: leftAtts,
          children: leftChildren,
          id: leftId } = left;
  const { elType: rightElType,
          attributes: rightAtts,
          children: rightChildren,
          id: rightId } = right;

  /* check el type */
  if (leftElType !== rightElType) {
    return { [leftParentId]: new VirtualPatch(right, 'REPL', left) };
  }

  /* check atts */
  if (!attsAreSame(leftAtts, rightAtts)) {
    return { [leftParentId]: new VirtualPatch(right, 'REPL', left) };
  }

  /* check children */
  const maxChildren = (leftChildren.length > rightChildren.length) ? leftChildren : rightChildren;
  const childPatchesArray = maxChildren.map((val, i, arr) => {
    const leftChild = leftChildren[i];
    const rightChild = rightChildren[i];
    return walk(leftChild, rightChild, leftId);
  });
  return childPatchesArray.reduce((acc, patch, i) => {
    if (patch) {
      acc = Object.assign(acc, patch);
    }
    return acc;
  }, {});
};

const attsAreSame = (left, right) => {
  const leftKeys = Object.keys(left);
  const rightKeys = Object.keys(right);

  if (leftKeys.length !== rightKeys.length) {
    return false;
  }

  for (let i = 0; i < leftKeys.length; i++) {
    const key = leftKeys[i];
    if (left.hasOwnProperty(key) && right.hasOwnProperty(key)) {
      if (key === 'style') {
        if (!attsAreSame(left[key], right[key])) {
          return false;
        }
      } else {
        if (left[key] !== right[key]) {
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
  attsAreSame
};
