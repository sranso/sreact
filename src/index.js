import createNode from './createNode';
import createElement from './createElement';
import diff from './diff';
import patch from './patch';
import Sreact from './sreact';





let count = 0;

const rootTree = createNode('div', {}, [count]);
const domNode = document.getElementById('app');
Sreact.render(rootTree, domNode);

setInterval(() => {
  count += 1;
  let newTree = createNode('div', {}, [count])
  Sreact.render(newTree, domNode);
}, 1000);