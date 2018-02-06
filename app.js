'use strict';

const config = require('config');
const costumerService = require('./services/customerService');
const distanceService = require('./services/distanceService');

async function main() {
  const customers = await costumerService.getCustomersFromFile('./data/costumers.txt');
  const closestCustomers = distanceService.getClosestCustomers(customers, config.maxDistance);

  closestCustomers.forEach((customer) => {
    console.log(customer.user_id);
  });
}

main();
