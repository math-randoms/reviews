require('newrelic');
const http = require('http');
const url = require('url');
const handler = require('./handler.js');
const utils = require('./utilities.js');

const port = 3004;

const server = http.createServer((req, res) => {
  const parts = url.parse(req.url);
  if (parts.pathname === '/api/reviews/') {
    handler(req, res);
  } else {
    utils.sendResponse(res, 'Not found', 404);
  }
});

server.listen(port, () => console.log(`Server up on ${port}`));

module.exports = server;
