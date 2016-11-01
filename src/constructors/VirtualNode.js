/*
 * create a node tree
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
    return children.map(child => {
      if (child instanceof (VirtualNode || VirtualText)) {
        return child;
      } else if (typeof child === 'string' ||
                 typeof child === 'number') {
        return new VirtualText(child);
      } else {
        return new VirtualNode(child);
      }
    });
  }
};


export {
  VirtualText,
  VirtualNode
};
