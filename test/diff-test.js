import diff, { walk, attsAreSame } from '../src/diff';
import { VirtualNode } from '../src/constructors/VirtualNode';
import VirtualPatch from '../src/constructors/VirtualPatch';
import Factories from './factories';

import assert from 'assert';
import { expect } from 'chai';


const getKeysAndPatch = (patches) => {
  const keys = Object.keys(patches);
  const key = keys.filter(k => k !== 'left');
  const patch = patches[key];
  return { keys, patch };
};

describe('diff module', () => {
  describe('walk', () => {
    let children, left;
    before(() => {
      children = [Factories.buildNode('p',
        { 'style': {
            'float': 'left'
          },
        'id': 'kid'
        },
        ['hi i\'m a child']
      )];
      left = Factories.buildNode('div', undefined, children);
    });

    it('should return an object that has the original left node', () => {
      const patches = diff(left, {});
      expect(patches).to.have.property('left');
      expect(patches.left).to.be.an.instanceof(VirtualNode);
    });

    it('should return a patch when a node has been added', () => {
      const newChild = Factories.buildNode('p',
        { 'id': 'new-kid' },
        ['i\'m a new child']
      );
      const newChildren = children.slice();
      newChildren.push(newChild);
      const right = Factories.buildNode('div', undefined, newChildren);
      const patches = diff(left, right);
      const { keys, patch } = getKeysAndPatch(patches);

      expect(keys.length).to.equal(2);
      expect(patch).to.be.an.instanceof(VirtualPatch);
      expect(patch.type).to.equal('ADD');
    });

    it('should return a patch when a node has been deleted', () => {
      const right = Factories.buildNode('div', undefined, []);
      const patches = diff(left, right);
      const { keys, patch } = getKeysAndPatch(patches);

      expect(keys.length).to.equal(2);
      expect(patch).to.be.an.instanceof(VirtualPatch);
      expect(patch.type).to.equal('DEL');
    });

    it('should return a patch when a node has been replaced (elType)', () => {
      const right = Factories.buildNode('p', undefined, children);
      const patches = diff(left, right);
      const { keys, patch } = getKeysAndPatch(patches);

      expect(keys.length).to.equal(2);
      expect(patch).to.be.an.instanceof(VirtualPatch);
      expect(patch.type).to.equal('REPL');
    });

    it('should return a patch when a node has been replaced (atts)', () => {
      const right = Factories.buildNode('div', { 'style': {} }, children);
      const patches = diff(left, right);
      const { keys, patch } = getKeysAndPatch(patches);

      expect(keys.length).to.equal(2);
      expect(patch).to.be.an.instanceof(VirtualPatch);
      expect(patch.type).to.equal('REPL');
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
