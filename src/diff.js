/*
 * diff two trees
 *
 * left = 'old' tree; right = 'new' tree
 * return left node, replace operation(s) for left node
 */
const diff = (a, b) => {
  return Object.assign({ a }, walk(a, b, 0));
};

/*
 * TODO
 * return patch objects
 * merge patch objects
 */
const walk = (a, b, index) => {
  if (a === b) {
    return;
  }

  /* check if one is text node */
  if (typeof a !== typeof b) {
    return { [index]: b };
  }

  const [aElType, aAtts, aChildren] = a;
  const [bElType, bAtts, bChildren] = b;
  /* check el type */
  if (aElType !== bElType) {
    return { [index]: b };
  }

  /* check atts */
  if (!attsAreSame(aAtts, bAtts)) {
    return { [index]: b };
  }

  /* check children */
  const maxChildren = (aChildren.length > bChildren.length) ? aChildren : bChildren;
  const childPatchesArray = maxChildren.map((val, i, arr) => {
    const aChild = aChildren[i];
    const bChild = bChildren[i];
    return walk(aChild, bChild, index + 1);
  });
  return childPatchesArray.reduce((acc, patch, i) => {
    if (patch) {
      const patchI = index + 1 + i + 1;
      acc[patchI] = patch;
    }
    return acc;
  }, {});
};

const attsAreSame = (a, b) => {
  const aKeys = Object.keys(a);
  const bKeys = Object.keys(b);

  if (aKeys.length !== bKeys.length) {
    return false;
  }

  for (let i = 0; i < aKeys.length; i++) {
    const key = aKeys[i];
    if (a.hasOwnProperty(key) && b.hasOwnProperty(key)) {
      if (key === 'style') {
        if (!attsAreSame(a[key], b[key])) {
          return false;
        }
      } else {
        if (a[key] !== b[key]) {
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
  diff,
  walk,
  attsAreSame
};
