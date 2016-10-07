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
 * grab patches
 */
const child = [
    'div', {
      'style': {
        'text': 'lots'
      }
    },
    ['hi']
];
const newChildren = children.slice();
newChildren.push(child);
const newTree = createNode('div', atts, newChildren);
const patches = diff(node, newTree);
console.log(patches);
