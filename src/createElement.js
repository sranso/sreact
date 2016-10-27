import { VirtualNode, VirtualText } from './constructors/VirtualNode';

/*
 * create an HTML node element or text node
 *
 * node tree -> HTML element
 */
const createElement = (node) => {
  if ( !(node instanceof VirtualNode) &&
       !(node instanceof VirtualText) ) {
    console.error(node);
    throw new Error('Please pass a valid node.');
  }

  if (node instanceof VirtualText) {
    return document.createTextNode(node.text)
  }

  const { elType, attributes, children, id } = node;
  const $el = document.createElement(elType);

  Object.keys(attributes).forEach(k => {
    if (k === 'style') {
      $el.setAttribute(k, createElementStyles(attributes[k]));
    } else {
      $el.setAttribute(k, attributes[k]);
    }
  });

  children.map(createElement)
    .forEach($el.appendChild.bind($el));

  return $el;
};

const createElementStyles = (stylesMap) => {
  return Object.keys(stylesMap).map((key) => {
    return `${key}: ${stylesMap[key]}`;
  }).join('; ');
};


export default createElement;
export {
  createElementStyles
};
