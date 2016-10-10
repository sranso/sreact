import { diff, walk, attsAreSame } from '../src/diff';
import createNode, { VirtualNode } from '../src/createNode';
import VirtualPatch from '../src/createVirtualPatch';

import assert from 'assert';
import { expect } from 'chai';


describe('diff module', () => {
  describe('walk', () => {
    let atts, children, left;
    before(() => {
      atts = {
        'style': {
          'text-align': 'center',
          'color': 'blue',
          'margin': '20px'
        },
        'id': 'vdom'
      };
      children = [createNode('p',
        { 'style': {
            'float': 'left'
          },
        'id': 'kid'
        },
        ['hi i\'m a child']
      )];
      left = createNode('div', atts, children);
    });

    it('should return an object that has the original left node', () => {
      const patches = diff(left, {});
      expect(patches).to.have.property('left');
      expect(patches.left).to.be.an.instanceof(VirtualNode);
    });

    it('should return a patch when a node has been added', () => {
      const newChild = createNode('p',
        { 'id': 'new-kid' },
        ['i\'m a new child']
      );
      const newChildren = children.slice();
      newChildren.push(newChild);
      const right = createNode('div', atts, newChildren);

      const patches = diff(left, right);
      const patchObj = patches[1];
      const { patch, target } = patchObj;

      expect(patchObj).to.be.an.instanceof(VirtualPatch);
      expect(patch.type).to.equal('ADD');
      expect(target.elType).to.equal(left.elType);
    });

    it('should return a patch when a node has been deleted', () => {
      const right = createNode('div', atts, []);

      const patches = diff(left, right);
      const patchObj = patches[0];
      const { patch, target } = patchObj;

      expect(patchObj).to.be.an.instanceof(VirtualPatch);
      expect(patch.type).to.equal('DEL');
      expect(target.elType).to.equal(left.elType);
    });

    it('should return a patch when a node has been replaced (elType)', () => {
      const right = createNode('p', atts, children);

      const patches = diff(left, right);
      const patchObj = patches[0];
      const { patch, target } = patchObj;

      expect(patchObj).to.be.an.instanceof(VirtualPatch);
      expect(patch.type).to.equal('REPL');
      expect(target.elType).to.equal(left.elType);
    });

    it('should return a patch when a node has been replaced (atts)', () => {
      const right = createNode('div', { 'style': {} }, children);

      const patches = diff(left, right);
      const patchObj = patches[0];
      const { patch, target } = patchObj;

      expect(patchObj).to.be.an.instanceof(VirtualPatch);
      expect(patch.type).to.equal('REPL');
      expect(target.elType).to.equal(left.elType);
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
