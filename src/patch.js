import VirtualPatch from './constructors/VirtualPatch';
import { VirtualText } from './constructors/VirtualNode';
import createElement from './createElement';

/*
 * apply patches to root tree
 *
 * apply patches to dom nodes
 */
const patch = (domNode, patches) => {
  // need to reverse patches so they get applied in order
  patches.reverse().forEach(applyPatch);

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
