class VirtualPatch {
  constructor(patchNode, parentNode, type, replTarget) {
    this.patchNode = patchNode;
    this.parentNode = parentNode;
    this.type = type;
    this.replTarget = replTarget;
  }
};

export default VirtualPatch;
