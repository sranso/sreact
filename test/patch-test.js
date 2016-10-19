import patch, { applyPatches, applyPatch, walkDOM } from '../src/patch';
import diff from '../src/diff';
import render from '../src/render';
import createNode, { VirtualNode } from '../src/createNode';

import Factories from './factories';
import chai, { expect } from 'chai';
import spies from 'chai-spies';

chai.use(spies);

describe('patch module', () => {
  describe('patch', () => {
    let rootTree, newTree, domNode;
    before(() => {
      const replChild = Factories.buildNode('p', { id: 'repl-child' }, ['replaced the old']);
      domNode = document.getElementById('app');
      domNode.innerHTML = '';
      rootTree = Factories.buildNode('div');
      newTree = Factories.buildNode('div', undefined, [replChild]);
      render(rootTree, domNode);
    });

    it('should replace the actual DOM', () => {
      const patches = diff(rootTree, newTree);
      const result = patch(domNode, patches);
      expect(result.firstChild.firstChild.innerHTML).to.equal('replaced the old');
    });
  });

  describe('applyPatches', () => {
    it('should return a function', () => {
      expect(applyPatches([1,2,3], {})).to.be.a.func;
    });
  });

  describe('applyPatch', () => {
    let domNode, rootTree;
    beforeEach(() => {
      domNode = document.getElementById('app');
      domNode.innerHTML = '';
      rootTree = Factories.buildNode('div');
      render(rootTree, domNode);
    });

    it('should apply a DEL patch', () => {
      const newTree = Factories.buildNode('div', undefined, []);
      const patches = diff(rootTree, newTree);
      const result = patch(domNode, patches);
      expect(result.children.length).to.equal(1);
    });

    it('should apply an ADD patch', () => {
      const newChild = Factories.buildNode('p', { id: 'new-child' }, ['new here']);
      const newChildren = rootTree.children.slice();
      newChildren.push(newChild);
      const newTree = Factories.buildNode('div', undefined, newChildren);
      const patches = diff(rootTree, newTree);
      const result = patch(domNode, patches);
      expect(result.firstChild.children.length).to.equal(2);
    });

    it('should apply a REPL patch', () => {
      const replChild = Factories.buildNode('p', { id: 'repl-child' }, ['replaced the old']);
      const newTree = Factories.buildNode('div', undefined, [replChild]);
      const patches = diff(rootTree, newTree);
      const result = patch(domNode, patches);
      expect(result.firstChild.firstChild.innerHTML).to.equal('replaced the old');
    });
  });

  describe('walkDOM', () => {
    let domNode;
    before(() => {
      domNode = document.getElementById('app');
      domNode.innerHTML = '';
    });

    it('should walk the dom', () => {
      domNode.appendChild(document.createElement('p'));
      const spy = chai.spy();
      walkDOM(domNode, spy);
      expect(spy).to.have.been.called.twice;
    });
  });

});
