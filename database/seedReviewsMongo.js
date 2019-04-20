const mongoose = require('mongoose');
const db = require('./index.js');
const Model = require('./models.js');
const fs = require('fs');
const ndjson = require('ndjson');
const through2 = require('through2');

let startTime = new Date();

const inputStream = fs.createReadStream(__dirname + '/reviews.ndjson', {
  highWaterMark: 1 * 1024
});

const doStream = inputStream.pipe(
  through2(
    {
      highWaterMark: 1 * 1024
    },
    function handleWrite(chunk, encoding, done) {
      this.push(chunk, encoding);
      done();
    }
  )
);

const transformStream = doStream.pipe(
  ndjson.parse({
    highWaterMark: 10
  })
);

const batchingStream = (function batchObjects(source) {
  let batchSize = 5;
  let batchBuffer = [];
  let batchingStream = source.pipe(
    through2.obj(
      function handleWrite(item, encoding, done) {
        batchBuffer.push(item);

        if (batchBuffer.length >= batchSize) {
          this.push(batchBuffer);
          batchBuffer = [];
        }
        done();
      },
      function handleFlush(done) {
        if (batchBuffer.length) {
          this.push(batchBuffer);
        }
        done();
      }
    )
  );

  return batchingStream;
})(transformStream);

const databaseStream = batchingStream.pipe(
  through2(
    {
      objectMode: true,
      highWaterMark: 10
    },
    function handleWrite(batch, encoding, done) {
      const promises = batch.map(function operator(item) {
        return writeToMongo(item);
      });
      Promise.all(promises).then(
        function handleResolve(results) {
          done(null, results);
        },
        function handleError(error) {
          done(error);
        }
      );
    }
  )
);

databaseStream.on('data', function(results) {});

databaseStream.on('end', function(results) {
  let endTime = new Date();
  console.log(`Total Elapsed Time: ${(endTime - startTime) / 1000} seconds`);
});

function writeToMongo(data) {
  return Model.Review.collection.insertOne(data);
}
