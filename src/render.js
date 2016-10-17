import createElement from './createElement';


const render = (vRoot, domRoot) => {
  domRoot.innerHTML = createElement(vRoot);
}



export default render;
