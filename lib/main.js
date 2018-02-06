'use strict';

const customers = require('./customers');

module.exports = {
  getClosestCustomersFromFile
};

async function getClosestCustomersFromFile(filePath) {
  const customersList = await customers.getCustomersFromFile(filePath);
  return customers.getClosestCustomers(customersList);
}
