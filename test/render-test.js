import render from '../src/render';

import { assert } from 'chai';
import Factories from './factories';

describe('render module', () => {
  before(() => {
    document.getElementById('app').innerHTML = '';
  });

  it('renders a virtual node into a dom node', () => {
    const vNode = Factories.buildNode('p', undefined, []);
    const domNode = document.getElementById('app');
    render(vNode, domNode);

    assert.equal(document.getElementsByTagName('p').length, 1);
  });
});
