import { diff, walk, attsAreSame } from '../src/diff';
import createNode from '../src/createNode';

import assert from 'assert';
import { expect } from 'chai';


describe('walk', () => {
  let atts, children, node;
  beforeEach(() => {
    atts = {
      'style': {
        'text-align': 'center',
        'color': 'blue',
        'margin': '20px'
      },
      'id': 'vdom'
    };
    children = [
      [
        'p', {
          'style': {
            'font-size': '20px;'
          }
        },
        [12345]
      ]
    ];
    node = createNode('div', atts, children);
  });

  it('should return an object that has the original left node', () => {
    const patches = diff(node, node);
    expect(patches).to.have.property('a');
  });

  it('should return a new patch when the el type is different', () => {
    const newTree = createNode('p', atts, children);
    const patches = diff(node, newTree);
    expect(patches[0][0]).to.equal('p');
  });

  it('should return a new patch when the atts are different', () => {
    let newAtts = {
      'style': {
        'text-align': 'center',
        'color': 'blue',
        'margin': '20px'
      },
      'class': 'nah'
    };
    const newTree = createNode('div', newAtts, children);
    const patches = diff(node, newTree);
    expect(patches[0][0]).to.have.equal('div');
    expect(patches[0][1]).to.have.property('class');
  });

  it('should return a new child patch when a child is different', () => {
    const child = [
      [
        'div', {
          'style': {
            'text': 'lots'
          }
        },
        ['hi']
      ]
    ];
    const newTree = createNode('div', atts, child)
    const patches = diff(node, newTree);
    expect(patches[1][0]).to.equal('div');
  });

  it('should return a new child patch when a child is different, ii', () => {
    // TODO
    // - how to index among multiple children
    // - how to return multiple different children
    // - how to delete children from a if they don't exist in b
    const child = [
      [
        'div', {
          'style': {
            'text': 'lots'
          }
        },
        ['hi']
      ]
    ];
    const newChildren = children.slice();
    newChildren.push(child);
    const newTree = createNode('div', atts, newChildren)
    const patches = diff(node, newTree);
    expect(patches[1][0]).to.equal('div');
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
