require('newrelic');
const http = require('http');
const url = require('url');
const path = require('path');
const fs = require('fs');
const handler = require('./handler.js');

const port = 3004;

const server = http.createServer((req, res) => {
  const parts = url.parse(req.url);
  if (parts.pathname === '/api/reviews/') {
    handler(req, res);
  } else {
    if (req.url === '/') {
      fs.readFile(
        path.join(__dirname, '../public/index.html'),
        (err, content) => {
          if (err) {
            res.writeHead(500);
            res.end();
          } else {
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end(content, 'utf-8');
          }
        }
      );
    } else if (req.url === '/bundle.js') {
      fs.readFile(
        path.join(__dirname, '../public/bundle.js'),
        (err, content) => {
          if (err) {
            res.writeHead(500);
            res.end();
          } else {
            res.writeHead(200, { 'Content-Type': 'text/js' });
            res.end(content, 'utf-8');
          }
        }
      );
    } else if (
      parts.pathname.includes('loaderio-cd35190725cb9b238c02bef819d68d92.txt')
    ) {
      fs.readFile(
        path.join(
          __dirname,
          '../loaderio-cd35190725cb9b238c02bef819d68d92.txt'
        ),
        (err, data) => {
          if (err) {
            res.writeHead(404);
            res.write('Not Found!', err);
          } else {
            res.writeHead(200, { 'Content-Type': 'text/plain' });
            res.write(data);
          }
          res.end();
        }
      );
    }
  }
});

server.listen(port, () => console.log(`Server up on ${port}`));

module.exports = server;
