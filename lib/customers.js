'use strict';

const config = require('config');
const lineByLineReader = require('line-by-line');
const greatCircleUtil = require('../utils/greatCircleUtil');
const logger = require('../utils/logger');

module.exports = {
  getCustomersFromFile,
  getClosestCustomers
};

async function getCustomersFromFile(customersFilePath) {
  return new Promise((resolve, reject) => {
    const customers = [];

    const lineReader = new lineByLineReader(customersFilePath);
    lineReader.on('line', (line) => {
      try {
        const customer = JSON.parse(line);
        customer.user_id = parseInt(customer.user_id);
        customer.latitude = parseFloat(customer.latitude);
        customer.longitude = parseFloat(customer.longitude);
        customers.push(customer);
      } catch (err) {
        // This error can be handled.
        // We keep loading customer even though some fail
        logger.log(`Unable to parse: ${line}, ${err}`);
      }
    });

    lineReader.on('end', () => {
      resolve(customers);
    });

    lineReader.on('error', (err) => {
      reject(err);
    });
  });
}

function getClosestCustomers(customers) {
  const closestCustomers = [];
  customers.forEach((customer) => {
    let distance = Number.MAX_VALUE;
    try {
      distance = greatCircleUtil.distance(customer.latitude, customer.longitude, config.officeCoordinates.latitude, config.officeCoordinates.longitude);
    } catch (err) {
      // We could handle an error from the util
      // Right now we log it just to show that it happens
      logger.log(err);
    }

    if (distance <= config.maxDistance) {
      closestCustomers.push(customer);
    }
  });

  // Sort customers by user_id ascending
  closestCustomers.sort((a, b) => a.user_id - b.user_id);

  return closestCustomers;
}
