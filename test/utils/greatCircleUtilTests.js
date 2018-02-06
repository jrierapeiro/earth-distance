'use strict';

const config = require('config');
const chai = require('chai');
const expect = chai.expect;
const greatCircleUtil = require('../../utils/greatCircleUtil');

describe('greatCircleUtil', () => {
  describe('distance', () => {
    it('should return 0 when the points are the same', () => {
      expect(greatCircleUtil.distance(2, 3, 2, 3)).to.equal(0);
    });

    it('should thrown an error when fromLat is not a number', () => {
      expect(() => { greatCircleUtil.distance(); }).to.throw();
    });

    it('should thrown an error when fromLong is not a number', () => {
      expect(() => { greatCircleUtil.distance(1); }).to.throw();
    });

    it('should thrown an error when toLat is not a number', () => {
      expect(() => { greatCircleUtil.distance(1, 2); }).to.throw();
    });

    it('should thrown an error when toLong is not a number', () => {
      expect(() => { greatCircleUtil.distance(1, 2, 3); }).to.throw();
    });

    it('should return the expected distance between Howth and intercom\'s office', () => {
      expect(greatCircleUtil.distance(53.3815681, -6.0652743, config.officeCoordinates.latitude, config.officeCoordinates.longitude)).to.equal(13.599493425851545);
    });
  });
});
