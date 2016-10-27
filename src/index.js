import createNode from './createNode';
import render from './render';


let tree = createNode('div', { id: 'parent' }, [
  createNode('div', { id: 'middle' }, [
    createNode('p', { id: 'child' }, [ 'this will change just u wait' ])
  ])
]);
const domRoot = document.getElementById('root');

render(tree, domRoot);

let word = 'muaha';
setInterval(() => {
  let newTree = createNode('div', { id: 'parent' }, [
    createNode('div', { id: 'middle' }, [
      createNode('p', { id: 'child' }, [ word ])
    ])
  ]);
  word += ' ha';
  render(newTree, domRoot);
}, 1000);
