import createElement from './createElement';
import createNode from './createNode';

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
const children = [
  [
    'p', {
      'style': {
        'font-size': '20px;'
      }
    },
    [12345]
  ]
];
const node = createNode('div', atts, children);


/*
 * set original dom
 */
const app = document.getElementById('app');
app.innerHTML = createElement(node);
