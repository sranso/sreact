import { VirtualNode } from './constructors/VirtualNode';

const createNode = (elType, atts = {}, children = []) => {
  return new VirtualNode(elType, atts, children);
}


export default createNode;
