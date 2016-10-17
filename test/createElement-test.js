import createElement, {
  createElementAtt,
  createElementStyles
} from '../src/createElement';

import Factories from './factories';
import { expect } from 'chai';

describe('createElement module', () => {

  describe('createElement', () => {
    let node;
    before(() => {
      node = Factories.buildNode('div', undefined, [ Factories.buildNode('p') ]);
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
