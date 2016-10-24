import createElement, {
  createElementStyles
} from '../src/createElement';

import Factories from './factories';
import { expect } from 'chai';

describe('createElement module', () => {

  describe('createElement', () => {
    let node;
    before(() => {
      node = Factories.buildNode('div', undefined, [ Factories.buildNode('p') ]);
    });

    it('should return an error if node is invalid', () => {
      expect(createElement).to.throw(Error);
    });

    it('should return a dom node with attributes', () => {
      const $el = createElement(node);
      expect($el).to.be.an.instanceof(Node);
      expect($el.style.textAlign).to.equal('center');
    });

  });

  describe('createElementStyles', () => {
    it('should return an html styles atts string', () => {
      const styles = createElementStyles({'width': '20px', 'height': '10px'});
      expect(styles).to.have.string('width: 20px');
      expect(styles).to.have.string('height: 10px');
    });
  });

});
