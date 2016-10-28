import createNode from '../src/createNode';

const DEFAULT_ATTS = {
  'style': {
    'text-align': 'center',
    'color': 'blue',
    'margin': '20px'
  },
  'id': 'vdom'
};

const DEFAULT_CHILDREN = [
  createNode('p', { 'style': {
      'font-size': '20px;'
    }
  },
  [12345]
)];

const buildRootNode = (nodeType, atts = DEFAULT_ATTS, children = DEFAULT_CHILDREN) => {
  const root = createNode(
    'div',
    { id: 'root' },
    [createNode(nodeType, atts, children)]
  );
  return root;
};

const buildNode = (nodeType, atts = DEFAULT_ATTS, children = DEFAULT_CHILDREN) => {
  return createNode(nodeType, atts, children);
};

export default {
  buildNode,
  buildRootNode
};
