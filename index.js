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

const parseNode = (node, isTextNode = false) => {
  const elType = node[0];
  return node.reduce((acc, el, index) => {
    if (isTextNode) {
      return `${acc}${el}</${elType}>`;
    } else if (index === 0) {
      return `${acc}<${el}`;
    } else if (typeof el === 'string') {
      // ??
      return `${acc}${el}</${elType}>`;
    } else if (Array.isArray(el)) {
      // handle children
      if (Array.isArray(el[0])) {
        return `${acc}${parseNode(el)}`;
      } else {
        return `${acc}${parseNode(el, true)}`;
      }
    } else if (!Array.isArray(el) && typeof el === 'object') {
      // handle styles
      let styles = parseStyles(el);
      return `${acc} ${styles}>`;
    } else {
      // handle ???
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
console.log(render(rootNode));
app.innerHTML = render(rootNode);
