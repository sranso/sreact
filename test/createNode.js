import createNode, { VirtualText, VirtualNode, createNodeNew } from '../src/createNode';

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
    beforeEach(() => {
      node = new VirtualNode('div', {}, []);
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

  describe('createNodeNew', () => {
    let node;
    before(() => {
      node = createNodeNew('div', { style: { width: '100px' } }, [
        createNodeNew('p', { class: 'para' }, [ 'sup world' ])
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

  describe('createNode', () => {
    it('should return a node tree', () => {
      const atts = {
        'style': {
          'text-align': 'center',
          'color': 'blue',
          'margin': '20px'
        },
        'id': 'vdom'
      };
      const children = [
        [
          'p', {
            'style': {
              'font-size': '20px;'
            }
          },
          [12345]
        ]
      ];
      const node = createNode('div', atts, children);
      const simpleNode = createNode('div');
      expect(node.length).to.equal(3);
      expect(simpleNode.length).to.equal(3);
    });
  });

});
