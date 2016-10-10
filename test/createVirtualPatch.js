import createNode from '../src/createNode';
import VirtualPatch from '../src/createVirtualPatch';

import { expect } from 'chai';


describe('createVirtualPatch module', () => {
  describe('VirtualPatch', () => {
    let patch;
    before(() => {
      const p = createNode('p',
        { 'id': 'patch-me-up' },
        ['hehe']
      );
      const target = createNode('div',
        { 'id': 'father' },
        []
      );
      patch = new VirtualPatch({ 0: p }, target);
    });

    it('should return an object with a patch and a target', () => {
      expect(patch).to.have.property('patch');
      expect(patch).to.have.property('target');
    });

  });
});
