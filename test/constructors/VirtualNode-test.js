import { VirtualText, VirtualNode } from '../../src/constructors/VirtualNode';

import { expect } from 'chai';

describe('VirtualNode constructors', () => {
  describe('VirtualText', () => {
    it('should return a virtual text node with a text value', () => {
      const textNode = new VirtualText('sup');
      expect(textNode).to.have.property('text');
    });
  });

  describe('VirtualNode', () => {
    let node;
    before(() => {
      node = new VirtualNode('div', { styles: { width: '1px' }, id: 'v' }, []);
    });

    it('should return a virtual node object', () => {
      expect(node).to.be.instanceof(VirtualNode);
    });

    it('should return a virtual node with elType, attributes, children', () => {
      expect(node).to.contain.all.keys(['elType', 'attributes', 'children']);
    });

    it('should allow nested children to be made', () => {
      const child = new VirtualNode('p', {}, ['hay']);
      const newNode = new VirtualNode('div', {}, [child]);
      expect(newNode.children[0].elType).to.equal('p');
    });
  });

});
