# intercom - coding test

## Description

We have some customer records in a text file (customers.json) -- one customer per line, JSON-encoded. We want to invite any customer within 100km of our Dublin office for some food and drinks on us. Write a program that will read the full list of customers and output the names and user ids of matching customers (within 100km), sorted by User ID (ascending).
- You can use the first formula from this Wikipedia article to calculate distance. Don't forget, you'll - need to convert degrees to radians.
- The GPS coordinates for our Dublin office are 53.339428, -6.257664.
- You can find the Customer list here.

## Solution
- The code to calculate the distance between to points can be replaced by the NPM module great-circle but I implemented it in order to show my coding styles
- There is a loader line by line for the customers.txt file, I could have formated it in a valid json format and just require('file') but I didn't want to change the original source file.
- To run the app: node app / npm start
- to run the tests: npm test
- There is a Dockerfile ready to be executed as a container as well (the output will be on the container logs)