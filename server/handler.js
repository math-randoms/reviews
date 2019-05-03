const url = require('url');
const utils = require('./utilities.js');
const dbHelpers = require('../database/PostgreSQL/dbHelpers.js');

// --------- Redis -----------

const redis = require('redis');

const client = redis.createClient();

client.on('connect', function() {
  console.log('Redis client connected');
});

client.on('error', function(err) {
  console.log('Error connecting to Redis client: ' + err);
});

// ---------------------------

const actions = {
  GET: (req, res) => {
    const reqUrl = url.parse(req.url, true);
    const { propertyId, averageRating } = reqUrl.query;
    if (propertyId && !averageRating) {
      client.get('reviews/' + propertyId, (err, result) => {
        if (result) {
          utils.sendResponse(res, JSON.parse(result), 200, {
            'Content-Type': 'application/json'
          });
        } else {
          dbHelpers
            .getReview(propertyId)
            .then(data => {
              utils.sendResponse(res, data, 200, {
                'Content-Type': 'application/json'
              });
              client.setex('reviews/' + propertyId, 300, JSON.stringify(data));
            })
            .catch(err => {
              utils.sendResponse(err, 'Error', 404);
            });
        }
      });
    } else if (propertyId && averageRating) {
      dbHelpers
        .getReviewsByRating(propertyId, averageRating)
        .then(data => {
          utils.sendResponse(res, data, 200, {
            'Content-Type': 'application/json'
          });
        })
        .catch(err => {
          utils.sendResponse(err, `Error: ${err}`, 404);
        });
    }
  },
  POST: (req, res) => {
    utils.collectData(req, formattedData => {
      dbHelpers
        .postReview(JSON.parse(formattedData))
        .then(() =>
          utils.sendResponse(res, 'Successfully created new record', 201, {
            'Content-Type': 'application/json'
          })
        )
        .catch(err => {
          utils.sendResponse(res, `Error: ${err}`, 404);
        });
    });
  },
  DELETE: (req, res) => {
    const reqUrl = url.parse(req.url, true);
    const { id } = reqUrl.query;
    dbHelpers
      .deleteReview(id)
      .then(() =>
        utils.sendResponse(res, `Successfully deleted ID #${id}`, 202, {
          'Content-Type': 'application/json'
        })
      )
      .catch(err => utils.sendResponse(res, `Error: ${err}`, 404));
  },
  PUT: (req, res) => {
    const reqUrl = url.parse(req.url, true);
    const { id } = reqUrl.query;
    utils.collectData(req, formattedData => {
      dbHelpers
        .updateReview(JSON.parse(formattedData), id)
        .then(() =>
          utils.sendResponse(res, `Successfully edited ID #${id}`, 202, {
            'Content-Type': 'application/json'
          })
        )
        .catch(err => {
          utils.sendResponse(res, `Error: ${err}`, 404);
        });
    });
  }
};

module.exports = (req, res) => {
  let action = actions[req.method];
  if (action) {
    action(req, res);
  } else {
    utils.sendResponse(res, 'Not found', 404);
  }
};
