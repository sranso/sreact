import VirtualPatch from '../src/createVirtualPatch';

import Factories from './factories';
import { expect } from 'chai';


describe('createVirtualPatch module', () => {
  describe('VirtualPatch', () => {
    let patch;
    before(() => {
      const p = Factories.buildNode('p');
      const target = Factories.buildNode('div');
      patch = new VirtualPatch({ 0: p }, target);
    });

    it('should return an object with a patch and a target', () => {
      expect(patch).to.have.property('patch');
      expect(patch).to.have.property('target');
    });

  });
});
