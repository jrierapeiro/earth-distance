'use strict';

const chai = require('chai');
const expect = chai.expect;
const chaiAsPromised = require('chai-as-promised');
const sinon = require('sinon');
const proxyquire = require('proxyquire').noCallThru();

chai.use(chaiAsPromised);

describe('customers', () => {
  let customers;
  let loggerMock;
  let configMock;

  beforeEach(() => {
    loggerMock = {
      log: sinon.stub()
    };

    configMock = {
      maxDistance: 100,
      officeCoordinates: {
        latitude: 53.339428,
        longitude: -6.257664
      }
    };
  });

  describe('getCustomersFromFile', () => {
    beforeEach(() => {
      customers = proxyquire('../../lib/customers', { config: configMock, '../utils/logger': loggerMock });
    });

    it('should return the list of customers from the file', () => expect(customers.getCustomersFromFile('test/data/testCustomers.txt')).to.be.fulfilled.then((result) => {
      expect(result.length).to.equal(32);
    }));

    it('should parse the id, latitude and longitude fields', () => expect(customers.getCustomersFromFile('test/data/testCustomers.txt')).to.be.fulfilled.then((result) => {
      expect(typeof (result[0].user_id)).to.equal('number');
      expect(typeof (result[0].latitude)).to.equal('number');
      expect(typeof (result[0].longitude)).to.equal('number');
    }));

    it('should load customers even though there are invalid lines in the file', () => expect(customers.getCustomersFromFile('test/data/wrongCustomers.txt')).to.be.fulfilled.then((result) => {
      expect(result.length).to.equal(3);
      expect(loggerMock.log.called).to.be.true;
    }));

    it('should reject with the error when the file does not exists', () => expect(customers.getCustomersFromFile('test/data/notFound.txt')).to.be.rejected.then((err) => {
      expect(err).not.to.be.undefined;
    }));
  });

  describe('getClosestCustomers', () => {
    let greatCircleUtilMock;
    let customersList;

    beforeEach(() => {
      greatCircleUtilMock = {
        distance: sinon.stub()
      };

      customersList = [
        { latitude: 52.986375, user_id: 12, longitude: -6.043701 },
        { latitude: 51.92893, user_id: 1, longitude: -10.27699 },
        { latitude: 51.8856167, user_id: 2, longitude: -10.4240951 },
        { latitude: 52.3191841, user_id: 3, longitude: -8.5072391 },
        { latitude: 53.807778, user_id: 28, longitude: -7.714444 },
        { latitude: 54.0894797, user_id: 8, longitude: -6.18671 }
      ];

      customers = proxyquire('../../lib/customers', { config: configMock, '../utils/logger': loggerMock });
    });

    it('should return only customers that are closer than the max distance config value', () => {
      const closestCustomers = customers.getClosestCustomers(customersList);
      expect(closestCustomers.length).to.equal(2);
    });

    it('should return the list of customers sorted by id', () => {
      const closestCustomers = customers.getClosestCustomers(customersList);
      expect(closestCustomers[0].user_id).to.equal(8);
      expect(closestCustomers[1].user_id).to.equal(12);
    });

    it('should log an error when the distance method fails', () => {
      customers = proxyquire('../../lib/customers', { config: configMock, '../utils/logger': loggerMock, '../utils/greatCircleUtil': greatCircleUtilMock });
      const err = new Error('Invalid values');
      greatCircleUtilMock.distance.onFirstCall().throws(err);
      greatCircleUtilMock.distance.returns(50);

      const closestCustomers = customers.getClosestCustomers(customersList);
      expect(closestCustomers.length).to.be.greaterThan(0);
      expect(loggerMock.log.calledWith(err)).to.be.true;
    });
  });
});
