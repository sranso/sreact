import createElement from './createElement';


class Sreact {
  static render(vRoot, domRoot) {
    domRoot.innerHTML = createElement(vRoot);
  }
}


export default Sreact;