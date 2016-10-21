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
    const $text = document.createElement('span');
    $text.appendChild(
      document.createTextNode(node.text)
    );
    $text.setAttribute('data-id', node.id);
    return $text;
  }

  const { elType, attributes, children, id } = node;
  const el = document.createElement(elType);
  Object.keys(attributes).forEach((k) => {
    const v = attributes[k];
    el.setAttribute(k, v);
  });
  children.map(createElement)
    .forEach(el.appendChild.bind(el));
  el.setAttribute('data-id', id);
  return el;
};


export default createElement;
