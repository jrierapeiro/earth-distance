'use strict';

const chai = require('chai');
const expect = chai.expect;
const chaiAsPromised = require('chai-as-promised');
const sinon = require('sinon');
const proxyquire = require('proxyquire').noCallThru();

chai.use(chaiAsPromised);

describe('main', () => {
  let main;
  let customersMock;

  beforeEach(() => {
    customersMock = {
      getCustomersFromFile: sinon.stub(),
      getClosestCustomers: sinon.stub()
    };

    main = proxyquire('../../lib/main', { './customers': customersMock });
  });

  describe('getClosestCustomersFromFile', () => {
    it('should call customers.getCustomersFromFile with the path', () => {
      const filePath = 'path';
      customersMock.getCustomersFromFile.returns(Promise.resolve([]));
      return expect(main.getClosestCustomersFromFile(filePath)).to.be.fulfilled.then(() => {
        expect(customersMock.getCustomersFromFile.calledWith(filePath));
      });
    });

    it('sshould call customers.getClosestCustomers with the list from getCustomersFromFile', () => {
      const customers = [{ user_id: 1, latitude: 2, longitude: 3 }];
      customersMock.getCustomersFromFile.returns(Promise.resolve(customers));
      return expect(main.getClosestCustomersFromFile('filePath')).to.be.fulfilled.then(() => {
        expect(customersMock.getClosestCustomers.calledWith(customers)).to.be.true;
      });
    });
  });
});
