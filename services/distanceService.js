'use strict';

const config = require('config');
const greatCircle = require('great-circle');

module.exports = {
  getClosestCustomers
};

function getClosestCustomers(customers, maxDistance) {
  const closestCustomers = [];
  customers.forEach((customer) => {
    const distance = greatCircle.distance(customer.latitude, customer.longitude, config.officeCoordinates.latitude, config.officeCoordinates.longitude, 'KM');
    if (distance <= maxDistance) {
      closestCustomers.push(customer);
    }
  });

  // Sort customers by user_id ascending
  closestCustomers.sort((a, b) => a.user_id - b.user_id);

  return closestCustomers;
}
