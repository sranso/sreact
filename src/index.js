import createNode from './createNode';
import createElement from './createElement';
import diff from './diff';

/*
 * describe original dom
 */
const atts = {
  'style': {
    'text-align': 'center',
    'color': 'blue',
    'margin': '20px'
  },
  'id': 'vdom'
};
const children = [createNode('p', { 'style': {
      'font-size': '20px;'
    }
  },
  [12345]
)];

const node = createNode('div', atts, children);

/*
 * set original dom
 */
const app = document.getElementById('app');
app.innerHTML = createElement(node);


/*
 * get new virtual dom
 */
const newChild = createNode('p',
  { 'id': 'new-kid' },
  ['i\'m a new child']
);
const newChildren = children.slice();
newChildren.push(newChild);
const newTree = createNode('div', atts, newChildren);


/*
 * grab patches
 */
const patches = diff(node, newTree);
console.log(patches);
