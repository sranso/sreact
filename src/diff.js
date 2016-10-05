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
  const maxChildren = Math.max(aChildren.length, bChildren.length);
  for (let i = 0; i < maxChildren; i++) {
    const aChild = aChildren[i];
    const bChild = bChildren[i];
    if (aChild && bChild) {
      return walk(aChild, bChild, index + 1);
    }
  }
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
