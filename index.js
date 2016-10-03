// patch
// diff
// create vd node itself

// use https://github.com/paul-jean/dom-viz to see if correct
// divs are changing

// 1. describe virtual dom
//    (as obj / list; start with list, expand as nec)
// node : obj attributes : list html
const rootNode = [
  'div', {
    'style': {
      'textAlign': 'center',
      'color': 'blue',
      'margin': '20px'
    }
  },
  ['hello world']
];

// 2. and take it to real dom (convert to html)
const render = (node) => {
  let html;
  if (node.length !== 3) {
    throw new Error('Please pass a valid node.');
  }

  return parseNode(node);
};

const parseNode = (node) => {
  return node.reduce((acc, el, index) => {
    if (typeof el === 'string') {
      let styles = parseStyles(node[index + 1]);
      return `${acc}<${el} ${styles}>`;
    } else if (Array.isArray(el)) {
      return acc;
    } else {
      return acc;
    }
  }, '');
};

const parseStyles = (stylesNode) => {
  if (!stylesNode.hasOwnProperty('style')) {
    throw new Error('Please pass a valid styles node.');
  }

  const styles = Object.keys(stylesNode.style).map((key) => {
    return `${key}: ${stylesNode.style[key]}`;
  });
  return `style="${styles.join('; ')}"`;
};

const app = document.getElementById('app');
app.innerHTML = render(rootNode);
