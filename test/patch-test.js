import patch from '../src/patch';
import diff from '../src/diff';
import createNode, { VirtualNode } from '../src/createNode';

import assert from 'assert';
import { expect } from 'chai';


describe('patch module', () => {
  describe('patch', () => {
    let rootNode, right;
    before(() => {
      const atts = {
        'style': {
          'text-align': 'center',
          'color': 'blue',
          'margin': '20px'
        },
        'id': 'vdom'
      };
      const children = [createNode('p',
        { 'style': {
            'float': 'left'
          },
        'id': 'kid'
        },
        ['hi i\'m a child']
      )];
      rootNode = createNode('div', atts, children);

      const newChild = createNode('p',
        { 'id': 'new-kid' },
        ['i\'m a new child']
      );
      const newChildren = children.slice();
      newChildren.push(newChild);
      right = createNode('div', atts, newChildren);
    });

    it('should return a VirtualNode', () => {
      const patches = diff(rootNode, right);
      const result = patch(rootNode, patches);
      expect(result).to.be.an.instanceof(VirtualNode);
    });

  });
});
