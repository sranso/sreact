import VirtualPatch from './createVirtualPatch';
/*
 * diff two trees
 *
 * left = 'old' tree; right = 'new' tree
 * return left node, replace operation(s) for left node
 */
const diff = (left, right) => {
  return Object.assign({ left }, walk(left, right, 0));
};

/*
 * TODO
 * return patch objects
 * merge patch objects
 */
const walk = (left, right, index) => {
  if (left === right) {
    return;
  }

  /* check if one is text node */
  if (typeof left !== typeof right) {
    if (!left) {
      /* add new node */
      return { [index]: right, type: 'ADD' };
    } else {
      /* delete node */
      return { [index]: left, type: 'DEL' };
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
    const patch = { [index]: right, type: 'REPL' };
    return { [index]: new VirtualPatch(patch, left) };
  }

  /* check atts */
  if (!attsAreSame(leftAtts, rightAtts)) {
    const patch = { [index]: right, type: 'REPL' };
    return { [index]: new VirtualPatch(patch, left) };
  }

  /* check children */
  const maxChildren = (leftChildren.length > rightChildren.length) ? leftChildren : rightChildren;
  const childPatchesArray = maxChildren.map((val, i, arr) => {
    const leftChild = leftChildren[i];
    const rightChild = rightChildren[i];
    return walk(leftChild, rightChild, index + 1);
  });
  return childPatchesArray.reduce((acc, patch, i) => {
    if (patch) {
      const patchI = index + i;
      acc[patchI] = new VirtualPatch(patch, left);
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
