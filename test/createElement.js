import { createElement,
         createElementAtt,
         createElementStyles } from '../src/createElement';
import createNode from '../src/createNode';

import { expect } from 'chai';

describe('createElement module', () => {
  describe('createElement', () => {
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

    it('should return an error if node is invalid', () => {
      expect(createElement).to.throw(Error);
    });

    it('should return an html string', () => {
      expect(createElement(node)).to.be.have.string('<div');
      expect(createElement(node)).to.be.have.string('</div>');
      expect(createElement(node)).to.be.have.string('<p');
      expect(createElement(node)).to.be.have.string('</p>');
    });
  });

  describe('createElementAtt', () => {
    it('should return an html atts string', () => {
      expect(createElementAtt('id', 'sup')).to.have.string('id="sup"');
      expect(createElementAtt('src', '/some/place')).to.have.string('src="/some/place"');
      expect(createElementAtt('title', 'the best thing ever')).to.have.string('title="the best thing ever"');
    });
  });

  describe('createElementStyles', () => {
    it('should return an html styles atts string', () => {
      expect(createElementStyles({'width': '20px', 'height': '10px'})).to.have.string('width: 20px');
      expect(createElementStyles({'width': '20px', 'height': '10px'})).to.have.string('height: 10px');
      expect(createElementStyles({'width': '20px', 'height': '10px'})).to.have.string('style=');
    });
  });

});
