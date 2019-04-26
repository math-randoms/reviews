const url = require('url');
const utils = require('./utilities.js');
const dbHelpers = require('../database/PostgreSQL/dbHelpers.js');

const actions = {
  GET: (req, res) => {
    const reqUrl = url.parse(req.url, true);
    const { propertyId, averageRating } = reqUrl.query;
    if (propertyId && !averageRating) {
      dbHelpers
        .getReview(propertyId)
        .then(data => {
          utils.sendResponse(res, data, 200, {
            'Content-Type': 'application/json'
          });
        })
        .catch(err => {
          utils.sendResponse(err, 'Error', 404);
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
