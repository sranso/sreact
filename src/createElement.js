import { isStringOrNum } from './helpers';


/*
 * create an HTML node element or simple textNode as html string
 *
 * node tree -> HTML string
 */
const createElement = (node) => {
  if (isStringOrNum(node)) {
    return node;
  }
  if (node.length !== 3) {
    console.error(node);
    throw new Error('Please pass a valid node.');
  }

  const [elType, atts, children] = node;
  const attString = Object.keys(atts).map((att) => createElementAtt(att, atts[att])).join(' ');
  return `<${elType} ${attString}>${children.map(createElement).join('\n')}</${elType}>`;
};

const createElementAtt = (att, value) => {
  if (att === 'style') {
    return createElementStyles(value);
  } else {
    return `${att}="${value}"`;
  }
};

const createElementStyles = (stylesMap) => {
  const stylesString = Object.keys(stylesMap).map((key) => {
    return `${key}: ${stylesMap[key]}`;
  }).join('; ');
  return `style="${stylesString}"`;
};


export default createElement;
export {
  createElement,
  createElementAtt,
  createElementStyles
};
