import createNode, { VirtualText, VirtualNode } from '../src/createNode';

import { expect } from 'chai';

describe('createNode module', () => {
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

    it('should return a virtual node with an id', () => {
      expect(node).to.contain.all.keys(['id', 'elType', 'attributes', 'children']);
    });

    it('should increment id', () => {
      const newNode = new VirtualNode('div', {}, []);
      expect(node.id).to.not.equal(newNode.id);
    });

    it('should allow nested children to be made', () => {
      const child = new VirtualNode('p', {}, ['hay']);
      const newNode = new VirtualNode('div', {}, [child]);
      expect(newNode.children[0].elType).to.equal('p');
    });
  });

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
