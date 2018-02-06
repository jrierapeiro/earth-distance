'use strict';

const chai = require('chai');
const expect = chai.expect;
const chaiAsPromised = require('chai-as-promised');
const sinon = require('sinon');
const proxyquire = require('proxyquire').noCallThru();

chai.use(chaiAsPromised);

describe('app', () => {
  let mainMock;

  beforeEach(() => {
    mainMock = {
      getClosestCustomersFromFile: sinon.stub()
    };
  });

  it('should call main.getClosestCustomersFromFile on app executed', () => {
    mainMock.getClosestCustomersFromFile.returns(Promise.resolve([{ user_id: 1, name: 'John Doe' }]));
    proxyquire('../app', { './lib/main': mainMock });
    expect(mainMock.getClosestCustomersFromFile.calledWith('./data/customers.txt')).to.be.true;
  });
});
