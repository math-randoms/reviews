require('newrelic');
const http = require('http');
const handler = require('./handler.js');
const db = require('../database/PostgreSQL/index.js');

const port = 3004;

const server = http.createServer(handler);

server.listen(port, () => console.log(`Server up on ${port}`));

module.exports = server;
