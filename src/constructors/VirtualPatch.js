class VirtualPatch {
  constructor(patch, type, target) {
    this.patch = patch;
    this.type = type;
    this.target = target;

    if (type === 'ADD' ||
        type === 'REPL') {
      addIds(patch);
    }

    if (type === 'REPL' && target.id) {
      patch.id = target.id;
    }
  }
};

const addIds = patch => {
  if (!patch) return;
  patch.id = VirtualPatch.IdCounter++;
  if (patch.children) {
    patch.children.forEach(child => addIds(child));
  }
};

VirtualPatch.IdCounter = 1;

export default VirtualPatch;
