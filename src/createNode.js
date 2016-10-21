/*
 * create a node tree
 *
 * node tree = [ string eltype, obj attributes, list children ]
 * children can be nodes (another tree) or strings/nums (leafs)
 */
class VirtualText {
  constructor(text) {
    this.text = text;
  }
};

class VirtualNode {
  constructor(elType, attributes, children) {
    this.elType = elType;
    this.attributes = attributes;
    this.children = this._createChildren(children);
  }

  _createChildren(children) {
    const c = children.map((child) => {
      if (child instanceof (VirtualNode || VirtualText)) {
        return child;
      } else if (typeof child === 'string' ||
                 typeof child === 'number') {
        return new VirtualText(child);
      } else {
        return new VirtualNode(child);
      }
    });
    return c;
  }
};

const createNode = (elType, atts = {}, children = []) => {
  return new VirtualNode(elType, atts, children);
}


export default createNode;
export {
  VirtualText,
  VirtualNode
};
