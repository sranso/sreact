import createNode from '../src/createNode';

import { expect } from 'chai';

describe('createNode module', () => {
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
      expect(node.length).to.equal(3);
    });
  });
});
