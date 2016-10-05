import { isStringOrNum } from '../src/helpers';

import { expect } from 'chai';

describe('helpers module', () => {
  describe('isStringOrNum', () => {
    it('should return true if payload is string or num', () => {
      expect(isStringOrNum('hi')).to.be.true;
      expect(isStringOrNum(1234)).to.be.true;
      expect(isStringOrNum({hi: 'you'})).to.be.false;
      expect(isStringOrNum([0,1,2])).to.be.false;
    });
  });
});
