import VirtualPatch from '../../src/constructors/VirtualPatch';

import Factories from '../factories';
import { expect } from 'chai';


describe('VirtualPatch constructor', () => {
  let patch;
  before(() => {
    const p = Factories.buildNode('p');
    const target = Factories.buildNode('div');
    patch = new VirtualPatch({ 0: p }, target);
  });

  it('should return an object with a patch and a target', () => {
    expect(patch).to.contain.all.keys(['patchNode', 'parentNode', 'type', 'replTarget']);
  });
});
