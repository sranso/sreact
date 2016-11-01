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
let children = [];
setInterval(() => {
  let anotherChild = createNode('p', { class: 'another' }, [ 'another child' ]);
  children.push(anotherChild);

  let newTree = createNode('div', { id: 'parent' }, [
    createNode('div', { id: 'middle' },
      children.concat(createNode('p', { id: 'child' }, [ word ]))
    )
  ]);
  word += ' ha';
  render(newTree, domRoot);
}, 1000);
