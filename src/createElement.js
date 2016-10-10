import { isStringOrNum } from './helpers';
import { VirtualNode, VirtualText } from './createNode';

/*
 * create an HTML node element or simple textNode as html string
 *
 * node tree -> HTML string
 */
const createElement = (node) => {
  if ( !(node instanceof VirtualNode) &&
       !(node instanceof VirtualText) ) {
    console.error(node);
    throw new Error('Please pass a valid node.');
  }

  if (node instanceof VirtualText) {
    return node.text;
  }

  const { elType, attributes, children, id } = node;
  const attString = Object.keys(attributes).map((att) => {
    return createElementAtt(att, attributes[att]);
  }).join(' ');
  const dataId = `data-id="${id}"`;
  const childrenString = children.map(createElement).join('\n');
  return `<${elType} ${attString} ${dataId}>${childrenString}</${elType}>`;
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
