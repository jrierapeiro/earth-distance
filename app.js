'use strict';

const main = require('./lib/main');

async function showClosestsCustomers() {
  const closestCustomers = await main.getClosestCustomersFromFile('./data/customers.txt');
  closestCustomers.forEach((customer) => {
    console.log(`${customer.user_id} - ${customer.name}`);
  });
}

showClosestsCustomers();
