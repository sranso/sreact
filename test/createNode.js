import createNode, { VirtualText, VirtualNode } from '../src/createNode';

import { expect } from 'chai';

describe('createNode module', () => {
  describe('VirtualText', () => {
    it('should return a virtual text node with a text value', () => {
      expect(new VirtualText('sup')).to.contain.keys(['text']);
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