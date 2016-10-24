import createNode from '../src/createNode';
import { VirtualText, VirtualNode } from '../src/constructors/VirtualNode';

import { expect } from 'chai';

describe('createNode module', () => {
  describe('createNode', () => {
    let node;
    before(() => {
      node = createNode('div', { style: { width: '100px' } }, [
        createNode('p', { class: 'para' }, [ 'sup world' ])
      ]);
    });

    it('should return a VirtualNode', () => {
      expect(node).to.be.an.instanceof(VirtualNode);
    });

    it('should create children that are VirtualNodes', () => {
      expect(node.children[0]).to.be.an.instanceof(VirtualNode);
    });

    it('should create VirtualText nodes for text children', () => {
      const pNode = node.children[0];
      expect(pNode.children[0]).to.be.an.instanceof(VirtualText);
    });
  });
});
