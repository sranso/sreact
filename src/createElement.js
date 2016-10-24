import { VirtualNode, VirtualText } from './constructors/VirtualNode';

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
    const $text = document.createElement('span');
    $text.setAttribute('data-id', node.id);
    $text.appendChild(
      document.createTextNode(node.text)
    );
    return $text;
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
  $el.setAttribute('data-id', id);

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
