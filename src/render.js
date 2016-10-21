import createElement from './createElement';


const render = (vRoot, domRoot) => {
  domRoot.appendChild(createElement(vRoot));
}



export default render;
