import diff, { walk, attsAreSame, recursivelyAssignEls } from '../src/diff';
import { VirtualNode } from '../src/constructors/VirtualNode';
import VirtualPatch from '../src/constructors/VirtualPatch';
import Factories from './factories';

import assert from 'assert';
import { expect } from 'chai';


describe('diff module', () => {
  describe('walk', () => {
    it('should return an array of patches', () => {
      const oldTree = Factories.buildRootNode('div', undefined, []);
      const patches = diff(oldTree, Factories.buildNode('p', undefined, []));
      expect(patches).to.be.an.instanceof(Array);
      expect(patches[0]).to.be.an.instanceof(VirtualPatch);
    });

    it('should return a patch when a node has been added', () => {
      const oldTree = Factories.buildRootNode('div', undefined, []);
      const newChild = Factories.buildNode('p',
        { 'id': 'new-kid' },
        ['i\'m a new child']
      );
      const newTree = Factories.buildNode('div', undefined, [newChild]);
      const patches = diff(oldTree, newTree);

      expect(patches.length).to.equal(1);
      expect(patches[0].type).to.equal('ADD');
    });

    it('should return a patch when a node has been deleted', () => {
      const oldTree = Factories.buildRootNode('div', undefined, [
        Factories.buildNode('div', undefined, ['hi'])
      ]);
      const newTree = Factories.buildNode('div', undefined, []);
      const patches = diff(oldTree, newTree);

      expect(patches.length).to.equal(1);
      expect(patches[0].type).to.equal('DEL');
    });

    it('should return a patch when a node has been replaced (elType)', () => {
      const oldTree = Factories.buildRootNode('div', undefined, ['hello']);
      const newTree = Factories.buildNode('div', undefined, ['hi']);
      const patches = diff(oldTree, newTree);

      expect(patches.length).to.equal(1);
      expect(patches[0].type).to.equal('REPL');
    });

    it('should return a patch when a node has been replaced (atts)', () => {
      const oldTree = Factories.buildRootNode('div', { id: 'parent' }, []);
      const newTree = Factories.buildNode('div', { id: 'new-parent' }, []);
      const patches = diff(oldTree, newTree);

      expect(patches.length).to.equal(1);
      expect(patches[0].type).to.equal('REPL');
    });
  });

  describe('attsAreSame', () => {
    it('should return true for similar objects', () => {
      const atts = {
        'style': {
          'margin': '20px',
          'text-align': 'center'
        },
        'id': 'boop'
      };
      expect(attsAreSame(atts, atts)).to.be.true;
    });

    it('should return false for different objects', () => {
      const atts = {
        'style': {
          'margin': '20px',
          'text-align': 'center'
        },
        'id': 'boop'
      };
      const otherAtts = {
        'style': {
          'text-align': 'center'
        },
        'id': 'blah'
      };
      expect(attsAreSame(atts, otherAtts)).to.be.false;
    });
  });
});
