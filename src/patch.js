import VirtualPatch from './constructors/VirtualPatch';
import { VirtualText } from './constructors/VirtualNode';
import createElement from './createElement';

/*
 * apply patches to root tree
 *
 * apply patches to domNode and return updated domNode
 */
const patch = (domNode, patches) => {
  patches.forEach(applyPatch);

  return domNode;
};

const applyPatch = ({ patchNode, parentNode, type, replTarget }) => {
  if (type === 'ADD') {
    parentNode.$el.appendChild(patchNode.$el);
  } else if (type === 'DEL') {
    parentNode.$el.removeChild(
      $patchEl
    );
  } else if (type === 'REPL') {
    parentNode.$el.replaceChild(
      patchNode.$el,
      replTarget.$el
    );
  }
};


export default patch;
export {
  applyPatch
};
