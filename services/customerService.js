'use strict';

const fs = require('fs');
const readline = require('readline');
const stream = require('stream');

module.exports = {
  getCustomersFromFile
};

function getCustomersFromFile(customersFilePath) {
  const inputStream = fs.createReadStream(customersFilePath);
  const outputStream = new stream();

  return new Promise((resolve, reject) => {
    const customers = [];
    try {
      const lineReader = readline.createInterface(inputStream, outputStream);
      lineReader.on('line', (line) => {
        const customer = JSON.parse(line);
        customer.user_id = parseInt(customer.user_id);
        customers.push(customer);
      });

      lineReader.on('close', () => {
        resolve(customers);
      });
    } catch (err) {
      reject(err);
    }
  });
}
