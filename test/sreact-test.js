import { assert } from 'chai';
import Factories from './factories';
import Sreact from '../src/sreact';

describe('Sreact', () => {
  describe('.render', () => {
    it('has a render function', () => {
      assert.isFunction(Sreact.render);
    });

    it('renders a virtual node into a dom node', () => {
      const vNode = Factories.buildNode('p', undefined, []);
      const domNode = document.getElementById('app');
      Sreact.render(vNode, domNode);

      assert.equal(document.getElementsByTagName('p').length, 1);
    });
  });
});
