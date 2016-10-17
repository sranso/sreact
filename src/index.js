import createNode from './createNode';
import createElement from './createElement';
import diff from './diff';
import patch from './patch';
import render from './render';


let count = 0;

const rootTree = createNode('div', {}, [count]);
const domNode = document.getElementById('app');
render(rootTree, domNode);

setInterval(() => {
  count += 1;
  let newTree = createNode('div', {}, [count])
  render(newTree, domNode);
}, 1000);
