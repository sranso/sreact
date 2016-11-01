import createNode from './createNode';
import render from './render';


const todos = [];
localStorage.setItem('todos', JSON.stringify(todos));

const mapTodos = (todos) => todos.map(
  todo => createNode('li', { style: { 'margin-bottom': '10px' } }, [ todo ])
);

const saveTodo = e => {
  e.preventDefault();
  const $inputEl = document.getElementById('text');
  todos.push($inputEl.value);
  localStorage.setItem('todos', JSON.stringify(todos));
  $inputEl.value = '';
  render(makeTree(), domRoot);
};

const makeTree = () =>
  createNode('div', { }, [
    createNode('form', { style: { 'margin-bottom': '20px' } }, [
      createNode('label', {
        style: { display: 'block', 'margin-bottom': '10px', 'font-weight': 700 },
        onDblClick: () => console.log('dblclick')
      }, [ 'add a todo' ]),
      createNode('input', {
        style: { display: 'block', 'margin-bottom': '10px' },
        type: 'text',
        id: 'text'
      }, [ '' ]),
      createNode('input', {
        style: { display: 'block', 'margin-bottom': '10px' },
        type: 'submit',
        value: 'save todo',
        id: 'submit',
        onClick: saveTodo
      }, [ '' ])
    ]),
    createNode('div', { style: { 'font-weight': 700 } }, [ 'todos' ]),
    createNode('ul', { }, mapTodos(JSON.parse(localStorage.todos)))
  ]);

const domRoot = document.getElementById('root');
render(makeTree(), domRoot);

