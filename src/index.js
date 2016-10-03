import render from './render';

/*
 * describe virtual dom
 * node = [ string eltype : obj attributes : list children ]
 */
const rootNode = [
  'div', {
    'style': {
      'text-align': 'center',
      'color': 'blue',
      'margin': '20px'
    }
  },
  ['hello world']
];

const nestedNode = [
  'div', {
    'style': {
      'text-align': 'center',
      'color': 'blue',
      'margin': '20px'
    }
  },
  [
    [
      'p', {
        'style': {
          'font-size': '20px;'
        }
      },
      ['hello world']
    ]
  ]
];


const app = document.getElementById('app');
app.innerHTML = render(nestedNode);
