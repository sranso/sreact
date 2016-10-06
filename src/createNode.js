/*
 * create a node tree
 *
 * node tree = [ string eltype, obj attributes, list children ]
 * children can be nodes (another tree) or strings/nums (leafs)
 */
class VirtualText {
  constructor (text) {
    this.text = text;
  }
}

class VirtualNode {
  constructor (elType, attributes, children) {
    this.elType = elType;
    this.attributes = attributes;
    this.children = children;
    this.id = VirtualNode.idCounter++;
  }
}

VirtualNode.idCounter = 0;

const createNode = (elType, atts = {}, children = []) => {
  return [
    elType,
    atts,
    children
  ];
};


export default createNode;
export {
  VirtualText,
  VirtualNode
}